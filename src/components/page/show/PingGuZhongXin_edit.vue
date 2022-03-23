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
                        <el-input value="form.name"disabled></el-input>
                    </el-form-item>
<!--                    <el-form-item label="名称" v-if="show">-->
<!--                        <el-input v-model="form.name" disabled></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="部门">
                        <el-input value="form.partment" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="获奖等级">
                        <el-input value="form.grade" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="完成人工号" disabled>
                        <el-input value="form.people.badge"></el-input>
                    </el-form-item>
                    <el-form-item label="完成人" disabled>
                        <el-input value="form.people.name"></el-input>
                    </el-form-item>
                    <el-form-item label="完成时间">
                        <el-input value="form.finishtime" disabled></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'pingguzhongxin',
        props:['show'],
        mounted:function(){
            this.form=this.edit
            this.is_editor=false
        },
        data: function(){
            return {
                is_editor:true,
                form: {
                    name: '',
                    partment:'',
                    finishtime: '',
                    people:[],
                    grade:'',
                    delivery: true,
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
                console.log(this.form);
                // this.$message.success('提交成功！');
            }
        }
    }
</script>
