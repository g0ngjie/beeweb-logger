<template>
  <div class="routes">
    <div v-for="router in routers" :key="router.name">
      <el-button @click="handleLink(router)">{{ router.name }}</el-button>
    </div>
  </div>
</template>

<script>
import { routes } from "../router/index.js";
export default {
  data() {
    return {
      routers: routes,
    };
  },
  methods: {
    handleLink(router) {
      // this.$router.replace({ name: router.name });
      this.$router.push({ name: router.name });
    },
  },
};
</script>
