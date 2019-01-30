import Router from 'vue-router';
import Home from '@/stage/home/home';
import VueRouter from '@/stage/vueRouter/vueRouter';
import VueRouterPage1 from '@/stage/vueRouter/page1';
import VueRouterPage2 from '@/stage/vueRouter/page2';
import VueAPI from '@/stage/vue/api';
import deepVueAPI from '@/stage/vue/deepAPI';

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
      component: VueRouter,
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
      }, {
        path: 'page',
        // 重定向
        redirect: { name: 'VueRouterPage1' }
      }]
    }, {
      path: '/vueAPI',
      name: 'vueAPI',
      component: VueAPI,
      meta: { title: 'VueAPI demo' }
    }, {
      path: '/deepVueAPI',
      name: 'deepVueAPI',
      component: deepVueAPI,
      meta: { title: 'deepVueAPI demo' }
    }]
  });
}
