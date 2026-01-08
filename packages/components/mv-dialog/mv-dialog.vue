<template>
  <div class="mv-dialog-wrap" @click="cancel">
    <div class="mv-dialog-container">
      <header class="mv-dialog-header">{{ title }}</header>
      <div class="mv-dialog-body">
        <p class="mv-message-txt">{{ message }}</p>
      </div>
      <footer class="mv-dialog-footer">
        <div class="mv-footer-btn mv-cancel-btn" @click="cancel">
          {{ cancelText }}
        </div>
        <div class="mv-footer-btn mv-confirm-btn" @click="confirm">
          {{ confirmText }}
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "MvDialog",
  data() {
    return {
      title: "提示",
      message: "文本内容",
      confirmText: "确定",
      cancelText: "取消",
    };
  },
  methods: {
    show(cb) {
      typeof cb === "function" && cb.call(this, this);
      return new Promise((resolve) => {
        this.resolve = resolve;
      });
    },
    confirm() {
      this.resolve("confirm");
      this.hide();
    },
    cancel() {
      this.resolve("cancel");
      this.hide();
    },
    hide() {
      document.body.removeChild(this.$el);
      this.$destroy();
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
.mv-dialog-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  &::after {
    content: "-";
    color: transparent;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-color: #000;
    z-index: -1;
  }
  .mv-dialog-container {
    position: relative;
    width: 6.4rem;
    margin: 3.2rem auto;
    background-color: #fff;
    border-radius: 0.16rem;
    padding: 0.32rem 0.32rem 0.96rem;
    color: #333;
    .mv-dialog-header {
      width: 100%;
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.4rem;
      font-weight: 600;
      text-align: center;
    }
    .mv-dialog-body {
      max-height: 7.68rem;
      overflow-x: hidden;
      overflow-y: auto;
      margin-top: 0.4rem;
      margin-bottom: 0.4rem;
      .mv-message-txt {
        font-size: 0.32rem;
        line-height: 0.36rem;
        text-align: center;
      }
    }
    .mv-dialog-footer {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0.96rem;
      line-height: 0.96rem;
      text-align: center;
      font-size: 0.36rem;
      font-weight: 600;
      display: flex;
      &:before {
        content: "-";
        /*oppo vivo 部分手机线条不显示的兼容处理*/
        color: transparent;
        width: 100%;
        height: 0;
        box-sizing: border-box;
        font-size: 0;
        border-bottom: 1px solid #e5e5e5;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        -webkit-transform-origin: left bottom;
        transform-origin: left bottom;
        position: absolute;
        left: 0;
        top: 0;
      }
      .mv-footer-btn {
        width: 50%;
      }
      .mv-cancel-btn {
        position: relative;
        color: #999;
        &:before {
          content: "-";
          /*oppo vivo 部分手机线条不显示的兼容处理*/
          color: transparent;
          width: 0;
          height: 100%;
          font-size: 0;
          border-right: 1px solid #e5e5e5;
          -webkit-transform: scaleX(05);
          transform: scaleX(0.5);
          -webkit-transform-origin: left bottom;
          transform-origin: left bottom;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
      .mv-confirm-btn {
        color: #3372f2;
      }
    }
  }
}
</style>