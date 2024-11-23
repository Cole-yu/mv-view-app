<template>
  <div class="page-wrap">
    <p class="demo-title">MvReactiveTxt 组件演示：</p>
    <div class="mv-reactive-txt-container">
      <mv-reactive-txt :text="stockName" :initFontSize="32" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PageMvReactiveTxt",
  data() {
    return {
      stockName: "华泰柏瑞中证A500ETF联接C",
    };
  },
};
</script>

<style lang='less' scoped>
.page-wrap {
  width: 100%;
  height: 100%;
  padding: 0.32rem;
  overflow: hidden;
  .demo-title {
    color: #333;
    font-family: "PingFang SC";
    font-size: 0.36rem;
    font-weight: 600;
  }
  .mv-reactive-txt-container {
    width: 2rem;
    height: 4rem;
    color: #333;
    font-family: "PingFang SC";
    font-weight: 600;
    border: 1px dashed #ddd;
    margin: 0.32rem auto;
  }
}
</style>