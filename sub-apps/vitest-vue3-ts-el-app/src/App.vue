<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
// import { ElConfigProvider } from 'element-plus'
import { useI18n } from 'vue-i18n';
import { themeConfig } from '@/locales/config';
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// const locale: any = zhCn;
// 获取实例
const { messages, locale }: any = useI18n();

const localeLang = ref(messages[themeConfig.value.globalI18n]); // 默认语言


// 修改element 和 i18n 默认语言
const changeLanguage = () => {
	locale.value = themeConfig.value.globalI18n;
	localeLang.value = messages.value[locale.value];
};
// 监听修改语言
watchEffect(changeLanguage);

// console.log("locale-test")
</script>

<template>
  <el-config-provider :locale="localeLang">
    <router-view />
  </el-config-provider>
</template>

