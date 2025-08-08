<!-- ChartLinkage.vue -->
<template>
  <div class="charts-wrapper">
    <div ref="barRef" class="chart-box" />
    <div ref="pieRef" class="chart-box" />
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

// 假数据
const brandData = [
  { name: '苹果', value: 1200 },
  { name: '小米', value: 900 },
  { name: '华为', value: 1100 },
];

const regionMap = {
  '苹果': [
    { name: '北京', value: 400 },
    { name: '上海', value: 500 },
    { name: '深圳', value: 300 },
  ],
  '小米': [
    { name: '北京', value: 300 },
    { name: '广州', value: 400 },
    { name: '成都', value: 200 },
  ],
  '华为': [
    { name: '上海', value: 400 },
    { name: '杭州', value: 400 },
    { name: '武汉', value: 300 },
  ],
};

// 引用容器
const barRef = ref(null);
const pieRef = ref(null);

let barChart, pieChart;

onMounted(() => {
  // 初始化图表
  barChart = echarts.init(barRef.value);
  pieChart = echarts.init(pieRef.value);

  // 渲染柱状图
  barChart.setOption({
    title: { text: '品牌销量' },
    tooltip: {},
    xAxis: { type: 'category', data: brandData.map(b => b.name) },
    yAxis: { type: 'value' },
    series: [{
      type: 'bar',
      data: brandData.map(b => b.value),
    }]
  });

  // 渲染初始饼图（默认第一个品牌）
  updatePieChart('苹果');

  // 监听柱状图点击
  barChart.on('click', (params) => {
    const brand = params.name;
    updatePieChart(brand);
  });
});

// 更新饼图函数
function updatePieChart(brand) {
  const pieData = regionMap[brand] || [];
  pieChart.setOption({
    title: { text: `${brand} 地区销量占比` },
    series: [{
      type: 'pie',
      radius: '50%',
      data: pieData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  });
}
</script>

<style scoped>
.charts-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 20px;
}

.chart-box {
  width: 400px;
  height: 300px;
}
</style>
