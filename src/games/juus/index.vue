<script lang="ts" setup>
import list from './list.vue'
import post from './post.vue'

const cdn = 'https://cdn.al.pelom.cn'
const width = ref(window.innerWidth), height = ref(window.innerHeight)
const scale = computed(() => {
  return Math.min(width.value / 1280, height.value / 720)
})
const show = ref(false)
const id = ref(0)

onresize = () => {
  width.value = window.innerWidth
  height.value = window.innerHeight
}

const handleOpen = (index: number) => {
  show.value = !show.value
  id.value = index
}
</script>

<template>
  <el-container :style="{
    width: `${1280 * scale}px`,
    height: `${720 * scale}px`,
    backgroundImage: `url(https://s2.loli.net/2023/02/09/45lhCcDNqxYMbsO.png)`
  }">
    <el-main :style="{ transform: `scale(${scale})` }">
      <post v-if="show" :id="id" />
      <list v-else @open="handleOpen" />
      <el-image
        :src="`${cdn}/juusui/fanhui.png`"
        @click="show ? show = !show : $router.back()"
      />
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.el-container {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-size: cover;
  user-select: none;
}

.el-main {
  width: 1280px;
  height: 720px;
  transform-origin: 0 0;
  backdrop-filter: blur(5px);
  font-family: Arial, SimHei;

  &>.el-image {
    width: 48px;
    position: absolute;
    left: 10px;
    bottom: 10px;
  }
}
</style>