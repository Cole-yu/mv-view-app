import Vue from 'vue';
import Router from 'vue-router';
const PageMvScrollList = () => import(/* webpackChunkName: "PageMvScrollList" */'@/views/page-mv-scroll-list');
const PageMvEllipsis = () => import(/* webpackChunkName: "PageMvEllipsis" */'@/views/page-mv-ellipsis');
const PageMvSkeleton = () => import(/* webpackChunkName: "PageMvSkeleton" */'@/views/page-mv-skeleton');

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
  ]
})
