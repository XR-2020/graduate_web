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
                <el-table-column prop="object.id" label="ID" width="55" align="center">
                </el-table-column>
                <el-table-column prop="object.name" label="竞赛名称"  align="center">
                </el-table-column>
                <el-table-column prop="object.partment" label="部门"  align="center">
                </el-table-column>
                <el-table-column prop="object.grade" label="获奖等级"  align="center">
                </el-table-column>
                <el-table-column prop="object.level" label="比赛等级"  align="center">
                </el-table-column>
                <el-table-column prop="object.teacher" label="指导教师"  align="center">
                </el-table-column>
                <el-table-column prop="object.student" label="参赛学生" align="center">
                </el-table-column>
                <el-table-column prop="object.finishtime" label="获奖时间" align="center">
                </el-table-column>
                <el-table-column label="操作" width="200px"  align="center" v-if="role==='4'||role==='3'">
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
            <el-button v-if="role==='4'||role==='3'" type="primary" @click="isimportCompetition"><i class="el-icon-upload el-icon--left"></i>&nbsp;批量导入</el-button>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="80%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="竞赛名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="获奖等级">
                    <el-select v-model="form.grade" placeholder="请选择">
                        <el-option key="YuanJi" label="院级" value="院级"></el-option>
                        <el-option key="XiaoJi" label="校级" value="校级"></el-option>
                        <el-option key="ShengJi" label="省级" value="省级级"></el-option>
                        <el-option key="GuoJia" label="国家级" value="国家级"></el-option>
                        <el-option key="GuoJi" label="国际级" value="国际级"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门">
                    <el-input v-model="form.partment" disabled></el-input>
                </el-form-item>
                <el-form-item label="比赛级别">
                    <el-input v-model="form.level"></el-input>
                </el-form-item>
                <el-form-item label="参赛学生">
                    <el-input type="textarea" rows="5" v-model="form.student"></el-input>
                </el-form-item>
                <el-form-item label="指导教师">
                    <el-input v-model="form.teacher"></el-input>
                </el-form-item>
                <el-form-item label="完成时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.finishtime" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="editVisible=false">取消</el-button>
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

        <!-- 批量导入弹出框 -->
        <el-dialog title="学科竞赛导入" :visible.sync="isimport" width="40%">
            <el-form ref="form" :model="form" label-width="70px">
                <h3>模板示例</h3>
                <br>
                <div style="text-align: center">
                    <img src="static/img/competition.PNG" style="border: black solid 1px">
                </div>
                <br>
                <el-upload
                    ref="upload"
                    align="center"
                    class="upload-demo"
                    drag
                    accept=".xls,.xlsx"
                    :auto-upload="false"
                    action="http://localhost:8080/competitionImport"
                    :on-success="success"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将Excel文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form>
            <span slot="footer" class="dialog-footer">
		        <el-button @click="isimport = false">取 消</el-button>
		        <el-button type="primary" @click="handleImport">确 定</el-button>
		    </span>
        </el-dialog>
    </div>

</template>

<script>
import xuekejingsai from '../shenbao/XueKeJingSai'
import {
    deleteJingSai,
    deleteOneJingSai, editCompetition,
    getAllJingSai,
    getJingSaiDetail,
    getSearchJingSai
} from "../../../api/JingSaiAPI";
import {getTeacherList} from "../../../api/commonAPI";
import {editHonor} from "../../../api/rongyuAPI";
    export default {
        inject:['reload'],
        name: 'competition',
        components:{'xuekejingsai':xuekejingsai},
        data() {
            return {
                role:localStorage.getItem('ms_role'),
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
                isimport:false,
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
            handleImport(){
                this.$refs.upload.submit()
                this.isimport = false
                this.reload()
            },
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
                this.getData()
                this.is_search = true;
            },
            success(response,file,filename){
              alert(response.msg)
                this.reload()
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
                this.form=row.object;
                this.editVisible = true;
            },
            onSubmit(){
                this.editVisible = false;
                editCompetition(this.form).then(res => {
                    if(res!==0){
                        this.$message.success(`修改成功`);
                    }else{
                        this.$message.error(`修改失败`);
                    }
                    this.getData()
                })
            },
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        deleteOneJingSai({id: row.id}).then(res=>{
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
                    }).then(() => {
                            deleteJingSai({ ids: this.idList}).then(res => {
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
                    this.idList.push(val[i].object.id)
                }
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
