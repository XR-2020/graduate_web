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
                    <el-form-item label="部门">
                        <el-input v-model="form.partment"></el-input>
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

    </div>
</template>

<script>
    import {newUpdateHeBing} from "../../../api/shenbaoAPI";
    import {getTeacherList} from "../../../api/commonAPI";

    export default {
        name: 'heBingShenBao',
        props:['edit'],
        mounted:function(){
            this.form=this.edit
        },
        data: function(){
            return {
                form: {},
                teacher_list:[],
                isInput:true,
                isPeople:true
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
                console.log(this.form);
                newUpdateHeBing(this.form).then(res =>{

                } )
            }
        }
    }
</script>
