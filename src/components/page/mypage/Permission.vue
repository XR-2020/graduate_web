<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-warning"></i>申报审批</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-input v-model="query.key" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <div v-if="jiaoyanAdmin">
                <div>
                    <br>
                    <p>产学研申报</p>
                    <br>
                    <el-table :data="chanxueyanData" border ref="multipleTable" @selection-change="handleSelectionChange">
                        <el-table-column prop="object.id" label="ID"  width="35" align="center">
                        </el-table-column>
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
                        <el-table-column label="操作" width="260px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,1)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handlePass(scope.$index, scope.row,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="handleDisPass(scope.$index, scope.row,1)">不通过</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="pageTotal">
                        </el-pagination>
                    </div>
                </div>
                <div>
                    <br>
                    <p>教研项目申报</p>
                    <br>
                    <el-table :data="jiaoyanData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                        <el-table-column prop="object.id" label="ID"  width="35" align="center">
                        </el-table-column>
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
                        <el-table-column label="操作" width="260px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,2)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handlePass(scope.$index, scope.row,2)">通过</el-button>
                                <el-button size="small" type="danger" @click="handleDisPass(scope.$index, scope.row,2)">不通过</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="pageTotal">
                        </el-pagination>
                    </div>
                </div>
                <div>
                    <br>
                    <p>教研论文申报</p>
                    <br>
                    <el-table :data="jiaoyanlunwenData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                        <el-table-column prop="object.id" label="ID"  width="35" align="center">
                        </el-table-column>
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
                        <el-table-column label="操作" width="260px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,3)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handlePass(scope.$index, scope.row,3)">通过</el-button>
                                <el-button size="small" type="danger" @click="handleDisPass(scope.$index, scope.row,3)">不通过</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="pageTotal">
                        </el-pagination>
                    </div>
                 </div>
                <div>
                    <br>
                    <p>评估中心相关申报</p>
                    <br>
                    <el-table :data="pingguzhongxinData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                        <el-table-column prop="object.id" label="ID" width="35" align="center">
                        </el-table-column>
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
                        <el-table-column label="操作" width="260px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,4)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handlePass(scope.$index, scope.row,4)">通过</el-button>
                                <el-button size="small" type="danger" @click="handleDisPass(scope.$index, scope.row,4)">不通过</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="pageTotal">
                        </el-pagination>
                    </div>
                </div>
                <div>
                    <br>
                    <p>教育规划项目申报</p>
                    <br>
                    <el-table :data="jiaoyuguihuaData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                        <el-table-column prop="object.id" label="ID"  width="35" align="center">
                        </el-table-column>
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
                        <el-table-column label="操作" width="260px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,5)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handlePass(scope.$index, scope.row,5)">通过</el-button>
                                <el-button size="small" type="danger" @click="handleDisPass(scope.$index, scope.row,5)">不通过</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="pageTotal">
                        </el-pagination>
                    </div>
                </div>
                </div>
            <div v-if="keyanAdmin">
                <div>
                    <br>
                    <p>专利申报</p>
                    <br>
                    <el-table :data="zhuanliData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                        <el-table-column prop="object.id" label="ID"  width="35" align="center">
                        </el-table-column>
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
                        <el-table-column label="操作" width="260px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,6)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handlePass(scope.$index, scope.row,6)">通过</el-button>
                                <el-button size="small" type="danger" @click="handleDisPass(scope.$index, scope.row,6)">不通过</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="pageTotal">
                        </el-pagination>
                    </div>
                </div>
                <div>
                    <br>
                    <p>横向科研项目申报</p>
                    <br>
                    <el-table :data="hengxiangData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                        <el-table-column prop="object.id" label="ID"  width="35" align="center">
                        </el-table-column>
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
                        <el-table-column label="操作" width="260px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,7)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handlePass(scope.$index, scope.row,7)">通过</el-button>
                                <el-button size="small" type="danger" @click="handleDisPass(scope.$index, scope.row,7)">不通过</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="pageTotal">
                        </el-pagination>
                    </div>
                </div>
                <div>
                    <br>
                    <p>纵向科研项目申报</p>
                    <br>
                    <el-table :data="zongxiangData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                        <el-table-column prop="object.id" label="ID"  width="35" align="center">
                        </el-table-column>
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
                        <el-table-column label="操作" width="260px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,8)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handlePass(scope.$index, scope.row,8)">通过</el-button>
                                <el-button size="small" type="danger" @click="handleDisPass(scope.$index, scope.row,8)">不通过</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="pageTotal">
                        </el-pagination>
                    </div>
                </div>
                <div>
                    <br>
                    <p>著作申报</p>
                    <br>
                    <el-table :data="zhuzuoData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                        <el-table-column prop="object.id" label="ID"  width="35" align="center">
                        </el-table-column>
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
                        <el-table-column label="操作" width="260px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,9)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handlePass(scope.$index, scope.row,9)">通过</el-button>
                                <el-button size="small" type="danger" @click="handleDisPass(scope.$index, scope.row,9)">不通过</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="pageTotal">
                        </el-pagination>
                    </div>
                </div>
                <div>
                    <br>
                    <p>科研论文申报</p>
                    <br>
                    <el-table :data="keyanData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                        <el-table-column prop="object.id" label="ID"  width="35" align="center">
                        </el-table-column>
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
                        <el-table-column label="操作" width="260px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,10)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handlePass(scope.$index, scope.row,10)">通过</el-button>
                                <el-button size="small" type="danger" @click="handleDisPass(scope.$index, scope.row,10)">不通过</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="pageTotal">
                        </el-pagination>
                    </div>
                </div>
                <div>
                    <br>
                    <p>软件著作权申报</p>
                    <br>
                    <el-table :data="ruanjianzhuzuoData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                        <el-table-column prop="object.id" label="ID"  width="35" align="center">
                        </el-table-column>
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
                        <el-table-column label="操作" width="260px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,11)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handlePass(scope.$index, scope.row,11)">通过</el-button>
                                <el-button size="small" type="danger" @click="handleDisPass(scope.$index, scope.row,11)">不通过</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="pageTotal">
                        </el-pagination>
                    </div>
                </div>
                <div>
                    <br>
                    <p>科研项目结项申报</p>
                    <br>
                    <el-table :data="keyanxiangmuData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                        <el-table-column prop="object.id" label="ID"  width="35" align="center">
                        </el-table-column>
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
                        <el-table-column label="操作" width="260px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,12)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handlePass(scope.$index, scope.row,12)">通过</el-button>
                                <el-button size="small" type="danger" @click="handleDisPass(scope.$index, scope.row,12)">不通过</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="pageTotal">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div v-if="competitionAdmin">
                <el-table :data="xuekejingsaiData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column prop="object.id" label="ID" width="35" align="center">
                    </el-table-column>
                    <el-table-column prop="object.name" label="竞赛名称"  align="center">
                    </el-table-column>
                    <el-table-column prop="object.grade" label="获奖等级"  align="center">
                    </el-table-column>
                    <el-table-column prop="object.level" label="比赛等级"  align="center">
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
                    <el-table-column label="操作" width="260px"  align="center">
                        <template slot-scope="scope">
                            <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,13)">下载证明材料</el-button>
                            <el-button size="small" type="primary" @click="handlePass(scope.$index, scope.row,13)">通过</el-button>
                            <el-button size="small" type="danger" @click="handleDisPass(scope.$index, scope.row,13)">不通过</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="pageTotal">
                    </el-pagination>
                </div>
            </div>
            <div v-if="systemAdmin">
                <div>
                    <br>
                    <p>荣誉称号申报</p>
                    <br>
                    <el-table :data="honorData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                        <el-table-column prop="object.id" label="ID"  width="35" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="称号名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.level" label="级别"  align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="获奖时间"  align="center">
                        </el-table-column>
                        <el-table-column align="center" label="获奖人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="260px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,14)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handlePass(scope.$index, scope.row,14)">通过</el-button>
                                <el-button size="small" type="danger" @click="handleDisPass(scope.$index, scope.row,14)">不通过</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="pageTotal">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import chanxueyan from '../show/chanxueyan_edit'
