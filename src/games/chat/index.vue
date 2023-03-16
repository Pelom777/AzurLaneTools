<script lang="ts" setup>
import list from './list.vue'
import chat from './chat.vue'

const show = ref(false)
const id = ref(0)
const handleBack = () => {
  show.value = false
}

const handleOpen = (index: number) => {
  show.value = !show.value
  id.value = index
}
</script>

<template>
  <div class="wrapper">
    <chat v-if="show" :id="id" @back="handleBack" />
    <list v-else @open="handleOpen" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 450px;
  height: 100%;
  margin: auto;
  box-shadow: var(--el-box-shadow-dark);
  font-size: 18px;
  font-family: Arial,SimHei;
}

@media screen and (orientation: portrait) {
  .wrapper {
    width: 100%;
  }
}
</style>