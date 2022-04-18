<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>产学研</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="width: 1000px">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-input v-model="query.key" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button icon="search" type="primary" style="float: right" @click="crawlerWeb('教务处-实践科_产学研立项')">爬取原网站</el-button>
            </div>
            <el-table :data="tableData" border ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="40px" align="center">
                </el-table-column>
                <el-table-column prop="partment" label="部门" align="center">
                </el-table-column>
                <el-table-column prop="name" label="项目名称" align="center">
                </el-table-column>
                <el-table-column prop="wenhao" label="立项文号" align="center">
                </el-table-column>
                <el-table-column prop="lianghua" label="成果依据" align="center">
                </el-table-column>
                <el-table-column prop="finishtime" label="完成时间" align="center">
                </el-table-column>
<!--                <el-table-column prop="badge" label="第一完成人工号" width="110px"  align="center">-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="tea_name" label="第一完成人" width="100px"   align="center">-->
<!--                </el-table-column>-->
                <el-table-column label="操作" width="260px"  align="center" v-if="role==='4'||role==='1'">
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
            <router-link to="/产学研申报">
                <el-button type="primary">产学研申报</el-button>
            </router-link>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
<!--            <tool v-bind:edit="form"/>-->
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="项目名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="部门">
                        <el-input style="width: 310px" v-model="form.partment"></el-input>
                    </el-form-item>
                    <el-form-item label="立项文号">
                        <el-input style="width: 310px" v-model="form.wenhao"></el-input>
                    </el-form-item>
                    <el-form-item label="成果依据">
                        <el-input style="width: 310px" v-model="form.lianghua"></el-input>
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
                            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.finishtime" style="width: 100%;"></el-date-picker>
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
import chanxueyan from '../show/chanxueyan_edit';
import {
    deleteChanXueYan,
    deleteOneChanXueYan,
    editChanXueYan,
    getAllChanXueYan,
    getChanXueYanDetail,
    getChanXueYanDetailBadge,
    getSearchChanXueYan
} from '../../../api/chanxueyanAPI';
import {crawlerWebSite, getTeacherList} from "../../../api/commonAPI";
    export default {
    components:{'tool':chanxueyan},
        name: 'pro_stu',
        data() {
            return {
                role:localStorage.getItem('ms_role'),
                pageTotal:0,
                tableData: [],
                query:{
                    key: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                people:[],
                isdetail:false,
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                idlist: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {},
                idx: -1,
                teacher_list:[],
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
            //爬取网站
            crawlerWeb(td){
                alert("正在爬取....请稍后")
                crawlerWebSite({crawlertd:td}).then(res => {
                    alert(res);
                    this.getData()
                })
            },
            onSubmit() {
                this.editVisible = false;
                editChanXueYan(this.form).then(res => {
                    if(res!==0){
                        this.$message.success(`修改成功`);
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
               if(this.query.key!==''){
                   getSearchChanXueYan(this.query).then(res =>{
                       this.tableData = res.list
                       this.pageTotal=res.pageTotal
                   } )
               }else{
                   getAllChanXueYan(this.query).then(res=>{
                       this.tableData = res.list
                       this.pageTotal=res.pageTotal
                       })
               }
            },
            search() {
                console.log(this.query.key)
                getSearchChanXueYan(this.query).then(res =>{
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
                getChanXueYanDetailBadge({id: row.id}).then(res =>{
                    this.form.people=res.data
                } )
                this.form=row;
                this.editVisible = true;
            },
            closeDialog(){
                this.editVisible = false;
            },
            handleDetail(index, row){
                getChanXueYanDetail({id: row.id}).then(res =>{
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
                        deleteOneChanXueYan({id: row.id}).then(res=>{
                            this.getData();
                            this.$message.success('删除成功');
                        }).catch(()=>{
                            this.$message.error('删除失败');
                        })
                    })
                    .catch(() => {});
            },
            delAll() {
                console.log(this.idlist.length)
                if (this.idlist.length>0){
                    this.$confirm('确定要删除吗？', '提示', {
                        type: 'warning'
                    }).then(() => {
                            deleteChanXueYan({ ids: this.idlist }).then(res => {
                                this.$message.success("删除成功");
                                this.getData();
                            });
                        });
                }
            },
            handleSelectionChange(val) {
                this.idlist = [];
                for (var i=0;i<val.length;i++){
                    this.idlist.push(val[i].id)
                }
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
