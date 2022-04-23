<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>专利</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="width: 1000px">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-input v-model="query.key" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button icon="search" type="primary" style="float: right" @click="crawlerWeb('科技处_专利')">爬取原网站</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" align="center">
                </el-table-column>
                <el-table-column prop="name" label="名称" align="center">
                </el-table-column>
                <el-table-column prop="partment" label="部门" align="center">
                </el-table-column>
                <el-table-column prop="finishtime" label="完成时间" align="center">
                </el-table-column>
<!--                <el-table-column align="center" label="人员情况" width="185px">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-table :data="scope.row.people" :show-header="header">-->
<!--                            <el-table-column prop="badge" align="center"  label="工号"></el-table-column>-->
<!--                            <el-table-column prop="name" align="center"  label="姓名"></el-table-column>-->
<!--                        </el-table>-->
<!--                    </template>-->
<!--                </el-table-column>-->

<!--                <el-table-column prop="badge" label="第一完成人工号" width="110px"  align="center">-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="tea_name" label="第一完成人" width="100px"   align="center">-->
<!--                </el-table-column>-->
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
            <router-link to="/合并申报">
                <el-button type="primary">专利申报</el-button>
            </router-link>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="项目名称">
                    <el-input v-model="form.name"></el-input>
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
                    <el-input style="width: 250px" v-show="isInput" v-model="form.finishtime" disabled /><br>
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" @change="change" v-model="form.finishtime" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="editVisible=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!--查看完成人弹出框-->
        <el-dialog :visible.sync="isdetail" width="50%">
            <el-table :data="people" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="badge" label="完成人工号"  align="center">
                </el-table-column>
                <el-table-column prop="name" label="完成人"  align="center">
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import heBingShenBao from "../show/HeBingShenBao_edit";
import {getAllChanXueYan, getChanXueYanDetail, getSearchChanXueYan} from "../../../api/chanxueyanAPI";
import {
    deleteOneZhuanLi,
    deleteZhuanLi,
    getAllZhuanLi,
    getSearchZhuanLi,
    getZhuanLiDetail, getZhuanLiDetailBadge
} from "../../../api/zhuanliAPI";
import {crawlerWebSite, editHeBing, getTeacherList} from "../../../api/commonAPI";
    export default {
        name: 'basetable',
        components:{'heBingShenBao':heBingShenBao},
        data() {
            return {
                role:localStorage.getItem('ms_role'),
                pageTotal:0,
                query:{
                    key: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                isdetail:false,
                header:false,
                people:[],
                tableData: [],
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
                isInput:true
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
            change(){
                this.isInput=false
            },
            onSubmit() {
                this.editVisible = false;
                switch (this.form.type) {
                    case "专利":{
                        this.form.type=2;
                        break;
                    }
                    case "横向科研项目":{
                        this.form.type=3;
                        break;
                    }
                    case "著作":{
                        this.form.type=4;
                        break;
                    }
                    case "科研论文":{
                        this.form.type=5;
                        break;
                    }
                    case "软件著作权":{
                        this.form.type=6;
                        break;
                    }
                    case "科研项目结项":{
                        this.form.type=7;
                        break;
                    }

                }
                editHeBing(this.form).then(res => {
                    if(res!==0){
                        this.$message.success(`修改成功`);
                        this.$set(this.tableData, this.idx, this.form);
                    }else{
                        this.$message.error(`修改失败`);
                    }
                    this.getData()
                })
            },
            //爬取网站
            crawlerWeb(td){
                alert("正在爬取....请稍后")
                crawlerWebSite({crawlertd:td}).then(res => {
                    alert(res);
                    this.getData();
                })
            },
            // 分页导航
            handleCurrentChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                if(this.query.key!==''){
                    getSearchZhuanLi(this.query).then(res =>{
                        this.tableData = res.list
                        this.pageTotal=res.pageTotal
                    } )
                }else{
                    getAllZhuanLi(this.query).then(res=>{
                        this.tableData = res.list
                        this.pageTotal=res.pageTotal
                    })
                }
            },
            search() {
                getSearchZhuanLi(this.query).then(res =>{
                    this.tableData = res.list
                    this.pageTotal=res.pageTotal
                } )
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                getZhuanLiDetailBadge({id: row.id}).then(res =>{
                    this.form.people=res.data
                } )
                this.form=row;
                this.form.type='专利';
                this.editVisible = true;
            },
            closeDialog(){
                this.editVisible = false;
            },
            handleDetail(index, row){
                getZhuanLiDetail({id: row.id}).then(res =>{
                    this.people=res.data
                } )
                this.isdetail=true;
            },
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        deleteOneZhuanLi({id: row.id}).then(res=>{
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
                            deleteZhuanLi({ ids: this.idList }).then(res => {
                                this.$message.success("删除成功");
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
