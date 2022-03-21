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
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
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
                <el-table-column prop="people.badge" label="第一完成人工号"  align="center">
                </el-table-column>
                <el-table-column prop="people.name" label="第一完成人"  align="center">
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
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
            <router-link to="/教育规划项目申报">
                <el-button type="primary">教育规划项目申报</el-button>
            </router-link>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="80%">
            <jiaoyuguihua v-bind:edit="form"/>
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
import jiaoyuguihua from '../shenbao/JiaoYuGuiHua'
import {getChanXueYanDetail} from "../../../api/chanxueyanAPI";
    export default {
        name: 'edu_plan',
        components:{'jiaoyuguihua':jiaoyuguihua},
        data() {
            return {
                url: './static/vuetable.json',
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
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    this.url = '/ms/table/list';
                };
                this.$axios.post(this.url, {
                    page: this.cur_page
                }).then((res) => {
                    this.tableData = res.data.list;
                })
            },
            search() {
                this.is_search = true;
            },
            handleDetail(index, row){
                getChanXueYanDetail({id: row.id}).then(res =>{
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
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
