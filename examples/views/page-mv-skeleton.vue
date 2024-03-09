<template>
  <div class="page-wrap">
    <div class="skeleton-container">
      <mv-skeleton
        :loading="loading"
        direction="row"
        :rows="4"
        :showTitle="false"
        height="2.6rem"
      >
        <!-- <template #skeleton>
          <div class="customer-skeleton-wrap">
            <div class="skeleton-bar"></div>
            <div class="skeleton-bar"></div>
            <div class="skeleton-bar"></div>
            <div class="skeleton-bar"></div>
            <div class="skeleton-bar"></div>
            <div class="skeleton-bar"></div>
            <div class="skeleton-bar"></div>
            <div class="skeleton-bar"></div>
            <div class="skeleton-bar"></div>
          </div>
        </template> -->
        <div class="zdtj-wrap">业务模块1</div>
      </mv-skeleton>
    </div>
    <br>
    <hr>
    <br>
    <div class="skeleton-container">
      <mv-skeleton
        :loading="loading"
        direction="column"
        :columns="9"
        height="2.6rem"
      >
        <!-- <template #skeleton>
          <div class="customer-skeleton-wrap">
            <div class="skeleton-bar"></div>
            <div class="skeleton-bar"></div>
            <div class="skeleton-bar"></div>
            <div class="skeleton-bar"></div>
            <div class="skeleton-bar"></div>
            <div class="skeleton-bar"></div>
            <div class="skeleton-bar"></div>
            <div class="skeleton-bar"></div>
            <div class="skeleton-bar"></div>
          </div>
        </template> -->
        <div class="zdtj-wrap">业务模块2</div>
      </mv-skeleton>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageMvSkeleton",
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    getData() {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang='less' scoped>
.page-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 0.24rem;
  line-height: 0.32rem;
  .skeleton-container {
    width: 100%;
    display: flex;
    // 自定义骨架屏风格
    .customer-skeleton-wrap {
      width: 100%;
      height: 2.6rem;
      box-sizing: border-box;
      padding: 0.16rem 0.32rem 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .skeleton-bar {
        width: 0.56rem;
        height: 100%;
        box-sizing: border-box;
        background-color: #f2f3f5;
      }
    }
    ::v-deep .zdtj-wrap {
      width: 100%;
      height: 2.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>