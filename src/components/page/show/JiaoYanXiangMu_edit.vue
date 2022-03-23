<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 教研项目申报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="部门">
                        <el-input value="form.partment" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称">
                        <el-input value="form.name" disabled></el-input>
                    </el-form-item>
<!--                    <el-form-item label="项目名称" v-if="show">-->
<!--                        <el-input v-model="form.name" disabled></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="立项文号">
                        <el-input value="form.wenhao" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="量化依据">
                        <el-input value="form.lianghua" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="完成人工号">
                        <el-input value="form.badge" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="完成人">
                        <el-input value="form.tea_name" disabled></el-input>
                    </el-form-item>
                    <el-input label="完成时间" value="form.finishtime" disabled></el-input>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'jiaoyanxiangmu',
        props:['show'],
        mounted:function(){
            this.form=this.edit
            this.is_editor=false
        },
        data: function(){
            return {
                form: {
                    name: '',
                    people:[],
                    lianghua:'',
                    wenhao:'',
                    partment:'',
                     finishtime: '',
                    delivery: true,

                },
                is_editor:true,
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
                console.log(this.form);
                // this.$message.success('提交成功！');
            }
        }
    }
</script>
