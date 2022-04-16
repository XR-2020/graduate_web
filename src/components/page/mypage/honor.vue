<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>荣誉称号</el-breadcrumb-item>
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
                <el-table-column prop="name" label="称号名称" align="center">
                </el-table-column>
                <el-table-column prop="level" label="级别"  align="center">
                </el-table-column>
                <el-table-column prop="finishtime" label="获奖时间"  align="center">
                </el-table-column>
                <el-table-column align="center" label="获奖教师" width="185px">
                    <template slot-scope="scope">
                        <el-table :data="scope.row.people" :show-header="false">
                            <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                            <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                        </el-table>
                    </template>
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
            <router-link to="/荣誉称号申报">
                <el-button type="primary">荣誉称号申报</el-button>
            </router-link>
            <el-button type="primary" @click="isimportHonor"><i class="el-icon-upload el-icon--left"></i>&nbsp;批量导入</el-button>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="80%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="称号名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="级别">
                    <el-select v-model="form.level" placeholder="请选择">
                        <el-option key="YuanJi" label="院级" value="院级"></el-option>
                        <el-option key="XiaoJi" label="校级" value="校级"></el-option>
                        <el-option key="ShengJi" label="省级" value="省级级"></el-option>
                        <el-option key="GuoJia" label="国家级" value="国家级"></el-option>
                        <el-option key="GuoJi" label="国际级" value="国际级"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门">
                    <el-input v-model="form.partment"></el-input>
                </el-form-item>
                <el-form-item label="获奖教师">
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
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.finishtime" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="editVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="导入" :visible.sync="isimport" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-upload
                    class="upload-demo"
                    drag
                    action="http://localhost:8080/honorImport"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将Excel文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form>
            <span slot="footer" class="dialog-footer">
		        <el-button @click="isimport = false">取 消</el-button>
		        <el-button type="primary" @click="isimport = false,getData()">确 定</el-button>
		    </span>
        </el-dialog>
    </div>
</template>

<script>
import rongyuchenghao from '../shenbao/rongyuchenghao'
import {getAllJiaoYuGuiHua, getSearchJiaoYuGuiHua, getSearchJiaoYuGuiHuaDetail} from "../../../api/jiaoyuguihuaAPI";
import {
    deleteOneRongYu,
    deleteRongYu, editHonor,
    getAllRongYu, getHonorBadge,
    getSearchRongYu,
    insertHonor
} from "../../../api/rongyuAPI";
import {editCompetition, insertCompetition} from "../../../api/JingSaiAPI";
import {getTeacherList} from "../../../api/commonAPI";
    export default {
        name: 'honor',
        components:{'rongyuchenghao':rongyuchenghao},
        data() {
            return {
                isimport:false,
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
                teacher_list:[]
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
            isimportHonor(){
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
                    getSearchRongYu(this.query).then(res =>{
                        this.tableData = res.list
                        this.pageTotal=res.pageTotal
                    } )
                }else{
                    getAllRongYu(this.query).then(res=>{
                        this.tableData = res.list
                        this.pageTotal=res.pageTotal
                    })
                }
            },
            search() {
                getSearchRongYu(this.query).then(res =>{
                    this.tableData = res.list
                    this.pageTotal=res.pageTotal
                } )
                this.is_search = true;
            },
            onSubmit(){
                this.editVisible = false;
                editHonor(this.form).then(res => {
                    if(res!==0){
                        this.$message.success(`修改成功`);
                    }else{
                        this.$message.error(`修改失败`);
                    }
                    this.getData()
                })
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                getHonorBadge({id: row.id}).then(res =>{
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
                        deleteOneRongYu({ids: [row.id]}).then(res=>{
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
                            deleteRongYu({ ids: this.idList }).then(res => {
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
                insertHonor(this.form).then(res=>{
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
