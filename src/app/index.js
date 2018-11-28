import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import routes from './router';
import App from './index.vue';

Vue.prototype.axios = axios;
// 挂在VueRouter，这样this.$route才能用
Vue.use(VueRouter);

Vue.use(ElementUI);

const router = routes();
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  console.log('router-beforeEach', 'to', 'from', to, from);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('请登录。。。');
  }
  next();
});

new Vue({
  router,
  render: c => c(App)
}).$mount('#root');
