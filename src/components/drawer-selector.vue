<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'

const props = defineProps<{
  show: boolean,
  option?: object,
  list?: object
}>()
const emits = defineEmits(['update:show', 'check'])
const show = computed({
  get: () => props.show,
  set: (value) => emits('update:show', value)
})
const showOption = ref(false)
const input = ref('')
const filter = ref([[], [], []])
const list = ref([])

watchEffect(() => {
  list.value = []
  for (let name in props.list) {
    if (
      filter.value.every((filter: number[], index) => {
        return filter.length == 0
          || filter.includes(props.list[name][index + 1] as number)
      })
      && props.list[name][0].includes(input.value)
    ) list.value.push(name)
  }
})
</script>

<template>
  <el-drawer
    v-model="show"
    size="75%"
    :with-header="false"
  >
    <el-container>
      <el-header>
        <el-row justify="space-between">
          <el-col :xs="20" :lg="10">
            <el-input
              clearable
              v-model="input"
              placeholder="Type something"
              v-model.lazy="input"
            >
              <template #prefix>
                <el-icon><i-ep-Search /></el-icon>
              </template>
            </el-input>
          </el-col>
          <el-button type="danger" @click="showOption=!showOption">
            <el-icon>
              <i-ep-ArrowUpBold  v-show="showOption" />
              <i-ep-ArrowDownBold  v-show="!showOption" />
            </el-icon>
          </el-button>
        </el-row>
        <el-row
          v-show="showOption"
          v-for="(opt, key, index) in option as {}"
        >
          <el-col :xs="0" :lg="2">
            <el-button
              type="primary"
              :disabled="filter[index].length==0"
              @click="filter[index]=[]"
            >
              {{ key }}
            </el-button>
          </el-col>
          <el-col :xs="24" :lg="22">
            <el-checkbox-group v-model="filter[index]">
              <el-checkbox-button v-for="name in opt" :label="name[0]">
                {{ name[1] }}
              </el-checkbox-button>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="1"
            v-for="(value, name) in props.list"
            v-show="list.includes(name)"
          >
            <el-image
              :src="`https://ui.al.pelom.cn/assets/squareicon/${name}.png`"
              loading="lazy"
              @click="$emit('check', name)"
            />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-drawer>
</template>

<style lang="scss" scoped>
.el-header {
  height: fit-content;
  flex-direction: column;
  box-shadow: 0 10px 5px -10px gray;

  & .el-row {
    margin-bottom: 5px;
    
    &:not(:first-child) .el-button {
      width: 80%;
    }
  }
}

:deep(.el-main) {
  & .el-col {
    padding: 2px;
  }
}
</style>