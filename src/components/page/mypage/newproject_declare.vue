<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 新系统项目申报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <br> <br> <br>
        <div class="container">
            <el-row :gutter="20" class="mgb20">
                <el-col :span="12">
                    <el-card shadow="hover" :body-style="{padding: '10px 5px'}">
                        <div class="grid-content grid-con-1">
                            <div class="grid-cont-right">
                                <div><router-link to="/教务处成果申报" style="text-align: center">
                                    <el-button type="primary" style="padding: 15%;font-size: large">教务处成果申报</el-button>
                                </router-link></div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="hover" :body-style="{padding: '10px 5px'}">
                        <div class="grid-content grid-con-1">
                            <div class="grid-cont-right">
                                <div><router-link to="/社科处项目申报" style="text-align: center">
                                    <el-button type="primary" style="padding: 15%;font-size: large">社科处成果申报</el-button>
                                </router-link></div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
<!--                <el-col :span="8">-->
<!--                    <el-card shadow="hover" :body-style="{padding: '10px 5px'}">-->
<!--                        <div class="grid-content grid-con-1">-->
<!--                            <div class="grid-cont-right">-->
<!--                                <div><router-link to="/合并申报" style="text-align: center">-->
<!--                                    <el-button type="primary" style="padding: 15%;font-size: large">科技处成果申报</el-button>-->
<!--                                </router-link></div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </el-card>-->
<!--                </el-col>-->
                </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'baseform',
        data: function(){
            return {
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
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: true,
                    type: ['步步高'],
                    resource: '小天才',
                    desc: '',
                    options: []
                }
            }
        },
        methods: {

            onSubmit() {
                this.$message.success('提交成功！');
            }
        }
    }
</script>

<style scoped>
.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(9, 9, 9);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(9, 9, 9);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
    color: black;
    size: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

</style>
