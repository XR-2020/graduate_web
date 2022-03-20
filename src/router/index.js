import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/系统首页'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/系统首页',
                    component: resolve => require(['../components/page/mypage/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/项目申报',
                    component: resolve => require(['../components/page/mypage/project_declare.vue'], resolve),
                    meta: { title: '项目申报' }
                },
                // {
                //     path: '/table',
                //     component: resolve => require(['../components/page/declare.vue'], resolve),
                //     meta: { title: '申报审批' }
                // },
                {
                    path: '/产学研',
                    component: resolve => require(['../components/page/quantitation/pro_stu.vue'], resolve),
                    meta: { title: '产学研' }
                },{
                    path: '/教研项目',
                    component: resolve => require(['../components/page/quantitation/teach_search.vue'], resolve),
                    meta: { title: '教研项目' }
                },{
                    path: '/教研论文',
                    component: resolve => require(['../components/page/quantitation/teach_paper.vue'], resolve),
                    meta: { title: '教研论文' }
                },{
                    path: '/评估中心相关',
                    component: resolve => require(['../components/page/quantitation/templates.vue'], resolve),
                    meta: { title: '评估中心相关' }
                },{
                    path: '/教育规划项目',
                    component: resolve => require(['../components/page/quantitation/edu_plan.vue'], resolve),
                    meta: { title: '教育规划项目' }
                },{
                    path: '/专利',
                    component: resolve => require(['../components/page/quantitation/patent.vue'], resolve),
                    meta: { title: '专利' }
                },{
                    path: '/横向科研项目',
                    component: resolve => require(['../components/page/quantitation/lateral_per.vue'], resolve),
                    meta: { title: '横向科研项目' }
                },{
                    path: '/纵向科研项目',
                    component: resolve => require(['../components/page/quantitation/longitudinal_per.vue'], resolve),
                    meta: { title: '纵向科研项目' }
                },{
                    path: '/著作',
                    component: resolve => require(['../components/page/quantitation/book.vue'], resolve),
                    meta: { title: '著作' }
                },{
                    path: '/科研论文',
                    component: resolve => require(['../components/page/quantitation/paper.vue'], resolve),
                    meta: { title: '科研论文' }
                },{
                    path: '/软件著作权',
                    component: resolve => require(['../components/page/quantitation/software.vue'], resolve),
                    meta: { title: '软件著作权' }
                },{
                    path: '/科研项目结项',
                    component: resolve => require(['../components/page/quantitation/project.vue'], resolve),
                    meta: { title: '科研项目结项' }
                },{
                    path: '/学科竞赛',
                    component: resolve => require(['../components/page/mypage/competition'], resolve),
                    meta: { title: '学科竞赛' }
                },{
                    path: '/荣誉称号',
                    component: resolve => require(['../components/page/mypage/honor.vue'], resolve),
                    meta: { title: '荣誉称号' }
                },
                {
                    path: '/产学研申报',
                    component: resolve => require(['../components/page/shenbao/chanxueyan.vue'], resolve),
                    meta: { title: '产学研申报' }
                },{
                    path: '/合并申报',
                    component: resolve => require(['../components/page/shenbao/HeBingShenBao.vue'], resolve),
                    meta: { title: '专利/横向科研项目/著作/科研论文/软件著作权/科研项目结项' }
                },{
                    path: '/评估中心相关申报',
                    component: resolve => require(['../components/page/shenbao/PingGuZhongXin.vue'], resolve),
                    meta: { title: '评估中心相关' }
                },
                {
                    path: '/教研论文申报',
                    component: resolve => require(['../components/page/shenbao/JiaoYanLunWen.vue'], resolve),
                    meta: { title: '教研论文申报' }
                },{
                    path: '/教研项目申报',
                    component: resolve => require(['../components/page/shenbao/JiaoYanXiangMu.vue'], resolve),
                    meta: { title: '教研项目申报' }
                },{
                    path: '/教育规划项目申报',
                    component: resolve => require(['../components/page/shenbao/JiaoYuGuiHua.vue'], resolve),
                    meta: { title: '教育规划项目申报' }
                },{
                    path: '/荣誉称号申报',
                    component: resolve => require(['../components/page/shenbao/RongYuChengHao.vue'], resolve),
                    meta: { title: '荣誉称号申报' }
                },{
                    path: '/学科竞赛申报',
                    component: resolve => require(['../components/page/shenbao/XueKeJingSai.vue'], resolve),
                    meta: { title: '学科竞赛申报' }
                },{
                    path: '/纵向科研项目申报',
                    component: resolve => require(['../components/page/shenbao/ZongXiangKeYan.vue'], resolve),
                    meta: { title: '纵向科研项目申报' }
                },
                // {
                //     path: '/tabs',
                //     component: resolve => require(['../components/page/quantitation/Tabs.vue'], resolve),
                //     meta: { title: 'tab选项卡' }
                // },
                // {
                //     path: '/form',
                //     component: resolve => require(['../components/page/quantitation/project_declare.vue'], resolve),
                //     meta: { title: '基本表单' }
                // },
                // {
                //     // 富文本编辑器组件
                //     path: '/editor',
                //     component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                //     meta: { title: '富文本编辑器' }
                // },
                // {
                //     // markdown组件
                //     path: '/markdown',
                //     component: resolve => require(['../components/page/Markdown.vue'], resolve),
                //     meta: { title: 'markdown编辑器' }
                // },
                // {
                //     // 图片上传组件
                //     path: '/upload',
                //     component: resolve => require(['../components/page/Upload.vue'], resolve),
                //     meta: { title: '文件上传' }
                // },
                {
                    // vue-schart组件
                    path: '/教研成果统计',
                    component: resolve => require(['../components/page/mypage/statistical.vue'], resolve),
                    meta: { title: '教研成果统计' }
                },
                // {
                //     // 拖拽列表组件
                //     path: '/drag',
                //     component: resolve => require(['../components/page/DragList.vue'], resolve),
                //     meta: { title: '拖拽列表' }
                // },
                {
                    // 权限页面
                    path: '/申报审批',
                    component: resolve => require(['../components/page/mypage/Permission.vue'], resolve),
                    meta: { title: '申报审批', permission: true }
                },{
                    path: '/产学研展示',
                    component: resolve => require(['../components/page/edit/chanxueyan_edit.vue'], resolve),
                    meta: { title: '产学研展示' }
                },{
                    path: '/合并申报展示',
                    component: resolve => require(['../components/page/edit/HeBingShenBao_edit.vue'], resolve),
                    meta: { title: '合并申报展示' }
                },{
                    path: '/教研论文展示',
                    component: resolve => require(['../components/page/edit/JiaoYanLunWen_edit.vue'], resolve),
                    meta: { title: '教研论文展示' }
                },{
                    path: '/教育规划项目展示',
                    component: resolve => require(['../components/page/edit/JiaoYuGuiHua_edit.vue'], resolve),
                    meta: { title: '教育规划项目展示' }
                },{
                    path: '/评估中心展示',
                    component: resolve => require(['../components/page/edit/PingGuZhongXin_edit.vue'], resolve),
                    meta: { title: '评估中心展示' }
                },{
                    path: '/荣誉称号展示',
                    component: resolve => require(['../components/page/edit/RongYuChengHao_edit.vue'], resolve),
                    meta: { title: '荣誉称号展示' }
                },{
                    path: '/学科竞赛展示',
                    component: resolve => require(['../components/page/edit/XueKeJingSai_edit.vue'], resolve),
                    meta: { title: '学科竞赛展示' }
                },{
                    path: '/纵向科研展示',
                    component: resolve => require(['../components/page/edit/ZongXiangKeYan_edit.vue'], resolve),
                    meta: { title: '纵向科研展示' }
                },{
                    path: '/工具',
                    component: resolve => require(['../components/page/edit/ZongXiangKeYan_edit.vue'], resolve),
                    meta: { title: 'tool' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/mypage/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/系统首页'
        }
    ]
})
