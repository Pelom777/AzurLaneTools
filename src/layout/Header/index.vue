<script lang="ts" setup>
const route = useRoute()
const drawer = ref(false)
const active = computed(() => `/${route.path.split('/')[1]}`)

const menus = [
  { index: '/home', label: '首页' },
  { index: '/catalogue', label: '图鉴' },
  { index: '/collection', label: '收藏' },
  { index: '/calculator', label: '计算器' },
  { index: '/rank', label: '排行榜' },
  { index: '/record', label: '记录' },
  { index: '/game', label: '小游戏' },
]

const about = { index: '/about', label: '关于' }
</script>

<template>
  <header class="app-header">
    <router-link to="/home" class="brand">
      <span>碧蓝航线工具箱</span>
    </router-link>

    <el-menu
      class="nav"
      mode="horizontal"
      :ellipsis="false"
      :default-active="active"
      router
    >
      <el-menu-item v-for="item in menus" :key="item.index" :index="item.index">
        {{ item.label }}
      </el-menu-item>
      <li class="flex-grow" />
      <el-menu-item class="about" :index="about.index">
        {{ about.label }}
      </el-menu-item>
    </el-menu>

    <el-button class="burger" text @click="drawer = true">
      <el-icon :size="22"><i-ep-Menu /></el-icon>
    </el-button>
  </header>

  <el-drawer v-model="drawer" direction="rtl" size="220px" :with-header="false">
    <el-menu :default-active="active" router @select="drawer = false">
      <el-menu-item v-for="item in [...menus, about]" :key="item.index" :index="item.index">
        {{ item.label }}
      </el-menu-item>
    </el-menu>
  </el-drawer>
</template>

<style lang="scss" scoped>
.app-header {
  display: flex;
  align-items: center;
  gap: $space-6;
  height: $header-height;
  padding: 0 $main-padding-x;
  background: $color-azure;
  box-shadow: var(--el-box-shadow-light);
  box-sizing: border-box;
}

.brand {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: .5px;
}

.nav {
  flex: 1;
  min-width: 0;
  --el-menu-bg-color: transparent;
  --el-menu-text-color: rgba(255, 255, 255, .82);
  --el-menu-active-color: #fff;
  --el-menu-hover-text-color: #fff;
  --el-menu-hover-bg-color: rgba(255, 255, 255, .14);
  --el-menu-horizontal-height: #{$header-height};
  border-bottom: none;

  &.el-menu--horizontal > .el-menu-item {
    font-size: 15px;
    border-bottom: 3px solid transparent;

    &:hover {
      background-color: var(--el-menu-hover-bg-color);
    }

    &.is-active {
      font-weight: 600;
      border-bottom-color: #fff;
    }
  }
}

.burger {
  display: none;
  margin-left: auto;
  color: #fff;
}

@media screen and (max-width: 850px) {
  .app-header {
    gap: $space-4;
    padding: 0 $space-4;
  }

  .nav {
    display: none;
  }

  .burger {
    display: inline-flex;
  }
}
</style>