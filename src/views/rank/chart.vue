<script lang="ts" setup>
import { onMounted, watchEffect } from 'vue'
import { useStore, dataStore } from '@/store'
import { rank } from '@/axios/api'
import * as echarts from 'echarts/core'
import { DatasetComponent, DatasetComponentOption, TooltipComponent, TooltipComponentOption, GridComponent, GridComponentOption } from 'echarts/components'
import { BarChart, BarSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

const store = useStore()
const data = dataStore()

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
      return `${t[1]} lv.${t[3]}<br/>${data.server[t[0]][1]}<br/>${params[0].marker}${t[2]}`
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
  const myChart = echarts.init(document.getElementById('echarts')!)
  
  watchEffect(async () => {
    option.dataset[0].source = store.rank[store.rankType][store.serverId]
      || (store.rank[store.rankType][store.serverId] = await rank({ rankType: store.rankType, serverId: store.serverId }))
    option && myChart.setOption(option)
  })
})
</script>

<template>
  <div id="echarts"></div>
</template>

<style lang="scss" scoped>

</style>