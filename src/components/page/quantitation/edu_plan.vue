<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>教育规划项目</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="width: 1000px">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-input v-model="query.key" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button icon="search" type="primary" style="float: right" @click="crawlerWeb('社科处_教育规划项目纵向结题')">爬取原网站</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center">
                </el-table-column>
                <el-table-column prop="name" label="项目名称" width="120" align="center">
                </el-table-column>
                <el-table-column prop="danwei" label="结题单位" width="120" align="center">
                </el-table-column>
                <el-table-column prop="level" label="项目级别" width="120" align="center">
                </el-table-column>
                <el-table-column prop="grade" label="结题等级" width="120" align="center">
                </el-table-column>
                <el-table-column prop="partment" label="部门" width="120" align="center">
                </el-table-column>
                <el-table-column prop="finishtime" label="完成时间" width="120" align="center">
                </el-table-column>
<!--                <el-table-column prop="people.badge" label="第一完成人工号"  align="center">-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="people.name" label="第一完成人"  align="center">-->
<!--                </el-table-column>-->
                <el-table-column label="操作" width="260px"  align="center">
                    <template slot-scope="scope">
                        <el-button size="small" type="info" @click="handleDetail(scope.$index, scope.row)">查看参与人</el-button>
                        <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="pageTotal">
                </el-pagination>
            </div>
            <router-link to="/教育规划项目申报">
                <el-button type="primary">教育规划项目申报</el-button>
            </router-link>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="项目名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="组织结题单位">
                    <el-input style="width: 310px" v-model="form.danwei"></el-input>
                </el-form-item>
                <el-form-item label="项目级别">
                    <el-input style="width: 310px" v-model="form.level"></el-input>
                </el-form-item>
                <el-form-item label="结题等级">
                    <el-input style="width: 310px" v-model="form.grade"></el-input>
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
                        <el-date-picker type="date" placeholder="选择日期" @change="change" v-model="form.finishtime" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="editVisible=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!--查看完成人弹出框-->
        <el-dialog :visible.sync="isdetail" width="80%">
            <el-table :data="people" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="badge" label="第一完成人工号"  align="center">
                </el-table-column>
                <el-table-column prop="name" label="第一完成人"  align="center">
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import jiaoyuguihua from '../show/JiaoYuGuiHua_edit'
import {
    getAllChanXueYan,
    getChanXueYanDetail,
    getChanXueYanDetailBadge,
    getSearchChanXueYan
} from "../../../api/chanxueyanAPI";
import {
    deleteJiaoYuGuiHua,
    deleteOneJiaoYuGuiHua, editJiaoYuGuiHua,
    getAllJiaoYuGuiHua, getJiaoYuGuiHuaDetailBadge,
    getSearchJiaoYuGuiHua,
    getSearchJiaoYuGuiHuaDetail, getSearchJiaoYuGuiHuaDetailBadge
} from "../../../api/jiaoyuguihuaAPI";
import {crawlerWebSite, getTeacherList} from "../../../api/commonAPI";
import {getZhuZuoDetailBadge} from "../../../api/zhuzuoAPI";
    export default {
        name: 'edu_plan',
        components:{'jiaoyuguihua':jiaoyuguihua},
        data() {
            return {
                pageTotal:0,
                query:{
                    key: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                header:false,
                tableData: [],
                people:[],
                isdetail:false,
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
                console.log(this.form)
                editJiaoYuGuiHua(this.form).then(res => {
                    if(res!==0){
                        this.$message.success(`修改第 ${this.idx+1} 行成功`);
                        this.$set(this.tableData, this.idx, this.form);
                    }else{
                        this.$message.error(`修改第 ${this.idx+1} 行失败`);
                    }
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
                    getSearchJiaoYuGuiHua(this.query).then(res =>{
                        this.tableData = res.list
                        this.pageTotal=res.pageTotal
                    } )
                }else{
                    getAllJiaoYuGuiHua(this.query).then(res=>{
                        this.tableData = res.list
                        this.pageTotal=res.pageTotal
                    })
                }
            },
            search() {
                getSearchJiaoYuGuiHua(this.query).then(res =>{
                    this.tableData = res.list
                    this.pageTotal=res.pageTotal
                } )
                this.is_search = true;
            },
            handleDetail(index, row){
                getSearchJiaoYuGuiHuaDetail({id: row.id}).then(res =>{
                    this.people=res.data
                } )
                this.isdetail=true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            closeDialog(){
                this.editVisible = false;
            },
            handleEdit(index, row) {
                getJiaoYuGuiHuaDetailBadge({id: row.id}).then(res =>{
                    this.form.people=res.data
                } )
                this.form=row;
                this.editVisible = true;
            },
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        deleteOneJiaoYuGuiHua({ids: [row.id]}).then(res=>{
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
                            deleteJiaoYuGuiHua({ ids: this.idList }).then(res => {
                                this.$message.error(res.msg);
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
