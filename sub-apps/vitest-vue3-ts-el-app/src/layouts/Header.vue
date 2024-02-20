<template>
  <div class="head-bar">
    <i @click="$emit('collapsed')" :class="isFoldIcon"></i>
    <div class="layout-nav">
      <span>王小虎</span>
        <!-- <i class="el-icon-edit win-icon" @click="$EventBus.$emit('showModifyPwd', true)"></i> -->
        <!-- <i class="el-icon-switch-button win-icon" @click="$EventBus.$emit('showLogout', true)"></i> -->
        <!-- <i class="el-icon-minus win-icon" @click="minimizeWin"></i> -->
        <!-- <i class="el-icon-copy-document win-icon" @click="maximizeWin"></i> -->
        <!-- <i class="el-icon-close win-icon" @click="closeWin"></i> -->
        <el-dropdown style="line-height: 50px">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, computed, toRefs, toRaw, ref, getCurrentInstance } from 'vue';
// import { useRouter } from "vue-router";
// import { mapState, mapGetters, mapActions } from 'vuex';
export default defineComponent({
  name: "HeadTop",
  props: {
    username: String,
    isRotate: Boolean
    //value: String
  },
  emits: ["collapsed"],
  setup(props: any, context: any) {
    // const { proxy } = getCurrentInstance() as any;
    // const state = reactive({
    //   // datetime: ref<any[]>([]),
    // });
    
    const isFoldIcon = computed(() => [
      'menu-icon',
      props.isRotate ? 'el-icon-s-fold' : 'el-icon-s-unfold'
    ]);

    return {
      isFoldIcon
    };
  }
})
</script>

<style lang="scss" scoped>
  .head-bar {
    height: 50px;
    // width: 100%;
    top: 0;
    left: 0;
    padding: 0;
    line-height: 50px;
    font-size: 14px;
    /*background: #373d41;*/
    color: #666;
    text-align: left;

    .win-icon {
      // display: inline-block;
      width: 20px;
      height: 20px;
      margin: auto 8px;
      cursor: pointer;
    }
  }

  .menu-icon {
    transition: all .3s;
    margin-left: 15px;
    cursor: pointer;
  }
</style>
