import Vue from 'vue';
import Router from 'vue-router';
const PageMvScrollList = () => import(/* webpackChunkName: "PageMvScrollList" */'@/views/page-mv-scroll-list');
const PageMvEllipsis = () => import(/* webpackChunkName: "PageMvEllipsis" */'@/views/page-mv-ellipsis');
const PageMvSkeleton = () => import(/* webpackChunkName: "PageMvSkeleton" */'@/views/page-mv-skeleton');
const PageMvScrollBounce = () => import(/* webpackChunkName: "PageMvScrollBounce" */'@/views/page-mv-scroll-bounce');
const PageMvDatetimePicker = () => import(/* webpackChunkName: "PageMvDatetimePicker" */'@/views/page-mv-datetime-picker');
const PageMvReactiveTxt = () => import(/* webpackChunkName: "PageMvReactiveTxt" */'@/views/page-mv-reactive-txt');

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
      path: '/mv-scroll-list', // 长列表
      name: "MvScrollList",
      component: PageMvScrollList,
    },
    {
      path: '/mv-ellipsis', // 文本省略
      name: "MvEllipsis",
      component: PageMvEllipsis,
    },
    {
      path: '/mv-skeleton', // 骨架屏
      name: "MvSkeleton",
      component: PageMvSkeleton,
    },
    {
      path: '/mv-scroll-bounce', // 滚动回弹效果
      name: "MvScrollBounce",
      component: PageMvScrollBounce,
    },
    {
      path: '/mv-datetime-picker', // 移动端日历选择器
      name: "MvDatetimePicker",
      component: PageMvDatetimePicker,
    },
    {
      path: '/mv-reactive-txt', // 自适应大小变化文本
      name: "MvReactiveTxt",
      component: PageMvReactiveTxt,
    },
  ]
});