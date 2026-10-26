<script lang="ts" setup>
defineProps<{
  name: string
  list: number[]
  current: number
}>()
defineEmits(['back', 'check', 'clear'])
const cdn = import.meta.env.VITE_CDN
</script>

<template>
  <el-card>
    <template #header>
      <el-page-header
        title="返回"
        content="表情"
        @back="$emit('back')"
      />
    </template>
    <el-row>
      <el-col :span="6">
        <div
          class="clear"
          @click="$emit('clear')"
        >
          <el-icon><i-ep-Close /></el-icon>
        </div>
      </el-col>
      <el-col
        :span="6"
        v-for="i in list"
      >
        <el-image
          :src="`${cdn}/paintingface/${name}/${i}.png`"
          fit="contain"
          crossorigin="anonymous"
          :class="{ active: i === current }"
          @click="$emit('check', i)"
        />
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
    display: flex;
  }
}

.el-image {
  display: block;
  width: 100%;
  border-radius: 4px;
  border: 2px solid transparent;
  box-sizing: border-box;
  cursor: pointer;
  transition: border-color .2s;

  &:hover {
    border-color: $color-azure;
  }

  &.active {
    border-color: $color-primary;
  }
}

.clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  border: 2px solid transparent;
  box-sizing: border-box;
  background: #fff6;
  color: $color-text-2;
  font-size: 40px;
  cursor: pointer;
  transition: border-color .2s, color .2s;

  &:hover {
    border-color: $color-azure;
    color: $color-primary;
  }
}
</style>