<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 纵向科研项目申报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="subform" :model="form" label-width="100px" :rules="rules">
                    <el-form-item label="项目名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="部门" prop="partment">
                        <el-input v-model="form.partment"></el-input>
                    </el-form-item>
<!--                    <el-form-item label="项目名称" v-if="show">-->
<!--                        <el-input v-model="form.name" disabled></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="立项部门" prop="lixiang">
                        <el-input v-model="form.lixiang"></el-input>
                    </el-form-item>
                    <el-form-item label="项目类别" prop="type">
                        <el-input v-model="form.type"></el-input>
                    </el-form-item>
                    <el-form-item label="项目级别" prop="level">
                        <el-input v-model="form.level"></el-input>
                    </el-form-item>
                    <el-form-item label="参与人情况" prop="people">
                        <el-select multiple filterable v-model="form.people">
                            <el-option
                                v-for="item in teacher_list"
                                :key="item.badge"
                                :label="item.badge+'—'+item.name"
                                :value="item.badge">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="日期时间" prop="finishtime">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.finishtime" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="证明材料" prop="path">
                        <el-form ref="form" :model="form" label-width="70px">
                            <el-upload
                                class="upload-demo"
                                drag
                                accept=".zip"
                                action="http://localhost:8080/ZongXiangKeYanMetials"
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
    import {updateZongXiangKeYan} from "../../../api/zongxiangkeyanAPI";
    import {getTeacherList} from "../../../api/commonAPI";

    export default {
        inject:['reload'],
        name: 'zongxiangkeyan',
        data: function(){
            return {
                form: {
                    name: '',
                    finishtime: '',
                    people:[],
                    level:'',
                    type:'',
                    lixiang:'',
                    partment:'',
                    role:localStorage.getItem('ms_role'),
                    shenbao:localStorage.getItem('ms_badge'),
                    path:''
                },
                teacher_list:[],
                rules: {
                    name: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    partment: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    finishtime: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    level: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    people: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    lixiang: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    path: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                },
            }

        },
        created() {
            getTeacherList().then(res =>{
                this.teacher_list=res
            } )
        },
        methods: {
            uploadSuccess(response,file,fileList){
                this.form.path=response
            },
            handleChange(file, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传！`)
            },
            onSubmit() {
                this.$refs.subform.validate(valid => {
                    if (valid) {
                        updateZongXiangKeYan(this.form).then(res => {
                            if (res.data !== 0) {
                                this.$message.success(`添加成功`);
                            } else {
                                this.$message.error(`添加失败，教研研成果已被申报`);
                            }
                            this.reload()

                        });
                    }else{
                        this.$message.error("请完善信息")
                    }
                })
            }
        }
    }
</script>
