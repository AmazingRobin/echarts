<template>
  <div ref="chartRef" style="width: 100%; height: 500px;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)

function getStandardNormalQuantile(p) {
  // 使用近似公式计算标准正态分布分位点（z值）
  // Abramowitz and Stegun approximation
  if (p < 0.5) return -getStandardNormalQuantile(1 - p)
  const a1 = -39.6968302866538,
    a2 = 220.946098424521,
    a3 = -275.928510446969
  const a4 = 138.357751867269,
    a5 = -30.6647980661472,
    a6 = 2.50662827745924

  const b1 = -54.4760987982241,
    b2 = 161.585836858041,
    b3 = -155.698979859887
  const b4 = 66.8013118877197,
    b5 = -13.2806815528857

  const c1 = -0.00778489400243029,
    c2 = -0.322396458041136,
    c3 = -2.40075827716184
  const c4 = -2.54973253934373,
    c5 = 4.37466414146497,
    c6 = 2.93816398269878

  const d1 = 0.00778469570904146,
    d2 = 0.32246712907004,
    d3 = 2.445134137143,
    d4 = 3.75440866190742

  const plow = 0.02425
  const phigh = 1 - plow

  let q, r
  if (p < plow) {
    q = Math.sqrt(-2 * Math.log(p))
    return (
      (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
      ((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
    )
  }

  if (phigh < p) {
    q = Math.sqrt(-2 * Math.log(1 - p))
    return -(
      ((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
      ((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
  }

  q = p - 0.5
  r = q * q
  return (
    (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q /
    (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1)
  )
}

onMounted(() => {
  const chart = echarts.init(chartRef.value)

  // 假数据：20 个数据点
  const rawData = [12, 14, 15, 16, 17, 18, 20, 21, 21.5, 22, 23, 24, 25, 26, 28, 30, 32, 35, 37, 40].sort((a, b) => a - b)

  // 转换为概率点（累积分布概率 + Z 分数）
  const n = rawData.length
  const data = rawData.map((x, i) => {
    const p = (i + 1 - 0.5) / n // 使用 Blom's公式
    const z = getStandardNormalQuantile(p) // z-score
    return [z, x]
  })

  chart.setOption({
    title: {
      text: '正态概率图',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: params => {
        const { data } = params[0]
        return `Z: ${data[0].toFixed(2)}<br>值: ${data[1]}`
      }
    },
    xAxis: {
      name: 'Z 值',
      type: 'value'
    },
    yAxis: {
      name: '数据值',
      type: 'value'
    },
    series: [
      {
        type: 'line',
        data,
        smooth: true,
        symbolSize: 8,
        lineStyle: {
          width: 2
        },
        itemStyle: {
          color: '#5470C6'
        }
      }
    ]
  })
})
</script>
