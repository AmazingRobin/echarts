<template>
  <ul class="text-left ml-50">
    <li>优化配置：</li>
    <li>1、tooltip.axisPointer.type = none</li>
    <li>2、xAxis.boundaryGap = false</li>
    <li>3、series.sampling = lttb</li>
    <li>4、series.large = true</li>
  </ul>
  <div ref="chartRef" class="w-full h-[500px]"></div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { throttle } from 'lodash'

const chartRef = ref(null)

onMounted(() => {
  const chart = echarts.init(chartRef.value)

  const data = Array.from({ length: 50000 }, (_, i) => [i, Math.sin(i / 100) * 50 + Math.random() * 10])

  chart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none' // 关闭 axisPointer，避免卡顿
      }
    },
    xAxis: {
      type: 'value',
      boundaryGap: false
    },
    yAxis: { type: 'value' },
    series: [{
      type: 'line',
      data,
      large: true,
      largeThreshold: 20000,
      showSymbol: false,
      sampling: 'lttb'
    }]
  })
  const handleResize = throttle(() => {
    chart?.resize()
  }, 300)
  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    chart?.dispose()
  })
})
</script>
