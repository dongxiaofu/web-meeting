import Vue from 'vue';
import Router from 'vue-router';
import _import from './_import';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: _import('Home'),
        },
        {
            path: '/room/:roomid/:account',
            name: 'room',
            component: _import('webrtc/room')
        },
        {
            path: '/room2/:roomid/:account',
            name: 'room2',
            component: _import('webrtc/room2')
        },
        {
            path: '/many',
            name: 'many',
            component: _import('webrtc/many')
        },
        {
            path: '/meeting',
            name: 'meeting',
            component: _import('webrtc/meeting')
        },
        {
            path: '/local1',
            name: 'local1',
            component: _import('webrtc/local1')
        },
        {
            path: '/Speech',
            name: 'Speech',
            component: _import('webrtc/Speech')
        },
        {
            path: '/transfer',
            name: 'transfer',
            component: _import('webrtc/transfer')
        },
        {
            path: '/remote1',
            name: 'remote1',
            component: _import('webrtc/remote1')
        },
        {
            path: '/remote1-1',
            name: 'remote1-1',
            component: _import('webrtc/remote1-1')
        },
        {
            path: '/palette',
            name: 'palette',
            component: _import('webrtc/palette')
        },
        {
            path: '/whiteboard',
            name: 'whiteboard',
            component: _import('webrtc/whiteboard')
        },
        {
            path: '/communication',
            name: 'communication',
            component: _import('communication/communication')
        },
        {
            path: '/responsive',
            name: 'responsive',
            component: _import('responsive/responsive')
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
            path: '/test',
            name: 'test',
            component: _import('webrtc/test')
        },
        {
            path: '/test2',
            name: 'test2',
            component: _import('webrtc/test2')
        },
    ],
});
