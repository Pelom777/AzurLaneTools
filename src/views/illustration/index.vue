<script lang="ts" setup>
import { load } from '@/axios/data'

const cg = ref()
;(async () => {
  cg.value = await load('cg')
})()
const page = ref(1)
const list = ref([])

watchEffect(() => {
  list.value = cg.value?.slice(page.value * 40 - 40, page.value * 40)
})
</script>

<template>
  <el-row>
    <el-col
      :xs="24" :sm="12" :md="8" :lg="6" :xl="3"
      v-for="(url, index) in list"
    >
      <el-card :key="page * 40 - 40 + index">
        <el-image
          :src="url"
          loading="lazy"
          :preview-src-list="list"
          :initial-index="index"
          hide-on-click-modal
        />
      </el-card>
    </el-col>
  </el-row>
  <el-divider />
  <el-pagination
    layout="prev, pager, next"
    v-model:current-page="page"
    :total="cg?.length ?? 0"
    :page-size="40"
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