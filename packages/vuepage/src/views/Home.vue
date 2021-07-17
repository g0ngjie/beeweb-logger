<template>
  <div class="home">
    <routes-component />
    <el-button type="primary" data-value="demo">测试</el-button>
    <el-button type="primary" @click="handleLink">link b</el-button>
    <el-button @click="handleTestClick">Click</el-button>
  </div>
</template>

<script>
import { handleClickTrigger } from "@beeweb/logger";
export default {
  methods: {
    handleLink() {
      this.$router.replace("/b");
    },
    handleTestClick() {
      handleClickTrigger("点击测试");
    },
  },
};
</script>
