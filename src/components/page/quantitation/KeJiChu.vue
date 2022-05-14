<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>自科类科研成果</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="width: 1000px">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-input v-model="query.key" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button icon="search" type="primary" style="float: right" @click="getCrawerlist">爬取原网站</el-button>
            </div>
            <el-table :data="tableData" key="newSystem" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center">
                </el-table-column>
                <el-table-column prop="name" label="名称" align="center">
                </el-table-column>
                <el-table-column prop="type" label="类别" align="center">
                </el-table-column>
                <el-table-column prop="partment" label="部门" align="center">
                </el-table-column>
                <el-table-column prop="finishtime" label="完成时间"  align="center">
                </el-table-column>
                <el-table-column label="操作" width="260px"  align="center" v-if="role==='4'||role==='2'">
                    <template slot-scope="scope">
                        <el-button size="small" type="info" @click="handleDetail(scope.$index, scope.row)">查看参与人</el-button>
                        <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="260px"  align="center" v-else >
                    <template slot-scope="scope">
                        <el-button size="small" type="info" @click="handleDetail(scope.$index, scope.row)">查看参与人</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="pageTotal">
                </el-pagination>
            </div>
            <router-link to="/自科类科研成果">
                <el-button type="primary">自科类科研成果</el-button>
            </router-link>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="项目名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="项目类别">
                    <el-input v-model="form.type" disabled></el-input>
                </el-form-item>
                <el-form-item label="部门">
                    <el-input style="width: 310px" v-model="form.partment"></el-input>
                </el-form-item>
                <el-form-item label="参与人情况">
                    <el-select multiple filterable v-model="form.people">
                        <el-option
                            v-for="item in teacher_list"
                            :key="item.badge"
                            :label="item.badge+'—'+item.name"
                            :value="item.badge">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="完成时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy.MM.dd" v-model="form.finishtime" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="editVisible=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!--查看完成人弹出框-->
        <el-dialog :visible.sync="isdetail" width="50%" key="newSystemDetail">
            <el-table :data="people" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="badge" label="完成人工号"  align="center">
                </el-table-column>
                <el-table-column prop="name" label="完成人姓名"  align="center">
                </el-table-column>
            </el-table>
        </el-dialog>
        <!--选择爬取对话框-->
        <el-dialog :visible.sync="isCrawer" width="40%">
            <el-form>
                <el-form-item style="text-align: center">
                    <el-select filterable v-model="crawlertd" style="width: 50%">
                        <el-option
                            v-for="item in typeList"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="handleCrawer">爬取</el-button>
                    <el-button @click="isCrawer=false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>
</template>

<script>
import {getTeacherList} from "../../../api/commonAPI";
import {
    NewSystemCrawlerWebSite
} from "../../../api/newSystem";
import {
    deleteKeJiChu,
    deleteOneKeJiChu,
    editKeJiChu,
    getAllKeJiChu, getKeJiChuBadge,
    getKeJiChuDetail,
    getSearchKeJiChu
} from "../../../api/kejichu";
    export default {
        inject:['reload'],
        name: 'book',
        data() {
            return {
                typeList:['科技处_专利',
                        '科技处_横向项目',
                        '科技处_纵向立项',
                        '科技处_著作',
                        '科技处_论文',
                        '科技处_软件著作权',
                        '科技处_项目结项'],
                crawlertd:'',
                role:localStorage.getItem('ms_role'),
                header:false,
                isdetail:false,
                pageTotal:0,
                query:{
                    key: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                tableData: [],
                people:[],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {},
                idx: -1,
                idList:[],
                teacher_list:[],
                isCrawer:false
            }
        },
        created() {
            this.getData();
            getTeacherList().then(res =>{
                this.teacher_list=res
            } )
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            getCrawerlist(){
                this.isCrawer=true
            },
            handleCrawer(){
                this.isCrawer=false
                this.$message("正在爬取请稍等")
                NewSystemCrawlerWebSite({crawlertd:this.crawlertd}).then(res => {
                    alert("爬取完成！")
                    this.reload()
                })

            },
            onSubmit() {
                this.editVisible = false;
                editKeJiChu(this.form).then(res => {
                    if(res!==0){
                        this.$message.success(`修改成功`);
                        this.$set(this.tableData, this.idx, this.form);
                    }else{
                        this.$message.error(`修改失败`);
                    }
                    this.getData()
                })
            },
            // 分页导航
            handleCurrentChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                    getAllKeJiChu(this.query).then(res=>{
                        this.tableData = res.list
                        this.pageTotal=res.pageTotal
                    })
            },
            search() {
                if(this.query.key!==''){
                    getSearchKeJiChu(this.query).then(res =>{
                        this.tableData = res.list
                        this.pageTotal=res.pageTotal
                    } )
                }else{
                    getAllKeJiChu(this.query).then(res=>{
                        this.tableData = res.list
                        this.pageTotal=res.pageTotal
                    })
                }
                this.is_search = true;

            },
            handleDetail(index, row){
                getKeJiChuDetail({id: row.id,type:row.type}).then(res =>{
                    this.people=res.data
                } )
                console.log(this.people)
                this.isdetail=true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                getKeJiChuBadge({id: row.id,type:row.type}).then(res =>{
                    this.form.people=res.data
                } )
                this.form=row;
                this.editVisible = true;
            },
            closeDialog(){
                this.editVisible = false;
            },
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        deleteOneKeJiChu({id: row.id}).then(res=>{
                            this.getData();
                            this.$message.success('删除成功');
                        }).catch(()=>{
                            this.$message.error('删除失败');
                        })
                    })
                    .catch(() => {});
            },
            delAll() {
                if (this.idList.length>0){
                    this.$confirm('确定要删除吗？', '提示', {
                        type: 'warning'
                    })
                        .then(() => {
                            deleteKeJiChu({ ids: this.idList}).then(res => {
                                this.$message.success("删除成功");
                                // this.query.pageIndex = 1;
                                this.getData();
                            });
                        });
                }
            },
            handleSelectionChange(val) {
                this.idList = [];
                for (var i=0;i<val.length;i++){
                    this.idList.push(val[i].id)
                }
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>
