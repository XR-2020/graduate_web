<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i>教研成果统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>
                <span>—</span>
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date2"></el-date-picker>
                <el-select v-model="form.value" placeholder="请选择类型">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="search" @click="search">查看统计</el-button>
            </div>
            <div v-if="bysearch">
                <div class="schart-box" v-if="hasdate">
                    <schart class="schart" canvasId="line" :data="data1" type="line" :options="options2"></schart>
                </div>
                <div class="schart-box" v-if="hastype">
                    <schart  class="schart" canvasId="line" :data="data2" type="line" :options="options3"></schart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    export default {
        name: 'basecharts',
        components: {
            Schart
        },
        data: () => ({
            form: {
                date1: '',
                date2:'',
                value:''
            },
            options:[
                {
                    value: '0',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '产学研'
                },{
                    value: '2',
                    label: '教研项目'
                },{
                    value: '3',
                    label: '教研论文'
                },{
                    value: '4',
                    label: '教育规划项目'
                },{
                    value: '5',
                    label: '纵向科研项目'
                },{
                    value: '6',
                    label: '评估中心相关'
                },{
                    value: '7',
                    label: '专利'
                },{
                    value: '8',
                    label: '横向科研项目'
                },{
                    value: '9',
                    label: '著作'
                },{
                    value: '10',
                    label: '科研论文'
                },{
                    value: '11',
                    label: '软件著作权'
                },{
                    value: '12',
                    label: '科研项目结项'
                },{
                    value: '13',
                    label: '学科竞赛'
                },{
                    value: '14',
                    label: '荣誉称号'
                }
            ],
            data1:[
                {name:'产学研',value:10},
                {name:'教研项目',value:14},
                {name:'教研论文',value:22},
                {name:'评估中心相关',value:11},
                {name:'教育规划项目',value:9},
                {name:'横向科研项目',value:14},
                {name:'纵向科研项目',value:15},
                {name:'著作',value:7},
                {name:'科研论文',value:4},
                {name:'软件著作权',value:10},
                {name:'科研项目结项',value:8},
                {name:'科学竞赛',value:26},
                {name:'荣誉称号',value:5},
            ],
            data2:[
                {name:'计算机学院', value:8},
                {name:'软件学院', value:10},
                {name:'服装学院', value:5},
                {name:'体育学院', value:9},
                {name:'教育学院', value:4}
            ],
            options2: {
                title: '2021.6-2022.6成果统计',
                autoWidth: true,   // 设置宽高自适应
                showValue: false,
                bgColor: '#F9EFCC',
                fillColor: '#00887C',
                contentColor: 'rgba(46,199,201,0.3)',
                yEqual: 7
            },
            options3: {
                title: '2021.6-2022.6产学研统计',
                autoWidth: true,   // 设置宽高自适应
                showValue: false,
                bgColor: '#F9EFCC',
                fillColor: '#00887C',
                contentColor: 'rgba(46,199,201,0.3)',
                yEqual: 7
            },
            hasdate:false,
            hastype:false,
            bysearch:false
        }),
        methods:{
            search() {
                this.bysearch=true
                    if(this.form.date1&&this.form.date2){
                        this.hasdate=true
                    }
                    if(this.form.value){
                        this.hastype=true
                    }
            }
        }
    }
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}
.schart-box{
    display: inline-block;
    width: 100%;
    height: 100%;
    margin: 0px;
}
.schart {
    width:auto;
    height: 500px;
}
</style>
