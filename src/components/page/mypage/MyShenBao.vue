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
                <el-table :data="daishenhe" border style="width: 100%">
                    <el-table-column prop="object.name" label="申报项目名称"  align="center">
                    </el-table-column>
                    <el-table-column prop="object.type" label="项目类别"  align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.tablename=='competition'">学科竞赛</span>
                            <span v-if="scope.row.tablename=='honor'">荣誉称号</span>
                            <span v-if="scope.row.tablename=='newsystem'">教务处成果</span>
                            <span v-if="scope.row.tablename=='shekechu'">社科处成果</span>
                            <span v-if="scope.row.tablename=='kejichu'">科技处成果</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="object.partment" label="项目所属部门"  align="center">
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
                <br>
                <el-table :data="hadPass" border style="width: 100%">
                    <el-table-column prop="object.name" label="项目名称"  align="center">
                    </el-table-column>
                    <el-table-column prop="object.type" label="项目类别"  align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.tablename=='competition'">学科竞赛</span>
                            <span v-if="scope.row.tablename=='honor'">荣誉称号</span>
                            <span v-if="scope.row.tablename=='newsystem'">教务处成果</span>
                            <span v-if="scope.row.tablename=='shekechu'">社科处成果</span>
                            <span v-if="scope.row.tablename=='kejichu'">科技处成果</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="object.partment" label="项目所属部门"  align="center">
                    </el-table-column>
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
                <br>
                <el-table :data="disPass" border style="width: 100%">
                    <el-table-column prop="object.name" label="项目名称"  align="center">
                    </el-table-column>
                    <el-table-column prop="object.type" label="项目类别"  align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.tablename=='competition'">学科竞赛</span>
                            <span v-if="scope.row.tablename=='honor'">荣誉称号</span>
                            <span v-if="scope.row.tablename=='newsystem'">教务处成果</span>
                            <span v-if="scope.row.tablename=='shekechu'">社科处成果</span>
                            <span v-if="scope.row.tablename=='kejichu'">科技处成果</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="object.partment" label="项目所属部门"  align="center">
                    </el-table-column>
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
                <el-form-item label="项目级别" v-if="form.xiangmujibie" >
                    <el-input v-model="form.xiangmujibie"></el-input>
                </el-form-item>
                <el-form-item label="结题等级" v-if="form.jietidengji" >
                    <el-input v-model="form.jietidengji"></el-input>
                </el-form-item>
                <el-form-item label="成果类别" v-if="form.chengguotype" >
                    <el-input v-model="form.chengguotype"></el-input>
                </el-form-item>
                <el-form-item label="获奖类别" v-if="form.huojiangleibie" >
                    <el-input v-model="form.huojiangleibie"></el-input>
                </el-form-item>
                <el-form-item label="奖励级别" v-if="form.jianglijibie" >
                    <el-input v-model="form.jianglijibie"></el-input>
                </el-form-item>
                <el-form-item label="奖励等级" v-if="form.jianglidengji" >
                    <el-input v-model="form.jianglidengji"></el-input>
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
import {getTeacherList, selectProject} from "../../../api/commonAPI";
import {deleteMyShenBao, getDaiShenHeData, getDisData, getHadPassData} from "../../../api/myShenBaoAPI";
import {editHonor} from "../../../api/rongyuAPI";
import {editCompetition} from "../../../api/JingSaiAPI";
import {editNewSystem} from "../../../api/newSystem";
import {editSheKeChu} from "../../../api/SheKeChuAPI";
import {editKeJiChu} from "../../../api/kejichu";

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
        this.daiShenHequery.badge=localStorage.getItem('ms_badge')
        this.hadPassquery.badge=localStorage.getItem('ms_badge')
        this.disPassquery.badge=localStorage.getItem('ms_badge')
        getTeacherList().then(res =>{
            this.teacher_list=res
        } )
       this.getData();
    },
    methods: {
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
                case "newsystem":{
                    editNewSystem(this.form).then(res => {
                        if(res!==0){
                            this.$message.success(`修改成功`);
                            this.$set(this.tableData, this.idx, this.form);
                        }else{
                            this.$message.error(`修改失败`);
                        }
                    })
                    break;
                }
                case "shekechu":{
                    editSheKeChu(this.form).then(res => {
                        if(res!==0){
                            this.$message.success(`修改成功`);
                            this.$set(this.tableData, this.idx, this.form);
                        }else{
                            this.$message.error(`修改失败`);
                        }
                    })
                    break;
                }
                case "kejichu":{
                    editKeJiChu(this.form).then(res => {
                        if(res!==0){
                            this.$message.success(`修改成功`);
                            this.$set(this.tableData, this.idx, this.form);
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

