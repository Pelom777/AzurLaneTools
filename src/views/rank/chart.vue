<script lang="ts" setup>
import { rank } from '@/axios/api'
import * as echarts from 'echarts/core'
import { DatasetComponent, DatasetComponentOption, TooltipComponent, TooltipComponentOption, GridComponent, GridComponentOption } from 'echarts/components'
import { BarChart, BarSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

const props = defineProps<{
  server: [],
  serverId: number,
  rankType: number
}>()
const container = ref<HTMLDivElement>()

echarts.use([DatasetComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer])

type EChartsOption = echarts.ComposeOption<DatasetComponentOption | TooltipComponentOption | GridComponentOption | BarSeriesOption>

const option: EChartsOption = {
  dataset: [{ dimensions: ['server', 'name', 'point', 'level'] }],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: (params) => {
      var t = params[0].value
      return `${t[1]} lv.${t[3]}<br/>${props.server[t[0]][1]}<br/>${params[0].marker}${t[2]}`
    }
  },
  xAxis: {
    max: 'dataMax'
  },
  yAxis: {
    type: 'category',
    inverse: true
  },
  series: {
    type: 'bar',
    encode: {
      x: 'point',
      y: 'name'
    },
    label: {
      show: true,
      position: 'insideRight'
    }
  }
}

onMounted(() => {
  const myChart = echarts.init(container.value)
  
  watchEffect(async () => {
    ;(async () => {
      option.dataset[0].source = await rank({ rankType: props.rankType, serverId: props.serverId })
      option && myChart.setOption(option)
    })()
  })
})
</script>

<template>
  <div id="echarts" ref="container"></div>
</template>

<style lang="scss" scoped>

</style>