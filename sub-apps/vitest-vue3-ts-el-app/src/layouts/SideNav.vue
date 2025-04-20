<script lang="ts" setup>
import { type Ref, ref, onMounted, nextTick, watchEffect, getCurrentInstance, provide, inject } from 'vue';
import { useRouter, useRoute, type RouteLocationNormalizedLoaded, type Router } from "vue-router";
import { trimEnd } from 'lodash-es';
import subMicroApp, { getActiveApps, EventCenterForMicroApp } from '@micro-zoe/micro-app';

subMicroApp.start({
	tagName: 'micro-app-navvue3',
	iframe: true,
	// 'keep-alive': true, // 全局开启保活模式，默认为false
	// 'keep-router-state': true,
});

// @ts-ignore 因为vite子应用关闭了沙箱，我们需要为子应用appname-vite创建EventCenterForMicroApp对象来实现数据通信
// window.eventCenterForAppViteSideNav = new EventCenterForMicroApp('app-sidenav');

const { proxy } = getCurrentInstance() as any;
const $router: Router = useRouter();
const $route: RouteLocationNormalizedLoaded = useRoute();
// 针对类型的 defineProps 声明的不足之处在于，它没有可以给 props 提供默认值的方式。为了解决这个问题，我们还提供了 withDefaults 编译器宏：
export interface Props {
  menuType: string,
  isFold?: boolean,
  uniqueOpen?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  menuType: 'main',
  isFold: false,
  uniqueOpen: true,
})

const { menuType, isFold, uniqueOpen } = toRefs(props);

const emit = defineEmits<{
  update: [params: object]
}>();

const menuList: any[] = [
	{
		iconTag: 'House',
		title: '概览',
		path: '/home',
	},
	{
		iconTag: 'PieChart',
		title: 'Echart图表',
		children: [
			{
				title: '通用图表',
				path: '/charts/index',
			},
			{
				title: 'D3图表',
				path: '/charts/d3charts',
			},
		],
	},
	{
		iconTag: 'Postcard',
		title: '表单展示',
		path: '/forms',
	},
	{
		iconTag: 'Grid',
		title: '表格展示',
		path: '/tables',
	},
	{
		iconTag: 'ChatLineSquare',
		title: 'Ai问答',
		path: '/aichat',
	},
	{
		iconTag: 'Rank',
		title: '拖拽组件',
		path: '/pagedraggable',
	},
	{
		iconTag: 'Picture',
		title: '图片展示',
		path: '/pictures',
	},
];

// 👇 主应用向sidebar子应用下发一个名为pushState的方法
const sidebarData: Ref<any> = ref({
  menuList,
  baseRouter: '/sub-vite-vue3',
  subName: 'app-subvue3',
  // 子应用sidebar通过pushState控制主应用跳转
  pushState: async (path: string, hash: string, appName?: string) => {
    hash && (path += `/${hash}`);
		// 主应用跳转
    $router.push(path);

    await nextTick();
    // 子应用内部跳转时，通知侧边栏改变菜单状态
    // if (window.eventCenterForAppViteSideNav) {
    //   // 发送全局数据，通知侧边栏修改菜单展示
    //   window.eventCenterForAppViteSideNav.setGlobalData({ name: 'app-sidenav-vue3' })
    // }
  },
})

// const refreshMenu = (route: any) => {
//   console.log('lo-route:', trimEnd(route.path, '/'));
//   menuState.activeName = trimEnd(route.path, '/');
// }


onMounted(() => {
  // const userInfo: any = JSON.parse(<string>localStorage.getItem('user_info'))
  // console.log("userInfo",  userInfo)
  // state.userName = userInfo.name
  // console.log('eventCenterForAppViteSideNav:', window.eventCenterForAppViteSideNav);
  // refreshMenu(proxy.$route);
  //      this.$router.afterEach((to, from) => {
  //        this.refreshMenu(to)
	//      })
	
	subMicroApp.setData('app-sidenav-vue3', {
		menuList,
		baseRouter: '/sub-vite-vue3',
		subName: 'app-subvue3',
		// 子应用sidebar通过pushState控制主应用跳转
		pushState: async (path: string, hash: string, appName?: string) => {
			console.log('subvue3-pushState:', path, hash, appName);

			hash && (path += `/${hash}`);
			// 主应用跳转
			$router.push(path);

			// await nextTick();
			// 子应用内部跳转时，通知侧边栏改变菜单状态
			// if (window.eventCenterForAppViteSideNav) {
			//   // 发送全局数据，通知侧边栏修改菜单展示
			//   window.eventCenterForAppViteSideNav.setGlobalData({ name: 'app-sidenav-vue3' })
			// }
		},
	});
});
</script>

<template>
  <!-- data只接受对象类型，采用严格对比(===)，当传入新的data对象时会重新发送  /sub-vite-side/subnav/ :data="sidebarData"-->
  <micro-app-navvue3
    name="app-sidenav-vue3"
    url="http://localhost:3606/sub-vite-menu/"
    baseroute="/sub-vite-menu/"
  ></micro-app-navvue3>
</template>
