<script lang="ts" setup>
const route = useRoute()
const router = useRouter()

const name = computed({
  get: () => route.path.split('/')[2],
  set: (value) => router.push({ name: value })
})
</script>

<template>
  <el-tabs type="border-card" v-model="name">
    <el-tab-pane name="vote">
      <template #label>
        <el-icon><i-ep-Trophy /></el-icon>
        人气投票
      </template>
    </el-tab-pane>
    <el-tab-pane name="statistic">
      <template #label>
        <el-icon><i-ep-DataLine /></el-icon>
        统计
      </template>
    </el-tab-pane>
    <router-view />
  </el-tabs>
</template>

<style lang="scss" scoped>
.el-tabs {
  display: flex;
  flex-direction: column;
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

  &:deep(.el-tabs__content) {
    height: 100%;
  }
}

.el-icon {
  vertical-align: middle;
}
</style>