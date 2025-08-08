<!-- ChartMultiLineBasic.vue -->
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

const option = {
  title: { text: '示例折线图' },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: Array.from({ length: 10 }, (_, i) => `Day ${i + 1}`) },
  yAxis: { type: 'value' },
  series: [
    {
      name: '访问量',
      type: 'line',
      data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
    },
  ],
}

onMounted(() => {
  echarts.init(chart1.value).setOption(option)
  echarts.init(chart2.value).setOption(option)
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
