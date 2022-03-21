<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>横向科研项目</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="width: 1000px">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center">
                </el-table-column>
                <el-table-column prop="name" label="名称" align="center">
                </el-table-column>
                <el-table-column prop="partment" label="部门"  align="center">
                </el-table-column>
                <el-table-column prop="finishtime" label="完成时间" align="center">
                </el-table-column>
                <el-table-column prop="badge" label="第一完成人工号" width="110px"  align="center">
                </el-table-column>
                <el-table-column prop="tea_name" label="第一完成人" width="100px"   align="center">
                </el-table-column>
                <el-table-column label="操作" width="260px"  align="center">
                    <template slot-scope="scope">
                        <el-button size="small" type="info" @click="handleDetial(scope.$index, scope.row)">查看参与人</el-button>
                        <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="pageTotal">
                </el-pagination>
            </div>
            <router-link to="/合并申报">
                <el-button type="primary">横向科研项目申报</el-button>
            </router-link>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="80%">
            <heBingShenBao v-bind:edit="form"/>
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
import heBingShenBao from "../shenbao/HeBingShenBao";
import {getAllChanXueYan, getChanXueYanDetail, getSearchChanXueYan} from "../../../api/chanxueyanAPI";
    export default {
        name: 'lateral_per',
        components:{'heBingShenBao':heBingShenBao},
        data() {
            return {
                pageTotal:0,
                query:{
                    key: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                header:false,
                isdetail:false,
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
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1
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
            // 分页导航
            handleCurrentChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                if(this.query.key!==''){
                    getSearchHengXiangKeYan(this.query).then(res =>{
                        this.tableData = res.list
                        this.pageTotal=res.pageTotal
                    } )
                }else{
                    getAllHengXiangKeYan(this.query).then(res=>{
                        this.tableData = res.list
                        this.pageTotal=res.pageTotal
                    })
                }
            },
            search() {
                getSearchHengXiangKeYan(this.query).then(res =>{
                    this.tableData = res.list
                    this.pageTotal=res.pageTotal
                } )
                this.is_search = true;
                this.query.key='';
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleDetail(index, row){
                getHengXiangKeYanDetail({id: row.id}).then(res =>{
                    this.people=res.data
                } )
                this.isdetail=true;
            },
            handleEdit(index, row) {
                const item = this.tableData[index];
                this.form=item;
                this.form.type='横向科研项目';
                this.editVisible = true;
            },
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        deleteOneHengXiangKeYan({ids: [row.id]}).then(res=>{
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
                            deleteHengXiangKeYan({ ids: this.idList }).then(res => {
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
