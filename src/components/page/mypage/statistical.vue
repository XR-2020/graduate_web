<template xmlns="http://www.w3.org/1999/html">
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i>教研成果统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
<!--                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>-->
<!--                <span>—</span>-->
<!--                <el-date-picker type="date" placeholder="选择日期" v-model="form.date2"></el-date-picker>-->
                <el-date-picker
                    v-model="value"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    unlink-panels>
                </el-date-picker>

                <el-select v-model="form.value" placeholder="请选择类型" @change="search">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
                <el-button type="primary" icon="search" @click="search">查看统计</el-button>
            </div>
            <div :visible.sync="bysearch">
                <div class="schart-box" v-if="hasdate">
                    <schart class="schart" canvasId="line" :data="data1" type="line" :options="options2"></schart>
                    <br/>
                    <p>产学研明细</p>
                    <el-table :data="tableData" border>
                        <el-table-column prop="id" label="ID" width="40px" align="center">
                        </el-table-column>
                        <el-table-column prop="partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="name" label="项目名称" align="center">
                        </el-table-column>
                        <el-table-column prop="wenhao" label="立项文号" align="center">
                        </el-table-column>
                        <el-table-column prop="lianghua" label="成果依据" align="center">
                        </el-table-column>
                        <el-table-column prop="finishtime" label="完成时间" align="center">
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
                    <br/>
                    <p>教研项目明细</p>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="ID" width="55" align="center">
                        </el-table-column>
                        <el-table-column prop="partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="name" label="项目名称" align="center">
                        </el-table-column>
                        <el-table-column prop="wenhao" label="立项文号" align="center">
                        </el-table-column>
                        <el-table-column prop="lianghua" label="成果依据" align="center">
                        </el-table-column>
                        <el-table-column prop="finishtime" label="完成时间" align="center">
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
                    <br/>
                    <p>教研论文明细</p>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="ID" width="55" align="center">
                        </el-table-column>
                        <el-table-column prop="name" label="论文名称" align="center">
                        </el-table-column>
                        <el-table-column prop="partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="finishtime" label="完成时间" align="center">
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
                    <br/>
                    <p>教育规划项目明细</p>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="ID" width="55" align="center">
                        </el-table-column>
                        <el-table-column prop="name" label="项目名称" width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="danwei" label="结题单位" width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="level" label="项目级别" width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="grade" label="结题等级" width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="partment" label="部门" width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="finishtime" label="完成时间" width="120" align="center">
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
                    <br/>
                    <p>纵向科研项目明细</p>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="ID" width="55" align="center">
                        </el-table-column>
                        <el-table-column prop="partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="name" label="项目名称" align="center">
                        </el-table-column>
                        <el-table-column prop="lixiang" label="立项部门" align="center">
                        </el-table-column>
                        <el-table-column prop="type" label="项目类别" align="center">
                        </el-table-column>
                        <el-table-column prop="level" label="项目级别" align="center">
                        </el-table-column>
                        <el-table-column prop="finishtime" label="完成时间" width="120" align="center">
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
                    <br/>
                    <p>评估中心相关明细</p>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="ID" width="55" align="center">
                        </el-table-column>
                        <el-table-column prop="name" label="名称" align="center">
                        </el-table-column>
                        <el-table-column prop="grade" label="获奖等级" align="center">
                        </el-table-column>
                        <el-table-column prop="partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="finishtime" label="完成时间" walign="center">
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
                    <br/>
                    <p>专利明细</p>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="ID" align="center">
                        </el-table-column>
                        <el-table-column prop="name" label="名称" align="center">
                        </el-table-column>
                        <el-table-column prop="partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="finishtime" label="完成时间" align="center">
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
                    <br/>
                    <p>横向科研明细</p>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="ID" width="55" align="center">
                        </el-table-column>
                        <el-table-column prop="name" label="名称" align="center">
                        </el-table-column>
                        <el-table-column prop="partment" label="部门"  align="center">
                        </el-table-column>
                        <el-table-column prop="finishtime" label="完成时间" align="center">
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
                    <br/>
                    <p>著作明细</p>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="ID" width="55" align="center">
                        </el-table-column>
                        <el-table-column prop="partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="name" label="名称" align="center">
                        </el-table-column>
                        <el-table-column prop="finishtime" label="完成时间"  align="center">
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
                    <br/>
                    <p>科研论文明细</p>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="ID" width="55" align="center">
                        </el-table-column>
                        <el-table-column prop="partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="name" label="题目" align="center">
                        </el-table-column>
                        <el-table-column prop="finishtime" label="完成时间" align="center">
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
                    <br/>
                    <p>软件著作权</p>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="ID" width="55" align="center">
                        </el-table-column>
                        <el-table-column prop="partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="name" label="题目" align="center">
                        </el-table-column>
                        <el-table-column prop="finishtime" label="完成时间" align="center">
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
                    <br/>
                    <p>科研项目结项明细</p>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="ID" align="center">
                        </el-table-column>
                        <el-table-column prop="partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="name" label="名称" align="center">
                        </el-table-column>
                        <el-table-column prop="finishtime" label="完成时间" align="center">
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
                    <br/>
                    <p>学科竞赛明细</p>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="ID" width="55" align="center">
                        </el-table-column>
                        <el-table-column prop="name" label="竞赛名称"  align="center">
                        </el-table-column>
                        <el-table-column prop="grade" label="获奖等级"  align="center">
                        </el-table-column>
                        <el-table-column prop="level" label="比赛等级"  align="center">
                        </el-table-column>
                        <el-table-column align="center" label="指导教师情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column prop="student" label="参赛学生" align="center">
                        </el-table-column>
                        <el-table-column prop="finishtime" label="获奖时间" align="center">
                        </el-table-column>
                    </el-table>
                    <br/>
                    <p>荣誉称号明细</p>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="ID" width="55" align="center">
                        </el-table-column>
                        <el-table-column prop="name" label="称号名称" align="center">
                        </el-table-column>
                        <el-table-column prop="level" label="级别"  align="center">
                        </el-table-column>
                        <el-table-column prop="finishtime" label="获奖时间"  align="center">
                        </el-table-column>
                        <el-table-column align="center" label="获奖人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
