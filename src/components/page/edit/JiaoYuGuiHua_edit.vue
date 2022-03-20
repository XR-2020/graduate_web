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
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
<!--                    <el-form-item label="项目名称" v-if="edit">-->
<!--                        <el-input v-model="form.name" disabled></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="组织结题单位">
                        <el-input v-model="form.danwei"></el-input>
                    </el-form-item>
                    <el-form-item label="项目级别">
                        <el-input v-model="form.level"></el-input>
                    </el-form-item>
                    <el-form-item label="结题等级">
                        <el-input v-model="form.grade"></el-input>
                    </el-form-item>
                    <el-form-item label="部门">
                        <el-input v-model="form.partment"></el-input>
                    </el-form-item>
                    <el-form-item multiple filterable label="人员情况" v-if="!edit">
                        <el-select multiple filterable v-model="form.people">
                            <el-option
                                v-for="item in teacher_list"
                                :key="item.badge"
                                :label="item.badge+'—'+item.name"
                                :value="item.badge">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="完成人工号" v-if="edit">
                        <el-input v-model="form.people.badge"></el-input>
                    </el-form-item>
                    <el-form-item label="完成人" v-if="edit">
                        <el-input v-model="form.people.name"></el-input>
                    </el-form-item>
                    <el-form-item label="结题时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.finishtime" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <router-link to="/项目申报" v-if="is_editor"><el-button>取消</el-button></router-link>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'jiaoyuguihua',
        props:['edit'],
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
