<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>学科竞赛</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-input v-model="query.key" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center">
                </el-table-column>
                <el-table-column prop="name" label="竞赛名称"  align="center">
                </el-table-column>
                <el-table-column prop="grade" label="获奖等级"  align="center">
                </el-table-column>
                <el-table-column prop="level" label="比赛等级"  align="center">
                </el-table-column>
<!--                <el-table-column align="center" label="指导教师" width="185px">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-table :data="scope.row.teacher" :show-header="header">-->
<!--                            <el-table-column prop="badge" align="center"  label="工号"></el-table-column>-->
<!--                            <el-table-column prop="name" align="center"  label="姓名"></el-table-column>-->
<!--                        </el-table>-->
<!--                    </template>-->
<!--                </el-table-column>-->

            <el-table-column prop="badge" label="指导教师工号"  align="center">
                </el-table-column>
                <el-table-column prop="tea_name" label="指导教师"  align="center">
                </el-table-column>
                <el-table-column prop="student" label="参赛学生" align="center">
                </el-table-column>
                <el-table-column prop="finishtime" label="获奖时间" align="center">
                </el-table-column>
                <el-table-column label="操作" width="200px"  align="center">
                    <template slot-scope="scope">
                       <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="pageTotal">
                </el-pagination>
            </div>
            <router-link to="/学科竞赛申报">
                <el-button type="primary">学科竞赛申报</el-button>
            </router-link>
            <el-button type="primary" @click="isimportCompetition"><i class="el-icon-upload el-icon--left"></i>&nbsp;批量导入</el-button>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="80%">
            <xuekejingsai v-bind:edit="form"/>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 批量导入弹出框 -->
        <el-dialog title="批量添加" :visible.sync="isimport" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将Excel文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form>
            <span slot="footer" class="dialog-footer">
		        <el-button @click="isimport = false">取 消</el-button>
		        <el-button type="primary" @click="saveEdit">确 定</el-button>
		    </span>
        </el-dialog>
    </div>

</template>

<script>
import xuekejingsai from '../shenbao/XueKeJingSai'
import {deleteOneRongYu, deleteRongYu, getAllRongYu, getSearchRongYu} from "../../../api/rongyuAPI";
import {
    deleteJingSai,
    deleteOneJingSai,
    getAllJingSai,
    getJingSaiDetail,
    getSearchJingSai, insertCompetition
} from "../../../api/JingSaiAPI";
import {getZhuZuoDetail} from "../../../api/zhuzuoAPI";
    export default {
        name: 'competition',
        components:{'xuekejingsai':xuekejingsai},
        data() {
            return {
                header:false,
                tableData: [],
                pageTotal:0,
                query:{
                    key: '',
                    pageIndex: 1,
                    pageSize: 10
                },
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
                isimport:false
            }
        },
        created() {
            this.getData();
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
            isimportCompetition(){
                this.isimport=true
            },
            // 分页导航
            handleCurrentChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                if(this.query.key!==''){
                    getSearchJingSai(this.query).then(res =>{
                        this.tableData = res.list
                        this.pageTotal=res.pageTotal
                    } )
                }else{
                    getAllJingSai(this.query).then(res=>{
                        this.tableData = res.list
                        this.pageTotal=res.pageTotal
                    })
                }
            },
            search() {
                getSearchJingSai(this.query).then(res =>{
                    this.tableData = res.list
                    this.pageTotal=res.pageTotal
                } )
                this.is_search = true;
            },
            handleDetail(index, row){
                getJingSaiDetail({id: row.id}).then(res =>{
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
            handleEdit(index, row) {
                const item = this.tableData[index];
                this.form=item;
                this.editVisible = true;
            },
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        deleteOneJingSai({ids: [row.id]}).then(res=>{
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
                            deleteJingSai({ ids: this.idList }).then(res => {
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
                this.editVisible = false;
                insertCompetition(this.form).then(res=>{
                    this.$message.success(`修改成功`);
                    this.getData();
                })
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
