<script lang="ts" setup>
import { useStore } from '@/store'
import { use } from 'echarts/core';

const props = defineProps<{
  info: {},
  ship: {},
  equip: {},
  shipEquip: {}
}>()
const emits = defineEmits(['delete'])
const { user } = useStore()
const cdn = import.meta.env.VITE_CDN
const list = ref({})
const cur = ref(0)
const showDrawer = ref(false)
const cd = computed(() => {
  let cd = 0, count = 0
  props.info['slot'].forEach((item, index) => {
    cd += props.equip[item]?.['cd'] * props.shipEquip['base'][index]
    count += props.shipEquip['base'][index]
  })
  const loading = user.technology.loading + user.cat.loading
  cd /= count
  cd *= Math.sqrt(200 / ((props.info['loading'] + loading) * (1 + props.info['buff'] / 100) + 100))
  cd *= 2.2
  cd += 0.1
  cd *= props.info['beacon'] ? 0.96 : 1
  return cd.toFixed(4)
})

const handleClick = (index: number) => {
  cur.value = index
  list.value = {}
  Object.keys(props.equip).forEach((name) => {
    if (props.shipEquip['slot'][index].includes(props.equip[name]['type']))
      list.value[name] = props.equip[name]
  })
  showDrawer.value = true
}

const handleCheck = (name: string) =>{
  props.info['slot'][cur.value] = name
  showDrawer.value = false
}
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
    <h1>
      <el-avatar
        shape="square"
        size="large"
        fit="contain"
        v-for="item, index in info['slot']"
        :src="`${cdn}/equipicon/${equip[item]?.['painting'] ?? 'empty'}.png`"
        @click="handleClick(index)"
      />
      <el-divider direction="vertical" />
      <el-avatar
        shape="square"
        size="large"
        fit="contain"
        :src="`${cdn}/equipicon/${info['beacon'] ? '680' : 'empty'}.png`"
        @click="info['beacon'] = !info['beacon']"
      />
    </h1>
    <h3>
      <span>装填</span>
      <el-slider v-model="info['loading']" :min="0" :max="200" show-input size="small" />
    </h3>
    <h3>
      <span>buff%</span>
      <el-slider v-model="info['buff']" :min="0" :max="100" show-input size="small" />
    </h3>
    <h3>射速：{{ cd }}s</h3>
  </el-card>
  <drawer-selector
    v-model:show="showDrawer"
    :option="{}"
    :item="list"
    dir="equipicon"
    @check="handleCheck"
  />
</template>

<style lang="scss" scoped>
.el-card {
  min-height: 256px;
}

h1,
h3 {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
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

.el-avatar {
  &+& {
    margin-left: 5px;
  }

  &:deep(img) {
    width: 100%;
  }
}
</style>