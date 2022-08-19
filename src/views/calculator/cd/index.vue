<script lang="ts" setup>
import drawerSelector from '@/components/drawer-selector.vue'
import card from './card.vue'
import { useStore } from '@/store'
import { load } from '@/axios/data'

const { user } = useStore()
const option = ref({}), ship = ref({})
;(async () => {
  option.value = await load('option')
  ship.value = await load('ship')
})()
const showDrawer = ref(false)
const showDialog = ref(true)
const list = ref({})
let cnt = 0

const handleRemove = (index: number) =>{
  delete list.value[index]
}

const handleCheck = (name: string) =>{
  list.value[cnt++] = name
  showDrawer.value = false
}
</script>

<template>
  <el-button
    size="large"
    type="primary"
    circle
    @click="showDialog=true"
  >
    <el-icon><i-ep-Setting /></el-icon>
  </el-button>
  <el-row>
    <el-col :sm="12" :lg="8" :xl="6"
      v-for="(name, key) in list"
      :key="key"
    >
      <card
        :ship="name"
        :index="key"
        :attr="ship[name]"
        @remove="handleRemove"
      />
    </el-col>
    <el-col :sm="12" :lg="8" :xl="6">
      <el-card>
        <el-avatar size="large" @click="showDrawer=true">
          <i-ep-Plus/>
        </el-avatar>
      </el-card>
    </el-col>
  </el-row>
  <drawer-selector
    v-model:show="showDrawer"
    :option="option"
    :list="ship"
    dir="squareicon"
    @check="handleCheck"
  />
</template>

<style lang="scss" scoped>
.el-button {
  position: fixed;
  right: 0;
  margin-right: 10px;
  z-index: 10;
}

.el-col {
  padding: 10px;
}

.el-card {
  min-height: 256px;
}

.el-avatar {
  cursor: pointer;
}
</style>