<!--                <div v-if="istype">-->
                    <!--                产学研明细-->
                    <template v-if="form.value === '1'">
                        <el-table :data="tableData" border>
                            <el-table-column prop="id" label="ID" width="40px" align="center">
                            </el-table-column>
                            <el-table-column prop="partment" label="部门" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="项目名称" align="center">
                            </el-table-column>
                            <el-table-column prop="wenhao" label="立项文号" align="center">
                            </el-table-column>
                            <el-table-column prop="lianghua" label="成果依据" align="center">
                            </el-table-column>
                            <el-table-column prop="finishtime" label="完成时间" align="center">
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
                    <!--                    教研项目明细-->
                    <template v-if="form.value === '2'">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="id" label="ID" width="55" align="center">
                            </el-table-column>
                            <el-table-column prop="partment" label="部门" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="项目名称" align="center">
                            </el-table-column>
                            <el-table-column prop="wenhao" label="立项文号" align="center">
                            </el-table-column>
                            <el-table-column prop="lianghua" label="成果依据" align="center">
                            </el-table-column>
                            <el-table-column prop="finishtime" label="完成时间" align="center">
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
                    <!--                教研论文明细-->
                    <template v-if="form.value === '3'">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column type="selection" width="55" align="center"></el-table-column>
                            <el-table-column prop="id" label="ID" width="55" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="论文名称" align="center">
                            </el-table-column>
                            <el-table-column prop="partment" label="部门" align="center">
                            </el-table-column>
                            <el-table-column prop="finishtime" label="完成时间" align="center">
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
                    <!--                教育规划项目明细-->
                    <template v-if="form.value === '4'">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="id" label="ID" width="55" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="项目名称" width="120" align="center">
                            </el-table-column>
                            <el-table-column prop="danwei" label="结题单位" width="120" align="center">
                            </el-table-column>
                            <el-table-column prop="level" label="项目级别" width="120" align="center">
                            </el-table-column>
                            <el-table-column prop="grade" label="结题等级" width="120" align="center">
                            </el-table-column>
                            <el-table-column prop="partment" label="部门" width="120" align="center">
                            </el-table-column>
                            <el-table-column prop="finishtime" label="完成时间" width="120" align="center">
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
                    <!--                纵向科研项目明细-->
                    <template v-if="form.value === '5'">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="id" label="ID" width="55" align="center">
                            </el-table-column>
                            <el-table-column prop="partment" label="部门" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="项目名称" align="center">
                            </el-table-column>
                            <el-table-column prop="lixiang" label="立项部门" align="center">
                            </el-table-column>
                            <el-table-column prop="type" label="项目类别" align="center">
                            </el-table-column>
                            <el-table-column prop="level" label="项目级别" align="center">
                            </el-table-column>
                            <el-table-column prop="finishtime" label="完成时间" width="120" align="center">
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
                    <!--                评估中心相关明细-->
                    <template v-if="form.value === '6'">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="id" label="ID" width="55" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="名称" align="center">
                            </el-table-column>
                            <el-table-column prop="grade" label="获奖等级" align="center">
                            </el-table-column>
                            <el-table-column prop="partment" label="部门" align="center">
                            </el-table-column>
                            <el-table-column prop="finishtime" label="完成时间" walign="center">
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
                    <!--                专利明细-->
                    <template v-if="form.value === '7'">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="id" label="ID" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="名称" align="center">
                            </el-table-column>
                            <el-table-column prop="partment" label="部门" align="center">
                            </el-table-column>
                            <el-table-column prop="finishtime" label="完成时间" align="center">
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
                    <!--                横向科研明细-->
                    <template v-if="form.value === '8'">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="id" label="ID" width="55" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="名称" align="center">
                            </el-table-column>
                            <el-table-column prop="partment" label="部门"  align="center">
                            </el-table-column>
                            <el-table-column prop="finishtime" label="完成时间" align="center">
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
                    <!--                著作明细-->
                    <template v-if="form.value === '9'">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="id" label="ID" width="55" align="center">
                            </el-table-column>
                            <el-table-column prop="partment" label="部门" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="名称" align="center">
                            </el-table-column>
                            <el-table-column prop="finishtime" label="完成时间"  align="center">
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
                    <!--                科研论文明细-->
                    <template v-if="form.value === '10'">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="id" label="ID" width="55" align="center">
                            </el-table-column>
                            <el-table-column prop="partment" label="部门" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="题目" align="center">
                            </el-table-column>
                            <el-table-column prop="finishtime" label="完成时间" align="center">
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
                    <!--                软件著作权-->
                    <template v-if="form.value === '11'">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="id" label="ID" width="55" align="center">
                            </el-table-column>
                            <el-table-column prop="partment" label="部门" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="题目" align="center">
                            </el-table-column>
                            <el-table-column prop="finishtime" label="完成时间" align="center">
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
                    <!--                科研项目结项明细-->
                    <template v-if="form.value === '12'">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="id" label="ID" align="center">
                            </el-table-column>
                            <el-table-column prop="partment" label="部门" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="名称" align="center">
                            </el-table-column>
                            <el-table-column prop="finishtime" label="完成时间" align="center">
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
                    <!--                学科竞赛-->
                    <template v-if="form.value === '13'">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="id" label="ID" width="55" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="竞赛名称"  align="center">
                            </el-table-column>
                            <el-table-column prop="grade" label="获奖等级"  align="center">
                            </el-table-column>
                            <el-table-column prop="level" label="比赛等级"  align="center">
                            </el-table-column>
                            <el-table-column align="center" label="指导教师情况" width="185px">
                                <template slot-scope="scope">
                                    <el-table :data="scope.row.people" :show-header="false">
                                        <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                        <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                    </el-table>
                                </template>
                            </el-table-column>
                            <el-table-column prop="student" label="参赛学生" align="center">
                            </el-table-column>
                            <el-table-column prop="finishtime" label="获奖时间" align="center">
                            </el-table-column>
                        </el-table>
                    </template>
                    <!--                    荣誉称号明细-->
                    <template v-if="form.value === '14'">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="id" label="ID" width="55" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="称号名称" align="center">
                            </el-table-column>
                            <el-table-column prop="level" label="级别"  align="center">
                            </el-table-column>
                            <el-table-column prop="finishtime" label="获奖时间"  align="center">
                            </el-table-column>
                            <el-table-column align="center" label="获奖人员情况" width="185px">
                                <template slot-scope="scope">
                                    <el-table :data="scope.row.people" :show-header="false">
                                        <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                        <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                    </el-table>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
<!--                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import {getSearchZhuZuo} from "../../../api/zhuzuoAPI";
    import {SearchAll, SearchDetail} from "../../../api/statistical"
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
            value:'',
            options:[
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
            tableData:[],
            options2: {
                title: '成果统计',
                //autoWidth: true,   // 设置宽高自适应
                showValue: true,
                bgColor: '#F9EFCC',
                fillColor: '#00887C',
                contentColor: 'rgba(46,199,201,0.3)',
                yEqual: 7,
                width: 500,
                height: 400,
            },
            data1:[],
            hasdate:false,
            hastype:false,
            bysearch:false,
            istype:false
        }),
        methods:{
            search() {
                this.form.date1=this.value[0];
                this.form.date2=this.value[1];
                    if(!this.form.value){
                        SearchAll(this.form).then(res =>{
                            this.data1 = res
                            this.hasdate=true
                        } )
                    }else{
                        SearchDetail(this.form).then(res =>{
                            this.data1 = res
                            this.hasdate=false
                            // this.istype=true
                        } )
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
