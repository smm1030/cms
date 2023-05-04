<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
  <p class="beian">
    <a class="beian" href="https://beian.miit.gov.cn" target="_blank"
      >浙ICP备2023011383号-1</a
    >
  </p>
</template>
<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>
<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  /* background-color: skyblue; */
}
.beian {
  -webkit-text-size-adjust: 100%;
  font: 400 16px/26px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-family: 'SF Pro SC', 'SF Pro Text', 'SF Pro Icons', 'PingFang SC',
    'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  text-align: center;
  background: 0 0;
  color: #0593d3;
  text-decoration: none;
  cursor: pointer;
}
</style>
