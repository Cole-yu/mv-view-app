<template>
  <div class="page-wrap">
    <button class="btn" @click="openPickerHandle">
      {{ filterdate | formatDate("yyyy-MM-dd") }}
    </button>

    <mv-datetime-picker
      ref="DatepickerRef"
      v-model="filterdate"
      @confirmEmit="pickerHandle"
    ></mv-datetime-picker>
  </div>
</template>

<script>
import baseMixin from "@/../packages/mixins/baseMixin";
export default {
  name: "PageMvDatetimePicker",
  mixins: [baseMixin],
  data() {
    return {
      filterdate: new Date(),
    };
  },
  methods: {
    openPickerHandle() {
      this.$refs.DatepickerRef.open();
    },
    pickerHandle(val) {
      this.filterdate = val;
    },
  },
};
</script>

<style lang='less' scoped>
.page-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .btn {
    display: block;
    font-size: 0.36rem;
    color: red;
    padding: 0.24rem 0.48rem;
    border: 1px solid #ddd;
    border-radius: 0.16rem;
    margin: 1rem auto;
  }
}
</style>