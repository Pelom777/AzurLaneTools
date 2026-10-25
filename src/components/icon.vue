<script lang="ts" setup>
import { vVisible } from '@/directives/visible'

const props = defineProps<{
  name: string,
  ship: {},
  skin: {},
  cur?: string,
  frame?: boolean
}>()
const cdn = import.meta.env.VITE_CDN
const index = ref(!!props.cur ? Object.keys(props.skin).findIndex(e => e == props.cur) : 0)
const count = Object.keys(props.skin).length
const visible = ref(false)
const icon = computed(() => {
  return Object.values(props.skin)[index.value]
})
const painting = computed(() => `${cdn}/shipicon/${icon.value['painting']}.png`)
const frameSrc = computed(() => `${cdn}/iconframe/${props.ship['nationality'] == 97 ? '1' : ''}${!!icon.value['painting'].match(/_g$/) ? props.ship['rarity'] + 1 : props.ship['rarity']}.png`)
</script>

<template>
  <el-card
    v-visible="() => (visible = true)"
    :style="{ backgroundImage: `url(${cdn}/iconbackground/${ship['nationality'] == 97 ? '1' : ''}${!!icon['painting'].match(/_g$/) ? ship['rarity'] + 1 : ship['rarity']}.png)` }"
  >
    <el-image
      v-if="visible"
      :src="painting"
      fit="contain"
      @click="$router.push({
        name: 'profile',
        params: { name, cur: icon['painting'] }
      })"
    >
      <template #placeholder><i /></template>
    </el-image>
    <span
      :style="{ '--count': count, '--index': index }"
      @click="index = (index + 1) % count"
    >
      {{ icon['name'] }}
    </span>
    <el-image
      v-if="frame && visible"
      class="frame"
      :src="frameSrc"
      fit="contain"
      :style="{ scale: (ship['nationality'] == 97 && ship['rarity'] == 5 ? 1.166 : null) }"
    />
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
  cursor: pointer;

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

  &.frame {
    scale: 1.125;
    top: 0;
    bottom: 0;
    pointer-events: none;
  }
}

:deep(.el-image__inner) {
  transition: opacity .2s;
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