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
                },{
                    path: '/我的申报',
                    component: resolve => require(['../components/page/mypage/MyShenBao.vue'], resolve),
                    meta: { title: '我的申报',permission: true }
                },
              {
                    path: '/成果申报',
                    component: resolve => require(['../components/page/mypage/newproject_declare.vue'], resolve),
                    meta: { title: '成果申报' }
                },    {
                    path: '/教研成果申报',
                    component: resolve => require(['../components/page/shenbao/JiaoWuChuShenBao.vue'], resolve),
                    meta: { title: '教研成果申报' }
                },
                {
                    path: '/学科竞赛申报',
                    component: resolve => require(['../components/page/shenbao/XueKeJingSai.vue'], resolve),
                    meta: { title: '学科竞赛申报' }
                },
                {
                    path: '/荣誉称号申报',
                    component: resolve => require(['../components/page/shenbao/RongYuChengHao.vue'], resolve),
                    meta: { title: '荣誉称号申报' }
                },
                {
                    path: '/社科类科研成果申报',
                    component: resolve => require(['../components/page/shenbao/SheKeChuShenBao.vue'], resolve),
                    meta: { title: '社科类科研成果申报' }
                }, {
                    // vue-schart组件
                    path: '/自科类科研成果申报',
                    component: resolve => require(['../components/page/shenbao/KeJiChuShenBao.vue'], resolve),
                    meta: { title: '自科类科研成果申报' }
                }, {
                    path: '/科研获奖',
                    component: resolve => require(['../components/page/quantitation/keyanhuojiang.vue'], resolve),
                    meta: { title: '科研获奖' }
                },{
                    path: '/纵向结题',
                    component: resolve => require(['../components/page/quantitation/newlongitudinal_per.vue'], resolve),
                    meta: { title: '纵向结题' }
                },{
                    path: '/学科竞赛',
                    component: resolve => require(['../components/page/mypage/competition'], resolve),
                    meta: { title: '学科竞赛' }
                },{
                    path: '/荣誉称号',
                    component: resolve => require(['../components/page/mypage/honor.vue'], resolve),
                    meta: { title: '荣誉称号' }
                }, {
                    path: '/教研成果',
                    component: resolve => require(['../components/page/quantitation/newSystem.vue'], resolve),
                    meta: { title: '教研成果'}
                },{
                    // vue-schart组件
                    path: '/自科类科研成果',
                    component: resolve => require(['../components/page/quantitation/KeJiChu.vue'], resolve),
                    meta: { title: '自科类科研成果' }
                },
                {
                    path: '/教研成果综合查询',
                    component: resolve => require(['../components/page/mypage/newstatistical.vue'], resolve),
                    meta: { title: '教研成果综合查询' }
                },
                {
                    // 权限页面
                    path: '/申报审批',
                    component: resolve => require(['../components/page/mypage/Permission.vue'], resolve),
                    meta: { title: '申报审批', permission: true }
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
            path: '/406',
            component: resolve => require(['../components/page/406.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/系统首页'
        }
    ]
})
