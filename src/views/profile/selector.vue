<script lang="ts" setup>
import { dataStore } from '@/store'

const props = defineProps<{
  name: string
}>()
const data = dataStore()
const [name_cn, type, rarity, nationality] = data.ship[props.name]
const skin = data.skin[props.name]
</script>

<template>
<el-card>
  <template #header>
    {{ name_cn }}
  </template>
  <el-row v-for="item in skin">
    <el-col :span="24">
      <el-button
        size="large"
        @click="$emit('switch', item[0], item[0].match(/_g$/) ? rarity + 1 : rarity)"
      >
        {{ item[1] }}
      </el-button>
    </el-col>
  </el-row>
</el-card>
</template>

<style lang="scss" scoped>
.el-card {
  width: 20vw;
  margin: 10vh 0 auto;
  background: #fff8;
  backdrop-filter: blur(5px);

  &:deep(.el-card__header) {
    background: #fffa;
  }

  &:deep(.el-card__body) {
    height: 25vh;
    padding: 0;
    overflow: scroll;
  }
}

.el-col {
  padding: 5px;
}

.el-button {
  width: 100%;
}
</style>