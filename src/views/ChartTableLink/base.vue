<template>
  <div class="p-4">
    <div ref="chartRef" style="width: 100%; height: 400px;" />
    <table class="mt-4 border w-full">
      <thead>
        <tr>
          <th class="border px-2">名称</th>
          <th class="border px-2">值</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="index">
          <td class="border px-2">{{ item.name }}</td>
          <td class="border px-2">{{ item.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';

const chartRef = ref(null);
const tableData = ref([
  { name: '产品A', value: 120 },
  { name: '产品B', value: 200 },
  { name: '产品C', value: 150 },
  { name: '产品D', value: 80 }
]);

onMounted(() => {
  const chart = echarts.init(chartRef.value);
  chart.setOption({
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
  });
});
</script>
