<script lang="ts" setup>
import icon from './icon.vue'
import { watchEffect } from 'vue'
import { useStore, dataStore } from '@/store'

const store = useStore()
const data = dataStore()

watchEffect(() => {
  store.ship = []
  for (let name in data.ship) {
    if (
      store.filter.every((filter: number[], index) => {
        return filter.length == 0
          || filter.includes(data.ship[name][index + 1] as number)
      })
      && data.ship[name][0].includes(store.input)
    ) store.ship.push(name)
  }
  store.count = store.ship.length
})
</script>

<template>
  <el-row>
    <el-col
      :xs="8" :sm="6" :md="4" :lg="3" :xl="2"
      v-for="(value, name) in data.ship as {}"
      v-show="store.ship.includes(name)"
    >
      <icon :name="name as string" />
    </el-col>
  </el-row>
  <el-empty v-show="store.count == 0" />
</template>

<style lang="scss" scoped>
.el-col {
  padding: 15px 10px;
}

:deep(.el-card) {
  height: 0;
  padding-bottom: 132%;
  position: relative;
  background-size: 100% 100%;
  overflow: visible;
  user-select: none;

  & .el-card__body {
    padding: 0;
  }

  & .el-image {
    position: absolute;
    width: 100%;

    &:last-child {
      scale: 1.125;
      top: 0;
      bottom: 0;
      pointer-events: none;
    }
  }

  & span {
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

    &.showSkin{
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
}
</style>