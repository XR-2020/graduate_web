<template xmlns="http://www.w3.org/1999/html">
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i>教研成果统计</el-breadcrumb-item>
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
                <el-select filterable v-model="form.key" placeholder="请选择教师">
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
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
                <el-button type="primary" icon="search" @click="search">查看统计</el-button>
            </div>
            <div :visible.sync="bysearch">
                <div class="schart-box" v-if="hasdate">
<!--                    <schart class="schart" canvasId="line" :data="data1" type="line" :options="options2"></schart>-->
<!--                    <br/>-->
                    <p>产学研明细</p>
                    <br/>
                    <el-table :data="chanxueyan" border>
<!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
<!--                        </el-table-column>-->
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="项目名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.wenhao" label="立项文号" align="center">
                        </el-table-column>
                        <el-table-column prop="object.lianghua" label="成果依据" align="center">
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
                    <br/>
                    <p>教研项目明细</p>
                    <br/>
                    <el-table :data="jiaoyanxiangmu" border style="width: 100%">
<!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
<!--                        </el-table-column>-->
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="项目名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.wenhao" label="立项文号" align="center">
                        </el-table-column>
                        <el-table-column prop="object.lianghua" label="成果依据" align="center">
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
                    <br/>
                    <p>教研论文明细</p>
                    <br/>
                    <el-table :data="jiaoyanlunwen" border style="width: 100%">
<!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
<!--                        </el-table-column>-->
                        <el-table-column prop="object.name" label="论文名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.partment" label="部门" align="center">
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
                    <br/>
                    <p>教育规划项目明细</p>
                    <br/>
                    <el-table :data="jiaoyuguihua" border style="width: 100%">
<!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
<!--                        </el-table-column>-->
                        <el-table-column prop="object.name" label="项目名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.danwei" label="结题单位" align="center">
                        </el-table-column>
                        <el-table-column prop="object.level" label="项目级别" align="center">
                        </el-table-column>
                        <el-table-column prop="object.grade" label="结题等级" align="center">
                        </el-table-column>
                        <el-table-column prop="object.partment" label="部门" align="center">
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
                    <br/>

                    <p>评估中心相关明细</p>
                    <br/>
                    <el-table :data="pingguzhongxin" border style="width: 100%">
<!--                        <el-table-column prop="object.id" label="ID" width="40" align="center">-->
<!--                        </el-table-column>-->
                        <el-table-column prop="object.name" label="名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.grade" label="获奖等级" align="center">
                        </el-table-column>
                        <el-table-column prop="object.partment" label="部门" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="完成时间" walign="center">
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

                </div>
<!--                <div v-if="istype">-->
                    <!--                产学研明细-->
                    <template v-if="form.value === '1'">
                        <el-table :data="chanxueyan" border key="chanxueyan">
<!--                            <el-table-column prop="object.id" label="ID" width="40" align="center">-->
<!--                            </el-table-column>-->
                            <el-table-column prop="object.partment" label="部门" align="center">
                            </el-table-column>
                            <el-table-column prop="object.name" label="项目名称" align="center">
                            </el-table-column>
                            <el-table-column prop="object.wenhao" label="立项文号" align="center">
                            </el-table-column>
                            <el-table-column prop="object.lianghua" label="成果依据" align="center">
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
                    <!--                    教研项目明细-->
                    <template v-if="form.value === '2'">
                        <el-table :data="jiaoyanxiangmu"  key="jiaoyanxiangmu" border style="width: 100%">
<!--                            <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
<!--                            </el-table-column>-->
                            <el-table-column prop="object.partment" label="部门" align="center">
                            </el-table-column>
                            <el-table-column prop="object.name" label="项目名称" align="center">
                            </el-table-column>
                            <el-table-column prop="object.wenhao" label="立项文号" align="center">
                            </el-table-column>
                            <el-table-column prop="object.lianghua" label="成果依据" align="center">
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
                    <!--                教研论文明细-->
                    <template v-if="form.value === '3'">
                        <el-table :data="jiaoyanlunwen"  key="jiaoyanlunwen" border style="width: 100%">
