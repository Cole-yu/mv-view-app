<template>
  <div class="page-wrap">
    <mv-scroll-list
      ref="MvScrollList"
      key="MvScrollList"
      @item-click="itemClick"
      :columnsArr="fieldList"
      :dataList="dataList"
      :hasMoreFlag="hasMoreFlag"
      @sort-change="sortChangeHandle"
      @loadData="loadDataHandle"
    />
  </div>
</template>

<script>
import configData from "@/config/data.config";
export default {
  name: "PageMvScrollList",
  data() {
    return {
      fieldList: [
        {
          field: "name",
          title: "名称(代码)",
          fixed: "left",
          titleAlign: "left",
          contentAlign: "left",
        },
        {
          field: "zuiXin",
          title: "最新",
          sorted: true,
          titleAlign: "right",
          contentAlign: "right",
        },
        {
          field: "zhangFu",
          title: "涨幅",
          sorted: true,
          initSortStatus: 2,
          titleAlign: "right",
          contentAlign: "right",
        },
        {
          field: "zhangDie",
          title: "涨跌",
          sorted: false,
          titleAlign: "right",
          contentAlign: "right",
        },
        {
          field: "zuoShou",
          title: "昨收",
          sorted: false,
          titleAlign: "right",
          contentAlign: "right",
        },
        {
          field: "chengJiaLiang",
          title: "成交量",
          sorted: false,
          titleAlign: "right",
          contentAlign: "right",
        },
        {
          field: "chengJiaE",
          title: "成交额",
          sorted: false,
          titleAlign: "right",
          contentAlign: "right",
        },
        {
          field: "zuiGao",
          title: "最高",
          sorted: false,
          titleAlign: "right",
          contentAlign: "right",
        },
        {
          field: "zuiDi",
          title: "最低",
          sorted: false,
          titleAlign: "right",
          contentAlign: "right",
        },
        {
          field: "zhenFu",
          title: "振幅",
          sorted: false,
          titleAlign: "right",
          contentAlign: "right",
        },
        {
          field: "zhangShu",
          title: "涨速",
          sorted: false,
          titleAlign: "right",
          contentAlign: "right",
        },
        {
          field: "huanShou",
          title: "换手",
          sorted: false,
          titleAlign: "right",
          contentAlign: "right",
        },
        {
          field: "liangBi",
          title: "量比",
          sorted: false,
          titleAlign: "right",
          contentAlign: "right",
        },
        {
          field: "weiBi",
          title: "委比",
          sorted: false,
          titleAlign: "right",
          contentAlign: "right",
        },
        {
          field: "genZongZhiShu",
          title: "跟踪指数",
          sorted: false,
          titleAlign: "right",
          contentAlign: "right",
        },
      ],
      dataList: [],
      hasMoreFlag: true,
      orderby: "zhangFu",
      desc: true,
    };
  },
  methods: {
    sortChangeHandle(data) {
      console.log(data);
    },
    loadDataHandle() {
      setTimeout(() => {
        let arr = new Array(50);
        arr.fill(configData);
        this.dataList = [...this.dataList, ...arr];
        console.log("this.dataList", this.dataList.length);
        if (this.dataList.length < 300) {
          this.hasMoreFlag = true;
        } else {
          this.hasMoreFlag = false;
        }
        this.$nextTick(() => {
          this?.$refs?.MvScrollList?.forceUpdate?.(); // 没有更多数据了
        });
      }, 300);
    },
    itemClick(data) {
      console.log("itemClick", data);
    },
  },
  created() {
    this.loadDataHandle();
  },
  mounted() {},
};
</script>

<style lang='less' scoped>
.page-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
