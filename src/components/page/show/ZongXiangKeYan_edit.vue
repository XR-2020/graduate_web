<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 纵向科研项目申报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="项目名称">
                    <el-input value="form.name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="部门">
                        <el-input value="form.partment" disabled></el-input>
                    </el-form-item>
<!--                    <el-form-item label="项目名称" v-if="show">-->
<!--                        <el-input v-model="form.name" disabled></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="立项部门">
                        <el-input value="form.lixiang" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="项目类别">
                        <el-input value="form.type" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="项目级别">
                        <el-input value="form.level" disabled></el-input>
                    </el-form-item>
<!--                    <el-form-item multiple filterable label="人员情况" v-if="!show">-->
<!--                        <el-select multiple filterable v-model="form.people">-->
<!--                            <el-option-->
<!--                                v-for="item in teacher_list"-->
<!--                                :key="item.badge"-->
<!--                                :label="item.badge+'—'+item.name"-->
<!--                                :value="item.badge">-->
<!--                            </el-option>-->
<!--                        </el-select>-->
<!--                    </el-form-item>-->
                    <el-form-item label="完成人工号">
                        <el-input value="form.badge" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="完成人">
                        <el-input value="form.name" disabled></el-input>
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
        name: 'zongxiangkeyan',
        props:['show'],
        mounted:function(){
            this.form=this.edit
            this.is_editor=false
        },
        data: function(){
            return {
                is_editor:true,
                options:[
                    {
                        value: 'guangdong',
                        label: '广东省',
                        children: [
                            {
                                value: 'guangzhou',
                                label: '广州市',
                                children: [
                                    {
                                        value: 'tianhe',
                                        label: '天河区'
                                    },
                                    {
                                        value: 'haizhu',
                                        label: '海珠区'
                                    }
                                ]
                            },
                            {
                                value: 'dongguan',
                                label: '东莞市',
                                children: [
                                    {
                                        value: 'changan',
                                        label: '长安镇'
                                    },
                                    {
                                        value: 'humen',
                                        label: '虎门镇'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: 'hunan',
                        label: '湖南省',
                        children: [
                            {
                                value: 'changsha',
                                label: '长沙市',
                                children: [
                                    {
                                        value: 'yuelu',
                                        label: '岳麓区'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                form: {
                    name: '',
                    finishtime: '',
                    people:[],
                    level:'',
                    type:'',
                    lixiang:'',
                    partment:'',
                    delivery: true,

                },
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
                console.log(this.form);
                // this.$message.success('提交成功！');
            }
        }
    }
</script>
