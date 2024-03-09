import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/styles/public.less';
// import VConsole from 'vconsole';
// const vConsole = new VConsole();

// 项目内直接引入
import MvViewApp from '../packages/index';

// 编译版本模式引入
// import MvViewApp from '../lib/mv-view-app.umd.min.js';
// import '../lib/style/mv-view-app.umd.css';

// 注册组件库
Vue.use(MvViewApp);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')