<script lang="ts" setup>
import Menu from './Menu/index.vue'
import { useStore } from '@/store'

const store = useStore()
</script>

<template>
  <el-container>
    <el-aside :class="{ hideSidebar: store.sidebarType }">
      <Menu />
    </el-aside>
    <el-main>
      <suspense>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive" />
          </keep-alive>
          <component :is="Component" v-if="!$route.meta.keepAlive" />
        </router-view>
      </suspense>
    </el-main>
    <el-affix>
      <el-button
        type="primary"
        circle
        @click="store.sidebarType=!store.sidebarType"
      >
        <el-icon><i-ep-menu /></el-icon>
      </el-button>
    </el-affix>
  </el-container>
</template>

<style lang="scss" scoped>
$sidebarWidth: 199px;
$hideSidebarWidth: 63.2px;

.el-aside {
  width: $sidebarWidth;
  transition: .3s;
  overflow: hidden;

  &.hideSidebar {
    width: $hideSidebarWidth;
  }
}

.el-main {
  position: relative;
}

.el-affix {
  display: none;
  position: absolute;
  margin: 5px;
  z-index: 99;
}

@media screen and (max-width: 768px) {
  .el-aside {
    position: absolute;
    margin-left: 0;
    z-index: 100;

    &.hideSidebar {
      margin-left: -100%;
    }
  }

  .el-affix {
    display: block;
  }
}
</style>