<script lang="ts" setup>
const props = defineProps<{
  name: string,
  ex: boolean,
  skin: {}
}>()
const emits = defineEmits(['update:name', 'update:ex'])
const name = computed({
  get: () => props.name,
  set: value => emits('update:name', value)
})
const ex = computed({
  get: () => props.ex,
  set: value => emits('update:ex', value)
})
</script>

<template>
  <el-select
    v-model="name"
    size="large"
  >
    <template #prefix>
      <el-icon color="deeppink">
        <i-ep-Switch v-if="skin[name]?.['ex']" @click.stop="ex = !ex" />
        <i-ep-MagicStick v-else />
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