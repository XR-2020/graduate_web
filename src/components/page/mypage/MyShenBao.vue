<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>我的申报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div>
                <br>
                <p style="color: #6f7180">待审核</p>
                <br>
<!--                <el-input v-model="daiShenHequery.key" placeholder="筛选关键词" style="width: 200px" class="handle-input mr10"></el-input>-->
<!--                <el-button type="primary" icon="search" @click="searchDaiShenHe">搜索</el-button>-->
                <el-table :data="daishenhe" border style="width: 100%">
                    <el-table-column prop="object.name" label="申报项目名称"  align="center">
                    </el-table-column>
                    <el-table-column prop="object.type" label="申报项目类别"  align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.tablename=='chanxueyan'">产学研</span>
                            <span v-if="scope.row.tablename=='competition'">学科竞赛</span>
                            <span v-if="scope.row.tablename=='hengxiangkeyanxiangmu'">横向科研项目</span>
                            <span v-if="scope.row.tablename=='zongxiangkeyanxiangmu'">纵向科研项目</span>
                            <span v-if="scope.row.tablename=='zhuzuo'">著作</span>
                            <span v-if="scope.row.tablename=='zhuanli'">专利</span>
                            <span v-if="scope.row.tablename=='ruanjianzhuzuoquan'">软件著作权</span>
                            <span v-if="scope.row.tablename=='pingguzhongxinxiangguan'">评估中心相关</span>
                            <span v-if="scope.row.tablename=='keyanxiangmujiexiang'">科研项目结项</span>
                            <span v-if="scope.row.tablename=='keyanlunwen'">科研论文</span>
                            <span v-if="scope.row.tablename=='jiaoyuguihuaxiangmu'">教育规划项目</span>
                            <span v-if="scope.row.tablename=='jiaoyanxiangmu'">教研项目</span>
                            <span v-if="scope.row.tablename=='jiaoyanlunwen'">教研论文</span>
                            <span v-if="scope.row.tablename=='honor'">荣誉称号</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="object.partment" label="项目所属部门"  align="center">
                    </el-table-column>
                    <el-table-column align="center" label="项目人员情况" width="250px">
                        <template slot-scope="scope">
                            <el-table :data="scope.row.people" :show-header="false">
                                <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column prop="object.finishtime" label="项目完成时间" align="center">
                    </el-table-column>
                    <el-table-column label="操作" width="280px"  align="center">
                        <template slot-scope="scope">
                            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination background @current-change="handleDaiShenHeChange" layout="total,prev, pager, next" :total="daishenhePageTotal">
                    </el-pagination>
                </div>
            </div>

            <div>
                <br>
                <p style="color: #5daf34">已通过</p>
                <br>
<!--                <el-input v-model="hadPassquery.key" placeholder="筛选关键词" class="handle-input mr10" style="width: 200px"></el-input>-->
<!--                <el-button type="primary" icon="search" @click="searchHadPass">搜索</el-button>-->
                <br>
                <el-table :data="hadPass" border style="width: 100%">
                    <el-table-column prop="object.name" label="项目名称"  align="center">
                    </el-table-column>
                    <el-table-column prop="object.type" label="项目类别"  align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.tablename=='chanxueyan'">产学研</span>
                            <span v-if="scope.row.tablename=='competition'">学科竞赛</span>
                            <span v-if="scope.row.tablename=='hengxiangkeyanxiangmu'">横向科研项目</span>
                            <span v-if="scope.row.tablename=='zongxiangkeyanxiangmu'">纵向科研项目</span>
                            <span v-if="scope.row.tablename=='zhuzuo'">著作</span>
                            <span v-if="scope.row.tablename=='zhuanli'">专利</span>
                            <span v-if="scope.row.tablename=='ruanjianzhuzuoquan'">软件著作权</span>
                            <span v-if="scope.row.tablename=='pingguzhongxinxiangguan'">评估中心相关</span>
                            <span v-if="scope.row.tablename=='keyanxiangmujiexiang'">科研项目结项</span>
                            <span v-if="scope.row.tablename=='keyanlunwen'">科研论文</span>
                            <span v-if="scope.row.tablename=='jiaoyuguihuaxiangmu'">教育规划项目</span>
                            <span v-if="scope.row.tablename=='jiaoyanxiangmu'">教研项目</span>
                            <span v-if="scope.row.tablename=='jiaoyanlunwen'">教研论文</span>
                            <span v-if="scope.row.tablename=='honor'">荣誉称号</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="object.partment" label="项目所属部门"  align="center">
                    </el-table-column>
                    <el-table-column align="center" label="项目人员情况" width="250px">
                        <template slot-scope="scope">
                            <el-table :data="scope.row.people" :show-header="false">
                                <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column prop="object.finishtime" label="项目完成时间" align="center">
                    </el-table-column>
                    <el-table-column label="操作" width="280px"  align="center">
                        <template slot-scope="scope">
                            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination background @current-change="handleHadPassChange" layout="total,prev, pager, next" :total="hadPassPageTotal">
                    </el-pagination>
                </div>
            </div>

            <div>
                <br>
                <p style="color: #dd6161">未通过</p>
                <br>
