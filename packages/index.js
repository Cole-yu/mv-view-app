import MvScrollList from './components/mv-scroll-list';
import MvEllipsis from './components/mv-ellipsis';
import MvSkeleton from './components/mv-skeleton';
import MvScrollBounce from './components/mv-scroll-bounce';
import StockUtils from './utils/stockUtils';

const components = [
  MvScrollList,
  MvEllipsis,
  MvSkeleton,
  MvScrollBounce,
];

// 定义 install 方法
const install = function(Vue) {
  if (install.installed) return;

  install.installed = true;
  // 遍历并注册全局组件
  components.map(component => Vue.component(component.name, component));

  Vue.prototype.$StockUtils = StockUtils;
  Vue.StockUtils = StockUtils;
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  // 所有组件，必须具有 install，才能使用 Vue.use()
  ...components,
};
