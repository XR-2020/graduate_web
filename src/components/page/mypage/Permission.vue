<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-warning"></i>申报审批</el-breadcrumb-item>
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
                   <el-table-column
                       v-for="item in cols"
                       :prop="item.prop"
                       :label="item.label"
                   >
                   </el-table-column>
                <el-table-column label="操作" width="350px" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" @click="handleDetail(scope.$index, scope.row)">查看详情</el-button>
                        <el-button size="small" type="info" @click="handleEdit(scope.$index, scope.row)">下载材料</el-button>
                        <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)">通过</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">不通过</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="80%">
            <chanxueyan v-bind:show="form"/>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import chanxueyan from '../show/chanxueyan_edit'
import {getAllShenBao, getSearchShenBao} from "../../../api/shenbaoAPI";
export default {
    name: 'permission',
    components:{"chanxueyan":chanxueyan},
    data() {
        return {
            url: './static/vuetable.json',
            tableData: [],
            cols:[],
            query:{
                key: '',
                role:-1,
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
                getSearchShenBao(this.query).then(res =>{
                    this.tableData = res.list
                    this.pageTotal=res.pageTotal
                    this.cols=res.cols
                } )
            }else{
                getAllShenBao(this.query).then(res=>{
                    this.tableData = res.list
                    this.pageTotal=res.pageTotal
                    this.cols=res.cols
                })
            }
        },
        search() {
            getSearchShenBao(this.query).then(res =>{
                this.tableData = res.list
                this.pageTotal=res.pageTotal
                this.cols=res.cols
            } )
        },
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        handleEdit(index, row) {
            this.form = this.tableData[index];
            this.editVisible = true;
        },
        handleDetail(index, row){
            this.form = this.tableData[index];
            console.log(this.form)
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
