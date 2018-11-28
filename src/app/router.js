import Router from 'vue-router';
import Home from '@/stage/home/home.vue';
// import App from '@/stage/App/App.vue';
import VueRouterPage1 from '@/stage/VueRouter/page1.vue';
import VueRouterPage2 from '@/stage/VueRouter/page2.vue';

export default function createRouter() {
  return new Router({
    mode: 'history',
    routes: [{
      path: '/',
      name: 'home',
      component: Home,
      // 路由元信息
      meta: { title: 'home', requiresAuth: true }
    }, {
      path: '/vueRouter',
      name: 'vueRouter',
      meta: { title: 'vueRouter' },
      // 重定向
      redirect: { name: 'VueRouterPage1' },
      // 嵌套路由
      children: [{
        path: 'page1',
        name: 'VueRouterPage1',
        component: VueRouterPage1,
        meta: { title: 'VueRouter-Page1' }
      }, {
        // 动态路径参数 以冒号开头
        path: 'page1/:id',
        name: 'VueRouterPage2',
        component: VueRouterPage2,
        // 通过 props 解耦，取代与 $route 的耦合
        props: route => Object.assign({}, route.query, route.params),
        meta: { title: 'VueRouter-Page2' }
      }]
    }]
  });
}