<!--                            <el-table-column prop="object.id" label="ID" width="40" align="center">-->
<!--                            </el-table-column>-->
                            <el-table-column prop="object.name" label="论文名称" align="center">
                            </el-table-column>
                            <el-table-column prop="object.partment" label="部门" align="center">
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
                    <!--                教育规划项目明细-->
                    <template v-if="form.value === '4'">
                        <el-table :data="jiaoyuguihua"  key="jiaoyuguihua" border style="width: 100%">
<!--                            <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
<!--                            </el-table-column>-->
                            <el-table-column prop="object.name" label="项目名称" width="120" align="center">
                            </el-table-column>
                            <el-table-column prop="object.danwei" label="结题单位" width="120" align="center">
                            </el-table-column>
                            <el-table-column prop="object.level" label="项目级别" width="120" align="center">
                            </el-table-column>
                            <el-table-column prop="object.grade" label="结题等级" width="120" align="center">
                            </el-table-column>
                            <el-table-column prop="object.partment" label="部门" width="120" align="center">
                            </el-table-column>
                            <el-table-column prop="object.finishtime" label="完成时间" width="120" align="center">
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
                        <el-table :data="zongxiangkeyan"  key="zongxiangkeyan" border style="width: 100%">
<!--                            <el-table-column prop="object.id" label="ID" width="40" align="center">-->
<!--                            </el-table-column>-->
                            <el-table-column prop="object.partment" label="部门" align="center">
                            </el-table-column>
                            <el-table-column prop="object.name" label="项目名称" align="center">
                            </el-table-column>
                            <el-table-column prop="object.lixiang" label="立项部门" align="center">
                            </el-table-column>
                            <el-table-column prop="object.type" label="项目类别" align="center">
                            </el-table-column>
                            <el-table-column prop="object.level" label="项目级别" align="center">
                            </el-table-column>
                            <el-table-column prop="object.finishtime" label="完成时间" width="120" align="center">
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
                        <el-table :data="pingguzhongxin"  key="pingguzhongxin" border style="width: 100%">
<!--                            <el-table-column prop="object.id" label="ID" width="40" align="center">-->
<!--                            </el-table-column>-->
                            <el-table-column prop="object.name" label="名称" align="center">
                            </el-table-column>
                            <el-table-column prop="object.grade" label="获奖等级" align="center">
                            </el-table-column>
                            <el-table-column prop="object.partment" label="部门" align="center">
                            </el-table-column>
                            <el-table-column prop="object.finishtime" label="完成时间" walign="center">
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
                        <el-table :data="zhuanli" key="zhuanli" border style="width: 100%">
<!--                            <el-table-column prop="object.id" label="ID" width="40" align="center">-->
<!--                            </el-table-column>-->
                            <el-table-column prop="object.name" label="名称" align="center">
                            </el-table-column>
                            <el-table-column prop="object.partment" label="部门" align="center">
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
                    <!--                横向科研明细-->
                    <template v-if="form.value === '8'">
                        <el-table :data="hengxiangkeyan" key="hengxiangkeyan" border style="width: 100%">
<!--                            <el-table-column prop="object.id" label="ID" width="40" align="center">-->
<!--                            </el-table-column>-->
                            <el-table-column prop="object.name" label="名称" align="center">
                            </el-table-column>
                            <el-table-column prop="object.partment" label="部门"  align="center">
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
                    <!--                著作明细-->
                    <template v-if="form.value === '9'">
                        <el-table :data="zhuzuo" key="zhuzuo" border style="width: 100%">
<!--                            <el-table-column prop="object.id" label="ID" width="40" align="center">-->
<!--                            </el-table-column>-->
                            <el-table-column prop="object.partment" label="部门" align="center">
                            </el-table-column>
                            <el-table-column prop="object.name" label="名称" align="center">
                            </el-table-column>
                            <el-table-column prop="object.finishtime" label="完成时间"  align="center">
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
                        <el-table :data="keyanlunwen" key="keyanlunwen" border style="width: 100%">
