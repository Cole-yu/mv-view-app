<template>
  <div class="page-wrap">
    <input
      class="mv-page-keyboard-input"
      type="text"
      readonly
      v-model="price"
      @focus="price_openKeyboard"
      placeholder="请输入买入价。"
    />

    <br />

    <input
      class="mv-page-keyboard-input"
      type="text"
      readonly
      v-model="quantity"
      @focus="quantity_openKeyboard"
      placeholder="请输入买入数量。"
    />
  </div>
</template>

<script>
export default {
  name: "PageMvKeyboard",
  data() {
    return {
      price: "",
      quantity: "",
    };
  },
  methods: {
    price_openKeyboard($event) {
      $event.preventDefault();

      this.$keyboard({
        target: "price", // 绑定到 this.price
      }).then((action) => {
        console.log("action", action);
        if (action == "confirm") {
          return;
        }
        if (action == "cancel") {
          return;
        }
      });
    },
    quantity_openKeyboard($event) {
      $event.preventDefault();

      this.$keyboard({
        target: "quantity", // 绑定到 this.quantity
        extraKey: ["000", "00"],
      }).then((action) => {
        console.log("action", action);
        if (action == "confirm") {
          return;
        }
        if (action == "cancel") {
          return;
        }
      });
    },
  },
  mounted() {},
};
</script>

<style lang='less' scoped>
.page-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 0.24rem;
  line-height: 0.32rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .mv-page-keyboard-input {
    position: relative;
    box-sizing: border-box;
    width: 80%;
    height: 0.72rem;
    line-height: 0.72rem;
    padding-left: 0.32rem;
    font-size: 0.28rem;
    color: #333;
    background-color: #fff;
    border: 0.5px solid #ffaf7d;
    border-radius: 0.38rem;
    &::placeholder {
      color: #999;
    }
  }
}
</style>