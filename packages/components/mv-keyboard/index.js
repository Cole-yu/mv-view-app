import Vue from 'vue';
import keyboard from './mv-keyboard.vue';

let newInstance = null;

//将vue组件变为构造函数
let KeyboardConstructor = Vue.extend(keyboard);

let init = (options) => {
  // 实例化组件
  newInstance = new KeyboardConstructor();

  // 合并配置选项
  // Object.assign(newInstance, options);

  // 使用$mount()后  可以理解为创建虚拟的dom
  document.body.appendChild(newInstance.$mount().$el);
}

// 注: 此处不能使用箭头函数，否则 this = undefined
let caller = function (options = {}) {
  const vm = this; // this 调用者父组件实例对象
  options = Object.assign({
    target: "input", // 默认绑定到 this.input
    input: `${vm[options.target]}`,
    onInput: (input) => {
      // vm[options.target] = input.length > 0 ? Number(input) : "";
      vm[options.target] = input;
    },
  }, options);

  // options 为调用组件方法时传入的配置选项
  if (!newInstance) {
    init(options);
  }
  // return newInstance.show(vm => { newInstance = null });
  return newInstance.show(options);
}

export default {
  install(vue) {
    vue.prototype.$keyboard = caller;
  }
}