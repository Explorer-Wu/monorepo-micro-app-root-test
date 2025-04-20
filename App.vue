<script setup lang="ts">
import { ref } from 'vue'
import VirtualList from './VirtualList.vue'

// 模拟数据
const items = ref(Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: `项目 ${i}`,
  content: `这是第 ${i} 个项目的内容`
})))

// 是否还有更多数据
const hasMore = ref(true)

// 加载更多数据
const loadMore = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lastId = items.value[items.value.length - 1].id
      const newItems = Array.from({ length: 10 }, (_, i) => ({
        id: lastId + i + 1,
        title: `项目 ${lastId + i + 1}`,
        content: `这是第 ${lastId + i + 1} 个项目的内容`
      }))
      
      items.value = [...items.value, ...newItems]
      
      // 模拟数据上限为100条
      if (items.value.length >= 100) {
        hasMore.value = false
      }
      
      resolve()
    }, 1000)
  })
}
</script>

<template>
  <div class="app-container">
    <h1>虚拟列表示例</h1>
    <VirtualList
      :items="items"
      :item-height="80"
      :visible-height="400"
      :has-more="hasMore"
      :load-more="loadMore"
    >
      <template #default="{ item }">
        <div class="list-item">
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
        </div>
      </template>
    </VirtualList>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.list-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  background: #fff;
}

.list-item h3 {
  margin: 0 0 8px;
  font-size: 16px;
}

.list-item p {
  margin: 0;
  color: #666;
}
</style> 