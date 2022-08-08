<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { dataStore } from '@/store'
import { load } from '@/axios/data'
import * as echarts from 'echarts/core'
import { DatasetComponent, DatasetComponentOption, GraphicComponent, GraphicComponentOption, GridComponent, GridComponentOption } from 'echarts/components'
import { BarChart, BarSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

const route = useRoute()
const data = dataStore()

const { year, region } = route.params
data.ship = data.ship ?? await load('ui', 'ship')
const vote = await load('vote', `${year}-${region}`)

echarts.use([DatasetComponent, GraphicComponent, GridComponent, BarChart, CanvasRenderer])

type EChartsOption = echarts.ComposeOption<DatasetComponentOption | GraphicComponentOption | GridComponentOption | BarSeriesOption>

const option: EChartsOption = {
  dataset: [{ dimensions: ['name', 'point'] }],
  xAxis: {
    max: 'dataMax'
  },
  yAxis: {
    type: 'category',
    inverse: true,
    animationDuration: 0,
    animationDurationUpdate: 300
  },
  series: {
    realtimeSort: true,
    type: 'bar',
    encode: {
      x: 'point',
      y: 'name'
    },
    label: {
      show: true,
      position: 'right',
      valueAnimation: true,
      fontSize: 14,
      fontFamily: 'monospace'
    }
  },
  animationDuration: 1000,
  animationDurationUpdate: 1000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear',
  graphic: {
    elements: [
      {
        type: 'text',
        right: 100,
        bottom: 100,
        style: {
          font: 'bolder 80px monospace',
          fill: 'rgba(100, 100, 100, 0.25)'
        },
        z: 100
      }
    ]
  }
}

onMounted(() => {
  const myChart = echarts.init(document.getElementById('echarts')!)

  Object.keys(vote).forEach((k, i) => {
    setTimeout(() => {
      option.dataset[0].source = vote[k].map((d: [string, number]) => {
        return [data.ship[d[0]][0], d[1]]
      });
      (option as any).graphic.elements[0].style.text = k.replace(' ', '\n')
      myChart.setOption(option)
    }, i * 1000)
  })
})
</script>

<template>
  <div id="echarts"></div>
</template>

<style lang="scss" scoped>

</style>