<!--                            <el-table-column prop="object.id" label="ID" width="40" align="center">-->
<!--                            </el-table-column>-->
                            <el-table-column prop="object.partment" label="部门" align="center">
                            </el-table-column>
                            <el-table-column prop="object.name" label="题目" align="center">
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
                    <!--                软件著作权-->
                    <template v-if="form.value === '11'">
                        <el-table :data="ruanjianzuzuo" key="ruanjianzuzuo" border style="width: 100%">
<!--                            <el-table-column prop="object.id" label="ID" width="40" align="center">-->
<!--                            </el-table-column>-->
                            <el-table-column prop="object.partment" label="部门" align="center">
                            </el-table-column>
                            <el-table-column prop="object.name" label="题目" align="center">
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
                    <!--                科研项目结项明细-->
                    <template v-if="form.value === '12'">
                        <el-table :data="keyanxiangmujiexiang" key="keyanxiangmujiexiang" border style="width: 100%">
<!--                            <el-table-column prop="object.id" label="ID" width="40" align="center">-->
<!--                            </el-table-column>-->
                            <el-table-column prop="object.partment" label="部门" align="center">
                            </el-table-column>
                            <el-table-column prop="object.name" label="名称" align="center">
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
                    <!--                学科竞赛-->
                    <template v-if="form.value === '13'">
                        <el-table :data="xuekejingsai" key="xuekejingsai" border style="width: 100%">
<!--                            <el-table-column prop="object.id" label="ID" width="40" align="center">-->
<!--                            </el-table-column>-->
                            <el-table-column prop="object.name" label="竞赛名称"  align="center">
                            </el-table-column>
                            <el-table-column prop="object.grade" label="获奖等级"  align="center">
                            </el-table-column>
                            <el-table-column prop="object.level" label="比赛等级"  align="center">
                            </el-table-column>
                            <el-table-column prop="object.teacher" label="指导教师"  align="center">
                            </el-table-column>
<!--                            <el-table-column align="center" label="指导教师情况" width="185px">-->
<!--                                <template slot-scope="scope">-->
<!--                                    <el-table :data="scope.row.people" :show-header="false">-->
<!--                                        <el-table-column prop="badge" align="center"  label="工号"></el-table-column>-->
<!--                                        <el-table-column prop="name" align="center"  label="姓名"></el-table-column>-->
<!--                                    </el-table>-->
<!--                                </template>-->
<!--                            </el-table-column>-->
                            <el-table-column prop="object.student" label="参赛学生" align="center">
                            </el-table-column>
                            <el-table-column prop="object.finishtime" label="获奖时间" align="center">
                            </el-table-column>
                        </el-table>
                    </template>
                    <!--                    荣誉称号明细-->
                    <template v-if="form.value === '14'">
                        <el-table :data="rongyuchenghao" border style="width: 100%">
<!--                            <el-table-column prop="object.id" label="ID" width="40" align="center">-->
<!--                            </el-table-column>-->
                            <el-table-column prop="object.name" label="称号名称" align="center">
                            </el-table-column>
                            <el-table-column prop="object.level" label="级别"  align="center">
                            </el-table-column>
                            <el-table-column prop="object.finishtime" label="获奖时间"  align="center">
                            </el-table-column>
                            <el-table-column prop="object.teacher" label="获奖教师"  align="center">
                            </el-table-column>
<!--                            <el-table-column align="center" label="获奖人员情况" width="185px">-->
<!--                                <template slot-scope="scope">-->
<!--                                    <el-table :data="scope.row.people" :show-header="false">-->
<!--                                        <el-table-column prop="badge" align="center"  label="工号"></el-table-column>-->
<!--                                        <el-table-column prop="name" align="center"  label="姓名"></el-table-column>-->
<!--                                    </el-table>-->
<!--                                </template>-->
<!--                            </el-table-column>-->

                        </el-table>
                    </template>
