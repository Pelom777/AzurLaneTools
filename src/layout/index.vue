<script lang="ts" setup>
import Header from './Header/index.vue'

const route = useRoute()
const fullBleed = computed(() => route.name === 'profile')
</script>

<template>
  <el-container class="app-shell">
    <el-header height="auto">
      <Header />
    </el-header>
    <el-main :class="{ 'is-full': fullBleed }">
      <div class="page">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :key="$route.path.split('/')[1]" v-if="$route.meta.keepAlive" />
          </keep-alive>
          <component :is="Component" v-if="!$route.meta.keepAlive" />
        </router-view>
      </div>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.app-shell {
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.el-header {
  display: block;
  flex-shrink: 0;
  padding: 0;
  height: auto;
}

.el-main {
  position: relative;
  flex: 1 1 0;
  height: auto;
  min-height: 0;
  width: 100%;
  padding: $main-padding-y $main-padding-x;
  overflow: auto;
}

.page {
  position: relative;
  height: 100%;
  max-width: $container-max;
  margin: 0 auto;
}

.el-main.is-full {
  padding: 0;

  .page {
    max-width: none;
  }
}

@media screen and (max-width: 768px) {
  .el-main {
    padding: $space-4;
  }
}
</style>