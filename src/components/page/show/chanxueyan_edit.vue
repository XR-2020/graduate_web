<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>产学研</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="部门">
                    <el-input v-model="form.partment"></el-input>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="立项文号">
                    <el-input v-model="form.wenhao"></el-input>
                </el-form-item>
                <el-form-item label="成果依据">
                    <el-input v-model="form.lianghua"></el-input>
                </el-form-item>
                <el-form-item label="参与人情况">
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
</template>

<script>
    import {getTeacherList} from "../../../api/commonAPI";

    export default {
        name: 'tool',
        props:['edit'],
        data: function(){
            return {
                form: {},
                is_editor:true,
                teacher_list:[],
                isInput:true
            }
        },
        mounted:function(){
            this.form=this.edit
            console.log(this.form)
        },
        created() {
            this.form=this.edit
            getTeacherList().then(res =>{
                this.teacher_list=res
            } )
        },
        methods: {
            change(){
                this.isInput=false
            },
            onSubmit() {
                console.log(this.form);
               // this.$message.success('提交成功！');
            },
            closethis(){
                this.$parent.$parent.closeDialog()
            }
        }
    }
</script>
