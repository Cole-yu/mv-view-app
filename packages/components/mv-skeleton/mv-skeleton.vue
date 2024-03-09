<template>
  <div class="mv-skeleton-wrap">
    <div class="mv-loading-wrap" v-if="loading">
      <!-- 自定义骨架屏样式插槽 -->
      <slot name='skeleton'>
        <div class="mv-default-wrap" :style="{'height':height}">
          <!-- 水平方向 -->
          <div class="vm-row-wrap" v-if="direction==='row'">
            <div class="mv-skeleton-title" v-if='showTitle'></div>
            <div class="mv-skeleton-paragraph" v-for="item in rows" :key='item'></div>
          </div>
          <!-- 垂直方向 -->
          <div class="vm-column-wrap" v-if="direction==='column'">
            <div class="skeleton-bar" v-for="item in columns" :key='item'></div>
          </div>
        </div>
      </slot>
    </div>
    <div class="mv-completed-wrap" v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MvSkeleton", // 骨架屏
  props: {
    height:{ // 默认骨架屏高度，仅使用默认骨架屏时有效，自定义骨架屏时无效
      type: String,
      default: 'auto'
    },
    direction:{ // 默认骨架屏的骨架（灰色块）方向
      type: String,
      default: 'row', // column
    },
    rows:{ // 默认骨架屏水平方向时骨架数量，仅 direction=row 时有效
      type: Number,
      default: 3,
    },
    showTitle: { // 默认骨架屏是否显示标题骨架，仅 direction=row 时有效
      type: Boolean,
      default: true,
    },
    columns:{ // 默认骨架屏垂直方向时骨架数量，仅 direction=column 时有效
      type: Number,
      default: 7,
    },
    loading: { // 是否显示骨架屏，false表示内容加载完成，此时会隐藏骨架屏，显示真实业务内容
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.mv-skeleton-wrap {
  width: 100%;
  // 骨架屏
  .mv-loading-wrap {
    width: 100%;
    // 默认骨架屏
    .mv-default-wrap{
      width: 100%;
      box-sizing: border-box;
      padding: 0.16rem;
      overflow: hidden;
      // 水平方向骨架
      .vm-row-wrap{
        .mv-skeleton-title {
          width: 40%;
          height: 0.32rem;
          background-color: #f2f3f5;
        }
        .mv-skeleton-paragraph {
          width: 100%;
          height: 0.32rem;
          box-sizing: border-box;
          background-color: #f2f3f5;
          margin-top: 0.16rem;
        }
      }
      // 垂直方向骨架
      .vm-column-wrap{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .skeleton-bar{
          width: 0.56rem;
          height: 100%;
          box-sizing: border-box;
          background-color: #f2f3f5;
        }
      }
    }
  }
  // 加载完成业务区域
  .mv-completed-wrap {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>