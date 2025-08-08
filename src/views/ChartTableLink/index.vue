<template>
  <div class="p-4 w-full">
    <div ref="chartRef" class="w-full h-100" />
    <table class="mt-4 border w-full">
      <thead>
        <tr>
          <th class="border px-2">名称</th>
          <th class="border px-2">值</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="index" :class="{ 'bg-yellow-200': index === activeIndex }"
          @click="toChart(index)">
          <td class="border px-2">{{ item.name }}</td>
          <td class="border px-2">{{ item.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { throttle } from 'lodash';
import { ref, onMounted } from 'vue';

const chartRef = ref(null);
const chart = ref(null);
const tableData = ref([
  { name: '产品A', value: 120 },
  { name: '产品B', value: 200 },
  { name: '产品C', value: 150 },
  { name: '产品D', value: 80 }
]);

const activeIndex = ref(-1);
const toChart = (index) => {
  activeIndex.value = index;
  chart.value.dispatchAction({
    type: 'highlight',
    seriesIndex: 0,
    dataIndex: index
  })

  chart.value.dispatchAction({
    type: 'showTip',
    seriesIndex: 0,
    dataIndex: index
  })
}
const handleResize = throttle(() => {
  chart.value.resize();
}, 300);

onMounted(() => {
  chart.value = echarts.init(chartRef.value);
  const option = {
    tooltip: {},
    xAxis: {
      type: 'category',
      data: tableData.value.map(i => i.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'bar',
        data: tableData.value.map(i => i.value)
      }
    ]
  };
  chart.value.setOption(option);

  chart.value.on('click', params => {
    activeIndex.value = params.dataIndex;
  });

  window.addEventListener('resize', handleResize);
});
</script>