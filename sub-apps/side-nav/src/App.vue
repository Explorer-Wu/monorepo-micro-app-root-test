<script lang="ts" setup>
import { reactive, UnwrapRef, ref, toRefs, computed, onMounted, watchEffect, getCurrentInstance, provide, inject } from 'vue';
// import { useRouter } from "vue-router";
import { trimEnd } from 'lodash-es';

const { proxy } = getCurrentInstance() as any;
// 针对类型的 defineProps 声明的不足之处在于，它没有可以给 props 提供默认值的方式。为了解决这个问题，我们还提供了 withDefaults 编译器宏：
export interface Props {
  menuType: string,
  isFold?: boolean,
  uniqueOpen?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  isFold: false,
})

const { isFold } = toRefs(props);

const emit = defineEmits<{
  update: [params: object]
}>();

const menuState = reactive({
  activeName: proxy.$route.path,
  navItems: [
    {
      iconClass: 'el-icon-house',
      title: '首页',
      path: '/home'
    },
    {
      iconClass: 'el-icon-tickets',
      title: '用户中心',
      path: '/accounts'
    },
    {
      iconClass: 'el-icon-pie-chart',
      title: '个人中心',
      path: '/myself/index'
    },
  ],
  backUrl: '',
  userName: ''
});

const refreshMenu = (route: any) => {
  console.log('lo-route:', trimEnd(route.path, '/'));
  menuState.activeName = trimEnd(route.path, '/');
}

const handleOpen = (key: string, keyPath: string[]) => {
  if (props.menuType === 'main') {
    proxy.$router.push({ path: keyPath });
  }
}

const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
}

onMounted(() => {
  // const userInfo: any = JSON.parse(<string>localStorage.getItem('user_info'))
  // console.log("userInfo",  userInfo)
  // state.userName = userInfo.name
  console.log('methods:',refreshMenu);
  refreshMenu(proxy.$route);
  //      this.$router.afterEach((to, from) => {
  //        this.refreshMenu(to)
  //      })
});

  // onUnmounted(() => {
  // });
</script>

<template>
  <el-menu
    ref="refSideNavMenu"
    mode="vertical"
    :default-active="menuState.activeName"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isFold"
    unique-opened="true"
    background-color="#0a1e50"
    text-color="#fff"
    active-text-color="#ffd06b"
    collapse-transition="true"
    router="true"
  >
    <template v-for="(item, indx) in menuState.navItems">
      <el-submenu v-if="item.children" :index="item.path" :key="`${item.path}+${indx}`">
        <template #title>
          <i :class="item.iconClass"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item-group>
          <!-- <template #title>分组一</template> -->
          <el-menu-item v-for="chitem in item.children" :key="chitem.path" :index="chitem.path">{{ chitem.title }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item v-else :index="item.path" :key="item.path">
        <i :class="item.iconClass"></i>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<style lang="scss" scoped>
#sidebar-app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: inline-block;
  margin-right: 40px;
  border-right: 1px solid rgb(230, 230, 230);
}

h4 {
  font-weight: revert;
}

.el-menu-item {
  font-size: 16px;
}

.el-menu {
  width: 200px;
  border-right: none;
}

.submenu-text {
  font-size: 16px;
  user-select: none;
}

.menu-item-text {
  font-size: 14px;
  user-select: none;
}
</style>
