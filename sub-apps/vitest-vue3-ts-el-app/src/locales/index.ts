import type { App } from 'vue';
import type { VueI18nTranslation } from 'vue-i18n';
import { createI18n } from 'vue-i18n';
import elementZhCN from 'element-plus/es/locale/lang/zh-cn';
import elementEnUS from 'element-plus/es/locale/lang/en';
import zhCN from './lang/zh-CN';
import enUS from './lang/en-US';

// import type { Locale } from '$types/vue';

// 合并Element Plus的语言包
const messages = {
	// 'zh-CN': zhCN,
	// 'en-US': enUS,
	'zh-CN': {
		...zhCN,
		el: elementZhCN.el,
	},
	'en-US': {
		...enUS,
		el: elementEnUS.el,
	},
};

// 创建i18n实例
const i18n = createI18n({
	// silentTranslationWarn: true,
	// missingWarn: false,
	// silentFallbackWarn: true,
	// fallbackWarn: false,

	// 是否在vue应用程序上使用vue-i18n Legacy API（传统）模式
	legacy: false, // 使用 Composition API 模式
	// 默认当前语言  themeConfig.value.globalI18n, // 采用全局参数配置初始化语言 项目中有`zh-cn`、`en`两种
	locale: localStorage.getItem('lang') || 'zh-CN',
	// 回退语言
	fallbackLocale: 'zh-CN',
	// 是否为每个组件注入全局属性和函数（true 后 在template中可以直接使用$t('')）
	globalInjection: true,
	// 语言合集
	messages,
});

const locale = i18n.global.locale;

export { locale, i18n };
