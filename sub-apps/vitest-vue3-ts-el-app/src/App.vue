<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { RouterLink, RouterView } from 'vue-router'

const locale: any = zhCn;
// 子应用内部跳转时，通知侧边栏改变菜单状态
const onRouteChange = () => {
  if (window.eventCenterForAppNameVite) {
    // 发送全局数据，通知侧边栏修改菜单展示
    window.eventCenterForAppNameVite.setGlobalData({ name: 'child-vite' })
  }
}
</script>

<template>
  <el-config-provider :locale="locale">
    <header>
      <nav @click="onRouteChange">
        <router-link to="/home">Home</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    </header>
    <router-view />
  </el-config-provider>
</template>

