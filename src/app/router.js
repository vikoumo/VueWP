import Router from 'vue-router';
import App from '../stage/App/App.vue';
import Page1 from '../stage/Page1/Page1.vue';

export default function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', name: 'home', component: App },
      { path: '/page1', name: 'page1', component: Page1 },
      // 动态路径参数 以冒号开头
      { path: '/page1/:id', component: Page1 }
    ]
  });
}
