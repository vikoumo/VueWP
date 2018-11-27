import Router from 'vue-router';
import App from '@/stage/App/App.vue';
import Page1 from '@/stage/Page1/Page1.vue';

export default function createRouter() {
  return new Router({
    mode: 'history',
    routes: [{
      path: '/',
      name: 'home',
      component: App,
      // 路由元信息
      meta: { title: 'home', requiresAuth: true }
    }, {
      path: '/page1',
      name: 'page1',
      component: Page1,
      meta: { title: 'page1' }
    }, {
      // 动态路径参数 以冒号开头
      path: '/page1/:id',
      name: 'page1Id',
      component: Page1,
      // 通过 props 解耦，取代与 $route 的耦合
      props: route => Object.assign({}, route.query, route.params),
      meta: { title: 'page1' }
    }, {
      path: '/page',
      // 重定向
      redirect: { name: 'page1' }
    }]
  });
}