<!--                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import {SearchAll, SearchByDetail} from "../../../api/statistical"
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
            rongyuchenghao:[],
            xuekejingsai:[],
            keyanxiangmujiexiang:[],
            ruanjianzuzuo:[],
            keyanlunwen:[],
            zhuzuo:[],
            hengxiangkeyan:[],
            zhuanli:[],
            pingguzhongxin:[],
            zongxiangkeyan:[],
            jiaoyuguihua:[],
            jiaoyanlunwen:[],
            jiaoyanxiangmu:[],
            chanxueyan:[],
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
            teacher_list:[],
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
                        SearchAll(this.form).then(res =>{
                            this.data1 = res.zheXians
                            console.log(res.chanxueyan)
                            this.chanxueyan=res.chanxueyan
                            this.jiaoyanxiangmu=res.jiaoyanxiangmu
                            this.jiaoyanlunwen=res.jiaoyanlunwen
                            this.jiaoyuguihua=res.jiaoyuguihua
                            this.zongxiangkeyan=res.zongxiangkeyan
                            this.pingguzhongxin=res.pingguzhongxin
                            this.zhuanli=res.zhuanli
                            this.hengxiangkeyan=res.hengxiangkeyan
                            this.zhuzuo=res.zhuzuo
                            this.keyanlunwen=res.keyanlunwen
                            this.ruanjianzuzuo=res.ruanjianzhuzuo
                            this.keyanxiangmujiexiang=res.keyanxiangmujiexiang
                            this.xuekejingsai=res.xuekejingsai
                            this.rongyuchenghao=res.rongyuchenghao
                            this.hasdate=true
                        } )
                    }else{
                        console.log(this.form.value)
                        switch (this.form.value) {
                            case '1':{
                                SearchByDetail(this.form).then(res =>{
                                    this.chanxueyan=res
                                } )
                                break;
                            }
                            case '2':{
                                SearchByDetail(this.form).then(res =>{
                                    this.jiaoyanxiangmu=res
                                } )
                                break;
                            }
                            case '3':{
                                SearchByDetail(this.form).then(res =>{
                                    this.jiaoyanlunwen=res
                                } )
                                break;
                            }
                            case '4':{
                                SearchByDetail(this.form).then(res =>{
                                    this.jiaoyuguihua=res
                                } )
                                break;
                            }
                            case '5':{
                                SearchByDetail(this.form).then(res =>{
                                    this.zongxiangkeyan=res
                                } )
                                break;
                            }
                            case '6':{
                                SearchByDetail(this.form).then(res =>{
                                    this.pingguzhongxin=res
                                } )
                                break;
                            }
                            case '7':{
                                SearchByDetail(this.form).then(res =>{
                                    this.zhuanli=res
                                } )
                                break;
                            }
                            case '8':{
                                SearchByDetail(this.form).then(res =>{
                                    this.hengxiangkeyan=res
                                } )
                                break;
                            }
                            case '9':{
                                SearchByDetail(this.form).then(res =>{
                                    this.zhuzuo=res
                                } )
                                break;
                            }
                            case '10':{
                                SearchByDetail(this.form).then(res =>{
                                    this.keyanlunwen=res
                                } )
                                break;
                            }
                            case '11':{
                                SearchByDetail(this.form).then(res =>{
                                    this.ruanjianzuzuo=res;
                                } )
                                break;
                            }
                            case '12':{
                                SearchByDetail(this.form).then(res =>{
                                    this.keyanxiangmujiexiang=res;
                                } )
                                break;
                            }
                            case '13':{
                                SearchByDetail(this.form).then(res =>{
                                   this.xuekejingsai=res;
                                } )
                                break;
                            }
                            case '14':{
                                SearchByDetail(this.form).then(res =>{
                                    this.rongyuchenghao=res;
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
