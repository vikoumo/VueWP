import Router from 'vue-router';
import App from '@/App';

export default function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/home',
        name: 'detail',
        component: App,
      }
    ]
  });
}
