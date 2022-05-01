<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                             <i :class="item.icon"></i> <span slot="title">{{ item.title }}</span>
                        </template>
                          <template v-for="subItem in item.subs">
                            <!-- 如果第二层有子菜单，则继续循环 -->
                            <template v-if="subItem.subs">
                                <el-submenu :index="subItem.index" :key="subItem.index">
                                    <i :class="subItem.icon"></i><span slot="title">{{ subItem.title }}</span>
                                    <template v-for="thirdItem in subItem.subs">
                                        <el-menu-item :index="thirdItem.index" :key="thirdItem.index">
                                            <i :class="thirdItem.icon"></i><span>{{ thirdItem.title }}</span>
                                        </el-menu-item>
                                    </template>
                                </el-submenu>
                            </template>
                            <template v-else>
                                <el-menu-item :index="subItem.index" :key="subItem.index">
                                    <span>{{ subItem.title }}</span>
                                </el-menu-item>
                            </template>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                role:4,
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-tickets',
                        index: '我的申报',
                        title: '我的申报'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '系统首页',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: '项目申报',
                        title: '项目申报'
                    },
                    {
                        icon: 'el-icon-warning',
                        index: '申报审批',
                        title: '申报审批'
                    },
                    // {
                    //     icon: 'el-icon-tickets',
                    //     index: 'table',
                    //     title: '申报审批'
                    // },
                    // {
                    //     icon: 'el-icon-message',
                    //     index: 'tabs',
                    //     title: 'tab选项卡'
                    // },
                    {
                        icon: 'el-icon-tickets',
                        index: '3',
                        title: '教科研成果',
                        subs: [
                            // {
                            //     index: 'form',
                            //     title: '基本表单'
                            // },
                            // {
                            //     index: 'editor',
                            //     title: '富文本编辑器'
                            // },
                            // {
                            //     index: 'markdown',
                            //     title: 'markdown编辑器'
                            // },
                            // {
                            //     index: 'upload',
                            //     title: '文件上传'
                            // }
                            {
                                index:'产学研',
                                title:'产学研'
                            },
                            {
                                index:'教研项目',
                                title:'教研项目'
                            },{
                                index:'教研论文',
                                title:'教研论文'
                            },{
                                index:'评估中心相关',
                                title:'评估中心相关'
                            },{
                                index:'教育规划项目',
                                title:'教育规划项目'
                            },{
                                index:'专利',
                                title:'专利'
                            },{
                                index:'横向科研项目',
                                title:'横向科研项目'
                            },{
                                index:'纵向科研项目',
                                title:'纵向科研项目'
                            },{
                                index:'著作',
                                title:'著作'
                            },{
                                index:'科研论文',
                                title:'科研论文'
                            },{
                                index:'软件著作权',
                                title:'软件著作权'
                            },{
                                index:'科研项目结项',
                                title:'科研项目结项'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: '4',
                        title: '新教科研成果',
                        subs: [
                            {
                                icon: 'el-icon-office-building',
                                index:'教务处',
                                title:'教务处',
                            },{
                                icon: 'el-icon-office-building',
                                index:'科技处',
                                title: '科技处',
                                subs:[
                                    {
                                        icon: 'el-icon-trophy',
                                        index:'纵向结题',
                                        title:'纵向结题'
                                    },{
                                        icon: 'el-icon-trophy',
                                        index:'科研获奖',
                                        title:'科研获奖'
                                    }
                                ]
                            }

                        ]
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: '学科竞赛',
                        title: '学科竞赛'
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: '荣誉称号',
                        title: '荣誉称号'
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: '教研成果统计',
                        title: '教研成果统计'
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })

            console.log(this.items)
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
