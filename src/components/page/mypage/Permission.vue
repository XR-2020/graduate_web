<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-warning"></i>申报审批</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.key" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <div v-if="jiaoyanAdmin">
                <div>
                    <br>
                    <p>产学研申报</p>
                    <br>
                    <el-table :data="chanxueyanData" border>
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
                        <el-table-column align="center" label="人员情况" width="250px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column prop="object.shenbao" label="申报人" align="center">
                        </el-table-column>
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,1)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handle(scope.$index, scope.row,1,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="handle(scope.$index, scope.row,1,-1)">不通过</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="chanxueyanPageTotal">
                        </el-pagination>
                    </div>
                </div>
                <div>
                    <br>
                    <p>教研项目申报</p>
                    <br>
                    <el-table :data="jiaoyanData" border style="width: 100%" >
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
                        <el-table-column align="center" label="人员情况" width="250px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column prop="object.shenbao" label="申报人" align="center">
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,2)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handle(scope.$index, scope.row,1,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="handle(scope.$index, scope.row,1,-1)">不通过</el-button>
                            </template>
                        </el-table-column>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="jiaoyanxiangmuPageTotal">
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
                        <el-table-column align="center" label="人员情况" width="250px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column prop="object.shenbao" label="申报人" align="center">
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,3)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handle(scope.$index, scope.row,1,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="handle(scope.$index, scope.row,1,-1)">不通过</el-button>
                            </template>
                        </el-table-column>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="jiaoyanlunwenPageTotal">
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
                        <el-table-column align="center" label="人员情况" width="250px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column prop="object.shenbao" label="申报人" align="center">
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,4)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handle(scope.$index, scope.row,1,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="handle(scope.$index, scope.row,1,-1)">不通过</el-button>
                            </template>
                        </el-table-column>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="pingguzhongxinPageTotal">
                        </el-pagination>
                    </div>
                </div>
                <div>
                    <br>
                    <p>教育规划项目申报</p>
                    <br>
                    <el-table :data="jiaoyuguihuaData" border style="width: 100%">
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
                        <el-table-column align="center" label="人员情况" width="250px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column prop="object.shenbao" label="申报人" align="center">
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,5)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handle(scope.$index, scope.row,1,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="handle(scope.$index, scope.row,1,-1)">不通过</el-button>
                            </template>
                        </el-table-column>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="jiaoyuguihuaPageTotal">
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
                        <el-table-column align="center" label="人员情况" width="250px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column prop="object.shenbao" label="申报人" align="center">
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,6)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handle(scope.$index, scope.row,1,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="handle(scope.$index, scope.row,1,-1)">不通过</el-button>
                            </template>
                        </el-table-column>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="zhuanliPageTotal">
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
                        <el-table-column align="center" label="人员情况" width="250px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column prop="object.shenbao" label="申报人" align="center">
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,7)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handle(scope.$index, scope.row,1,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="handle(scope.$index, scope.row,1,-1)">不通过</el-button>
                            </template>
                        </el-table-column>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="hengxiangkeyanPageTotal">
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
                        <el-table-column prop="object.shenbao" label="申报人" align="center">
                        <el-table-column align="center" label="人员情况" width="250px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,8)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handle(scope.$index, scope.row,1,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="handle(scope.$index, scope.row,1,-1)">不通过</el-button>
                            </template>
                        </el-table-column>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="zongxiangkeyanPageTotal">
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
                        <el-table-column align="center" label="人员情况" width="250px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column prop="object.shenbao" label="申报人" align="center">
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,9)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handle(scope.$index, scope.row,1,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="handle(scope.$index, scope.row,1,-1)">不通过</el-button>
                            </template>
                        </el-table-column>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="zhuzuoPageTotal">
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
                        <el-table-column align="center" label="人员情况" width="250px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column prop="object.shenbao" label="申报人" align="center">
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,10)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handle(scope.$index, scope.row,1,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="handle(scope.$index, scope.row,1,-1)">不通过</el-button>
                            </template>
                        </el-table-column>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="keyanlunwenPageTotal">
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
                        <el-table-column align="center" label="人员情况" width="250px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column prop="object.shenbao" label="申报人" align="center">
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,11)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handle(scope.$index, scope.row,1,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="handle(scope.$index, scope.row,1,-1)">不通过</el-button>
                            </template>
                        </el-table-column>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="ruanjianzhuzuoPageTotal">
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
                        <el-table-column align="center" label="人员情况" width="250px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,12)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handle(scope.$index, scope.row,1,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="handle(scope.$index, scope.row,1,-1)">不通过</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="keyanxiangmujiexiangPageTotal">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div v-if="competitionAdmin">
                <br>
                <p>学科竞赛申报</p>
                <br>
                <el-table :data="xuekejingsaiData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column prop="object.id" label="ID" width="35" align="center">
                    </el-table-column>
                    <el-table-column prop="object.name" label="竞赛名称"  align="center">
                    </el-table-column>
                    <el-table-column prop="object.grade" label="获奖等级"  align="center">
                    </el-table-column>
                    <el-table-column prop="object.level" label="比赛等级"  align="center">
                    </el-table-column>
                    <el-table-column align="center" label="人员情况" width="250px">
                        <template slot-scope="scope">
                            <el-table :data="scope.row.people" :show-header="false">
                                <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column prop="object.student" label="参赛学生" align="center">
                    </el-table-column>
                    <el-table-column prop="object.finishtime" label="获奖时间" align="center">
                    </el-table-column>
                    <el-table-column prop="object.shenbao" label="申报人" align="center">
                    <el-table-column label="操作" width="280px"  align="center">
                        <template slot-scope="scope">
                            <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,13)">下载证明材料</el-button>
                            <el-button size="small" type="primary" @click="handle(scope.$index, scope.row,1,1)">通过</el-button>
                            <el-button size="small" type="danger" @click="handle(scope.$index, scope.row,1,-1)">不通过</el-button>
                        </template>
                    </el-table-column>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="xuekejingsaiPageTotal">
                    </el-pagination>
                </div>
            </div>
            <div v-if="systemAdmin">
                <div>
                    <br>
                    <p>荣誉称号申报</p>
                    <br>
                    <el-table :data="honorData" border style="width: 100%">
                        <el-table-column prop="object.id" label="ID"  width="35" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="称号名称" align="center">
                        </el-table-column>
                        <el-table-column prop="object.level" label="级别"  align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="获奖时间"  align="center">
                        </el-table-column>
                        <el-table-column align="center" label="人员情况" width="250px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column prop="object.shenbao" label="申报人" align="center">
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="handleMetails(scope.$index, scope.row,14)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handle(scope.$index, scope.row,1,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="handle(scope.$index, scope.row,1,-1)">不通过</el-button>
                            </template>
                        </el-table-column>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="rongyuchenghaoPageTotal">
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
import {
    getChanXueYanMetails,
    getHengXiangKeYanMetails,
    getJiaoYanLunWenMetails,
    getJiaoYanMetails,
    getJiaoYuGuiHuaMetails,
    getKeYanLunWenMetails,
    getKeYanXiangMuJieXiangMetails,
    getMetails,
    getPingGuZhongXinMetails,
    getRongYuChengHaoMetails,
    getRuanJianZhuZuoMetails,
    getXueKeJingSaiMetails,
    getZhuanLiMetails,
    getZhuZuoMetails,
    getZongXiangKeYanMetails, passChanXueYan, passHengXiangKeYan, passJiaoYan, passJiaoYanLunWen, passJiaoYuGuiHua,
    passKeYanLunWen,
    passKeYanXiangMuJieXiang, passPingGuZhongXin,
    passRongYuChengHao,
    passRuanJianZhuZuo,
    passXueKeJingSai, passZhuanLi, passZhuZuo, passZongXiangKeYan
} from "../../../api/commonAPI";
export default {
    name: 'permission',
    components:{"chanxueyan":chanxueyan},
    data() {
        return {
            metails:{type:'',id:''},
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
            role:'',
            chanxueyanPageTotal:0,
            zongxiangkeyanPageTotal:0,
            zhuzuoPageTotal:0,
            zhuanliPageTotal:0,
            xuekejingsaiPageTotal:0,
            ruanjianzhuzuoPageTotal:0,
            rongyuchenghaoPageTotal:0,
            pingguzhongxinPageTotal:0,
            keyanxiangmujiexiangPageTotal:0,
            keyanlunwenPageTotal:0,
            jiaoyanxiangmuPageTotal:0,
            jiaoyanlunwenPageTotal:0,
            hengxiangkeyanPageTotal:0,
            jiaoyuguihuaPageTotal:0
        }
    },
    created() {
       this.getData()
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

            getAllWaiting(this.query).then(res =>{
                this.jiaoyuguihuaData=res.jiaoyuguihua,
                this.pingguzhongxinData=res.pingguzhongxin,
                this.jiaoyanlunwenData=res.jiaoyanlunwen,
                this.jiaoyanData=res.jiaoyanxiangmu,
                this.chanxueyanData=res.chanxueyan,
                this.xuekejingsaiData=res.xuekejingsai,
                this.keyanxiangmuData=res.keyanxiangmujiexiang,
                this.ruanjianzhuzuoData=res.ruanjianzuzuo,
                this.keyanData=res.keyanxiangmujiexiang,
                this.zhuzuoData=res.zhuzuo,
                this.zongxiangData=res.zongxiangkeyan,
                this.hengxiangData=res.hengxiangkeyan,
                this.zhuanliData=res.zhuanli,
                this.honorData=res.rongyuchenghao,
                this.chanxueyanPageTotal=res.chanxueyanPageTotal,
                this.zongxiangkeyanPageTotal=res.zongxiangkeyanPageTotal,
                this.zhuzuoPageTotal=res.zhuzuoPageTotal,
                this.zhuanliPageTotal=res.zhuanliPageTotal,
                this.xuekejingsaiPageTotal=res.xuekejingsaiPageTotal,
                this.ruanjianzhuzuoPageTotal=res.ruanjianzhuzuoPageTotal,
                this.rongyuchenghaoPageTotal=res.rongyuchenghaoPageTotal,
                this.pingguzhongxinPageTotal=res.pingguzhongxinPageTotal,
                this.keyanxiangmujiexiangPageTotal=res.keyanxiangmujiexiangPageTotal,
                this.keyanlunwenPageTotal=res.keyanlunwenPageTotal,
                this.jiaoyanxiangmuPageTotal=res.jiaoyanxiangmuPageTotal,
                this.jiaoyanlunwenPageTotal=res.jiaoyanlunwenPageTotal,
                this.hengxiangkeyanPageTotal=res.hengxiangkeyanPageTotal,
                this.jiaoyuguihuaPageTotal=res.jiaoyuguihuaPageTotal
            } )
            this.role=localStorage.getItem('role');
            console.log(this.role)
            switch (this.role) {
                case '1':{
                    this.jiaoyanAdmin=true
                    break;
                }
                case '2':{
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
        },
        search() {

        },
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        handle(index, row,type,ispass) {
            let handleres
            switch (type) {
                case 1:{
                    passChanXueYan({id:row.object.id,ispass:ispass}).then(res =>{
                        handleres=res
                    })
                    break;
                }
                case 2:{
                    passJiaoYan({id:row.object.id,ispass:ispass}).then(res =>{
                        handleres=res
                    })
                    break;
                }
                case 3:{
                    passJiaoYanLunWen({id:row.object.id,ispass:ispass}).then(res =>{
                        handleres=res
                    })
                    break;
                }
                case 4:{
                    passPingGuZhongXin({id:row.object.id,ispass:ispass}).then(res =>{
                        handleres=res
                    })
                    break;
                }
                case 5:{
                    passJiaoYuGuiHua({id:row.object.id,ispass:ispass}).then(res =>{
                        handleres=res
                    })
                    break;
                }
                case 6:{
                    passZhuanLi({id:row.object.id,ispass:ispass}).then(res =>{
                        handleres=res
                    })
                    break;
                }
                case 7:{
                    passHengXiangKeYan({id:row.object.id,ispass:ispass}).then(res =>{
                        handleres=res
                    })
                    break;
                }
                case 8:{
                    passZongXiangKeYan({id:row.object.id,ispass:ispass}).then(res =>{
                        handleres=res
                    })
                    break;
                }
                case 9:{
                    passZhuZuo({id:row.object.id,ispass:ispass}).then(res =>{
                        handleres=res
                    })
                    break;
                }
                case 10:{
                    passKeYanLunWen({id:row.object.id,ispass:ispass}).then(res =>{
                        handleres=res
                    })
                    break;
                }
                case 11:{
                    passRuanJianZhuZuo({id:row.object.id,ispass:ispass}).then(res =>{
                        handleres=res
                    })
                    break;
                }
                case 12:{
                    passKeYanXiangMuJieXiang({id:row.object.id,ispass:ispass}).then(res =>{
                        handleres=res
                    })
                    break;
                }
                case 13:{
                    passXueKeJingSai({id:row.object.id,ispass:ispass}).then(res =>{
                        handleres=res
                    })
                    break;
                }
                case 14:{
                    passRongYuChengHao({id:row.object.id,ispass:ispass}).then(res =>{
                        handleres=res
                    })
                    break;
                }
            }
            console.log(handleres)
            if(handleres!==0){
                this.$message.success("通过"+row.object.id+""+row.object.name+"成功");
                this.getData()
            }else{
                this.$message.error("通过"+row.object.id+""+row.object.name+"失败");
            }

        },
        handleMetails(index, row,type){
            switch (type) {
                case 1:{
                    getChanXueYanMetails({id:row.object.id}).then(res =>{
                        const blob=new Blob([res],{type:'application/zip'})
                        console.log(blob)
                        const downloadElement=document.createElement('a');
                        const href = window.URL.createObjectURL(blob)
                        const fileName = (row.object.id+row.object.name+'.zip')
                        downloadElement.href = href
                        downloadElement.download = fileName
                        document.body.appendChild(downloadElement)
                        downloadElement.click()
                        document.body.removeChild(downloadElement)
                        window.URL.revokeObjectURL(href)
                    })
                    break;
                }
                case 2:{
                    getJiaoYanMetails({id:row.object.id}).then(res =>{
                        const blob=new Blob([res],{type:'application/zip'})
                        console.log(blob)
                        const downloadElement=document.createElement('a');
                        const href = window.URL.createObjectURL(blob)
                        const fileName = (row.object.id+row.object.name+'.zip')
                        downloadElement.href = href
                        downloadElement.download = fileName
                        document.body.appendChild(downloadElement)
                        downloadElement.click()
                        document.body.removeChild(downloadElement)
                        window.URL.revokeObjectURL(href)
                    })
                    break;
                }
                case 3:{
                    getJiaoYanLunWenMetails({id:row.object.id}).then(res =>{
                        const blob=new Blob([res],{type:'application/zip'})
                        console.log(blob)
                        const downloadElement=document.createElement('a');
                        const href = window.URL.createObjectURL(blob)
                        const fileName = (row.object.id+row.object.name+'.zip')
                        downloadElement.href = href
                        downloadElement.download = fileName
                        document.body.appendChild(downloadElement)
                        downloadElement.click()
                        document.body.removeChild(downloadElement)
                        window.URL.revokeObjectURL(href)
                    })
                    break;
                }
                case 4:{
                    getPingGuZhongXinMetails({id:row.object.id}).then(res =>{
                        const blob=new Blob([res],{type:'application/zip'})
                        console.log(blob)
                        const downloadElement=document.createElement('a');
                        const href = window.URL.createObjectURL(blob)
                        const fileName = (row.object.id+row.object.name+'.zip')
                        downloadElement.href = href
                        downloadElement.download = fileName
                        document.body.appendChild(downloadElement)
                        downloadElement.click()
                        document.body.removeChild(downloadElement)
                        window.URL.revokeObjectURL(href)
                    })
                    break;
                }
                case 5:{
                    getJiaoYuGuiHuaMetails({id:row.object.id}).then(res =>{
                        const blob=new Blob([res],{type:'application/zip'})
                        console.log(blob)
                        const downloadElement=document.createElement('a');
                        const href = window.URL.createObjectURL(blob)
                        const fileName = (row.object.id+row.object.name+'.zip')
                        downloadElement.href = href
                        downloadElement.download = fileName
                        document.body.appendChild(downloadElement)
                        downloadElement.click()
                        document.body.removeChild(downloadElement)
                        window.URL.revokeObjectURL(href)
                    })
                    break;
                }
                case 6:{
                    getZhuanLiMetails({id:row.object.id}).then(res =>{
                        const blob=new Blob([res],{type:'application/zip'})
                        console.log(blob)
                        const downloadElement=document.createElement('a');
                        const href = window.URL.createObjectURL(blob)
                        const fileName = (row.object.id+row.object.name+'.zip')
                        downloadElement.href = href
                        downloadElement.download = fileName
                        document.body.appendChild(downloadElement)
                        downloadElement.click()
                        document.body.removeChild(downloadElement)
                        window.URL.revokeObjectURL(href)
                    })
                    break;
                }
                case 7:{
                    getHengXiangKeYanMetails({id:row.object.id}).then(res =>{
                        const blob=new Blob([res],{type:'application/zip'})
                        console.log(blob)
                        const downloadElement=document.createElement('a');
                        const href = window.URL.createObjectURL(blob)
                        const fileName = (row.object.id+row.object.name+'.zip')
                        downloadElement.href = href
                        downloadElement.download = fileName
                        document.body.appendChild(downloadElement)
                        downloadElement.click()
                        document.body.removeChild(downloadElement)
                        window.URL.revokeObjectURL(href)
                    })
                    break;
                }
                case 8:{
                    getZongXiangKeYanMetails({id:row.object.id}).then(res =>{
                        const blob=new Blob([res],{type:'application/zip'})
                        console.log(blob)
                        const downloadElement=document.createElement('a');
                        const href = window.URL.createObjectURL(blob)
                        const fileName = (row.object.id+row.object.name+'.zip')
                        downloadElement.href = href
                        downloadElement.download = fileName
                        document.body.appendChild(downloadElement)
                        downloadElement.click()
                        document.body.removeChild(downloadElement)
                        window.URL.revokeObjectURL(href)
                    })
                    break;
                }
                case 9:{
                    getZhuZuoMetails({id:row.object.id}).then(res =>{
                        const blob=new Blob([res],{type:'application/zip'})
                        console.log(blob)
                        const downloadElement=document.createElement('a');
                        const href = window.URL.createObjectURL(blob)
                        const fileName = (row.object.id+row.object.name+'.zip')
                        downloadElement.href = href
                        downloadElement.download = fileName
                        document.body.appendChild(downloadElement)
                        downloadElement.click()
                        document.body.removeChild(downloadElement)
                        window.URL.revokeObjectURL(href)
                    })
                    break;
                }
                case 10:{
                    getKeYanLunWenMetails({id:row.object.id}).then(res =>{
                        const blob=new Blob([res],{type:'application/zip'})
                        console.log(blob)
                        const downloadElement=document.createElement('a');
                        const href = window.URL.createObjectURL(blob)
                        const fileName = (row.object.id+row.object.name+'.zip')
                        downloadElement.href = href
                        downloadElement.download = fileName
                        document.body.appendChild(downloadElement)
                        downloadElement.click()
                        document.body.removeChild(downloadElement)
                        window.URL.revokeObjectURL(href)
                    })
                    break;
                }
                case 11:{
                    getRuanJianZhuZuoMetails({id:row.object.id}).then(res =>{
                        const blob=new Blob([res],{type:'application/zip'})
                        console.log(blob)
                        const downloadElement=document.createElement('a');
                        const href = window.URL.createObjectURL(blob)
                        const fileName = (row.object.id+row.object.name+'.zip')
                        downloadElement.href = href
                        downloadElement.download = fileName
                        document.body.appendChild(downloadElement)
                        downloadElement.click()
                        document.body.removeChild(downloadElement)
                        window.URL.revokeObjectURL(href)
                    })
                    break;
                }
                case 12:{
                    getKeYanXiangMuJieXiangMetails({id:row.object.id}).then(res =>{
                        const blob=new Blob([res],{type:'application/zip'})
                        console.log(blob)
                        const downloadElement=document.createElement('a');
                        const href = window.URL.createObjectURL(blob)
                        const fileName = (row.object.id+row.object.name+'.zip')
                        downloadElement.href = href
                        downloadElement.download = fileName
                        document.body.appendChild(downloadElement)
                        downloadElement.click()
                        document.body.removeChild(downloadElement)
                        window.URL.revokeObjectURL(href)
                    })
                    break;
                }
                case 13:{
                    getXueKeJingSaiMetails({id:row.object.id}).then(res =>{
                        const blob=new Blob([res],{type:'application/zip'})
                        console.log(blob)
                        const downloadElement=document.createElement('a');
                        const href = window.URL.createObjectURL(blob)
                        const fileName = (row.object.id+row.object.name+'.zip')
                        downloadElement.href = href
                        downloadElement.download = fileName
                        document.body.appendChild(downloadElement)
                        downloadElement.click()
                        document.body.removeChild(downloadElement)
                        window.URL.revokeObjectURL(href)
                    })
                    break;
                }
                case 14:{
                    getRongYuChengHaoMetails({id:row.object.id}).then(res =>{
                        const blob=new Blob([res],{type:'application/zip'})
                        console.log(blob)
                        const downloadElement=document.createElement('a');
                        const href = window.URL.createObjectURL(blob)
                        const fileName = (row.object.id+row.object.name+'.zip')
                        downloadElement.href = href
                        downloadElement.download = fileName
                        document.body.appendChild(downloadElement)
                        downloadElement.click()
                        document.body.removeChild(downloadElement)
                        window.URL.revokeObjectURL(href)
                    })
                    break;
                }

            }
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
