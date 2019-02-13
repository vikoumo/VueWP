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
  // console.log('router-beforeEach', 'to', 'from', to, from);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('请登录。。。');
  }
  next();
});
// 基础组件的自动化全局注册
const requireComponent = require.context(
  // 其组件目录的相对路径
  '../components',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /[A-Z]\w+$/
);
requireComponent.keys().forEach((fileName) => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);
  // 获取组件的 PascalCase 命名
  const componentName = lodash.upperFirst(
    lodash.camelCase(
      // 剥去文件名开头的 `./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  );
  console.log('全局组件', componentName);
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  );
});

new Vue({
  router,
  render: c => c(App)
}).$mount('#root');
