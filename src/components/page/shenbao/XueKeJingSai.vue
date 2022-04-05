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
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
<!--                    <el-form-item label="竞赛名称" v-if="show">-->
<!--                        <el-input v-model="form.name" disabled></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="获奖等级">
                        <el-input v-model="form.grade"></el-input>
                    </el-form-item>
                    <el-form-item label="比赛级别">
                        <el-input v-model="form.level"></el-input>
                    </el-form-item>
                    <el-form-item label="指导教师">
                        <el-select multiple filterable v-model="form.people">
                            <el-option
                                v-for="item in teacher_list"
                                :key="item.badge"
                                :label="item.badge+'—'+item.name"
                                :value="item.badge">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="参赛学生">
                        <el-input type="textarea" rows="5" v-model="form.student"></el-input>
                    </el-form-item>
                    <el-form-item label="获奖时间">
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
    import {updateCompetition} from "../../../api/JingSaiAPI";
    import {getTeacherList} from "../../../api/commonAPI";

    export default {
        name: 'xuekejingsai',
        data: function(){
            return {
                form: {
                    name: '',
                    finishtime: '',
                    student:'',
                    teacher:[],
                    level:'',
                    grade:'',
                    role:-1,
                },
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
                updateCompetition(this.form).then(res =>{
                    this.$message.success(`添加成功`);
                } );
            }
        }
    }
</script>
