/*
 * @Description: i18n国际化
 */
import { i18n } from '@/locales';
// import { createI18n, useI18n } from 'vue-i18n';
//状态管理 pinia
// import { useOutsideSystemStore } from '@/stores/modules/system.js';

// const useSystem = useOutsideSystemStore();

// const i18n = createI18n({
// 	// 是否在vue应用程序上使用vue-i18n Legacy API（传统）模式
// 	legacy: false,
// 	// 默认当前语言
// 	locale: useSystem.language,
// 	// 是否为每个组件注入全局属性和函数（true 后 在template中可以直接使用$t('')）
// 	globalInjection: true,
// 	// 语言合集
// 	messages: {
// 		zh: zhCN,
// 		en: enUS,
// 	},
// });

export default function useI18nFn(app: any) {
	app.use(i18n);
	// const locale = i18n.global.locale;

	// app.provide<VueI18nTranslation>('t', app.config.globalProperties.$t);
}
