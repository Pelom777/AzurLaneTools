<script lang="ts" setup>
withDefaults(defineProps<{
  items: { name: string, label: string }[]
  min?: number
}>(), {
  min: 300,
})
</script>

<template>
  <div class="entry-grid" :style="`--entry-min:${min}px`">
    <router-link
      v-for="item in items"
      :key="item.name"
      :to="{ name: item.name }"
      class="entry"
    >
      <el-icon :size="30"><slot :name="item.name" /></el-icon>
      <h3>{{ item.label }}</h3>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.entry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--entry-min)), 1fr));
  gap: $space-4;
}

.entry {
  @include card-surface;
  display: flex;
  align-items: center;
  gap: $space-4;
  min-height: 76px;
  padding: $space-4 $space-5;
  color: $color-text;
  transition: border-color .2s, box-shadow .2s, transform .2s;

  &:hover {
    border-color: $color-azure;
    box-shadow: 0 6px 18px -8px rgba(0, 127, 255, .28);
    transform: translateY(-2px);
  }

  .el-icon {
    flex-shrink: 0;
    color: $color-primary;
  }

  h3 {
    min-width: 0;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.4;
  }
}
</style>