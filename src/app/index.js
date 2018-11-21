import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '../App.vue';

const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };
const routes = [
  { path: '/', component: App },
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
];

const router = new VueRouter({
  routes
});
/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(App),
  router
});
