<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-warning"></i>申报审批</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <p style="color: #2d8cf0">您的身份:
                <span v-if="role=='1'">教研管理员</span>
                <span v-if="role=='2'">科研管理员</span>
                <span v-if="role=='3'">学科竞赛管理员</span>
                <span v-if="role=='4'">系统管理员</span>
            </p>
            <div v-if="jiaoyanAdmin">
                <div>
                    <br>
                    <p>校外实践基地申报</p>
                    <br>
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
                        <el-table-column prop="object.shenbao" label="申报人" align="center"></el-table-column>
                            <el-table-column label="操作" width="280px"  align="center">
                                <template slot-scope="scope">
                                    <el-button size="small" type="info" @click="newHandleMetails(scope.$index, scope.row)">下载证明材料</el-button>
                                    <el-button size="small" type="primary" @click="newhandle(scope.$index, scope.row,1)">通过</el-button>
                                    <el-button size="small" type="danger" @click="newhandle(scope.$index, scope.row,-1)">不通过</el-button>
                                </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="xiaowaishijianjidiPageTotal">
                        </el-pagination>
                    </div>
                </div>
                <div>
                    <br>
                    <p>实践立项申报</p>
                    <br>
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
                        <el-table-column prop="object.shenbao" label="申报人" align="center"> </el-table-column>
                            <el-table-column label="操作" width="280px"  align="center">
                                <template slot-scope="scope">
                                    <el-button size="small" type="info" @click="newHandleMetails(scope.$index, scope.row)">下载证明材料</el-button>
                                    <el-button size="small" type="primary" @click="newhandle(scope.$index, scope.row,1)">通过</el-button>
                                    <el-button size="small" type="danger" @click="newhandle(scope.$index, scope.row,-1)">不通过</el-button>
                                </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="shijianlixiangPageTotal">
                        </el-pagination>
                    </div>
                </div>
                <div>
                    <br>
                    <p>实践结项申报</p>
                    <br>
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
                        <el-table-column prop="object.shenbao" label="申报人" align="center">  </el-table-column>
                            <el-table-column label="操作" width="280px"  align="center">
                                <template slot-scope="scope">
                                    <el-button size="small" type="info" @click="newHandleMetails(scope.$index, scope.row)">下载证明材料</el-button>
                                    <el-button size="small" type="primary" @click="newhandle(scope.$index, scope.row,1)">通过</el-button>
                                    <el-button size="small" type="danger" @click="newhandle(scope.$index, scope.row,-1)">不通过</el-button>
                                </template>

                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="shijianjiexiangPageTotal">
                        </el-pagination>
                    </div>
                </div>
                <div>
                    <br>
                    <p>教材业绩点申报</p>
                    <br>
                    <el-table :data="jiaocaiyejidian" border style="width: 100%">
                        <el-table-column prop="object.id" label="ID"  width="35" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="项目名称" width="120" align="center">
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
                        <el-table-column prop="object.shenbao" label="申报人" align="center"> </el-table-column>
                            <el-table-column label="操作" width="280px"  align="center">
                                <template slot-scope="scope">
                                    <el-button size="small" type="info" @click="newHandleMetails(scope.$index, scope.row)">下载证明材料</el-button>
                                    <el-button size="small" type="primary" @click="newhandle(scope.$index, scope.row,1)">通过</el-button>
                                    <el-button size="small" type="danger" @click="newhandle(scope.$index, scope.row,-1)">不通过</el-button>
                                </template>

                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="jiaocaiyejidianPageTotal">
                        </el-pagination>
                    </div>
                </div>
                <div>
                    <br>
                    <p>教研业绩申报</p>
                    <br>
                    <el-table :data="jiaoyanyeji" border style="width: 100%">
                        <el-table-column prop="object.id" label="ID"  width="35" align="center">
                        </el-table-column>
                        <el-table-column prop="object.name" label="项目名称" width="120" align="center">
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
                        <el-table-column prop="object.shenbao" label="申报人" align="center"></el-table-column>
                            <el-table-column label="操作" width="280px"  align="center">
                                <template slot-scope="scope">
                                    <el-button size="small" type="info" @click="newHandleMetails(scope.$index, scope.row)">下载证明材料</el-button>
                                    <el-button size="small" type="primary" @click="newhandle(scope.$index, scope.row,1)">通过</el-button>
                                    <el-button size="small" type="danger" @click="newhandle(scope.$index, scope.row,-1)">不通过</el-button>
                                </template>

                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="jiaoyanyejiPageTotal">
                        </el-pagination>
                    </div>
                </div>
                <div>
                    <br>
                    <p>教研论文申报</p>
                    <br>
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
                        <el-table-column prop="object.shenbao" label="申报人" align="center"> </el-table-column>
                            <el-table-column label="操作" width="280px"  align="center">
                                <template slot-scope="scope">
                                    <el-button size="small" type="info" @click="newHandleMetails(scope.$index, scope.row)">下载证明材料</el-button>
                                    <el-button size="small" type="primary" @click="newhandle(scope.$index, scope.row,1)">通过</el-button>
                                    <el-button size="small" type="danger" @click="newhandle(scope.$index, scope.row,-1)">不通过</el-button>
                                </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="newjiaoyanlunwenPageTotal">
                        </el-pagination>
                    </div>
                </div>
                <div>
                    <br>
                    <p>优秀毕设指导教师申报</p>
                    <br>
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
                        <el-table-column prop="object.shenbao" label="申报人" align="center">  </el-table-column>
                            <el-table-column label="操作" width="280px"  align="center">
                                <template slot-scope="scope">
                                    <el-button size="small" type="info" @click="newHandleMetails(scope.$index, scope.row,)">下载证明材料</el-button>
                                    <el-button size="small" type="primary" @click="newhandle(scope.$index, scope.row,1)">通过</el-button>
                                    <el-button size="small" type="danger" @click="newhandle(scope.$index, scope.row,-1)">不通过</el-button>
                                </template>

                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="youxiubishePageTotal">
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
                        <el-table-column prop="object.shenbao" label="申报人" align="center">  </el-table-column>
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="newHandleMetails(scope.$index, scope.row)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="newhandle(scope.$index, scope.row,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="newhandle(scope.$index, scope.row,-1)">不通过</el-button>
                            </template>
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
                        <el-table-column prop="object.shenbao" label="申报人" align="center"> </el-table-column>
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="newHandleMetails(scope.$index, scope.row)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="newhandle(scope.$index, scope.row,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="newhandle(scope.$index, scope.row,-1)">不通过</el-button>
                            </template>

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
                        <el-table-column prop="object.type" label="项目类别" align="center">
                        </el-table-column>
                        <el-table-column prop="object.finishtime" label="完成时间" width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="object.shenbao" label="申报人" align="center"></el-table-column>
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
                                <el-button size="small" type="info" @click="newHandleMetails(scope.$index, scope.row)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="newhandle(scope.$index, scope.row,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="newhandle(scope.$index, scope.row,-1)">不通过</el-button>
                            </template>
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
                        <el-table-column prop="object.shenbao" label="申报人" align="center"></el-table-column>
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="newHandleMetails(scope.$index, scope.row)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="newhandle(scope.$index, scope.row,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="newhandle(scope.$index, scope.row,-1)">不通过</el-button>
                            </template>

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
                        <el-table-column prop="object.shenbao" label="申报人" align="center"> </el-table-column>
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="newHandleMetails(scope.$index, scope.row)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="newhandle(scope.$index, scope.row,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="newhandle(scope.$index, scope.row,-1)">不通过</el-button>
                            </template>

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
                        <el-table-column prop="object.shenbao" label="申报人" align="center"></el-table-column>
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="newHandleMetails(scope.$index, scope.row)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="newhandle(scope.$index, scope.row,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="newhandle(scope.$index, scope.row,-1)">不通过</el-button>
                            </template>

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
                        <el-table-column prop="object.shenbao" label="申报人" align="center"></el-table-column>
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
                                <el-button size="small" type="info" @click="newHandleMetails(scope.$index, scope.row)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="newhandle(scope.$index, scope.row,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="newhandle(scope.$index, scope.row,-1)">不通过</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="keyanxiangmujiexiangPageTotal">
                        </el-pagination>
                    </div>
                </div>
                <div>
                    <br>
                    <p>纵向结题申报</p>
                    <br>
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
                        <el-table-column prop="object.shenbao" label="申报人" align="center">
                        </el-table-column>
                        <el-table-column align="center" label="人员情况" width="185px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.people" :show-header="false">
                                    <el-table-column prop="badge" align="center"  label="工号"></el-table-column>
                                    <el-table-column prop="name" align="center"  label="姓名"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="newHandleMetails(scope.$index, scope.row)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="newhandle(scope.$index, scope.row,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="newhandle(scope.$index, scope.row,-1)">不通过</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="zongxiangjietiPageTotal">
                        </el-pagination>
                    </div>
                </div>
                <div>
                    <br>
                    <p>科研获奖申报</p>
                    <br>
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
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="newHandleMetails(scope.$index, scope.row,)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="newhandle(scope.$index, scope.row,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="newhandle(scope.$index, scope.row,-1)">不通过</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="keyanhuojiangPageTotal">
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
                    <el-table-column prop="object.teacher" align="center" label="指导教师" width="250px">
                    </el-table-column>
                    <el-table-column prop="object.student" label="参赛学生" align="center">
                    </el-table-column>
                    <el-table-column prop="object.finishtime" label="获奖时间" align="center">
                    </el-table-column>
                    <el-table-column prop="object.shenbao" label="申报人" align="center">   </el-table-column>
                    <el-table-column label="操作" width="280px"  align="center">
                        <template slot-scope="scope">
                            <el-button size="small" type="info" @click="xueKeJingSaiMetails(scope.$index, scope.row)">下载证明材料</el-button>
                            <el-button size="small" type="primary" @click="xueKeJingSaihandle(scope.$index, scope.row,1)">通过</el-button>
                            <el-button size="small" type="danger" @click="xueKeJingSaihandle(scope.$index, scope.row,-1)">不通过</el-button>
                        </template>

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
                        <el-table-column prop="object.teacher" align="center" label="获奖教师" width="250px">
                        </el-table-column>
                        <el-table-column prop="object.shenbao" label="申报人" align="center">  </el-table-column>
                        <el-table-column label="操作" width="280px"  align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="info" @click="rongYuChenHaoMetails(scope.$index, scope.row)">下载证明材料</el-button>
                                <el-button size="small" type="primary" @click="handlerongYuChenHao(scope.$index, scope.row,1)">通过</el-button>
                                <el-button size="small" type="danger" @click="handlerongYuChenHao(scope.$index, scope.row,-1)">不通过</el-button>
                            </template>

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
import { getAllWaiting} from "../../../api/shenbaoAPI";
import {
    getRongYuChengHaoMetails,
    getXueKeJingSaiMetails,
    passRongYuChengHao,
    passXueKeJingSai
} from "../../../api/commonAPI";
import {getJiaoWuChuMetails, passJiaoWuChu} from "../../../api/newSystem";
import {getSheKeChuMetails, passSheKeChuChu} from "../../../api/SheKeChuAPI";
import {getKeJiChuMetails, passKeJiChu} from "../../../api/kejichu";
export default {
    name: 'permission',
    inject:['reload'],
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
            xuekejingsaiData:[],
            keyanxiangmuData:[],
            ruanjianzhuzuoData:[],
            keyanData:[],
            zhuzuoData:[],
            zongxiangData:[],
            hengxiangData:[],
            zhuanliData:[],
            honorData:[],
            xiaowaishijianjidi:[],
            shijianlixiang:[],
            shijianjiexiang:[],
            jiaocaiyejidian:[],
            jiaoyanyeji:[],
            jiaoyanlunwen:[],
            youxiubishe:[],
            zongxiangjieti:[],
            keyanhuojiang:[],
            role:'',
            zongxiangkeyanPageTotal:0,
            zhuzuoPageTotal:0,
            zhuanliPageTotal:0,
            xuekejingsaiPageTotal:0,
            ruanjianzhuzuoPageTotal:0,
            rongyuchenghaoPageTotal:0,
            keyanxiangmujiexiangPageTotal:0,
            keyanlunwenPageTotal:0,
            hengxiangkeyanPageTotal:0,
            keyanhuojiangPageTotal:0,
            zongxiangjietiPageTotal:0,
            youxiubishePageTotal:0,
            newjiaoyanlunwenPageTotal:0,
            jiaoyanyejiPageTotal:0,
            jiaocaiyejidianPageTotal:0,
            shijianjiexiangPageTotal:0,
            shijianlixiangPageTotal:0,
            xiaowaishijianjidiPageTotal:0
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
                this.xiaowaishijianjidi=res.xiaowaishijianjidi,
                this.shijianlixiang=res.shijianlixiang,
                this.shijianjiexiang=res.shijianjiexiang,
                this.jiaocaiyejidian=res.jiaocaiyejidian,
                this.jiaoyanyeji=res.jiaoyanyeji,
                this.jiaoyanlunwen=res.newjiaoyanlunwen,
                this.youxiubishe=res.youxiubishe,
                this.zongxiangjieti=res.zongxiangjieti,
                this.keyanhuojiang=res.keyanhuojiang,
                    this.xuekejingsaiData=res.xuekejingsai,
                    this.keyanxiangmuData=res.keyanxiangmujiexiang,
                    this.ruanjianzhuzuoData=res.ruanjianzhuzuo,
                    this.keyanData=res.keyanlunwen,
                    this.zhuzuoData=res.zhuzuo,
                    this.zongxiangData=res.zongxiangkeyan,
                    this.hengxiangData=res.hengxiangkeyan,
                    this.zhuanliData=res.zhuanli,
                    this.honorData=res.rongyuchenghao,
                this.keyanhuojiangPageTotal=res.keyanhuojiangPageTotal,
                this.zongxiangjietiPageTotal=res.zongxiangjietiPageTotal,
                this.youxiubishePageTotal=res.youxiubishePageTotal,
                this.newjiaoyanlunwenPageTotal=res.newjiaoyanlunwenPageTotal,
                this.jiaoyanyejiPageTotal=res.jiaoyanyejiPageTotal,
                this.jiaocaiyejidianPageTotal=res.jiaocaiyejidianPageTotal,
                this.shijianjiexiangPageTotal=res.shijianjiexiangPageTotal,
                this.shijianlixiangPageTotal=res.shijianlixiangPageTotal,
                this.xiaowaishijianjidiPageTotal=res.xiaowaishijianjidiPageTotal,
                    this.xuekejingsaiPageTotal=res.xuekejingsaiPageTotal,
                    this.keyanxiangmujiexiangPageTotal=res.keyanxiangmujiexiangPageTotal,
                    this.ruanjianzhuzuoPageTotal=res.ruanjianzhuzuoPageTotal,
                    this.keyanlunwenPageTotal=res.keyanlunwenPageTotal,
                    this.zhuzuoPageTotal=res.zhuzuoPageTotal,
                    this.zongxiangkeyanPageTotal=res.zongxiangkeyanPageTotal,
                    this.hengxiangkeyanPageTotal=res.hengxiangkeyanPageTotal,
                    this.zhuanliPageTotal=res.zhuanliPageTotal,
                    this.rongyuchenghaoPageTotal=res.rongyuchenghaoPageTotal

            } )
            this.role=localStorage.getItem('ms_role');
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
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        xueKeJingSaihandle(index, row,ispass){
            let handleres
            passXueKeJingSai({id:row.object.id,ispass:ispass}).then(res =>{
                handleres=res
            })
            if(handleres!==0){
                this.$message.success("操作"+row.object.id+""+row.object.name+"成功");
            }else{
                this.$message.error("操作"+row.object.id+""+row.object.name+"失败");
            }
            this.reload()
        },
        rongYuChenHaoMetails(index, row){
            getRongYuChengHaoMetails({id: row.object.id}).then(res => {
                const blob = new Blob([res], {type: 'application/zip'})
                console.log(blob)
                const downloadElement = document.createElement('a');
                const href = window.URL.createObjectURL(blob)
                const fileName = (row.object.id + row.object.name + '.zip')
                downloadElement.href = href
                downloadElement.download = fileName
                document.body.appendChild(downloadElement)
                downloadElement.click()
                document.body.removeChild(downloadElement)
                window.URL.revokeObjectURL(href)
            })
        },
       handlerongYuChenHao(index, row,ispass){
            let handleres
            passRongYuChengHao({id:row.object.id,ispass:ispass}).then(res =>{
                handleres=res
            })
            if(handleres!==0){
                this.$message.success("操作"+row.object.id+""+row.object.name+"成功");
            }else{
                this.$message.error("操作"+row.object.id+""+row.object.name+"失败");
            }
            this.reload()
        },
        xueKeJingSaiMetails(index, row){
            getXueKeJingSaiMetails({id: row.object.id}).then(res => {
                const blob = new Blob([res], {type: 'application/zip'})
                console.log(blob)
                const downloadElement = document.createElement('a');
                const href = window.URL.createObjectURL(blob)
                const fileName = (row.object.id + row.object.name + '.zip')
                downloadElement.href = href
                downloadElement.download = fileName
                document.body.appendChild(downloadElement)
                downloadElement.click()
                document.body.removeChild(downloadElement)
                window.URL.revokeObjectURL(href)
            })
        },

        newhandle(index, row,ispass) {
            let handleres
           if(row.object.type.includes('社科处')){
               passSheKeChuChu({id:row.object.id,ispass:ispass}).then(res =>{
                   handleres=res
               })

           }
           if(row.object.type.includes('科技处')){
               passKeJiChu({id:row.object.id,ispass:ispass}).then(res =>{
                   handleres=res
               })
           }
           if(row.object.type.includes('教务处')){
               passJiaoWuChu({id:row.object.id,ispass:ispass}).then(res =>{
                   handleres=res
               })
           }
            if(handleres!==0){
                this.$message.success("操作"+row.object.id+""+row.object.name+"成功");
            }else{
                this.$message.error("操作"+row.object.id+""+row.object.name+"失败");
            }
            this.reload()
        },
        newHandleMetails(index, row){
            if(row.object.type.includes('社科处')){
                getSheKeChuMetails({id: row.object.id}).then(res => {
                    const blob = new Blob([res], {type: 'application/zip'})
                    console.log(blob)
                    const downloadElement = document.createElement('a');
                    const href = window.URL.createObjectURL(blob)
                    const fileName = (row.object.id + row.object.name + '.zip')
                    downloadElement.href = href
                    downloadElement.download = fileName
                    document.body.appendChild(downloadElement)
                    downloadElement.click()
                    document.body.removeChild(downloadElement)
                    window.URL.revokeObjectURL(href)
                })
            }else if(row.object.type.includes('科技处')){
                getKeJiChuMetails({id: row.object.id}).then(res => {
                    const blob = new Blob([res], {type: 'application/zip'})
                    console.log(blob)
                    const downloadElement = document.createElement('a');
                    const href = window.URL.createObjectURL(blob)
                    const fileName = (row.object.id + row.object.name + '.zip')
                    downloadElement.href = href
                    downloadElement.download = fileName
                    document.body.appendChild(downloadElement)
                    downloadElement.click()
                    document.body.removeChild(downloadElement)
                    window.URL.revokeObjectURL(href)
                })}else {
                getJiaoWuChuMetails({id: row.object.id}).then(res => {
                    const blob = new Blob([res], {type: 'application/zip'})
                    console.log(blob)
                    const downloadElement = document.createElement('a');
                    const href = window.URL.createObjectURL(blob)
                    const fileName = (row.object.id + row.object.name + '.zip')
                    downloadElement.href = href
                    downloadElement.download = fileName
                    document.body.appendChild(downloadElement)
                    downloadElement.click()
                    document.body.removeChild(downloadElement)
                    window.URL.revokeObjectURL(href)
                })
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
