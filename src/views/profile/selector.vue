<script lang="ts" setup>
import { dataStore } from '@/store'

const props = defineProps<{
  name: string
}>()
const data = dataStore()
const [name_cn, , ,] = data.ship[props.name]
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
        @click="$emit('switch', item[0])"
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

  &:deep(.el-card__body) {
    max-height: 25vh;
    padding: 0;
  }
}
</style>