<script lang="ts" setup>
const props = defineProps<{
  hide: boolean
}>()
const emits = defineEmits(['update:hide'])
</script>

<template>
  <el-menu
    active-text-color="#f78989"
    background-color="#4d5f75"
    :default-active="`https://cdn.al.pelom.cn/${$route.path.split('/')[1]}`"
    text-color="#bfcbd9"
    :collapse="hide"
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
    <el-menu-item index="/collection">
      <el-icon><i-ep-FolderOpened /></el-icon>
      <span>收藏</span>
    </el-menu-item>
    <el-menu-item index="/calculator">
      <el-icon><i-ep-Cellphone /></el-icon>
      <span>计算器</span>
    </el-menu-item>
    <el-menu-item index="/rank">
      <el-icon><i-ep-Histogram /></el-icon>
      <span>排行榜</span>
    </el-menu-item>
    <el-menu-item index="/record">
      <el-icon><i-ep-List /></el-icon>
      <span>记录</span>
    </el-menu-item>
    <el-menu-item index="/game">
      <el-icon><i-ep-SwitchFilled /></el-icon>
      <span>小游戏</span>
    </el-menu-item>
    <el-menu-item index="/about">
      <el-icon><i-ep-InfoFilled /></el-icon>
      <span>关于</span>
    </el-menu-item>
    <el-menu-item index="" @click="$emit('update:hide', !hide)">
      <el-icon>
        <i-ep-Fold v-show="!hide"/>
        <i-ep-Expand v-show="hide"/>
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