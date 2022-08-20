<script lang="ts" setup>
const props = defineProps<{
  name: string,
  ship: {},
  skin: {}
}>()
</script>

<template>
<el-card>
  <template #header>
    {{ ship['name'] }}
  </template>
  <el-row v-for="(item, name) in skin">
    <el-col :span="24">
      <el-button
        size="large"
        @click="$emit('switch', name)"
      >
        {{ item['name'] }}
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