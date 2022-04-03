<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 评估中心相关申报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
<!--                    <el-form-item label="名称" v-if="show">-->
<!--                        <el-input v-model="form.name" disabled></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="部门">
                        <el-input v-model="form.partment"></el-input>
                    </el-form-item>
                    <el-form-item label="获奖等级">
                        <el-input v-model="form.grade"></el-input>
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
    import {updateChanXueYan} from "../../../api/chanxueyanAPI";
    import {updatePingGuZhongXin} from "../../../api/pingguzhongxinAPI";

    export default {
        name: 'pingguzhongxin',
        data: function(){
            return {
                is_editor:true,
                form: {
                    name: '',
                    partment:'',
                    finishtime: '',
                    people:[],
                    grade:'',
                    role:-1,
                },
                teacher_list:[{
                    name:'教师1',
                    badge:12112,
                },{
                    name:'教师2',
                    badge:12113,
                }],
            }
        },
        methods: {
            onSubmit() {
                updatePingGuZhongXin(this.form).then(res =>{
                    this.$message.success(`添加成功`);
                } );
            }
        }
    }
</script>
