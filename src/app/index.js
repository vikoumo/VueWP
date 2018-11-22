import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import routes from './router';
// 为什么这里的import不能用@？？？？

Vue.prototype.axios = axios;
// 挂在VueRouter，这样this.$route才能用
Vue.use(VueRouter);
// router分离？？
const vueRoutes = routes();
console.log('routes', vueRoutes);
const router = new VueRouter({
  vueRoutes
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
