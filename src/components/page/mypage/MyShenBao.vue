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
<!--                    <el-table-column align="center" label="项目人员情况" width="250px" v-if="object.people">-->
<!--                        <template slot-scope="scope">-->
<!--                            <el-table :data="scope.row.people" :show-header="false">-->
<!--                                <el-table-column prop="badge" align="center"  label="工号"></el-table-column>-->
<!--                                <el-table-column prop="name" align="center"  label="姓名"></el-table-column>-->
<!--                            </el-table>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
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
                    <el-pagination background layout="total, prev, pager, next"
                                   @current-change="handleDaiShenHeChange"
                                   :current-page="daiShenHequery.pageIndex"
                                   :page-size="daiShenHequery.pageSize"
                                   :total="daishenhePageTotal">
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
<!--                    <el-table-column align="center" label="项目人员情况" width="250px">-->
<!--                        <template slot-scope="scope">-->
<!--                            <el-table :data="scope.row.people" :show-header="false">-->
<!--                                <el-table-column prop="badge" align="center"  label="工号"></el-table-column>-->
<!--                                <el-table-column prop="name" align="center"  label="姓名"></el-table-column>-->
<!--                            </el-table>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
                    <el-table-column prop="object.finishtime" label="项目完成时间" align="center">
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        background layout="total, prev, pager, next"
                        @current-change="handleHadPassChange"
                        :current-page="hadPassquery.pageIndex"
                        :page-size="hadPassquery.pageSize"
                        :total="hadPassPageTotal"
                    >
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
<!--                    <el-table-column align="center" label="项目人员情况" width="250px">-->
<!--                        <template slot-scope="scope">-->
<!--                            <el-table :data="scope.row.people" :show-header="false">-->
<!--                                <el-table-column prop="badge" align="center"  label="工号"></el-table-column>-->
<!--                                <el-table-column prop="name" align="center"  label="姓名"></el-table-column>-->
<!--                            </el-table>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
                    <el-table-column prop="object.finishtime" label="项目完成时间" align="center">
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        background layout="total, prev, pager, next"
                        @current-change="handleDisPassChange"
                        :current-page="hadPassquery.pageIndex"
                        :page-size="hadPassquery.pageSize"
                        :total="disPassPageTotal">
                    </el-pagination>
                </div>
            </div>
        </div>

        <el-dialog title="编辑" :visible.sync="editVisible" width="80%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="项目名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item v-if="form.level" label="项目等级">
                    <el-input v-model="form.level"></el-input>
                </el-form-item>
                <el-form-item v-if="form.grade" label="项目获奖等级">
                    <el-input v-model="form.grade"></el-input>
                </el-form-item>
                <el-form-item label="项目所属部门">
                    <el-input v-model="form.partment" disabled></el-input>
                </el-form-item>
                <el-form-item label="项目立项文号" v-if="form.wenhao" >
                    <el-input v-model="form.wenhao"></el-input>
                </el-form-item>
                <el-form-item label="项目成果依据"  v-if="form.lianghua">
                    <el-input v-model="form.lianghua"></el-input>
                </el-form-item>
                <el-form-item label="项目级别" v-if="form.level" >
                    <el-input v-model="form.level"></el-input>
                </el-form-item>
                <el-form-item label="参赛学生" v-if="form.student">
                    <el-input type="textarea" rows="5"  v-model="form.student"></el-input>
                </el-form-item>
                <el-form-item label="组织结题单位" v-if="form.danwei" >
                    <el-input v-model="form.danwei"></el-input>
                </el-form-item>
                <el-form-item label="项目人员" v-if="form.teacher">
                    <el-input v-model="form.teacher"></el-input>
                </el-form-item>
                <el-form-item label="项目人员" v-if="form.people">
                    <el-select multiple filterable v-model="form.people" @change="handleChange">
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
        </div>
</template>

<script>
import {editHeBing, getTeacherList, selectProject} from "../../../api/commonAPI";
import {editChanXueYan, updateChanXueYan} from "../../../api/chanxueyanAPI";
import {deleteMyShenBao, getDaiShenHeData, getDisData, getHadPassData} from "../../../api/myShenBaoAPI";
import {editHonor} from "../../../api/rongyuAPI";
import {editJiaoYanLunWen} from "../../../api/jiaoyanlunwenAPI";
import {editJiaoYuGuiHua} from "../../../api/jiaoyuguihuaAPI";
import {editJiaoYan} from "../../../api/jiaoyanAPI";
import {editPingGuZhongXin} from "../../../api/pingguzhongxinAPI";
import {editZongXiangKeYan} from "../../../api/zongxiangkeyanAPI";
import {editCompetition} from "../../../api/JingSaiAPI";

