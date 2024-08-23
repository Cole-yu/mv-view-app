<template>
  <div class="app-wrap">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
}
* {
  box-sizing: border-box;
}
.app-wrap {
  width: 100%;
  height: 100%;
}
</style>
