<template>
  <div class="mv-reactive-txt" ref="ReactiveTxtContainerRef">
    <!-- 改变字体大小模式，12px以上时有效 -->
    <div
      v-if="!transformFlag"
      class="reactive-content-wrap"
      :class="{
        left: textAlign == 'left',
        center: textAlign == 'center',
        right: textAlign == 'right',
      }"
    >
      <span :style="{ 'font-size': fontSize + 'px' }" ref="txtRef">{{
        text
      }}</span>
    </div>

    <!-- 10px transform 缩放模式 -->
    <div
      v-else
      class="transform-scale-wrap"
      :class="{
        left: textAlign == 'left',
        center: textAlign == 'center',
        right: textAlign == 'right',
      }"
    >
      <span class="transform-scale">
        {{ text }}
      </span>
    </div>
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
    textAlign: {
      type: String,
      default: "center", // left、center、right
    },
  },
  computed: {
    fontSize() {
      return Math.max(this.initFontSize - this.mode * 1, 12);
    },
  },
  data() {
    return {
      // text: "华泰柏瑞中证A500ETF联接C",
      mode: 0,
      containerWidth: 0,
      txtWidth: 0,
      transformFlag: false, // 是否为 transform 缩放模式标记
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
          this.transformFlag = true;
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
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  .reactive-content-wrap {
    display: flex;
    align-items: center;
  }
  .transform-scale-wrap {
    display: flex;
    // justify-content: center;
    align-items: center;
    .transform-scale {
      display: inline-block;
      font-size: 20px;
      transform: scale(0.5);
      // transform-origin: center center;
    }
  }
  .left {
    justify-content: flex-start;
    .transform-scale {
      transform-origin: left center;
    }
  }
  .center {
    justify-content: center;
    .transform-scale {
      transform-origin: center center;
    }
  }
  .right {
    justify-content: flex-end;
    .transform-scale {
      transform-origin: right center;
    }
  }
}
</style>