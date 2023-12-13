<template>
  <span class="sort-wrap" @click="trigger">
    <span class="top-arrow" :class="status === 1 ? 'arrow-up' : ''"></span>
    <span class="bottom-arrow" :class="status === 2 ? 'arrow-down' : ''"></span>
  </span>
</template>

<script>
export default {
  data() {
    return {
      status: this.initSortStatus,
    };
  },
  props: {
    initSortStatus: {
      type: Number,
      default: 0,
    },
    field: {
      type: String,
      require: true,
    },
    currentField: {
      // 当前排序中的filed
      type: String,
      require: true,
    },
  },
  methods: {
    trigger() {
      switch (this.status) {
        case 0:
          this.status = 1; // 2:选中向上箭头
          break;
        case 1:
          this.status = 2; // 1:选中向下箭头
          break;
        case 2:
          this.status = 0; // 0:不选中
          break;
        default: {
          this.status = 0;
        }
      }
      this.$emit("sortStatusTrigger", {
        field: this.field,
        status: this.status,
      });
    },
  },
  watch: {
    currentField: {
      handler(newValue) {
        if (newValue !== this.field) {
          this.status = 0; // 非当前排序的字段复位
        }
      },
      immediate: false,
    },
  },
};
</script>

<style lang="less" scoped>
.sort-wrap {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  .top-arrow {
    display: inline-block;
    position: relative;
    width: 0;
    height: 0;
    border: 0.12rem solid transparent;
    border-bottom-color: #999;
    border-top-width: 0;
  }
  .bottom-arrow {
    display: inline-block;
    position: relative;
    width: 0;
    height: 0;
    border: 0.12rem solid transparent;
    border-top-color: #999;
    border-bottom-width: 0;
    margin-top: 0.06rem;
  }
  .arrow-down {
    border-top-color: #f34a55;
  }
  .arrow-up {
    border-bottom-color: #f34a55;
  }
}
</style>
