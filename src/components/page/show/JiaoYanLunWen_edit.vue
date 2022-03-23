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
                        <el-input value="form.name" disabled></el-input>
                    </el-form-item>
<!--                    <el-form-item label="论文名称" v-if="show">-->
<!--                        <el-input v-model="form.name" disabled></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="部门">
                        <el-input value="form.partment" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="完成时间">
                        <el-input value="form.finishtime" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="第一完成人工号" disabled>
                        <el-input value="form.badge"></el-input>
                    </el-form-item>
                    <el-form-item label="第一完成人" disabled>
                        <el-input value="form.tea_name"></el-input>
                    </el-form-item>

                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'jiaoyulunwen',
        props:['show'],
        mounted:function(){
            this.form=this.edit
            this.is_editor=false
        },
        data: function(){
            return {
                form: {},
                is_editor:true,
            }
        },
        methods: {
            onSubmit() {
                console.log(this.form);
                // this.$message.success('提交成功！');
            }
        }
    }
</script>
