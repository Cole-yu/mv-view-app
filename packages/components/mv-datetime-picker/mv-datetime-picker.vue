<template>
  <div class="mv-datetime-picker-wrap" v-if="showPickerFlag">
    <div class="mv-datetime-picker-mask" @click="cancelHandle"></div>
    <div class="mv-datetime-picker-container">
      <div class="mv-datetime-picker-toolbar">
        <span
          class="mv-datetime-picker-action mv-datetime-picker-cancel"
          @click="cancelHandle"
          >取消</span
        >
        <span
          class="mv-datetime-picker-action mv-datetime-picker-confirm"
          @click="confirmHandle"
          >确认</span
        >
      </div>
      <div class="mv-datetime-picker-items">
        <div class="mv-datetime-picker-slot">
          <MvScrollBounce
            ref="YearMvScrollBounceRef"
            :buffer="buffer"
            @scrollEnd="yearScrollEndHandle"
          >
            <div class="mv-datetime-picker-slot-wrapper">
              <div
                class="mv-datetime-picker-item"
                v-for="(yearItem, yearIdx) in yearList"
                :key="yearItem.year"
                :class="{
                  'mv-datetime-picker-selected': yearIdx == yearActiveIndex,
                }"
              >
                {{ yearItem.year }}年
              </div>
            </div>
          </MvScrollBounce>
        </div>
        <div class="mv-datetime-picker-slot">
          <MvScrollBounce
            ref="MonthMvScrollBounceRef"
            :buffer="buffer"
            @scrollEnd="monthScrollEndHandle"
          >
            <div class="mv-datetime-picker-slot-wrapper">
              <div
                class="mv-datetime-picker-item"
                v-for="(monthItem, monthIdx) in monthList"
                :key="monthItem.month"
                :class="{
                  'mv-datetime-picker-selected': monthIdx == monthActiveIndex,
                }"
              >
                {{ monthItem.month }}月
              </div>
            </div>
          </MvScrollBounce>
        </div>
        <div class="mv-datetime-picker-slot">
          <MvScrollBounce
            ref="DayMvScrollBounceRef"
            :buffer="buffer"
            @scrollEnd="dayScrollEndHandle"
          >
            <div class="mv-datetime-picker-slot-wrapper">
              <div
                class="mv-datetime-picker-item"
                v-for="(dayItem, dayIdx) in dayList"
                :key="dayItem.day"
                :class="{
                  'mv-datetime-picker-selected': dayIdx == dayActiveIndex,
                }"
              >
                {{ dayItem }}日
              </div>
            </div>
          </MvScrollBounce>
        </div>
        <div class="mv-datetime-picker-center-highlight"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MvScrollBounce from "../mv-scroll-bounce";
