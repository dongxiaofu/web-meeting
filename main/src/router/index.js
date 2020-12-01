import Vue from 'vue'
import Router from 'vue-router'
import _import from './_import';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: _import('html/login/index')
    },
    {
      path: '/login',
      name: 'login',
      component: _import('html/login/index')
    },
    {
      path: '/register',
      name: 'register',
      component: _import('html/register/index')
    },
    {
      path: '/meeting-list',
      name: 'meeting-list',
      component: _import('html/list/index')
    },
    {
      path: '/detail',       /*注意这个写法*/
      name: 'detail',     /*detail 由作用，在route的push中使用，否则会报错找不到这个路由*/
      component: _import('html/meeting-detail/index')
    },
    {
      path: '/invite',
      name: 'invite',
      component: _import('html/invite/index')
    },
    {
      path: '/phone',
      name: 'phone',
      component: _import('html/phone/index')
    },
  ],
});