export default {
    inject:['reload'],
    name: "MyShenBao",
    data: function(){
        return {
            updatetablename:'',
            teacher_list:[],
            form:{},
            editVisible:false,
            badge:'',
            disPass:[],
            hadPass:[],
            daishenhe:[],
            disPassPageTotal:0,
            hadPassPageTotal:0,
            daishenhePageTotal:0,
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
        getTeacherList().then(res =>{
            this.teacher_list=res
        } )
       this.getData();
    },
    methods: {
        // searchDaiShenHe(){},
        // searchHadPass(){},
        // searchDisPass(){},
        handleChange(item){
            this.$forceUpdate();
        },
        onSubmit(){
            this.form.metails=null;
            switch (this.updatetablename){
                case "honor":{
                    editHonor(this.form).then(res => {
                        if(res!==0){
                            this.$message.success(`修改成功`);
                        }else{
                            this.$message.error(`修改失败`);
                        }
                    })
                    break;
                }
                case "jiaoyanlunwen":{
                    editJiaoYanLunWen(this.form).then(res => {
                        if(res!==0){
                            this.$message.success(`修改成功`);
                            this.$set(this.tableData, this.idx, this.form);
                        }else{
                            this.$message.error(`修改失败`);
                        }
                    })
                   break;
                }
                case "jiaoyanxiangmu":{
                    editJiaoYan(this.form).then(res => {
                        if(res!==0){
                            this.$message.success(`修改成功`);
                            this.$set(this.tableData, this.idx, this.form);
                        }else{
                            this.$message.error(`修改失败`);
                        }
                    })
                   break;
                }
                case "jiaoyuguihuaxiangmu":{
                    editJiaoYuGuiHua(this.form).then(res => {
                        if(res!==0){
                            this.$message.success(`修改成功`);
                            this.$set(this.tableData, this.idx, this.form);
                        }else{
                            this.$message.error(`修改失败`);
                        }
                    })
                    break;
                }
                case "keyanlunwen":{
                    this.form.type=5;
                    editHeBing(this.form).then(res => {
                        if(res!==0){
                            this.$message.success(`修改成功`);
                            this.$set(this.tableData, this.idx, this.form);
                        }else{
                            this.$message.error(`修改失败`);
                        }
                    })
                    break;
                }
                case "keyanxiangmujiexiang":{
                    this.form.type=7;
                    editHeBing(this.form).then(res => {
                        if(res!==0){
                            this.$message.success(`修改成功`);
                            this.$set(this.tableData, this.idx, this.form);
                        }else{
                            this.$message.error(`修改失败`);
                        }
                    })
                    break;
                }
                case "pingguzhongxinxiangguan":{
                    editPingGuZhongXin(this.form).then(res => {
                        if(res!==0){
                            this.$message.success(`修改成功`);
                            this.$set(this.tableData, this.idx, this.form);
                        }else{
                            this.$message.error(`修改失败`);
                        }
                    })
                    break;
                }
                case "ruanjianzhuzuoquan":{
                    this.form.type=6;
                    editHeBing(this.form).then(res => {
                        if(res!==0){
                            this.$message.success(`修改成功`);
                            this.$set(this.tableData, this.idx, this.form);
                        }else{
                            this.$message.error(`修改失败`);
                        }
                    })
                    break;
                }
                case "zhuanli":{
                    this.form.type=2;
                    editHeBing(this.form).then(res => {
                        if(res!==0){
                            this.$message.success(`修改成功`);
                            this.$set(this.tableData, this.idx, this.form);
                        }else{
                            this.$message.error(`修改失败`);
                        }
                    })
                    break;
                }
                case "zhuzuo":{
                    this.form.type=4;
                    editHeBing(this.form).then(res => {
                        if(res!==0){
                            this.$message.success(`修改成功`);
                            this.$set(this.tableData, this.idx, this.form);
                        }else{
                            this.$message.error(`修改失败`);
                        }
                    })
                    break;
                }
                case "zongxiangkeyanxiangmu":{
                    editZongXiangKeYan(this.form).then(res => {
                        if(res!==0){
                            this.$message.success(`修改成功`);
                            this.$set(this.tableData, this.idx, this.form);
                        }else{
                            this.$message.error(`修改失败`);
                        }
                    })
                    break;
                }
                case "hengxiangkeyanxiangmu":{
                    this.form.type=3;
                    editHeBing(this.form).then(res => {
                        if(res!==0){
                            this.$message.success(`修改成功`);
                            this.$set(this.tableData, this.idx, this.form);
                        }else{
                            this.$message.error(`修改失败`);
                        }
                    })
                    break;
                }
                case "competition":{
                    editCompetition(this.form).then(res => {
                        if(res!==0){
                            this.$message.success(`修改成功`);
                        }else{
                            this.$message.error(`修改失败`);
                        }
                    })
                    break;
                }
                case "chanxueyan":{
                    editChanXueYan(this.form).then(res => {
                        if(res!==0){
                            this.$message.success(`修改成功`);
                        }else{
                            this.$message.error(`修改失败`);
                        }
                    })
                    break;
                }
            }
            this.editVisible = false;
            this.reload()
        },
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
        handleHadPassChange(val){
            this.$set(this.hadPassquery, 'pageIndex', val);
            this.getHadPassData();
        },
        handleDisPassChange(val){
            this.$set(this.disPassquery, 'pageIndex', val);
            this.getDisData();
        },
        handleEdit(index, row) {
            selectProject({id:row.object.id,tablename:row.tablename}).then(res =>{
                this.form=res.data.object
                this.form.people=res.data.people
                this.updatetablename=row.tablename
            } )
            this.editVisible=true
        },
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

