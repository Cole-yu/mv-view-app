<template>
  <div class="mv-keyboard-wrap" @click="cancel">
    <div class="mv-keyboard-container">
      <div class="mv-keyboard-body-left">
        <div
          v-for="keyVal in keyList"
          :key="keyVal"
          class="mv-keyboard-key-wrap"
        >
          <div class="mv-keyboard-key-btn" @click="keyPress($event, keyVal)">
            {{ keyVal }}
          </div>
        </div>
      </div>
      <div class="mv-keyboard-body-right">
        <div class="mv-keyboard-key-wrap">
          <div class="mv-delete-btn mv-keyboard-key-btn" @click="onDelete">
            <div class="mv-delete-icon">
              <svg xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M28.016 0A3.991 3.991 0 0132 3.987v14.026c0 2.2-1.787 3.987-3.98 3.987H10.382c-.509 0-.996-.206-1.374-.585L.89 13.09C.33 12.62 0 11.84 0 11.006c0-.86.325-1.62.887-2.08L9.01.585A1.936 1.936 0 0110.383 0zm0 1.947H10.368L2.24 10.28c-.224.226-.312.432-.312.73 0 .287.094.51.312.729l8.128 8.333h17.648a2.041 2.041 0 002.037-2.04V3.987c0-1.127-.915-2.04-2.037-2.04zM23.028 6a.96.96 0 01.678.292.95.95 0 01-.003 1.377l-3.342 3.348 3.326 3.333c.189.188.292.43.292.679 0 .248-.103.49-.292.679a.96.96 0 01-.678.292.959.959 0 01-.677-.292L18.99 12.36l-3.343 3.345a.96.96 0 01-.677.292.96.96 0 01-.678-.292.962.962 0 01-.292-.68c0-.248.104-.49.292-.679l3.342-3.348-3.342-3.348A.963.963 0 0114 6.971c0-.248.104-.49.292-.679A.96.96 0 0114.97 6a.96.96 0 01.677.292l3.358 3.348 3.345-3.348A.96.96 0 0123.028 6z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="mv-keyboard-key-wrap">
          <div class="mv-clear-btn mv-keyboard-key-btn" @click="onClear">
            {{ clearText }}
          </div>
        </div>
        <div class="mv-keyboard-key-wrap">
          <div class="mv-confirm-btn mv-keyboard-key-btn" @click="confirm">
            {{ confirmText }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MvKeyboard",
  props: {
    extraKey: {
      type: Array,
      default: ["00", "."],
      // default: ["000", "00"],
    },
  },
  computed: {
    keyList() {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.extraKey[0], 0, this.extraKey[1]];
    },
  },
  data() {
    return {
      input: "",
      clearText: "清空",
      confirmText: "完成",
    };
  },
  methods: {
    onInput(input) {
      console.log("input", input);
    },
    keyPress($event, keyVal) {
      $event.stopPropagation();
      console.log("keyVal", keyVal);
      let tamp = `${this.input}${keyVal}`; // 字符串拼接
      let reg = new RegExp(/^\d+(\.\d*)?$/); // 数字合法性校验
      if (reg.test(tamp)) {
        this.input = tamp;
        this.onInput(this.input);
      } else {
        console.log("不规范的数字", tamp);
      }
    },
    onDelete($event) {
      $event.stopPropagation();
      this.input = `${this.input}`.slice(0, -1);
      this.onInput(this.input);
    },
    onClear($event) {
      $event.stopPropagation();
      this.input = "";
      this.onInput(this.input);
    },
    show(cb) {
      typeof cb === "function" && cb.call(this, this);
      return new Promise((resolve) => {
        this.resolve = resolve;
      });
    },
    confirm() {
      this.resolve("confirm");
      this.hide();
    },
    cancel() {
      this.resolve("cancel");
      this.hide();
    },
    hide() {
      document.body.removeChild(this.$el);
      this.$destroy();
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
.mv-keyboard-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  &::after {
    content: "-";
    color: transparent;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: #000;
    z-index: -1;
  }
  .mv-keyboard-container {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #f2f3f5;
    border-radius: 0.16rem;
    padding: 0.12rem 0 0 0.12rem;
    user-select: none;
    .mv-keyboard-key-wrap {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      flex: none;
      width: 100%;
      padding-right: 0.12rem;
      padding-bottom: 0.12rem;
      .mv-keyboard-key-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 0.96rem;
        font-size: 0.56rem;
        color: #323233;
        background: #fff;
        border-radius: 0.16rem;
      }
    }
    .mv-keyboard-body-left {
      width: 75%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .mv-keyboard-key-wrap {
        width: 33%;
      }
    }
    .mv-keyboard-body-right {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      .mv-keyboard-key-wrap {
        .mv-delete-btn {
          .mv-delete-icon {
            width: 32px;
            height: 22px;
          }
        }
        .mv-clear-btn {
          font-size: 0.32rem;
        }
        .mv-confirm-btn {
          font-size: 0.32rem;
          color: #fff;
          height: 2.04rem;
          background-color: #1989fa;
        }
      }
    }
  }
}
</style>