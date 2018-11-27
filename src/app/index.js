import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import routes from './router';

Vue.prototype.axios = axios;
// 挂在VueRouter，这样this.$route才能用
Vue.use(VueRouter);

const router = routes();
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  console.log('router-beforeEach', 'to', 'from', to, from);
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('请登录。。。');
  }
  next();
});

new Vue({
  router
}).$mount('#root');
