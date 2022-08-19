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
    <el-tab-pane name="exp">
      <template #label>
        <el-icon><i-ep-Plus /></el-icon>
        舰船经验
      </template>
    </el-tab-pane>
    <el-tab-pane name="cd">
      <template #label>
        <el-icon><i-ep-Timer /></el-icon>
        舰船射速
      </template>
    </el-tab-pane>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive" />
    </router-view>
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

.el-icon {
  vertical-align: middle;
}
</style>