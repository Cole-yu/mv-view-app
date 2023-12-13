<template>
  <!-- 外部容器 -->
  <div class="list-wrap" @scroll="scrollHandle">
    <!-- 内部元素 -->
    <div class="content-wrap">
      <table cellspacing="0" cellpadding="0" border="0">
        <thead class="main-header-wrap">
          <tr>
            <th
              v-for="(column, index) in columnsArr"
              :key="index"
              class="bd__bottom"
            >
              <div
                class="th__cell"
                :style="{
                  'justify-content':
                    column.titleAlign === 'left'
                      ? 'flex-start'
                      : column.titleAlign === 'center'
                      ? 'center'
                      : 'flex-end',
                }"
              >
                <span>{{ column.title || "" }}</span>
                <span class="sort__icon" v-if="column.sorted">
                  <SortIcon
                    @sortStatusTrigger="sortStatusTrigger"
                    :field="column.field"
                    :currentField="currentField"
                    :initSortStatus="column.initSortStatus || 0"
                  />
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in dataList" :key="index">
            <td
              v-for="(column, idx) in columnsArr"
              :key="idx"
              class="bd__bottom"
            >
              <div
                v-if="column.field === 'name'"
                class="td__cell"
                :style="{ textAlign: column.contentAlign }"
                @click="goDetail(entry)"
              >
                <span class="stock-name"
                  >{{ entry[column.field] }}-{{ index }}</span
                >
                <span>{{ entry["code"] | formatStockCode }}</span>
              </div>
              <div
                v-else
                class="td__cell"
                :style="{ textAlign: column.contentAlign }"
              >
                <!-- 最新 -->
                <p v-if="column.field === 'zuiXin'">
                  {{ entry["zuiXin"] | formatPrice }}
                </p>
                <p class="item" v-else>
                  {{ entry[column.field] }}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="before-trigger" v-if="isLoading">
      <span>加载中...</span>
    </div>
    <div class="before-trigger" v-if="!isLoading && !hasMoreFlag">
      <span>没有更多数据了</span>
    </div>
  </div>
</template>

<script>
import SortIcon from "./SortIcon";
import BaseMixin from "../../mixins/baseMixin";
import PublicUtils from "../../utils/publicUtils";
export default {
  name: "mv-scroll-list",
  mixins: [ BaseMixin ],
  components: {
    SortIcon,
  },
  data() {
    return {
      currentField: "", // 当前排序字段
      isLoading: false,
    };
  },
  props: {
    // 原始字段数组
    columnsArr: {
      type: Array,
      required: true,
    },
    // 原始数据数组
    dataList: {
      type: Array,
      required: true,
    },
    hasMoreFlag: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    goDetail(data) {
      this.$emit("item-click", data);
    },
    sortStatusTrigger(data) {
      this.currentField = data.field; // 记录当前的排序字段
      this.$emit("sort-change", {
        field: this.currentField,
        dirction: data.status,
      });
    },
    scrollHandle(event) {
      // console.log('event', event);
      let scrollTop = event.target.scrollTop; // 333
      let scrollHeight = event.target.scrollHeight; // 1000
      let offsetHeight = event.target.offsetHeight; // 667
      // console.log("滚动距离scrollTop", scrollTop);
      // console.log("文档总高度scrollHeight", scrollHeight);
      // console.log("容器高度offsetHeight", offsetHeight);
      if (
        scrollHeight > offsetHeight &&
        scrollHeight - offsetHeight - scrollTop < 1
      ) {
        console.log("滚动到底部了");
        if (this.hasMoreFlag) {
          this.isLoading = true;
          this.emitLoadData_throttle();
        }
      }
    },
    forceUpdate() {
      this.isLoading = false;
    },
  },
  created() {
    this.emitLoadData_throttle = PublicUtils.throttle(
      () => {
        console.log("pullingUp emit!");
        this.$emit("loadData"); // 节流
      },
      300,
      1000
    );
  },
  mounted() {},
  filters: {},
};
</script>

<style lang="less" scoped>
// 隐藏滚动条
::-webkit-scrollbar {
  display: none;
}
.list-wrap {
  position: relative;
  width: 100%;
  max-height: 100%;
  overflow-x: auto;
  overflow-y: auto;
  .content-wrap {
    display: inline-block;
    table {
      font-size: 0.24rem;
      white-space: nowrap;
      padding-top: 0.8rem;
      thead {
        tr {
          th {
            position: sticky;
            top: 0;
            background: #fff;
            height: 0.8rem;
            color: #999;
            font-weight: 500;
            padding: 0;
            box-sizing: border-box;
            z-index: 2;
            &:first-child {
              left: 0;
              z-index: 3;
            }
          }
        }
      }
      tbody {
        tr {
          td {
            height: 0.96rem;
            box-sizing: border-box;
            background: #fff;
            &:first-child {
              position: sticky;
              left: 0;
              z-index: 1;
            }
          }
        }
      }
      .th__cell {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 0 0.2rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        .sort__icon {
          position: relative;
          margin-left: 0.1rem;
        }
      }
      .td__cell {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 0 0.2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        color: #999;
        .stock-name {
          color: #333;
          font-size: 0.28rem;
          font-weight: 600;
          margin-bottom: 0.12rem;
        }
      }
    }
  }
  .before-trigger {
    position: sticky;
    left: 0;
    width: 100%;
    font-size: 0.28rem;
    color: #999;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
  }
}
</style>