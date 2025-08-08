<!-- ChartMultiLineUnoptimized.vue -->
<template>
  <div class="chart-container">
    <div ref="chart1" class="chart-box"></div>
    <div ref="chart2" class="chart-box"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const chart1 = ref(null)
const chart2 = ref(null)
const groupId = 'linked-charts'

const option = {
  tooltip: { trigger: 'axis', axisPointer: { type: 'line' } },
  xAxis: { type: 'category', data: Array.from({ length: 50 }, (_, i) => `Day ${i + 1}`) },
  yAxis: { type: 'value' },
  dataZoom: [{ type: 'inside' }],
  series: [
    {
      name: 'A线',
      type: 'line',
      data: Array.from({ length: 50 }, () => Math.floor(Math.random() * 100)),
    },
  ],
}

onMounted(() => {
  const c1 = echarts.init(chart1.value)
  const c2 = echarts.init(chart2.value)
  c1.group = groupId
  c2.group = groupId

  c1.setOption(option)
  c2.setOption(option)

  echarts.connect(groupId)

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
