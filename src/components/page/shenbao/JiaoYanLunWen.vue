<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>教研论文申报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="论文名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="部门">
                        <el-input v-model="form.partment"></el-input>
                    </el-form-item>

                    <el-form-item label="参与人情况">
                        <el-select multiple filterable v-model="form.people">
                            <el-option
                                v-for="item in teacher_list"
                                :key="item.badge"
                                :label="item.badge+'—'+item.name"
                                :value="item.badge">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="完成时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.finishtime" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="证明材料">
                        <el-form ref="form" :model="form" label-width="70px">
                            <el-upload
                                ref="upload"
                                :auto-upload="false"
                                class="upload-demo"
                                drag
                                accept=".zip"
                                action="http://localhost:8080/JiaoYanLunWenMetials"
                                :limit="1"
                                :on-exceed="handleChange"
                                :on-success="uploadSuccess"
                                :show-file-list="true">
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将压缩包拖到此处，或<em>点击上传</em></div>
                            </el-upload>
                        </el-form>
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
    import {updateJiaoYanLunWen} from "../../../api/jiaoyanlunwenAPI";
    import {getTeacherList} from "../../../api/commonAPI";

    export default {
        inject:['reload'],
        name: 'jiaoyulunwen',
        data: function(){
            return {
                form: {
                    role:localStorage.getItem('ms_role'),
                    name: '',
                    finishtime: '',
                    partment:'',
                    people:[],
                    shenbao:localStorage.getItem('ms_badge'),
                    path:''
                },
                is_editor:true,
                teacher_list:[],
            }
        },
        created() {
            getTeacherList().then(res =>{
                this.teacher_list=res
            } )
        },
        methods: {
            handleChange(file, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传！`)
            },
            uploadSuccess(response,file,fileList){
                this.form.path=response
            },
            onSubmit() {
                this.$refs.upload.submit()
                updateJiaoYanLunWen(this.form).then(res =>{
                    if(res.data!==0){
                        this.$message.success(`添加成功`);
                    }else{
                        this.$message.error(`添加失败，教研研成果已被申报`);
                    }
                    this.reload()
                } );
            }
        }
    }
</script>