import yearList from "./yearConfig";
export default {
  name: "MvDatetimePicker",
  model: {
    prop: "filterdate",
    event: "update:filterdate",
  },
  components: {
    MvScrollBounce,
  },
  props: {
    filterdate: {
      type: Object,
      default: new Date(2024, 1, 5), // 2024-2-5
    },
    rowHeight: {
      type: Number,
      default: 36, // (window.fontSize || 50) * 0.72 px
    },
  },
  computed: {
    monthList() {
      return this.yearList[this.yearActiveIndex]?.list || [];
    },
    dayList() {
      return this.monthList[this.monthActiveIndex]?.list || [];
    },
  },
  data() {
    return {
      showPickerFlag: false,
      yearActiveIndex: 0, // 年份索引
      monthActiveIndex: 0, // 月份索引
      dayActiveIndex: 0, // 日期索引
      yearList: [],
      buffer: this.rowHeight * 2, // 最大回弹距离
    };
  },
  created() {
    this.getTradeDateData();
  },
  mounted() {},
  methods: {
    /**
     * date Date对象
     */
    initAllIndex(date) {
      let year = date.getFullYear();
      this.yearActiveIndex = this.yearList.findIndex(
        (item) => item.year == year
      );

      let month = date.getMonth() + 1;
      this.monthActiveIndex = this.monthList.findIndex(
        (item) => item.month == month
      );

      let day = date.getDate();
      this.dayActiveIndex = this.dayList.findIndex((item) => item == day);
    },
    getTradeDateData() {
      this.yearList = yearList;
    },
    open() {
      this.showPickerFlag = true;
      this.initAllIndex(this.filterdate);
      this.$nextTick(() => {
        this.init();
      });
    },
    cancelHandle() {
      this.showPickerFlag = false;
    },
    confirmHandle() {
      let { year, list: monthList } = this.yearList[this.yearActiveIndex];

      let { month, list: dayList } = monthList[this.monthActiveIndex];
      month = Number(month) - 1;

      let day = Number(dayList[this.dayActiveIndex]);
      console.log(year, month, day);

      this.$emit("confirmEmit", new Date(year, month, day));
      this.showPickerFlag = false;
    },
    // 年份滚动事件
    yearScrollEndHandle(index) {
      // 月份置顶
      this.$refs.MonthMvScrollBounceRef.scrollTo(0);
      this.$refs.DayMvScrollBounceRef.scrollTo(0);
      this.yearActiveIndex = index;
      this.monthActiveIndex = 0;
      this.dayActiveIndex = 0;
    },
    // 月份滚动事件
    monthScrollEndHandle(index) {
      // 日期置顶
      this.$refs.DayMvScrollBounceRef.scrollTo(0);
      this.monthActiveIndex = index;
      this.dayActiveIndex = 0;
    },
    // 日期滚动
    dayScrollEndHandle(index) {
      this.dayActiveIndex = index;
    },
    init() {
      if (
        !this.$refs.YearMvScrollBounceRef ||
        !this.$refs.MonthMvScrollBounceRef ||
        !this.$refs.DayMvScrollBounceRef
      ) {
        return;
      }

      if (
        this.yearActiveIndex < 0 ||
        this.monthActiveIndex < 0 ||
        this.dayActiveIndex < 0
      ) {
        return;
      }

      // 年份初始化
      this.$refs.YearMvScrollBounceRef.scrollTo(
        -this.rowHeight * this.yearActiveIndex
      );

      // 月份初始化
      this.$refs.MonthMvScrollBounceRef.scrollTo(
        -this.rowHeight * this.monthActiveIndex
      );

      // 日期初始化
      this.$refs.DayMvScrollBounceRef.scrollTo(
        -this.rowHeight * this.dayActiveIndex
      );
    },
  },
};
</script>


<style lang="less" scoped>
.mv-datetime-picker-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 2000;
  .mv-datetime-picker-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
  }
  .mv-datetime-picker-container {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    z-index: 2001;
    border-radius: 0.32rem 0.32rem 0 0;
    .mv-datetime-picker-toolbar {
      height: 0.8rem;
      border-bottom: 1px solid #eaeaea;
      .mv-datetime-picker-action {
        display: inline-block;
        width: 50%;
        text-align: center;
        line-height: 0.8rem;
        font-size: 0.32rem;
        color: #26a2ff;
      }
      .mv-datetime-picker-cancel {
        float: left;
        color: #6e7580;
        text-align: left;
        padding-left: 0.4rem;
      }
      .mv-datetime-picker-confirm {
        float: right;
        color: #e82f29;
        text-align: right;
        padding-right: 0.4rem;
      }
    }
    .mv-datetime-picker-items {
      position: relative;
      display: flex;
      .mv-datetime-picker-slot {
        text-align: center;
        flex: 1;
        overflow: hidden;
        height: 5.04rem; // 0.72 * 7
        .mv-datetime-picker-slot-wrapper {
          padding: 2.16rem 0; // 0.72 * 3
          transition-duration: 0.3s;
          transition-timing-function: ease-out;
          backface-visibility: hidden;
          .mv-datetime-picker-item {
            height: 0.72rem;
            line-height: 0.72rem;
            padding: 0 0.2rem;
            white-space: nowrap;
            position: relative;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 0.32rem;
            color: #707274;
            left: 0;
            top: 0;
            width: 100%;
            box-sizing: border-box;
            transition-duration: 0.3s;
            backface-visibility: hidden;
          }
          .mv-datetime-picker-selected {
            color: #171717 !important;
          }
        }
      }
      .mv-datetime-picker-center-highlight {
        height: 0.72rem;
        margin-top: -0.36rem;
        box-sizing: border-box;
        position: absolute;
        left: 0;
        width: 100%;
        top: 50%;
        pointer-events: none;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: auto;
          right: auto;
          height: 1px;
          width: 100%;
          background-color: #eaeaea;
          display: block;
          z-index: 15;
          transform: scaleY(0.5);
        }
        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          right: auto;
          top: auto;
          height: 1px;
          width: 100%;
          background-color: #eaeaea;
          display: block;
          z-index: 15;
          transform: scaleY(0.5);
        }
      }
    }
  }
}
</style>