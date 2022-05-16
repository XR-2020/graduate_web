<template>
    <div style="padding-top: 10%">
        <el-row :gutter="20">
            <el-col :span=26>
                <el-row>
                    <el-col>
                        <el-card shadow="hover" class="mgb20">
                            <div class="user-info">
                                <div class="user-info-cont">
                                    <div class="user-info-name">{{name}}</div>
                                </div>
                               <img src="../../../assets/first_page.png">
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <br><br><br>
        <div><p style="color: #f84e04;text-decoration:underline;font-size: medium;text-align: right;vertical-align: bottom" @click="addteacher=true">添加教师</p></div>
        <el-dialog title="添加教师" :visible.sync="addteacher" width="50%">
            <el-form ref="subform" :rules="rules" :model="form" label-width="100px">
                <el-form-item label="教师姓名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="教师工号" prop="badge">
                    <el-input v-model="form.badge" type="text" value=""
                              onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"
                              oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="教师密码">
                    <el-input style="width: 310px" v-model="form.badge" disabled></el-input>
                </el-form-item>
                <el-form-item label="教师身份" prop="role">
                    <el-select v-model="form.teacher_role">
                        <el-option
                            v-for="item in role_list"
                            :key="item.label"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="addteacher=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>

</template>

<script>
import {teacheradd, Teacheradd} from "../../../api/commonAPI";

    export default {
        name: 'dashboard',
        data() {
            return {
                name: localStorage.getItem('ms_username'),
                role:localStorage.getItem('ms_role'),
                addteacher:false,
                form:{
                    name:'',
                    badge:'',
                    teacher_role:''
                },
                role_list:[
                    {
                        label:"教研管理员",
                        value:1
                    },
                    {
                        label:"科研管理员",
                        value:2
                    },
                    {
                        label:"学科竞赛管理员",
                        value:3
                    },
                    {
                        label:"系统管理员",
                        value:4
                    },
                    {
                        label:"普通教师",
                        value:5
                    }
                ],
                rules: {
                    name: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    badge: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    role: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                }
            }
        },
        computed: {
            role() {
                if(this.role === '1'){
                    return '教研管理员 ';
                }else if(this.role === '2'){
                    return '科研管理员'
                }else if(this.role === '3'){
                    return '学科竞赛管理员'
                }else if(this.role === '4'){
                    return '系统管理员'
                }else{
                    return '普通教师'
                }

            }
        },
        methods:{
            onSubmit(){
                this.$refs.subform.validate(valid => {
                    teacheradd({name:this.form.name,badge:this.form.badge,role:this.form.teacher_role}).then(res => {
                        if(res!==0){
                            this.$message.success("教师   "+this.form.name+"添加成功")
                        }else{
                            this.$message.error("添加失败")
                        }
                    })
                })

                this.addteacher=false
            }
        }
    }

</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 20px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 20px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .user-info-role{
        font-size: 16px;
        text-align: center;
    }
</style>
