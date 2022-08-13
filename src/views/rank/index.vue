<script lang="ts" setup>
import chart from './chart.vue'
import { ref } from 'vue'
import { load } from '@/axios/data'

const server = ref()
;(async () => {
  server.value = await load('/', 'server')
})()

const serverId = ref(0), rankType = ref(0)
</script>

<template>
  <el-container>
    <el-header>
      <el-select
        size="large"
        filterable
        v-model.number="serverId"
      >
        <template #prefix>服务器</template>
        <el-option
          v-for="item in server"
          :label="item[1]"
          :value="item[0]"
        />
      </el-select>
      <el-radio-group
        size="large"
        v-model.number="rankType"
      >
        <el-radio-button label="0">舰队实力</el-radio-button>
        <el-radio-button label="1">活动排行</el-radio-button>
        <el-radio-button label="2">EX排行</el-radio-button>
      </el-radio-group>
    </el-header>
    <el-main>
      <chart
        :server="server as []"
        :serverId="serverId"
        :rankType="rankType"
      />
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