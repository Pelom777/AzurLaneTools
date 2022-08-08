<script lang="ts" setup>
import { ref } from 'vue'
import { useStore, dataStore } from '@/store'

const store = useStore()
const data = dataStore()

const props = defineProps<{
  name: string
}>()
const name = props.name
const [name_cn, type, rarity, nationality] = data.ship[name]
const skin = data.skin[name]
const cdn = 'https://ui.al.pelom.cn'
const index = ref(0)
</script>

<template>
  <el-card
    :style="{
      backgroundImage: (
        store.showBack
        ? `url(${cdn}/assets/iconbackground/${nationality == 97 ? '1' : ''}${!!skin[index][0].match(/_g$/) ? rarity + 1 : rarity}.png)`
        : null
      )
    }"
  >
    <el-image
      :src="`${cdn}/assets/shipicon/${skin[index][0]}.png`"
      fit="contain"
      loading="lazy"
      @click="$router.push({
        name: 'profile',
        params: { name }
      })"
    />
    <span
      :style="{ '--count': skin.length, '--index': index }"
      :class="{ showSkin : store.showSkin }"
      @click="index = (index + 1) % skin.length"
    >
      {{ skin[index][1] }}
    </span>
    <el-image
      :src="`${cdn}/assets/iconframe/${nationality == 97 ? '1' : ''}${!!skin[index][0].match(/_g$/) ? rarity + 1 : rarity}.png`"
      fit="contain"
      v-show="store.showFrame"
      :style="{ scale: (nationality == 97 && rarity == 5 ? 1.166 : null) }"
    />
  </el-card>
</template>

<style lang="scss" scoped>

</style>