<!--                <el-input v-model="disPassquery.key" placeholder="筛选关键词" style="width: 200px" class="handle-input mr10"></el-input>-->
<!--                <el-button type="primary" icon="search" @click="searchDisPass">搜索</el-button>-->
                <br>
                <el-table :data="disPass" border style="width: 100%">
                    <el-table-column prop="object.name" label="项目名称"  align="center">
                    </el-table-column>
                    <el-table-column prop="object.type" label="项目类别" style=""  align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.tablename=='chanxueyan'">产学研</span>
                                <span v-if="scope.row.tablename=='competition'">学科竞赛</span>
                                <span v-if="scope.row.tablename=='hengxiangkeyanxiangmu'">横向科研项目</span>
                                <span v-if="scope.row.tablename=='zongxiangkeyanxiangmu'">纵向科研项目</span>
                                <span v-if="scope.row.tablename=='zhuzuo'">著作</span>
                                <span v-if="scope.row.tablename=='zhuanli'">专利</span>
                                <span v-if="scope.row.tablename=='ruanjianzhuzuoquan'">软件著作权</span>
                                <span v-if="scope.row.tablename=='pingguzhongxinxiangguan'">评估中心相关</span>
                                <span v-if="scope.row.tablename=='keyanxiangmujiexiang'">科研项目结项</span>
                                <span v-if="scope.row.tablename=='keyanlunwen'">科研论文</span>
                                <span v-if="scope.row.tablename=='jiaoyuguihuaxiangmu'">教育规划项目</span>
                                <span v-if="scope.row.tablename=='jiaoyanxiangmu'">教研项目</span>
                                <span v-if="scope.row.tablename=='jiaoyanlunwen'">教研论文</span>
                                <span v-if="scope.row.tablename=='honor'">荣誉称号</span>
                            </template>
                    </el-table-column>
                    <el-table-column prop="object.partment" label="项目所属部门"  align="center">
                    </el-table-column>
                    <el-table-column align="center" label="项目人员情况" width="250px">
                        <template slot-scope="scope">
                            <el-table :data="scope.row.people" :show-header="false">
                                <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column prop="object.finishtime" label="项目完成时间" align="center">
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination background @current-change="handleDisPassChange" layout="total,prev, pager, next" :total="disPassPageTotal">
                    </el-pagination>
                </div>
            </div>
        </div>
        </div>
</template>

<script>
import {getTeacherList} from "../../../api/commonAPI";
import {updateChanXueYan} from "../../../api/chanxueyanAPI";
import {deleteMyShenBao, getDaiShenHeData, getDisData, getHadPassData} from "../../../api/myShenBaoAPI";

export default {
    name: "MyShenBao",
    data: function(){
        return {
            badge:'',
            disPass:[],
            hadPass:[],
            daishenhe:[],
            disPassPageTotal:'',
            hadPassPageTotal:'',
            daishenhePageTotal:'',
            daiShenHequery:{
                badge: 0,
                pageIndex: 1,
                pageSize: 5
            },
            hadPassquery:{
                badge: 0,
                pageIndex: 1,
                pageSize: 5
            },
            disPassquery:{
                badge: 0,
                pageIndex: 1,
                pageSize: 5
            },
        }
    },
    created() {
        this.daiShenHequery.badge=localStorage.getItem('ms_username')
        this.hadPassquery.badge=localStorage.getItem('ms_username')
        this.disPassquery.badge=localStorage.getItem('ms_username')
       this.getData();
    },
    methods: {
        // searchDaiShenHe(){},
        // searchHadPass(){},
        // searchDisPass(){},
        getData(){
            this.getDaiShenHeData()
            this.getHadPassData()
            this.getDisData()
        },
        getDaiShenHeData(){
            getDaiShenHeData(this.daiShenHequery).then(res =>{
                this.daishenhe=res.tableData
                this.daishenhePageTotal=res.pageTotal
            } )
        },
        getHadPassData(){
            getHadPassData(this.hadPassquery).then(res =>{
                this.hadPass=res.tableData
                this.hadPassPageTotal=res.pageTotal
            } )
        },
        getDisData(){
            getDisData(this.disPassquery).then(res =>{
                this.disPass=res.tableData
                this.disPassPageTotal=res.pageTotal
            } )
        },
        handleDaiShenHeChange(val){
            this.$set(this.daiShenHequery, 'pageIndex', val);
            this.getDaiShenHeData();
        },
        handleEdit(index, row) {},
        handleDelete(index, row) {
            deleteMyShenBao({id:row.object.id,tablename:row.tablename}).then(res =>{
                if(res===0){
                    this.$message.error('删除失败')
                }else{
                    this.$message.success('删除'+row.object.name+'成功')
                }
                this.getDaiShenHeData()
            } )
        }
    }
}
</script>

