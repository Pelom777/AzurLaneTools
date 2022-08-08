<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore, dataStore } from '@/store'
import { load } from '@/axios/data'
import { init } from './profile'

const route = useRoute()
const store = useStore()
const data = dataStore()

data.ship = data.ship ?? await load('ui', 'ship')
data.skin = data.ship ?? await load('ui', 'skin')
const name = route.params.name as string
const [name_cn, type, rarity, nationality] = data.ship[name]

onMounted(() => {
  init(name)
})
</script>

<template>
  <el-page-header
    title="返回"
    :content="name_cn"
    @back="$router.push('/catalogue')"
  />
  <div id="char"></div>
</template>

<style lang="scss" scoped>
#char {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: gray;
  overflow: hidden;
}
</style>