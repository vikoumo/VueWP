import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import App from '../stage/App.vue';
import Test from '../stage/test1/test.vue';

Vue.prototype.axios = axios;
Vue.use(VueRouter);

const routes = [
  { path: '/', component: App },
  { path: '/test', component: Test }
];

const router = new VueRouter({
  routes
});
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

new Vue({
  router
}).$mount('#root');
