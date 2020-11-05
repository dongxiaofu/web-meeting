import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import socket from './utils/socket';
import bus from './utils/eventBus';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// es2015 module
import VueCookies from 'vue-cookies'
// 需要先安装依赖：cnpm install vue-resource
import VueResource from 'vue-resource'
//
// import Clipboard from 'clipboard';
// Vue.prototype.Clipboard=Clipboard;

// 可以使用 this.$http.post
Vue.use(VueResource)
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueCookies)

// set global cookie
Vue.$cookies.set('theme', 'default');
Vue.$cookies.set('hover-time', '10s');

socket.on('connect', () => {
    console.log('连接成功');
});
socket.on('disconnect', () => {
    console.log('连接断开了');
});
Vue.config.productionTip = false;
// Vue.prototype.$bus = bus;
Vue.prototype.$bus = new Vue();


import global_ from './components/common/Global'//引用文件
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
