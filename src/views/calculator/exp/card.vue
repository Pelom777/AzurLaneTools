<script lang="ts" setup>
import { useStore } from '@/store'

const props = defineProps<{
  info: {},
  ship: {},
  exp: []
}>()
const emits = defineEmits(['delete'])
const { user } = useStore()
const cdn = import.meta.env.VITE_CDN
const range = computed(() => {
  return props.exp[props.info['from'] + 1] - props.exp[props.info['from']] - 1 || 3000000
})
const need = computed(() => {
  return Math.max(0, props.exp[props.info['to']] - props.exp[props.info['from']] - props.info['base'])
})
const time = computed(() => {
  const { level, backyard: { comfort, buff, count } } = user
  const speed = Math.floor((240 + 12 * level) * (1 + comfort / (100 + comfort)) * (1 + buff / 100) * [1, 0.9, 0.8, 0.7, 0.64, 0.6][count - 1])
  const time = Math.floor(need.value / speed)
  const day = Math.floor(time / 24)
  const hour = time % 24
  return day == 0 ? `${hour}小时` : `${day}天${hour}小时`
})
</script>

<template>
  <el-card>
    <h1>
      <el-avatar size="large" :src="`${cdn}/squareicon/${ship['painting']}.png`" />
      <el-divider direction="vertical" />
      <span>{{ ship['name'] }}</span>
      <el-button circle type="danger" size="small" @click="$emit('delete')">
        <el-icon>
          <i-ep-Close />
        </el-icon>
      </el-button>
    </h1>
    <h3>
      <span>lv.</span>
      <el-slider v-model="info['from']" :min="1" :max="125" show-input size="small" />
    </h3>
    <h3>
      <span>exp</span>
      <el-slider v-model="info['base']" :min="0" :max="range" show-input size="small" />
    </h3>
    <h3>
      <el-icon>
        <i-ep-ArrowDownBold />
      </el-icon>
    </h3>
    <h3>
      <span>lv.</span>
      <el-slider v-model="info['to']" :min="1" :max="125" show-input size="small" />
    </h3>
    <h3>需要经验：{{ need }}</h3>
    <h3>约合后宅：{{ time }}</h3>
  </el-card>
</template>

<style lang="scss" scoped>
.el-card {
  min-height: 256px;
}

h1,
h3 {
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  font-family: consolas;
}

h3>span {
  margin-right: 10px;
  flex-shrink: 0;
}

.el-icon {
  margin: auto;
}

.el-button {
  margin-left: auto;
}
</style>