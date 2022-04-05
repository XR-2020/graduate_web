<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>产学研申报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="部门">
                        <el-input v-model="form.partment"></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="立项文号">
                        <el-input v-model="form.wenhao"></el-input>
                    </el-form-item>
                    <el-form-item label="成果依据">
                        <el-input v-model="form.lianghua"></el-input>
                    </el-form-item>
<!--                    <el-form-item  label="第一完成人">-->
<!--                        <el-select v-model="form.firstpeople">-->
<!--                            <el-option-->
<!--                                v-for="item in teacher_list"-->
<!--                                :key="item.badge"-->
<!--                                :label="item.badge+'—'+item.name"-->
<!--                                :value="item.badge">-->
<!--                            </el-option>-->
<!--                        </el-select>-->
<!--                    </el-form-item>-->
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
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.finishtime" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <router-link to="/项目申报"><el-button>取消</el-button></router-link>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {insertChanXueYan, updateChanXueYan} from "../../../api/chanxueyanAPI";
import {getTeacherList} from "../../../api/commonAPI";

    export default {
        name: 'chanxueyan',
        data: function(){
            return {
                form: {
                    role:-1,
                    name: '',
                    partment:'',
                    finishtime: '',
                    lianghua:'',
                    wenhao:'',
                    people:[],
                },
                open:false,
                teacher_list:[],
            }
        },
        created() {
            getTeacherList().then(res =>{
                this.teacher_list=res
            } )
        },
        methods: {
            onSubmit() {
               updateChanXueYan(this.form).then(res =>{
                   this.$message.success(`添加成功`);
               } );
            }
        }
    }
</script>
