<script lang="ts" setup>
const props = defineProps<{
  name: string,
  ship: {},
  skin: {}
}>()
const emits = defineEmits(['update:name'])

const value = ref(props.name)
</script>

<template>
  <el-select
    v-model="value"
    size="large"
    @change="$emit('update:name', $event)"
  >
    <template #prefix>
      <el-icon color="deeppink">
        <i-ep-MagicStick />
      </el-icon>
    </template>
    <el-option
      v-for="(item, name) in skin"
      :label="item['name']"
      :value="name"
    />
  </el-select>
</template>

<style lang="scss" scoped>
.el-select {
  width: 16em;
  box-shadow: var(--el-box-shadow-light);
}
</style>