<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface Props {
  // 列表数据
  items: any[]
  // 每项高度
  itemHeight: number
  // 可视区域高度
  visibleHeight: number
  // 预渲染的额外项数
  preloadCount?: number
  // 是否还有更多数据
  hasMore?: boolean
  // 加载更多的回调
  loadMore?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  preloadCount: 5,
  hasMore: false
})

// 滚动容器ref
const containerRef = ref<HTMLElement | null>(null)
// 当前滚动位置
const scrollTop = ref(0)
// 是否正在加载更多
const loading = ref(false)

// 计算起始索引
const startIndex = computed(() => {
  return Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - props.preloadCount)
})

// 计算结束索引
const endIndex = computed(() => {
  const visibleCount = Math.ceil(props.visibleHeight / props.itemHeight)
  return Math.min(props.items.length, startIndex.value + visibleCount + 2 * props.preloadCount)
})

// 计算可见项目
const visibleItems = computed(() => {
  return props.items.slice(startIndex.value, endIndex.value)
})

// 计算总高度
const totalHeight = computed(() => {
  return props.items.length * props.itemHeight
})

// 计算偏移量
const offsetY = computed(() => {
  return startIndex.value * props.itemHeight
})

// 处理滚动事件
const handleScroll = () => {
  if (!containerRef.value) return
  scrollTop.value = containerRef.value.scrollTop
  
  // 检查是否需要加载更多
  if (props.hasMore && !loading.value) {
    const { scrollHeight, scrollTop, clientHeight } = containerRef.value
    if (scrollHeight - scrollTop - clientHeight < props.itemHeight * props.preloadCount) {
      loadMoreData()
    }
  }
}

// 加载更多数据
const loadMoreData = async () => {
  if (loading.value || !props.loadMore) return
  loading.value = true
  try {
    await props.loadMore()
  } finally {
    loading.value = false
  }
}

// 监听组件挂载
onMounted(() => {
  containerRef.value?.addEventListener('scroll', handleScroll)
})

// 组件卸载时清理
onUnmounted(() => {
  containerRef.value?.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    ref="containerRef"
    class="virtual-list-container"
    :style="{ height: `${visibleHeight}px`, overflow: 'auto' }"
  >
    <div
      class="virtual-list-phantom"
      :style="{ height: `${totalHeight}px` }"
    />
    <div
      class="virtual-list-content"
      :style="{ transform: `translate3d(0, ${offsetY}px, 0)` }"
    >
      <div
        v-for="(item, index) in visibleItems"
        :key="startIndex + index"
        :style="{ height: `${itemHeight}px` }"
        class="virtual-list-item"
      >
        <slot :item="item" :index="startIndex + index" />
      </div>
    </div>
    <div v-if="loading" class="virtual-list-loading">
      加载中...
    </div>
  </div>
</template>

<style scoped>
.virtual-list-container {
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.virtual-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.virtual-list-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  will-change: transform;
}

.virtual-list-loading {
  text-align: center;
  padding: 10px 0;
}
</style> 