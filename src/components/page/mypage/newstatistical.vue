<template xmlns="http://www.w3.org/1999/html">
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i>教研成果明细</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-date-picker
                    v-model="value"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    unlink-panels>
                </el-date-picker>
                <el-select filterable v-model="form.key" placeholder="请选择教师" >
                    <el-option
                        v-for="item in teacher_list"
                        :key="item.badge"
                        :label="item.badge+'—'+item.name"
                        :value="item.badge">
                    </el-option>
                </el-select>
                <el-select v-model="form.value" placeholder="请选择类型" @change="search">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.lable"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
                <el-button type="primary" icon="search" @click="search">查看统计</el-button>
            </div>
            <div :visible.sync="bysearch">
                <div class="schart-box" v-if="hasdate">
                    <p>校外实践基地明细</p>
                    <br/>
                    <el-table :data="xiaowaishijianjidi" border key="xiaowaishijianjidi">
<!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
<!--                        </el-table-column>-->
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="成果名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="完成时间" align="center">
                        </el-table-column>
                        <el-table-column align="center" label="人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br>

                    <p>实践立项明细</p>
                    <br/>
                    <el-table :data="shijianlixiang" border key="shijianlixiang">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="成果名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="完成时间" align="center">
                        </el-table-column>
                        <el-table-column align="center" label="人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br>

                    <p>实践结项明细</p>
                    <br/>
                    <el-table :data="shijianjiexiang" border key="shijianjiexiang">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="成果名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="完成时间" align="center">
                        </el-table-column>
                        <el-table-column align="center" label="人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br>

                    <p>教材业绩点明细</p>
                    <br/>
                    <el-table :data="jiaocaiyejidian" border key="jiaocaiyejidian">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="成果名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="完成时间" align="center">
                        </el-table-column>
                        <el-table-column align="center" label="人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br>

                    <p>教研业绩明细</p>
                    <br/>
                    <el-table :data="jiaoyanyeji" border key="jiaoyanyeji">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="成果名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="完成时间" align="center">
                        </el-table-column>
                        <el-table-column align="center" label="人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br>

                    <p>教研论文明细</p>
                    <br/>
                    <el-table :data="jiaoyanlunwen" border key="jiaoyanlunwen">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="成果名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="完成时间" align="center">
                        </el-table-column>
                        <el-table-column align="center" label="人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br>

                    <p>优秀毕设指导教师明细</p>
                    <br/>
                    <el-table :data="youxiubishe" border key="youxiubishe">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="成果名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="完成时间" align="center">
                        </el-table-column>
                        <el-table-column align="center" label="人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br>

                    <p>纵向结题明细</p>
                    <br/>
                    <el-table :data="zongxiangjieti" border key="zongxiangjieti">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="成果名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.danwei" label="组织结题单位" align="center">
                        </el-table-column>
                        <el-table-column prop="object.xiangmujibie" label="项目级别" align="center">
                        </el-table-column>
                        <el-table-column prop="object.jietidengji" label="结题等级" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="完成时间" align="center">
                        </el-table-column>
                        <el-table-column align="center" label="人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br>

                    <p>科研获奖明细</p>
                    <br/>
                    <el-table :data="keyanhuojiang" border key="keyanhuojiang">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="成果名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.chengguotype" label="成果类别" align="center">
                        </el-table-column>
                        <el-table-column prop="object.huojiangleibie" label="获奖类别" align="center">
                        </el-table-column>
                        <el-table-column prop="object.danwei" label="奖励单位" align="center">
                        </el-table-column>
                        <el-table-column prop="object.jianglijibie" label="奖励级别" align="center">
                        </el-table-column>
                        <el-table-column prop="object.jianglidengji" label="奖励等级" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="完成时间" align="center">
                        </el-table-column>
                        <el-table-column align="center" label="人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br>
                </div>

                <template v-if="form.value === '教务处-实践科_校外实践基地'">
                    <el-table :data="xiaowaishijianjidi" border key="xiaowaishijianjidi">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="成果名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="完成时间" align="center">
                        </el-table-column>
                        <el-table-column align="center" label="人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <template v-if="form.value === '教务处-实践科_立项'">
                    <el-table :data="shijianlixiang" border key="shijianlixiang">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="成果名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="完成时间" align="center">
                        </el-table-column>
                        <el-table-column align="center" label="人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <template v-if="form.value === '教务处-实践科_结项'">
                    <el-table :data="shijianjiexiang" border key="shijianjiexiang">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="成果名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="完成时间" align="center">
                        </el-table-column>
                        <el-table-column align="center" label="人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <template v-if="form.value === '教务处-教材科_教材业绩点'">
                    <el-table :data="jiaocaiyejidian" border key="jiaocaiyejidian">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="成果名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="完成时间" align="center">
                        </el-table-column>
                        <el-table-column align="center" label="人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <template v-if="form.value === '教务处-教研科_教研业绩'">
                    <el-table :data="jiaoyanyeji" border key="jiaoyanyeji">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="成果名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="完成时间" align="center">
                        </el-table-column>
                        <el-table-column align="center" label="人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <template v-if="form.value === '教务处-教研科_教研论文'">
                    <el-table :data="jiaoyanlunwen" border key="jiaoyanlunwen">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="成果名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="完成时间" align="center">
                        </el-table-column>
                        <el-table-column align="center" label="人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <template v-if="form.value === '教务处-评估中心_2020届本科优秀毕业设计（论文）指导教师'">
                    <el-table :data="youxiubishe" border key="youxiubishe">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="成果名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="完成时间" align="center">
                        </el-table-column>
                        <el-table-column align="center" label="人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <template v-if="form.value === '社科处_3.纵向结题'">
                    <el-table :data="zongxiangjieti" border key="zongxiangjieti">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="成果名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.danwei" label="组织结题单位" align="center">
                        </el-table-column>
                        <el-table-column prop="object.xiangmujibie" label="项目级别" align="center">
                        </el-table-column>
                        <el-table-column prop="object.jietidengji" label="结题等级" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="完成时间" align="center">
                        </el-table-column>
                        <el-table-column align="center" label="人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <template v-if="form.value === '社科处_7.科研获奖'">
                    <el-table :data="keyanhuojiang" border key="keyanhuojiang">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="成果名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.chengguotype" label="成果类别" align="center">
                        </el-table-column>
                        <el-table-column prop="object.huojiangleibie" label="获奖类别" align="center">
                        </el-table-column>
                        <el-table-column prop="object.danwei" label="奖励单位" align="center">
                        </el-table-column>
                        <el-table-column prop="object.jianglijibie" label="奖励级别" align="center">
                        </el-table-column>
                        <el-table-column prop="object.jianglidengji" label="奖励等级" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="完成时间" align="center">
                        </el-table-column>
                        <el-table-column align="center" label="人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import {NewSearchAll, NewSearchByDetail} from "../../../api/newstatistical";
    import {getTeacherList} from "../../../api/commonAPI";
    export default {
        inject:['reload'],
        name: 'basecharts',
        components: {
            Schart
        },
        data: () => ({
            form: {
                date1: '',
                date2:'',
                value:'',
                key:''
            },
            value:'',
            options:[
                {lable:"校外实践基地", value:"教务处-实践科_校外实践基地"},
                {lable:"实践立项", value:"教务处-实践科_立项"},
                {lable:"实践结项", value:"教务处-实践科_结项"},
                {lable:"教材业绩点", value:"教务处-教材科_教材业绩点"},
                {lable:"教研业绩", value:"教务处-教研科_教研业绩"},
                {lable:"教研论文", value:"教务处-教研科_教研论文"},
                {lable:"优秀毕设指导教师", value:"教务处-评估中心_2020届本科优秀毕业设计（论文）指导教师"},
                {lable:"纵向结题", value:"社科处_3.纵向结题"},
                {lable:"科研获奖", value:"社科处_7.科研获奖"}
            ],
            teacher_list:[],
            xiaowaishijianjidi:[],
            shijianlixiang:[],
            shijianjiexiang:[],
            jiaocaiyejidian:[],
            jiaoyanyeji:[],
            jiaoyanlunwen:[],
            youxiubishe:[],
            zongxiangjieti:[],
            keyanhuojiang:[],
            data1:[],
            tableData:[],
            hasdate:false,
            hastype:false,
            bysearch:false,
            istype:false,
        }),
        created() {
            getTeacherList().then(res =>{
                this.teacher_list=res
            } )
        },
        methods:{
            search() {
                this.form.date1=this.value[0];
                this.form.date2=this.value[1];
                    if(!this.form.value){
                        NewSearchAll(this.form).then(res =>{
                                this.xiaowaishijianjidi=res.xiaowaishijianjidi
                                this.shijianlixiang=res.shijianlixiang
                                this.shijianjiexiang=res.shijianjiexiang
                                this.jiaocaiyejidian=res.jiaocaiyejidian
                                this.jiaoyanyeji=res.jiaoyanyeji
                                this.jiaoyanlunwen=res.jiaoyanlunwen
                                this.youxiubishe=res.youxiubishe
                                this.zongxiangjieti=res.zongxiangjieti
                                this.keyanhuojiang=res.keyanhuojiang
                            this.hasdate=true
                        } )
                    }else{
                        console.log(this.form.value)
                        switch (this.form.value) {
                            case '教务处-实践科_校外实践基地':{
                                NewSearchByDetail(this.form).then(res =>{
                                    this.xiaowaishijianjidi=res
                                } )
                                break;
                            }
                            case '教务处-实践科_立项':{
                                NewSearchByDetail(this.form).then(res =>{
                                    this.shijianlixiang=res
                                } )
                                break;
                            }
                            case '教务处-实践科_结项':{
                                NewSearchByDetail(this.form).then(res =>{
                                    this.shijianjiexiang=res
                                } )
                                break;
                            }
                            case '教务处-教材科_教材业绩点':{
                                NewSearchByDetail(this.form).then(res =>{
                                    this.jiaocaiyejidian=res
                                } )
                                break;
                            }
                            case '教务处-教研科_教研业绩':{
                                NewSearchByDetail(this.form).then(res =>{
                                    this.jiaoyanyeji=res
                                } )
                                break;
                            }
                            case '教务处-教研科_教研论文':{
                                NewSearchByDetail(this.form).then(res =>{
                                    this.jiaoyanlunwen=res
                                } )
                                break;
                            }
                            case '教务处-评估中心_2020届本科优秀毕业设计（论文）指导教师':{
                                NewSearchByDetail(this.form).then(res =>{
                                    this.youxiubishe=res
                                } )
                                break;
                            }
                            case '社科处_3.纵向结题':{
                                NewSearchByDetail(this.form).then(res =>{
                                    this.zongxiangjieti=res
                                } )
                                break;
                            }
                            case '社科处_7.科研获奖':{
                                NewSearchByDetail(this.form).then(res =>{
                                    this.keyanhuojiang=res
                                } )
                                break;
                            }
                        }
                        this.hasdate=false
                        this.istype=true
                    }
                this.bysearch=true
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
