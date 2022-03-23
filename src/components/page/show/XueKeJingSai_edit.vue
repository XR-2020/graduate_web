<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 学科竞赛申报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="竞赛名称">
                        <el-input value="form.name" disabled></el-input>
                    </el-form-item>
<!--                    <el-form-item label="竞赛名称" v-if="show">-->
<!--                        <el-input v-model="form.name" disabled></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="获奖等级">
                        <el-input value="form.grade" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="比赛级别">
                        <el-input value="form.level" disabled></el-input>
                    </el-form-item>
<!--                    <el-form-item multiple filterable label="指导教师" v-if="!edit">-->
<!--                        <el-select multiple filterable v-model="form.people">-->
<!--                            <el-option-->
<!--                                v-for="item in teacher_list"-->
<!--                                :key="item.badge"-->
<!--                                :label="item.badge+'—'+item.name"-->
<!--                                :value="item.badge">-->
<!--                            </el-option>-->
<!--                        </el-select>-->
<!--                    </el-form-item>-->
                    <el-form-item label="指导教师工号" >
                        <el-input value="form.teacher.badge" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="指导教师" >
                        <el-input value="form.teacher.name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="参赛学生">
                        <el-input type="textarea" rows="5" value="form.student" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="获奖时间">
                        <el-input value="form.finishtime" disabled></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'xuekejingsai',
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
                    student:'',
                    teacher:[],
                    level:'',
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
