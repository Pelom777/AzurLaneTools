<script lang="ts" setup>
import { dataStore } from '@/store'
import { load } from '@/axios/data'

const data = dataStore()

data.cg = data.cg ?? await load('ui', 'cg')

const cg = data.cg.slice(0, 5)
</script>

<template>
  <el-carousel
    :interval="6000"
    type="card"
  >
    <el-carousel-item v-for="url in cg">
      <el-image
        :src="url"
        fit="contain"
        loading="lazy"
      />
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped>
:deep(.el-carousel__container) {
  height: 0;
  padding-bottom: 28%;
}
</style>