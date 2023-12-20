import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        meta: {title: '2023年度诊疗数据画像'},
        component: resolve => require(['../views/home/HomePage.vue'], resolve)
    },
    //当浏览器访问/Auth路径的时候，会加载组件OAuth2.vue
    {
        path: '/Auth',
        meta: {title: '身份验证'},
        component: resolve => require(['../views/oauth/OAuth2.vue'], resolve)
    },
    {
        path: '/Clear',
        meta: {title: '身份清除'},
        component: resolve => require(['../views/oauth/Clear.vue'], resolve)
    },
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {//beforeEach是router的钩子函数，在进入路由前执行
    if (to.query.user_name) {
        document.title = to.query.user_name + to.query.type + '2023年度诊疗数据画像' //获取从上个页面传过来的name再进行修改
    }
    next()  //执行进入路由，如果不写就不会进入目标页
});

export default router
