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
        :span="12"
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
  width: 24em;
  max-width: 100%;
  float: right;
  background: #fff8;
  backdrop-filter: blur(5px);

  &:deep(.el-card__header) {
    background: #fffa;
  }

  & .el-col {
    padding: 5px;
  }

  & .el-button {
    width: 100%;
  }
}
</style>