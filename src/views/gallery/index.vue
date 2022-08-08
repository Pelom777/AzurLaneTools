<script lang="ts" setup>
import { dataStore } from '@/store'
import { load } from '@/axios/data'

const data = dataStore()

data.cg = data.cg ?? load('ui', 'cg')
</script>

<template>
  <el-row>
    <el-col
      :span="6"
      v-for="(url, index) in data.cg"
    >
      <el-card>
        <el-image
          :src="url"
          loading="lazy"
          :preview-src-list="data.cg"
          :initial-index="index"
          hide-on-click-modal
        />
      </el-card>
    </el-col>
  </el-row>
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
</style>