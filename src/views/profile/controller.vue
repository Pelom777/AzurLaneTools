<script lang="ts" setup>
const props = defineProps<{
  option: string[]
}>()
</script>

<template>
<el-card>
  <template #header>
    <el-page-header
      title="返回"
      content="Spine"
      @back="$emit('back')"
    />
  </template>
  <el-row>
    <el-col
      :span="8"
      v-for="opt in option"
    >
      <el-button
        size="large"
        @click="$emit('action', opt)"
      >
        {{ opt }}
      </el-button>
    </el-col>
  </el-row>
</el-card>
</template>

<style lang="scss" scoped>
.el-card {
  width: 40%;
  height: 80%;
  margin: auto 5% auto auto;
  background: #fff8;
  backdrop-filter: blur(5px);

  &:deep(.el-card__header) {
    background: #fffa;
  }
}

.el-col {
  padding: 5px;
}

.el-button {
  width: 100%;
}
</style>