<template>
  <div class="page-wrap">
    <p class="demo-title">MvReactiveTxt 组件演示：</p>
    <section class="demo-content-wrap">
      <div class="mv-reactive-txt-container">
        <mv-reactive-txt
          :text="stockName"
          :initFontSize="initFontSize"
          :textAlign="textAlign"
        />
      </div>
      <span class="code">SH600000</span>
    </section>
  </div>
</template>

<script>
export default {
  name: "PageMvReactiveTxt",
  data() {
    return {
      stockName: "华泰柏瑞中证A500ETF",
      initFontSize: 32,
      textAlign: "left",
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
  .demo-content-wrap {
    margin-top: 0.32rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .mv-reactive-txt-container {
      display: inline-block;
      width: 2rem;
      // height: 4rem;
      border: 1px dashed #ddd;
      color: #333;
      font-family: "PingFang SC";
      font-weight: 600;
    }
    .code {
      margin-left: 0.32rem;
    }
  }
}
</style>