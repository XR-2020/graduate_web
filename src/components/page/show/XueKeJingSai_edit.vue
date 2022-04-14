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
                    <el-form-item label="获奖等级">
                        <el-select v-model="form.grade" placeholder="请选择">
                            <el-option key="YuanJi" label="院级" value="院级"></el-option>
                            <el-option key="XiaoJi" label="校级" value="校级"></el-option>
                            <el-option key="ShengJi" label="省级" value="省级级"></el-option>
                            <el-option key="GuoJia" label="国家级" value="国家级"></el-option>
                            <el-option key="GuoJi" label="国际级" value="国际级"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="比赛级别">
                        <el-input v-model="form.level"></el-input>
                    </el-form-item>
                    <el-form-item label="参赛学生">
                        <el-input type="textarea" rows="5" v-model="form.student"></el-input>
                    </el-form-item>
                    <el-form-item label="指导教师">
                        <el-select multiple filterable v-model="form.people" @change="handleChange">
                            <el-option
                                v-for="item in teacher_list"
                                :key="item.badge"
                                :label="item.badge+'—'+item.name"
                                :value="item.badge">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="完成时间">
                        <el-input v-show="isInput" v-model="form.finishtime" disabled />
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" @change="change" v-model="form.finishtime" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="closethis">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    import {getTeacherList} from "../../../api/commonAPI";

    export default {
        name: 'xuekejingsai',
        props:['edit'],
        mounted:function(){
            this.form=this.edit
        },
        data: function(){
            return {
                is_editor:true,
                form: {},
                teacher_list:[],
                isInput:true
            }

        },

        created() {
            getTeacherList().then(res =>{
                this.teacher_list=res
            } )
        },
        methods: {
            change(){
                this.isInput=false
            },
            handleChange(item){
                this.isPeople=false
                this.$forceUpdate();

            },
            closethis(){
                this.$parent.$parent.closeDialog()
            },
            onSubmit() {
                console.log(this.form);
                // this.$message.success('提交成功！');
            }
        }
    }
</script>
