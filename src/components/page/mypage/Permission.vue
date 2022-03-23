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
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center">
                </el-table-column>
                <el-table-column prop="shenbao_type" label="申报成果类型" align="center">
                </el-table-column>
                <el-table-column prop="partment" label="部门" align="center">
                </el-table-column>
                <el-table-column prop="name" label="项目名称" align="center">
                </el-table-column>
                <template slot-scope="scope1">
                    <el-table-column prop="wenhao" label="立项文号" align="center" v-if="scope1.row.wenhao">
                    </el-table-column>
                </template>
                <template slot-scope="scope2">
                    <el-table-column prop="lianghua" label="成果依据" align="center" v-if="scope2.row.lianghua">
                    </el-table-column>
                </template>
                <template slot-scope="scope3">
                    <el-table-column prop="lixiang" label="立项依据" align="center" v-if="scope3.row.lixiang">
                    </el-table-column>
                </template>
                <template slot-scope="scope4">
                    <el-table-column prop="level" label="项目级别" align="center" v-if="scope4.row.level">
                    </el-table-column>
                </template>
                <template slot-scope="scope5">
                    <el-table-column prop="type" label="项目类型" align="center" v-if="scope5.row.type">
                    </el-table-column>
                </template>
                <template slot-scope="scope6">
                    <el-table-column prop="danwei" label="立项单位" align="center" v-if="scope6.row.danwei">
                    </el-table-column>
                </template>
                <template slot-scope="scope7">
                    <el-table-column prop="grade" label="成果等级" align="center" v-if="scope7.row.grade">
                    </el-table-column>
                </template>
                <el-table-column prop="people" label="参与人情况" align="center">
                </el-table-column>
                <el-table-column prop="finishtime" label="完成时间" align="center">
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
export default {
    name: 'permission',
    components:{"chanxueyan":chanxueyan},
    data() {
        return {
            url: './static/vuetable.json',
            tableData: [{
                teacher:'教师1',
                name:'产学研申报项目',
                type:'产学研',
                id:1
            }],
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
