<script lang="ts" setup>
import { useStore } from '@/store'

const store = useStore()
</script>

<template>
  <el-menu
    active-text-color="#f78989"
    background-color="#4d5f75"
    :default-active="`/${$route.path.split('/')[1]}`"
    text-color="#bfcbd9"
    :collapse="store.sidebarType"
    router
  >
    <el-menu-item index="/home">
      <el-icon><i-ep-StarFilled /></el-icon>
      <span>碧蓝航线工具箱</span>
    </el-menu-item>
    <el-menu-item index="/catalogue">
      <el-icon><i-ep-Management /></el-icon>
      <span>图鉴</span>
    </el-menu-item>
    <el-menu-item index="/rank">
      <el-icon><i-ep-Histogram /></el-icon>
      <span>排行榜</span>
    </el-menu-item>
    <el-menu-item index="/gallery">
      <el-icon><i-ep-PictureFilled /></el-icon>
      <span>画廊</span>
    </el-menu-item>
    <el-menu-item index="/record">
      <el-icon><i-ep-List /></el-icon>
      <span>记录</span>
    </el-menu-item>
    <el-menu-item index="/about">
      <el-icon><i-ep-InfoFilled /></el-icon>
      <span>关于</span>
    </el-menu-item>
    <el-menu-item index="" @click="store.sidebarType=!store.sidebarType">
      <el-icon>
        <i-ep-Fold v-show="!store.sidebarType"/>
        <i-ep-Expand v-show="store.sidebarType"/>
      </el-icon>
      <span>收起菜单</span>
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu {
  height: 100%;

  &:not(.el-menu--collapse){
    width: 200px;
  }
}

.el-menu-item {
  &:hover {
    background-color: #304156;
  }

  &:first-child {
    background-color: #263445;
  }
}
</style>