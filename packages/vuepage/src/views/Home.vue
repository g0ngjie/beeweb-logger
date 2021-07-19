<template>
  <div class="home">
    <routes-component />
    <el-button type="primary" @click="handleLink">link b</el-button>
    <el-button @click="handleTestClick">Click</el-button>
    <el-button @click="loggerClick">$loggerClick</el-button>
  </div>
</template>

<script>
import { handleClick } from "@beeweb/logger";
export default {
  methods: {
    handleLink() {
      this.$router.replace("/b");
    },
    handleTestClick() {
      handleClick("点击测试");
    },
    loggerClick() {
      this.$loggerClick({ trigger: "testLogger" });
    },
  },
};
</script>
