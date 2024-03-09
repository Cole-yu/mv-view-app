<template>
  <div class="mv-ellipsis-wrap">
    <span class="mv-text-wrap" ref="textWrap">{{ textContent }}</span>
    <div class="mv-btn-wrap" v-if="showExchangeButton">
      <button class="mv-btn" @click="changeHandle">
        {{ showTotal ? "收起" : "展开" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MvEllipsis", // 文本省略组件
  props: {
    input: { // 全文内容
      type: String,
      require: true,
    },
    showLine: { // 显示的文本行数
      type: Number,
      default: 3,
    },
  },
  watch: {
    input() {
      this.debounceLoadInfo();
    },
    showLine() {
      this.debounceLoadInfo();
    },
  },
  data() {
    return {
      showTotal: false, // 是否展开全文
      showExchangeButton: false, // 是否显示展开/收起按钮
      textContent: "", // 用户看到的文本内容
      containerEl: "", // 文本所在的span容器
    };
  },
  created() {
    this.debounceLoadInfo = this.debounce(this.loadInfo, 15, false);
  },
  mounted() {
    this.containerEl = this.$refs.textWrap;
    // 获取初始化数据
    this.debounceLoadInfo();
  },
  methods: {
    loadInfo() {
      this.textContent = this.input;
      this.txtDec();
    },
    txtDec() {
      if (!this.containerEl) {
        return;
      }
      if (this.textContent) {
        // 对页面中的元素重新赋值，否则会采用之前裁剪过的文本
        this.containerEl.innerHTML = this.textContent;
      } else {
        return;
      }

      this.$nextTick(() => {
        let rows = this.containerEl.getClientRects().length; // 文本行数
        if (rows <= this.showLine) {
          // 未超出行数，返回
          return;
        }

        let txt = this.textContent; // 文本

        // 数据量大时速度太慢，需优化(二分法？)
        while (rows > this.showLine) {
          // 超出，遍历文字并进行截取，直到文本小于三行
          let step = 1; // 末尾扣除的字数
          if (/<br\/>$/.test(txt)) {
            // 回退的时候，如果碰到换行要整体替换
            step = 5;
          }
          txt = txt.slice(0, -step); // 截取
          this.containerEl.innerHTML = txt;
          rows = this.containerEl.getClientRects().length;
        }

        // 文末尾不留空白
        this.containerEl.innerHTML = txt.slice(0, -1) + "...";

        // 文字末尾留三个字符的空并加省略号(中文字符和英文字符留空大小不同，中文-3，英文-8)
        // if (txt.charCodeAt(txt.length - 1) < 255) { // 英文字符
        //   this.containerEl.innerHTML = txt.slice(0, -8) + "...";
        // } else { // 中文字符
        //   this.containerEl.innerHTML = txt.slice(0, -3) + "...";
        // }

        this.showExchangeButton = true; // 显示展开收起按钮
      });
    },
    // 改变展开/收起全文状态
    changeHandle() {
      this.showTotal = !this.showTotal;
      if (this.showTotal) {
        this.containerEl.innerHTML = this.input;
      } else {
        this.debounceLoadInfo();
      }
    },
    /**
     * 防抖动：
     * 防抖技术即是可以把多个顺序地调用合并成一次，也就是在一定时间内，规定事件被触发的次数。
     * @param {Function} func 要执行的函数
     * @param {Number} wait 等待时间
     * @param {Boolean} immediate 是否立即执行一次
     */
    debounce(func = () => {}, wait = 15, immediate = false) {
      let timeout;
      return () => {
        let context = this;
        let args = arguments;
        let later = () => {
          timeout = null;
          if (!immediate) {
            func.apply(context, args);
          }
        };
        let callNow = immediate && !timeout;
        window.clearTimeout(timeout);
        timeout = window.setTimeout(later, wait);
        if (callNow) {
          func.apply(context, args);
        }
      };
    },
  },
};
</script>

<style lang="less" scoped>
.mv-ellipsis-wrap {
  text-align: justify;
  .mv-text-wrap {
    word-break: break-all;
  }
  .mv-btn-wrap {
    display: flex;
    justify-content: flex-end;
    .mv-btn {
      color: #4e83ac;
    }
  }
}
</style>