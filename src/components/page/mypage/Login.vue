<template>
    <div class="login-wrap">
        <div class="ms-title">学院教科研成果管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="subform" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入工号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>

    </div>
</template>

<script>
    import {login} from "../../../api/commonAPI";

    export default {
        inject:['reload'],
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入工号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs.subform.validate((valid) => {
                    if (valid) {
                        login(this.ruleForm).then(res =>{
                            if (res.data===null){
                                this.$message.error("密码或用户名错误,请重新登陆")
                                this.reload()
                            }else{
                                  localStorage.setItem('ms_role',res.data.role);//res.data.role
                                  localStorage.setItem('ms_username',res.data.name);
                                  localStorage.setItem('ms_badge',res.data.badge);
                                  this.$router.push('/');
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
