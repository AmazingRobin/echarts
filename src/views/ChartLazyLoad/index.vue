<template>
  <div class="h-300 w-full">
    <p>往下滚动，看到下面图表区域时才加载图表</p>
    <div class="h-260">（占位内容）</div>

    <div ref="chartContainer" class="w-150 h-100 border border-gray-300 m-auto">
      <template v-if="isVisible">
        <div ref="chartRef" style="width: 100%; height: 100%;"></div>
      </template>
      <template v-else>
        <p class="text-center lh-100">图表加载中...</p>
      </template>
    </div>
    <div class="h-200 leading-100">（占位内容）</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const chartContainer = ref(null)
const chartRef = ref(null)
const isVisible = ref(false)
let chartInstance = null
let observer = null

const initChart = () => {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)
  chartInstance.setOption({
    title: { text: '懒加载示例图表' },
    tooltip: {},
    xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E', 'F'] },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: [5, 20, 36, 10, 10, 20] }],
  })
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      console.log(entries)
      if (entry.isIntersecting) {
        isVisible.value = true
      }
    },
    { threshold: 0.1 }
  )
  if (chartContainer.value) {
    observer.observe(chartContainer.value)
  }
})

watch(isVisible, (visible) => {
  if (visible) {
    // 延迟确保 DOM 渲染完成
    setTimeout(() => {
      initChart()
    }, 100)
    observer.disconnect() // 只触发一次懒加载，断开监听
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
  chartInstance?.dispose()
})
</script>

<style scoped></style>
