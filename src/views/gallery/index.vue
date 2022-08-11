<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useStore, dataStore } from '@/store'
import { load } from '@/axios/data'

const store = useStore()
const data = dataStore()

data.cg = data.cg ?? await load('ui', 'cg')

const cg = ref([])

watchEffect(() => {
  cg.value = data.cg.slice(store.page * 40 - 40, store.page * 40)
})
</script>

<template>
  <el-row>
    <el-col
      :xs="24" :sm="12" :md="8" :lg="6" :xl="3"
      v-for="(url, index) in cg"
    >
      <el-card :key="store.page * 40 - 40 + index">
        <el-image
          :src="url"
          loading="lazy"
          :preview-src-list="cg"
          :initial-index="index"
          hide-on-click-modal
        />
      </el-card>
    </el-col>
  </el-row>
  <el-divider />
  <el-pagination
    layout="prev, pager, next"
    v-model:current-page="store.page"
    :total="data.cg.length"
    :page-size="40"
    :pager-count="21"
    background
  />
</template>

<style lang="scss" scoped>
.el-col {
  padding: 10px;
}

.el-card {
  height: 0;
  padding-bottom: 56.25%;
  position: relative;
  overflow: visible;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    rotate: -4deg;
    background: darkgray;
  }
}

:deep(.el-card__body) {
  padding: 0;

  & .el-image {
    border: 3px solid white;
  }
}

.el-pagination {
  justify-content: space-evenly;
}
</style>