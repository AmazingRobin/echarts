<!-- ChartMultiLineOptimized.vue -->
<template>
  <div class="chart-container">
    <div ref="chart1" class="chart-box"></div>
    <div ref="chart2" class="chart-box"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref, onBeforeUnmount } from 'vue'
import throttle from 'lodash/throttle'

const chart1 = ref(null)
const chart2 = ref(null)
const groupId = 'optimized-group'
let c1, c2

const generateOption = () => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'cross' },
    confine: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: Array.from({ length: 100 }, (_, i) => `Day ${i + 1}`),
  },
  yAxis: { type: 'value' },
  dataZoom: [{ type: 'inside' }],
  series: [
    {
      name: '优化线',
      type: 'line',
      smooth: true,
      data: Array.from({ length: 100 }, () => Math.floor(Math.random() * 200)),
    },
  ],
})

const handleResize = throttle(() => {
  c1?.resize()
  c2?.resize()
}, 200)

onMounted(() => {
  c1 = echarts.init(chart1.value)
  c2 = echarts.init(chart2.value)
  c1.group = groupId
  c2.group = groupId
  echarts.connect(groupId)

  c1.setOption(generateOption())
  c2.setOption(generateOption())


  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  echarts.disconnect(groupId)
  c1?.dispose()
  c2?.dispose()
})
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chart-box {
  width: 100%;
  height: 300px;
}
</style>
