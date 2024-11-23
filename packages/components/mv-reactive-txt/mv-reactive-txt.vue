<template>
  <div
    class="mv-reactive-txt"
    ref="ReactiveTxtContainerRef"
    :class="{ nowrap: nowrapFlag }"
  >
    <span
      class="mv-reactive-content"
      :style="{ 'font-size': fontSize + 'px' }"
      ref="txtRef"
      >{{ text }}</span
    >
  </div>
</template>

<script>
export default {
  name: "MvReactiveTxt", // 文本根据容器宽度，自适应字体大小进行展示
  props: {
    // 组件中应用的文本
    text: {
      type: String,
      default: "",
    },
    // 初始字体大小，px
    initFontSize: {
      type: Number,
      default: 16, // px
    },
  },
  computed: {
    fontSize() {
      return Math.max(this.initFontSize - this.mode * 1, 12);
    },
  },
  data() {
    return {
      // text: "锦富技术东方精工太辰光哈森股份",
      mode: 0,
      containerWidth: 0,
      txtWidth: 0,
      nowrapFlag: true,
    };
  },
  created() {},
  mounted() {
    this.containerWidth = this.$refs.ReactiveTxtContainerRef.offsetWidth;
    // console.log("containerWidth", this.containerWidth);

    this.reactive();
  },
  methods: {
    async reactive() {
      this.txtWidth = this.$refs.txtRef.offsetWidth;
      // console.log("txtWidth", this.txtWidth);

      if (this.containerWidth < this.txtWidth && this.fontSize > 12) {
        this.mode = this.mode + 1;
        // console.log("currentMode", this.mode);
        await this.$nextTick();
        this.reactive();
      } else {
        if (this.fontSize <= 12 && this.containerWidth < this.txtWidth) {
          this.nowrapFlag = false;
        }
        return;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.mv-reactive-txt {
  width: 100%;
  height: 100%;
  .mv-reactive-content {
    position: relative;
  }
}
.nowrap {
  white-space: nowrap;
}
</style>