<script lang="ts" setup>
import cdPage from './cd-page.vue'
import expPage from './exp-page.vue'
</script>

<template>
  <el-tabs type="border-card">
    <el-tab-pane label="EXP">
      <exp-page />
    </el-tab-pane>
    <el-tab-pane label="CD">
      <cd-page />
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
.el-tabs {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &:deep(.el-tabs__item) {
    &:first-child {
      margin-left: 40px;
    }
  }
}
</style>