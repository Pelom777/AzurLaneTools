<script lang="ts" setup>
import * as echarts from 'echarts/core'
import { DatasetComponent, DatasetComponentOption } from 'echarts/components'
import { RadarChart, RadarSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

const props = defineProps<{
  attr: {}
}>()
const container = ref<HTMLDivElement>()
const level = ref(120), strengthen = ref(true), favor = ref(4), transform = ref(!!props.attr['transform'])
const attr = computed(() => {
  const attr = props.attr['base'].map((e, i) => Math.floor((e + props.attr['growth'][i] * (level.value - 1) / 1000 + (strengthen.value ? (props.attr['strengthen'][i - 1] ?? 0) * Math.min(level.value / 100 * 0.7 + 0.3, 1) : 0)) * (1 + ((i == 6 || i == 9 || i== 10 ) ? 0 : [0, 0, 0.01, 0.03, 0.06, 0.09, 0.12][favor.value])) + (transform.value ? props.attr['transform'][i] : 0)))
  return [0, 1, 2, 4, 8, 3, 5, 7, 11, 9, 10, 6].map(e => attr[e])
})
const perf = computed(() => {
  return Math.floor([0.2, 1, 1, 1, 2, 1, 1, 2, 1, 1].reduce((p, c, i) => p + c * attr.value[i], 0) + (transform.value ? props.attr['gear_score'] : 0))
})

echarts.use([DatasetComponent, RadarChart, CanvasRenderer])

type EChartsOption = echarts.ComposeOption<
  DatasetComponentOption | RadarSeriesOption
>

const option: EChartsOption = {
  dataset: [{}],
  radar: {
    startAngle: 30,
    indicator: [
      { name: '耐久', min:-2000, max: 10000, color: '#18222c' },
      { name: '炮击', min:-125, max: 500, color: '#18222c' },
      { name: '雷击', min:-150, max: 600, color: '#18222c' },
      { name: '航空', min:-125, max: 500, color: '#18222c' },
      { name: '机动', min:-75, max: 300, color: '#18222c' },
      { name: '防空', min:-125, max: 500, color: '#18222c' }
    ],
    splitArea: {
      areaStyle: {
        color: ['#2a598a', '#66b1ff'],
        opacity: .3
      }
    }
  },
  series: [
    {
      type: 'radar',
      symbol: 'none',
      areaStyle: {
        opacity: .5
      }
    }
  ]
}

onMounted(() => {
  const myChart = echarts.init(container.value)
  
  watchEffect(() => {
    option.dataset[0].source = [attr.value]
    option && myChart.setOption(option)
  })
})
</script>

<template>
  <el-card>
    <template #header>
      <el-row>
        <el-col :span="6">
          <div class="el-statistic">
            <div class="el-statistic__head">等级</div>
            <div class="el-statistic__content">
              <el-input-number
                v-model="level"
                :min="70"
                :max="125"
                step-strictly
                size="small"
              />
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="el-statistic">
            <div class="el-statistic__head">强化</div>
            <div class="el-statistic__content">
              <el-switch v-model="strengthen" size="small" />
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="el-statistic">
            <div class="el-statistic__head">改造</div>
            <div class="el-statistic__content">
              <el-switch v-model="transform" size="small" :disabled="!props.attr['transform']" />
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="el-statistic">
            <div class="el-statistic__head">好感</div>
            <div class="el-statistic__content">
              <el-select v-model="favor" size="small">
                <el-option
                  v-for="(e, i) in ['失望', '陌生', '友好', '喜欢', '爱', '誓约', '誓约200']"
                  :value="i"
                  :label="e"
                />
              </el-select>
            </div>
          </div>
        </el-col>
      </el-row>
    </template>
    <div id="echarts" ref="container"></div>
    <el-row>
      <el-col
        v-for="(e, i) in ['耐久', '炮击', '雷击', '航空', '机动', '防空', '装填', '命中', '反潜', '航速', '幸运', '消耗']"
        :span="6"
      >
        <el-statistic :title="e" :value="attr[i]">
        </el-statistic>
      </el-col>
      <el-col>
        <el-statistic title="综合性能" :value="perf">
        </el-statistic>
      </el-col>
    </el-row>
  </el-card>
</template>

<style lang="scss" scoped>
.el-card {
  width: 24em;
  max-width: 100%;
  float: right;
  background: #fff8;
  backdrop-filter: blur(5px);

  &:deep(.el-card__header) {
    background: #fffa;

    & .el-input-number {
      width: auto;
    }
  }

  & .el-col {
    text-align: center;
  }

  & #echarts {
    height: 24em;
  }

  &:deep(.el-card__body) {
    & .el-col {
      margin-bottom: 10px;
    }
  }

  &:deep(.el-statistic__head) {
    color: #18222c;
  }

  &:deep(.el-statistic__content) {
    color: #5470c6;
  }
}
</style>