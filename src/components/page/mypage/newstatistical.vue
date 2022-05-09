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
                    <el-table :data="xiaowaishijianjidi" border>
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
                    <el-table :data="shijianlixiang" border>
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
                    <el-table :data="shijianjiexiang" border >
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
                    <el-table :data="jiaocaiyejidian" border >
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
                    <el-table :data="jiaoyanyeji" border>
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
                    <el-table :data="jiaoyanlunwen" border >
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
                    <el-table :data="youxiubishe" border >
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
                    <el-table :data="zongxiangjieti" border >
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
                    <el-table :data="keyanhuojiang" border >
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

                    <p>纵向科研项目明细</p>
                    <br/>
                    <el-table :data="zongxiangkeyan" border style="width: 100%" >
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
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
                    <br>

                    <p>专利明细</p>
                    <br/>
                    <el-table :data="zhuanli" border style="width: 100%" >
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
                    <br>


                    <p>横向科研明细</p>
                    <br/>
                    <el-table :data="hengxiangkeyan" border style="width: 100%">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
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
                    <br>

                    <p>著作明细</p>
                    <br/>
                    <el-table :data="zhuzuo" border style="width: 100%">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
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
                    <br>

                    <p>科研论文明细</p>
                    <br/>
                    <el-table :data="keyanlunwen" border style="width: 100%">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
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
                    <br>


                    <p>软件著作权</p>
                    <br/>
                    <el-table :data="ruanjianzuzuo" border style="width: 100%">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
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
                    <br>


                    <p>科研项目结项明细</p>
                    <br/>
                    <el-table :data="keyanxiangmujiexiang" border style="width: 100%">
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
                    <br>

                    <p>学科竞赛明细</p>
                    <br/>
                    <el-table :data="xuekejingsai" border style="width: 100%">
                        <el-table-column prop="object.name" label="竞赛名称"  align="center">
                        </el-table-column>
                        <el-table-column prop="object.grade" label="获奖等级"  align="center">
                        </el-table-column>
                        <el-table-column prop="object.level" label="比赛等级"  align="center">
                        </el-table-column>
                        <el-table-column prop="object.teacher" label="指导教师"  align="center">
                        </el-table-column>

                        <el-table-column prop="object.student" label="参赛学生" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="获奖时间" align="center">
                        </el-table-column>
                    </el-table>
                    <br>


                    <p>荣誉称号明细</p>
                    <br/>
                    <el-table :data="rongyuchenghao" border style="width: 100%">
                        <el-table-column prop="object.name" label="称号名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.level" label="级别"  align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="获奖时间"  align="center">
                        </el-table-column>
                        <el-table-column prop="object.teacher" label="获奖教师"  align="center">
                        </el-table-column>

                    </el-table>
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
                <template v-if="form.value === '科技处_专利'" >
                    <el-table :data="zhuanli" border style="width: 100%" key="zhuanli">
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
                <template v-if="form.value === '科技处_横向项目'" >
                    <el-table :data="hengxiangkeyan" border style="width: 100%" key="hengxiangxiangmu">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
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
                <template v-if="form.value === '科技处_纵向立项'" >
                    <el-table :data="zongxiangkeyan" border style="width: 100%" key="zongxianglixiang">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
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
                <template v-if="form.value === '科技处_著作'" >
                    <el-table :data="zhuzuo" border style="width: 100%" key="zhuzuo">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
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
                <template v-if="form.value === '科技处_论文'" >
                    <el-table :data="keyanlunwen" border style="width: 100%" key="keyanlunwen">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
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
                <template v-if="form.value === '科技处_软件著作权'" >
                    <el-table :data="ruanjianzuzuo" border style="width: 100%" key="ruanjianzhuzuoquan">
                        <!--                        <el-table-column prop="object.id" label="ID"  width="40" align="center">-->
                        <!--                        </el-table-column>-->
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
                <template v-if="form.value === '科技处_项目结项'" >
                    <el-table :data="keyanxiangmujiexiang" border style="width: 100%" key="keyanxiangmujiexiang">
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
                <template v-if="form.value === '学科竞赛'" >
                    <el-table :data="xuekejingsai" border style="width: 100%" key="xuekejingsai">
                        <el-table-column prop="object.name" label="竞赛名称"  align="center">
                        </el-table-column>
                        <el-table-column prop="object.grade" label="获奖等级"  align="center">
                        </el-table-column>
                        <el-table-column prop="object.level" label="比赛等级"  align="center">
                        </el-table-column>
                        <el-table-column prop="object.teacher" label="指导教师"  align="center">
                        </el-table-column>
                        <el-table-column prop="object.student" label="参赛学生" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="获奖时间" align="center">
                        </el-table-column>
                    </el-table>
                </template>
                <template v-if="form.value === '荣誉称号'" >
                    <el-table :data="rongyuchenghao" border style="width: 100%" key="rongyuchenghao">
                        <el-table-column prop="object.name" label="称号名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.level" label="级别"  align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="获奖时间"  align="center">
                        </el-table-column>
                        <el-table-column prop="object.teacher" label="获奖教师"  align="center">
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
                {lable:"科研获奖", value:"社科处_7.科研获奖"},
                {lable:"专利", value:"科技处_专利"},
                {lable:"横向科研项目", value:"科技处_横向项目"},
                {lable:"纵向科研项目", value:"科技处_纵向立项"},
                {lable:"著作", value:"科技处_著作"},
                {lable:"论文", value:"科技处_论文"},
                {lable:"软件著作权", value:"科技处_软件著作权"},
                {lable:"科研项目结项", value:"科技处_项目结项"},
                {lable:"学科竞赛", value:"学科竞赛"},
                {lable:"荣誉称号", value:"荣誉称号"}
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
            rongyuchenghao:[],
            xuekejingsai:[],
            keyanxiangmujiexiang:[],
            ruanjianzuzuo:[],
            keyanlunwen:[],
            zhuzuo:[],
            hengxiangkeyan:[],
            zhuanli:[],
            zongxiangkeyan:[],
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
                                this.rongyuchenghao=res.rongyuchenghao
                                this.xuekejingsai=res.xuekejingsai
                                this.keyanxiangmujiexiang=res.keyanxiangmujiexiang
                                this.ruanjianzuzuo=res.ruanjianzhuzuoquan
                                this.keyanlunwen=res.keyanlunwen
                                this.zhuzuo=res.zhuzuo
                                this.hengxiangkeyan=res.hengxiangkeyan
                                this.zhuanli=res.zhuanli
                                this.zongxiangkeyan=res.zongxiangkeyan
                                this.hasdate=true

                        } )
                    }else{
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
                            case '科技处_专利':{
                                NewSearchByDetail(this.form).then(res =>{
                                    this.zhuanli=res
                                } )
                                break;
                            }
                            case '科技处_横向项目':{
                                NewSearchByDetail(this.form).then(res =>{
                                    this.hengxiangkeyan=res
                                } )
                                break;
                            }
                            case '科技处_纵向立项':{
                                NewSearchByDetail(this.form).then(res =>{
                                    this.zongxiangkeyan=res
                                } )
                                break;
                            }
                            case '科技处_著作':{
                                NewSearchByDetail(this.form).then(res =>{
                                    this.zhuzuo=res
                                } )
                                break;
                            }
                            case '科技处_论文':{
                                NewSearchByDetail(this.form).then(res =>{
                                    this.keyanlunwen=res
                                } )
                                break;
                            }
                            case '科技处_软件著作权':{
                                NewSearchByDetail(this.form).then(res =>{
                                    this.ruanjianzuzuo=res
                                } )
                                break;
                            }
                            case '学科竞赛':{
                                NewSearchByDetail(this.form).then(res =>{
                                    this.xuekejingsai=res
                                } )
                                break;
                            }
                            case '荣誉称号':{
                                NewSearchByDetail(this.form).then(res =>{
                                    this.rongyuchenghao=res
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
