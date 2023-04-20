<script lang="ts" setup>
import drawerSelector from '@/components/drawer-selector.vue'
import card from './card.vue'
import { useStore } from '@/store'
import { load } from '@/axios/data'

const { user, calc: { cd: { list } } } = useStore()
const ship = ref({}), equip = ref({}), shipEquip = ref({})
const ready = ref(false)
;(async () => {
  ship.value = await load('ship')
  equip.value = await load('equip')
  shipEquip.value = await load('ship-equip')

  Object.keys(ship.value).forEach((name) => {
    if (ship.value[name]['type'] != 7)
      delete ship.value[name]
  
  ready.value = true
  })
})()
const showDrawer = ref(false)
const showDialog = ref(true)

const handleCheck = (name: string) =>{
  list.push({ name, slot: ['', '', ''], loading: 100, buff: 0, beacon: false })
  showDrawer.value = false
}
</script>

<template>
  <el-button
    size="large"
    type="primary"
    circle
    @click="showDialog = true"
  >
    <el-icon><i-ep-Setting /></el-icon>
  </el-button>
  <el-row v-if="ready">
    <el-col :sm="12" :lg="8" :xl="6"
      v-for="item, index in list"
    >
      <card
        :info="item"
        :ship="ship[item.name]"
        :equip="equip"
        :ship-equip="shipEquip[item.name]"
        @delete="list.splice(index, 1)"
      />
    </el-col>
    <el-col :sm="12" :lg="8" :xl="6">
      <el-card>
        <el-avatar size="large" @click="showDrawer = true">
          <i-ep-Plus/>
        </el-avatar>
      </el-card>
    </el-col>
  </el-row>
  <el-dialog v-model="showDialog" title="全局设置" width="fit-content">
    <h3>
      <span>科技装填</span>
      <el-input-number v-model="user.technology.loading" :min="0" :max="50" />
    </h3>
    <h3>
      <span>指挥猫装填</span>
      <el-input-number v-model="user.cat.loading" :min="0" :max="50" />
    </h3>
  </el-dialog>
  <drawer-selector
    v-model:show="showDrawer"
    :option="{}"
    :item="ship"
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

h3 {
  display: flex;
  justify-content: space-between;
}
</style>