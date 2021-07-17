<template>
  <div class="home">
    <routes-component />
    <el-button type="primary" data-value="demo">测试</el-button>
    <el-button type="primary" @click="handleLink">link b</el-button>
    <el-button @click="handleTestClick">Click</el-button>
    <el-button @click="testLogger">testLogger</el-button>
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
    testLogger() {
      console.log("[debug]this.$logger:", this.$logger);
      this.$logger({ a: 123 });
    },
  }
};
</script>
