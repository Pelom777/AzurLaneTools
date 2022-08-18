<script lang="ts" setup>
import drawerSelector from '@/components/drawer-selector.vue'
import card from './card.vue'
import { useStore } from '@/store'
import { load } from '@/axios/data'

const { user } = useStore()
const option = ref({}), ship = ref({}), exp = ref([])
;(async () => {
  option.value = await load('option')
  ship.value = await load('ship')
  exp.value = await load('exp')
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
        :name="name"
        :index="key"
        :ship="ship[name]"
        :exp="exp"
        @remove="handleRemove"
      />
    </el-col>
    <el-col :sm="12" :lg="8" :xl="6">
      <el-card>
        <el-avatar size="large" @click="showDrawer=true">
          <template #default>
            <i-ep-Plus/>
          </template>
        </el-avatar>
      </el-card>
    </el-col>
  </el-row>
  <el-dialog v-model="showDialog" title="全局设置" width="fit-content">
    <h3>
      <span>指挥官等级</span>
      <el-input-number v-model="user.expSetting.level" :min="1" :max="200" />
    </h3>
    <h3>
      <span>后宅舒适度</span>
      <el-input-number v-model="user.expSetting.comfort" :min="0" :max="600" />
    </h3>
    <h3>
      <span>加成百分比</span>
      <el-input-number v-model="user.expSetting.buff" :min="0" :max="100" />
    </h3>
    <h3>
      <span>后宅舰船数</span>
      <el-input-number v-model="user.expSetting.count" :min="1" :max="6" />
    </h3>
  </el-dialog>
  <drawer-selector
    v-model:show="showDrawer"
    :option="option"
    :list="ship"
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