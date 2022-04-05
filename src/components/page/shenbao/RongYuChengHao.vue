<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 荣誉称号申报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="称号名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
<!--                    <el-form-item label="称号名称" v-if="show">-->
<!--                        <el-input v-model="form.name" disabled></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="级别">
                        <el-input v-model="form.level"></el-input>
                    </el-form-item>
                    <el-form-item label="部门">
                        <el-input v-model="form.partment"></el-input>
                    </el-form-item>
                    <el-form-item multiple filterable label="获奖人员" v-if="!edit">
                        <el-select multiple filterable v-model="form.people">
                            <el-option
                                v-for="item in teacher_list"
                                :key="item.badge"
                                :label="item.badge+'—'+item.name"
                                :value="item.badge">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="获奖人工号" v-if="edit">
                        <el-input v-model="form.teacher_num"></el-input>
                    </el-form-item>
                    <el-form-item label="获奖人" v-if="edit">
                        <el-input v-model="form.teacher_name"></el-input>
                    </el-form-item>
                    <el-form-item label="获奖时间">
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
    import {updateChanXueYan} from "../../../api/chanxueyanAPI";
    import {updateHonor} from "../../../api/rongyuAPI";
    import {getTeacherList} from "../../../api/commonAPI";

    export default {
        name: 'rongyuchenghao',
        data: function(){
            return {
                form: {
                    name: '',
                     finishtime: '',
                    people:[],
                    level:'',
                    role:-1,
                    partment:''
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
                updateHonor(this.form).then(res =>{
                    this.$message.success(`添加成功`);
                } );
            }
        }
    }
</script>
