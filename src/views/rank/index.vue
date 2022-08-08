<script lang="ts" setup>
import chart from './chart.vue'
import { useStore, dataStore } from '@/store'
import { load } from '@/axios/data'

const store = useStore()
const data = dataStore()

data.server = data.server ?? await load('/', 'server')
</script>

<template>
  <el-container>
    <el-header>
      <el-select
        size="large"
        filterable
        v-model.number="store.serverId"
      >
        <template #prefix>服务器</template>
        <el-option
          v-for="item in data.server"
          :label="item[1]"
          :value="item[0]"
        />
      </el-select>
      <el-radio-group
        size="large"
        v-model.number="store.rankType"
      >
        <el-radio-button label="0">舰队实力</el-radio-button>
        <el-radio-button label="1">活动排行</el-radio-button>
        <el-radio-button label="2">EX排行</el-radio-button>
      </el-radio-group>
    </el-header>
    <el-main>
      <chart />
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.el-header {
  height: 70px;
  box-shadow: 0 10px 5px -10px gray;
  align-items: center;
  justify-content: space-between;
}
</style>