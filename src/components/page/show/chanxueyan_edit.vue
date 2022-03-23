<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>产学研</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px">

                    <el-form-item label="项目名称">
                        <el-input v-model="form.name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="部门">
                        <el-input v-model="form.partment" disabled></el-input>
                    </el-form-item>
<!--                    <el-form-item label="项目名称" v-if="show">-->
<!--                        <el-input v-model="form.name" disabled></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="立项文号" v-if="form.wenhao">
                        <el-input v-model="form.wenhao" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="成果依据" v-if="form.lianghua">
                        <el-input v-model="form.lianghua" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="立项依据" v-if="form.lixiang">
                        <el-input v-model="form.lixiang" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="项目级别" v-if="form.level">
                        <el-input v-model="form.level" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="成果类型" v-if="form.type">
                        <el-input v-model="form.type" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="立项依据" v-if="form.lixiang">
                        <el-input v-model="form.lixiang" disabled></el-input>
                    </el-form-item>
                    <el-form-item  label="立项单位" v-if="form.danwei">
                        <el-input v-model="form.danwei" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="成果等级" v-if="form.grade">
                        <el-input v-model="form.grade" disabled></el-input>
                    </el-form-item>
                    <el-form-item multiple filterable label="参与人情况" v-if="form.people" >
                        <el-input v-model="form.people" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="完成时间">
                        <el-input v-model="form.finishtime" disabled></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tool',
        props:['show'],
        data: function(){
            return {
                form: {},
                is_editor:true,
            }
        },
        mounted:function(){
            this.form=this.show
            this.is_editor=false
        },
        methods: {
            onSubmit() {
                console.log(this.form);
               // this.$message.success('提交成功！');
            }
        }
    }
</script>
