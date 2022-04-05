<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 专利/横向科研项目/著作/科研论文/软件著作权/科研项目结项申报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="申报类型">
                        <el-select v-model="form.type" placeholder="请选择">
                            <el-option key="ZhuanLi" label="专利" value="2"></el-option>
                            <el-option key="HengXiangKeYan" label="横向科研项目" value="3"></el-option>
                            <el-option key="ZhuZuo" label="著作" value="4"></el-option>
                            <el-option key="KeYanLunWen" label="科研论文" value="5"></el-option>
                            <el-option key="RuanJianZuZuoQuan" label="软件著作权" value="6"></el-option>
                            <el-option key="KeYanXiangMuJieXiang" label="科研项目结项" value="7"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
<!--                    <el-form-item label="项目名称" v-if="show">-->
<!--                        <el-input v-model="form.name" disabled></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="部门">
                        <el-input v-model="form.partment"></el-input>
                    </el-form-item>
<!--                    <el-form-item  label="第一完成人">-->
<!--                        <el-select v-model="form.firstpeople">-->
<!--                            <el-option-->
<!--                                v-for="item in teacher_list"-->
<!--                                :key="item.badge"-->
<!--                                :label="item.badge+'—'+item.name"-->
<!--                                :value="item.badge">-->
<!--                            </el-option>-->
<!--                        </el-select>-->
<!--                    </el-form-item>-->
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
    import {updateHeBing} from "../../../api/shenbaoAPI";
    import {getTeacherList} from "../../../api/commonAPI";

    export default {
        name: 'heBingShenBao',
        data: function(){
            return {
                form: {
                    role:-1,
                    name: '',
                    type: '',
                    partment:'',
                    finishtime: '',
                    people:[],
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
            onSubmit() {
                switch (this.form.type) {
                    case "专利":{
                        this.form.type=2;
                        break;
                    }
                    case "横向科研项目":{
                        this.form.type=3;
                        break;
                    }
                    case "著作":{
                        this.form.type=4;
                        break;
                    }
                    case "科研论文":{
                        this.form.type=5;
                        break;
                    }
                    case "软件著作权":{
                        this.form.type=6;
                        break;
                    }
                    case "科研项目结项":{
                        this.form.type=7;
                        break;
                    }

                }
                    updateHeBing(this.form).then(res =>{
                        this.$message.success(`添加成功`);
                    } );
                // this.$message.success('提交成功！');
            }
        }
    }
</script>
