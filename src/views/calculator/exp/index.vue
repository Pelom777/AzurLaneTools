<script lang="ts" setup>
import drawerSelector from '@/components/drawer-selector.vue'
import card from './card.vue'
import { useStore } from '@/store'
import { load } from '@/axios/data'

const { user, calc: { exp: { list } } } = useStore()
const option = ref({}), ship = ref({}), exp = ref([])
const ready = ref(false)
;(async () => {
  option.value = await load('option')
  ship.value = await load('ship')
  exp.value = await load('exp')
  
  ready.value = true
})()
const showDrawer = ref(false)
const showDialog = ref(true)

const handleCheck = (name: string) =>{
  list.push({ name, from: 1, to: 1, base: 0 })
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
        :exp="exp[ship[item.name]['rarity'] > 6 ? 1 : 0]"
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
      <span>指挥官等级</span>
      <el-input-number v-model="user.level" :min="1" :max="200" />
    </h3>
    <h3>
      <span>后宅舒适度</span>
      <el-input-number v-model="user.backyard.comfort" :min="0" :max="600" />
    </h3>
    <h3>
      <span>加成百分比</span>
      <el-input-number v-model="user.backyard.buff" :min="0" :max="100" />
    </h3>
    <h3>
      <span>后宅舰船数</span>
      <el-input-number v-model="user.backyard.count" :min="1" :max="6" />
    </h3>
  </el-dialog>
  <drawer-selector
    v-model:show="showDrawer"
    :option="option"
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