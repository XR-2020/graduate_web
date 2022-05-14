<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>社科类科研成果申报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="subform" :model="form" label-width="100px" :rules="rules">
                    <el-form-item label="申报类型" prop="shenbaotype">
                        <el-select filterable v-model="form.shenbaotype" style="width: 50%">
                            <el-option
                                v-for="item in typeList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="部门" prop="partment">
                        <el-input v-model="form.partment"></el-input>
                    </el-form-item>
                    <el-form-item label="认定单位" prop="danwei">
                        <el-input v-model="form.danwei"></el-input>
                    </el-form-item>
                    <el-form-item v-if="form.shenbaotype==='社科处_7.科研获奖'" label="成果类别" prop="chengguotype">
                        <el-input v-model="form.chengguotype"></el-input>
                    </el-form-item>
                    <el-form-item v-if="form.shenbaotype==='社科处_7.科研获奖'" label="获奖类别" prop="huojiangleibie">
                        <el-input v-model="form.huojiangleibie"></el-input>
                    </el-form-item>
                    <el-form-item v-if="form.shenbaotype==='社科处_7.科研获奖'" label="奖励等级" prop="jianglidengji">
                        <el-input v-model="form.jianglidengji"></el-input>
                    </el-form-item>
                    <el-form-item v-if="form.shenbaotype==='社科处_7.科研获奖'" label="奖励级别" prop="jianglijibie">
                        <el-input v-model="form.jianglijibie"></el-input>
                    </el-form-item>
                    <el-form-item v-if="form.shenbaotype==='社科处_3.纵向结题'" label="项目级别" prop="xiangmujibie">
                        <el-input v-model="form.xiangmujibie"></el-input>
                    </el-form-item>
                    <el-form-item v-if="form.shenbaotype==='社科处_3.纵向结题'" label="结题等级" prop="jietidengji">
                        <el-input v-model="form.jietidengji"></el-input>
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
                                action="http://localhost:8080/HeBingMetials"
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
    import {getTeacherList} from "../../../api/commonAPI";
    import {insertSheKeChu} from "../../../api/SheKeChuAPI";

    export default {
        inject:['reload'],
        name: 'SheKeChuShenBao',
        data: function(){
            return {
                typeList:['社科处_3.纵向结题','社科处_7.科研获奖'],
                form: {
                    chengguotype:'',
                    shenbaotype:'',
                    name: '',
                    finishtime: '',
                    people:[],
                    partment:'',
                    role:localStorage.getItem('ms_role'),
                    shenbao:localStorage.getItem('ms_badge'),
                    path:'',
                    jietidengji:'',
                    xiangmujibie:'',
                    jianglijibie:'',
                    jianglidengji:'',
                    huojiangleibie:''
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
                    people: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    path: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    huojiangleibie: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    jianglidengji: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    jianglijibie: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    xiangmujibie: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    jietidengji: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    shenbaotype: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    chengguotype: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    danwei: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ]
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
                console.log(this.form.path)
                this.$refs.subform.validate(valid => {
                    if (valid) {
                        insertSheKeChu(this.form).then(res => {
                            if (res.data !== 0) {
                                this.$message.success(`添加成功`);
                            } else {
                                this.$message.error(`添加失败，成果已被申报`);
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
