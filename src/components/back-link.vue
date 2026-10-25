<script lang="ts" setup>
defineProps<{
  to: string
  label?: string
}>()
</script>

<template>
  <router-link :to="to" class="back-link">
    <el-icon><i-ep-ArrowLeftBold /></el-icon>
    {{ label ?? '返回' }}
  </router-link>
</template>

<style lang="scss" scoped>
.back-link {
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  gap: $space-1;
  margin-bottom: $space-4;
  color: $color-text-2;
  font-size: 14px;
  transition: color .2s;

  &:hover {
    color: $color-primary;
  }
}
</style>