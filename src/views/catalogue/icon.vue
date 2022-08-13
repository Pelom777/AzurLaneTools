<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  name: string,
  ship?: [string, number, number, number],
  skin?: [string, number][]
}>()
const [name_cn, type, rarity, nationality] = props.ship
const cdn = 'https://ui.al.pelom.cn'
const index = ref(0)
</script>

<template>
  <el-card
    :style="{ backgroundImage: `url(${cdn}/assets/iconbackground/${nationality == 97 ? '1' : ''}${!!skin[index][0].match(/_g$/) ? rarity + 1 : rarity}.png)` }">
    <el-image :src="`${cdn}/assets/shipicon/${skin[index][0]}.png`" fit="contain" loading="lazy" @click="$router.push({
      name: 'profile',
      params: { name }
    })" />
    <span :style="{ '--count': skin.length, '--index': index }" @click="index = (index + 1) % skin.length">
      {{ skin[index][1] }}
    </span>
    <el-image
      :src="`${cdn}/assets/iconframe/${nationality == 97 ? '1' : ''}${!!skin[index][0].match(/_g$/) ? rarity + 1 : rarity}.png`"
      fit="contain" :style="{ scale: (nationality == 97 && rarity == 5 ? 1.166 : null) }" />
  </el-card>
</template>

<style lang="scss" scoped>
.el-card {
  height: 0;
  padding-bottom: 132%;
  position: relative;
  background-size: 100% 100%;
  overflow: visible;
  user-select: none;

  .hideBack & {
    background: none !important;
  }
}


:deep(.el-card__body) {
  padding: 0;
}

.el-image {
  position: absolute;
  width: 100%;

  &:last-child {
    display: none;
    scale: 1.125;
    top: 0;
    bottom: 0;
    pointer-events: none;

    .showFrame & {
      display: block;
    }
  }
}

span {
  width: 100%;
  left: 0;
  bottom: 5%;
  padding-bottom: 3px;
  position: absolute;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
  background: #0008;
  pointer-events: none;

  .showSkin & {
    pointer-events: auto;

    &:hover {
      color: gold;
    }

    &::after {
      content: '';
      width: calc(1 / var(--count) * 100%);
      height: 3px;
      position: absolute;
      left: calc(var(--index) / var(--count) * 100%);
      bottom: 0;
      background: gold;
      transition: .3s;
    }
  }
}
</style>