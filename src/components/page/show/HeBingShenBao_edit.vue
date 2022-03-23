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
                    <el-form-item label="项目名称">
                        <el-input value="form.name" disabled></el-input>
                    </el-form-item>
<!--                    <el-form-item label="项目名称" v-if="show">-->
<!--                        <el-input v-model="form.name" disabled></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="部门">
                        <el-input  value="form.partment" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="完成人工号">
                        <el-input value="form.badge" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="完成人">
                        <el-input value="form.tea_name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="完成时间">
                        <el-input value="form.finishtime" disabled></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'heBingShenBao',
        props:['show'],
        mounted:function(){
            this.form=this.edit
            this.is_editor=false
        },
        data: function(){
            return {
                form: {},
                is_editor:true,
                teacher_list:[{
                    name:'教师1',
                    badge:12112,
                },{
                    name:'教师2',
                    badge:12113,
                }],
            }
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
                console.log(this.form);
                // this.$message.success('提交成功！');
            }
        }
    }
</script>
