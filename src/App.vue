<script setup lang="ts">
</script>

<template>
  <div id="appbox">
    <div class="menu">
      <router-link to="/">图表联动</router-link>
      <router-link to="/charttablelink">表格联动</router-link>
      <router-link to="/chartlazyload">图表懒加载</router-link>
      <router-link to="/chartbigdata">大数据</router-link>
    </div>
    <div class="content flex-1 p-4 h-screen overflow-auto">
      <!-- <h1 class="text-2xl mb-4">ECharts</h1> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
#appbox {
  width: 100%;
  height: 100%;
  display: flex;

  .menu {
    width: 200px;
    padding: 10px;
    background-color: #008acd;
    border-right: 1px solid #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    a {
      cursor: pointer;
      text-decoration: none;
      color: #fff;
      padding: 5px;
      border-radius: 4px;

      &:hover {
        color: #008acd;
        background-color: #fff;
      }

      &.router-link-active {
        color: #008acd;
        background-color: #fff;
        font-weight: bold;
      }
    }
  }
}
</style>
