<template>
  <!-- 外部容器 -->
  <div class="mv-scroll-bounce-wrap" ref="MvScrollBounceWrapRef">
    <!-- 内部元素 -->
    <div
      class="mv-scroll-bounce-content"
      ref="MvScrollBounceContentRef"
      @touchstart="touchstartHandle"
      @touchmove="touchmoveHandle"
      @touchend="touchendHandle"
    >
      <div class="tip">pulldown ↓</div>
      <div class="slot-content">
        <slot>
          <ul>
            <li class="item">0</li>
            <li class="item">1</li>
            <li class="item">2</li>
            <li class="item">3</li>
            <li class="item">4</li>
            <li class="item">5</li>
            <li class="item">6</li>
            <li class="item">7</li>
            <li class="item">8</li>
            <li class="item">9</li>
            <li class="item">10</li>
            <li class="item">11</li>
            <li class="item">12</li>
            <li class="item">13</li>
            <li class="item">14</li>
            <li class="item">15</li>
            <li class="item">16</li>
            <li class="item">17</li>
            <li class="item">18</li>
            <li class="item">19</li>
          </ul>
        </slot>
      </div>
      <div class="tip">pullup ↑</div>
    </div>
  </div>
</template>

<script>
const MaxPadding = (window.fontSize || 50) * 0.72;
export default {
  name: "MvScrollBounce",
  data() {
    return {
      startY: 0,
      lastY: 0,
      diffY: 0,
      maxTranslateY: 0,
      buffer: MaxPadding, // 最大回弹距离
    };
  },
  methods: {
    touchstartHandle(event) {
      // console.log("touchstart event", event);
      this.startY = event.touches[0].clientY;
    },
    touchmoveHandle(event) {
      const currentY = event.touches[0].clientY;
      this.diffY = Math.floor(currentY - this.startY);
      // console.log("diffY", this.diffY);

      // 手指从上向下滑动，页面向上滚动
      if (this.diffY > 0) {
        // 滚动到顶了
        if (this.lastY + this.diffY > this.buffer) {
          this.diffY = this.buffer - this.lastY;
        }
      }

      // 手指从下向上滑动，滚动条向下滚动
      if (this.diffY < 0) {
        // 滚动到底了
        if (this.lastY + this.diffY < -(this.maxTranslateY + this.buffer)) {
          this.diffY = -(this.maxTranslateY + this.buffer) - this.lastY;
        }
      }

      this.$refs.MvScrollBounceContentRef.style.transform = `translateY(${
        this.lastY + this.diffY
      }px)`;
      this.$refs.MvScrollBounceContentRef.style.transition = "";
    },
    touchendHandle(event) {
      if (this.diffY > 0) {
        if (this.lastY + this.diffY > 0) {
          this.lastY = 0;
          this.$refs.MvScrollBounceContentRef.style.transform =
            "translateY(0px)";
          this.$refs.MvScrollBounceContentRef.style.transition =
            "all .3s ease-out";
          return;
        }
      }

      if (this.diffY < 0) {
        if (this.lastY + this.diffY < -this.maxTranslateY) {
          this.lastY = -this.maxTranslateY;
          this.$refs.MvScrollBounceContentRef.style.transform = `translateY(${-this
            .maxTranslateY}px)`;
          this.$refs.MvScrollBounceContentRef.style.transition =
            "all .3s ease-out";
          return;
        }
      }

      // console.log("上一次lastY", this.lastY);
      this.lastY = this.lastY + this.diffY;
      // console.log("本次lastY", this.lastY);

      this.$refs.MvScrollBounceContentRef.style.transform = `translateY(${this.lastY}px)`;
      this.$refs.MvScrollBounceContentRef.style.transition = "all .3s ease-out";
    },
  },
  mounted() {
    this.maxTranslateY =
      this.$refs.MvScrollBounceContentRef.clientHeight -
      this.$refs.MvScrollBounceWrapRef.clientHeight;
  },
};
</script>

<style lang="less" scoped>
@row-height: 0.72rem;
.mv-scroll-bounce-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 0.32rem;
  background-color: #fff;

  .item {
    height: @row-height;
    line-height: @row-height;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }

  .tip {
    height: calc(@row-height * 1);
    line-height: calc(@row-height * 1);
    text-align: center;
    background-color: #ddd;
  }
}
</style>