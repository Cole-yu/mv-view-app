import Vue from 'vue';
import Router from 'vue-router';
const PageMvScrollList = () => import(/* webpackChunkName: "PageMvScrollList" */'@/views/page-mv-scroll-list');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      redirect: {
        name: "MvScrollList"
      }
    },
    {
      path: '/mv-scroll-list',
      name: "MvScrollList",
      component: PageMvScrollList,
    },
  ]
})