import {getAllShenBao, getAllWaiting, getSearchShenBao} from "../../../api/shenbaoAPI";
export default {
    name: 'permission',
    components:{"chanxueyan":chanxueyan},
    data() {
        return {
            systemAdmin:false,
            competitionAdmin:false,
            keyanAdmin:false,
            jiaoyanAdmin:false,
            cols:[],
            query:{
                key: '',
                pageIndex: 1,
                pageSize: 4
            },
            cur_page: 1,
            multipleSelection: [],
            select_cate: '',
            select_word: '',
            del_list: [],
            is_search: false,
            editVisible: false,
            delVisible: false,
            idx: -1,
            jiaoyuguihuaData:[],
            pingguzhongxinData:[],
            jiaoyanlunwenData:[],
            jiaoyanData:[],
            chanxueyanData:[],
            xuekejingsaiData:[],
            keyanxiangmuData:[],
            ruanjianzhuzuoData:[],
            keyanData:[],
            zhuzuoData:[],
            zongxiangData:[],
            hengxiangData:[],
            zhuanliData:[],
            honorData:[],
            role:''
        }
    },
    created() {
        this.getData();
    },
    computed: {
        data() {
            return this.tableData.filter((d) => {
                let is_del = false;
                for (let i = 0; i < this.del_list.length; i++) {
                    if (d.name === this.del_list[i].name) {
                        is_del = true;
                        break;
                    }
                }
                if (!is_del) {
                    if (d.address.indexOf(this.select_cate) > -1 &&
                        (d.name.indexOf(this.select_word) > -1 ||
                            d.address.indexOf(this.select_word) > -1)
                    ) {
                        return d;
                    }
                }
            })
        }
    },
    methods: {
        // 分页导航
        handleCurrentChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        // 获取 easy-mock 的模拟数据
        getData() {
           this.role=localStorage.getItem("role");
            switch (role) {
                case "1":{
                    this.jiaoyanAdmin=true
                    break;
                }
                case "2":{
                    this.keyanAdmin=true
                    break;
                }
                case "3":{
                    this.competitionAdmin=true
                    break;
                }
                case "4":{
                    this.jiaoyanAdmin=true
                    this.keyanAdmin=true
                    this.competitionAdmin=true
                    this.systemAdmin=true
                    break;
                }
            }
            getAllWaiting().then(res =>{
                this.jiaoyuguihuaData=res.jiaoyuguihua
                this.pingguzhongxinData=res.pingguzhongxin
                this.jiaoyanlunwenData=res.jiaoyanlunwen
                this.jiaoyanData=res.jiaoyanxiangmu
                this.chanxueyanData=res.chanxueyan
                this.xuekejingsaiData=res.xuekejingsai
                this.keyanxiangmuData=res.keyanxiangmujiexiang
                this.ruanjianzhuzuoData=res.ruanjianzuzuo
                this.keyanData=res.keyanxiangmujiexiang
                this.zhuzuoData=res.zhuzuo
                this.zongxiangData=res.zongxiangkeyan
                this.hengxiangData=res.hengxiangkeyan
                this.zhuanliData=res.zhuanli
                this.honorData=res.rongyuchenghao
            } )
        },
        search() {

        },
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        handlePass(index, row,type) {
            this.form = this.tableData[index];
            this.editVisible = true;
        },
        handleMetails(index, row,type){
            console.log(row)
        },
        handleDisPass(index, row,type) {

        },
    }
}
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.del-dialog-cnt{
    font-size: 16px;
    text-align: center
}
</style>
