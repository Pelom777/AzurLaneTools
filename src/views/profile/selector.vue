<script lang="ts" setup>
const props = defineProps<{
  name: string,
  skin: {}
}>()
const emits = defineEmits(['update:name'])
const name = computed({
  get: () => props.name,
  set: value => emits('update:name', value)
})
</script>

<template>
  <el-select
    v-model="name"
    size="large"
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