<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useStore } from '@/store'

const props = defineProps<{
  name: string,
  index: string,
  ship?: [string, number, number, number],
  exp?: [][]
}>()
const { user } = useStore()
const type = props.ship[2] > 6 ? 1 : 0
const from = ref(1), to = ref(1), base = ref(0)
const range = computed(() => {
  return props.exp[type][from.value + 1] - props.exp[type][from.value] - 1 || 3000000
})
const exp = computed(() => {
  return Math.max(0, props.exp[type][to.value] - props.exp[type][from.value] - base.value)
})
const time = computed(() => {
  const time = Math.floor(exp.value / user.exp)
  const day = Math.floor(time / 24)
  const hour = time % 24
  return day == 0 ? `${hour}小时` : `${day}天${hour}小时`
})
</script>

<template>
  <el-card>
    <h1>
      <el-avatar size="large" :src="`https://ui.al.pelom.cn/assets/squareicon/${name}.png`" />
      <el-divider direction="vertical" />
      <span>{{ ship[0] }}</span>
      <el-button circle type="danger" size="small" @click="$emit('remove', index)">
        <el-icon>
          <i-ep-Close />
        </el-icon>
      </el-button>
    </h1>
    <h3>
      <span>lv.</span>
      <el-slider v-model="from" :min="1" :max="125" show-input size="small" />
    </h3>
    <h3>
      <span>exp</span>
      <el-slider v-model="base" :min="0" :max="range" show-input size="small" />
    </h3>
    <h3>
      <el-icon>
        <i-ep-ArrowDownBold />
      </el-icon>
    </h3>
    <h3>
      <span>lv.</span>
      <el-slider v-model="to" :min="1" :max="125" show-input size="small" />
    </h3>
    <h3>需要经验：{{ exp }}</h3>
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

  &>span {
    margin-right: 10px;
  }
}

.el-icon {
  margin: auto;
}

.el-button {
  margin-left: auto;
}
</style>