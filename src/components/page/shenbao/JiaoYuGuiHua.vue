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
<!--                    <el-form-item label="项目名称" v-if="show">-->
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
                    <el-form-item label="结题时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.finishtime" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>

                    <el-form-item  label="申报人">
                        <el-select v-model="form.shenbao">
                            <el-option
                                v-for="item in teacher_list"
                                :key="item.badge"
                                :label="item.badge+'—'+item.name"
                                :value="item.badge">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="证明材料">
                        <el-form ref="form" :model="form" label-width="70px">
                            <el-upload
                                class="upload-demo"
                                drag
                                accept=".zip"
                                action="http://localhost:8080/JiaoYuGuiHuaMetials"
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
    import {updateJiaoYuGuiHua} from "../../../api/jiaoyuguihuaAPI";
    import {getTeacherList} from "../../../api/commonAPI";

    export default {
        name: 'jiaoyuguihua',
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
                    role:-1,
                    shenbao:'',
                    path:''
                },
                baseform: {
                    name: '',
                    finishtime: '',
                    people:[],
                    partment:'',
                    level:'',
                    danwei:'',
                    grade:'',
                    role:-1,
                    shenbao:'',
                    path:''
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
            uploadSuccess(response,file,fileList){
                this.form.path=response
            },
            handleChange(file, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传！`)
            },
            onSubmit() {
                updateJiaoYuGuiHua(this.form).then(res =>{
                    if(res.data!==0){
                        this.$message.success(`添加成功`);
                    }else{
                        this.$message.error(`添加失败，教研研成果已被申报`);
                    }
                    this.form=this.baseform

                } );
            }
        }
    }
</script>
