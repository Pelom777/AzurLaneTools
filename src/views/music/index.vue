<script lang="ts" setup>
import musicPlayer from '@/components/music-player.vue'
import { load } from '@/axios/data'

const bgm = ref([])
;(async () => {
  bgm.value = await load('bgm')

  watchEffect(() => {
    list.value = bgm.value.filter((item: [number, string]) => {
      return item[1].includes(input.value)
    })
  })
})()
const input = ref('')
const list = ref([])
const page = ref(1)
const id = ref(0)
</script>

<template>
  <el-input
    v-model.lazy="input"
    size="large"
    clearable
    placeholder="Type something"
  >
    <template #prepend>
      {{ list.length }}
    </template>
    <template #prefix>
      <el-icon>
        <i-ep-Search />
      </el-icon>
    </template>
    <template #append>
      <a href="https://music.163.com/#/djradio?id=793937451" target="_blank">
        <el-image src="https://s1.music.126.net/style/favicon.ico" fit="contain" />
      </a>
    </template>
  </el-input>
  <el-card
    v-for="item in list.slice(page * 30 - 30, page * 30)"
  >
    <el-button size="large" text circle @click="id = item[0]">
      <el-icon color="#67C23A" size="36px"><i-ep-VideoPlay /></el-icon>
    </el-button>
    {{ item[1] }}
  </el-card>
  <el-divider />
  <el-pagination
    layout="prev, pager, next"
    v-model:current-page="page"
    :total="list.length"
    :page-size="30"
    background
    hide-on-single-page
  />
  <music-player
    :id="id"
  />
</template>

<style lang="scss" scoped>
.el-input {
  position: sticky;
  top: 0;
  margin-bottom: 10px;
  box-shadow: var(--el-box-shadow);
  z-index: 1;

  & a {
    display: flex;
  }

  &:focus-within {
    box-shadow: var(--el-box-shadow-dark)
  }
}

.el-card {
  margin: 0 20px;
  white-space: nowrap;
}

.el-button {
  margin-right: 10px;
}

.el-pagination {
  justify-content: space-evenly;
}
</style>