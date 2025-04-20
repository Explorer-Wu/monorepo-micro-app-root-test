import { ref, watchEffect } from 'vue';

export const themeConfig = ref({
	// 默认初始语言，可选值"<zh-cn|en>"，默认 zh-cn
	globalI18n: 'zh-cn',
});
