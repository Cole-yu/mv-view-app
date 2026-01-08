<template>
  <div class="page-wrap">
    <button class="mv-dialog-btn" @click="openDialog">唤起弹窗</button>
  </div>
</template>

<script>
export default {
  name: "PageMvDialog",
  data() {
    return {};
  },
  methods: {
    openDialog() {
      this.$confirm({
        title: "提示",
        message: "请开通产品权限后使用。",
        confirmText: "确定",
        cancelText: "取消",
      }).then((action) => {
        console.log("action", action);
        if (action == "confirm") {
          return;
        }
        if (action == "cancel") {
          return;
        }
      });
    },
  },
  mounted() {},
};
</script>

<style lang='less' scoped>
.page-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 0.24rem;
  line-height: 0.32rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .mv-dialog-btn {
    padding: 0.08rem 0.24rem;
    color: #333;
    font-size: 0.32rem;
    line-height: 0.48rem;
    border: 1px solid #ddd;
    border-radius: 0.08rem;
  }
}
</style>