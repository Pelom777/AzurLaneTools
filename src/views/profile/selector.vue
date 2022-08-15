<script lang="ts" setup>
const props = defineProps<{
  name: string,
  name_cn: string,
  skin: []
}>()
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