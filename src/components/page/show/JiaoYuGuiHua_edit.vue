<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 教育规划项目申报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="项目名称">
                        <el-input value="form.name" disabled></el-input>
                    </el-form-item>
<!--                    <el-form-item label="项目名称" v-if="show">-->
<!--                        <el-input v-model="form.name" disabled></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="组织结题单位">
                        <el-input value="form.danwei" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="项目级别">
                        <el-input value="form.level" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="结题等级">
                        <el-input value="form.grade" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="部门">
                        <el-input value="form.partment" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="完成人工号" disabled>
                        <el-input value="form.badge"></el-input>
                    </el-form-item>
                    <el-form-item label="完成人" disabled>
                        <el-input value="form.tea_name"></el-input>
                    </el-form-item>
                    <el-input label="完成时间" value="form.finishtime" disabled></el-input>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'jiaoyuguihua',
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
                     finishtime: '',
                    people:[],
                    partment:'',
                    level:'',
                    danwei:'',
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
