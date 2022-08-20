<script lang="ts" setup>
const props = defineProps<{
  show: boolean,
  option: {},
  item: {},
  dir: string,
}>()
const emits = defineEmits(['update:show', 'check'])
const show = computed({
  get: () => props.show,
  set: (value) => emits('update:show', value)
})
const showOption = ref(false)
const input = ref('')
const filter = ref({})
const list = ref([])

watchEffect(() => {
  list.value = []
  Object.keys(props.item).forEach((name) => {
    if (
      Object.keys(filter.value).every((key) => {
        return filter.value[key].length == 0
          || filter.value[key].includes(props.item[name][key])
      })
      && props.item[name]['name'].includes(input.value)
    ) list.value.push(name)
  })
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
              v-model.lazy="input"
              clearable
              placeholder="Type something"
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
          v-for="(opt, key) in option"
        >
          <el-col>
            <el-checkbox-group v-model="filter[key]">
              <el-checkbox-button v-for="item in opt" :label="item[0]">
                {{ item[1] }}
              </el-checkbox-button>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="1"
            v-for="name in list"
            :key="name"
            :title="item[name]['name']"
          >
            <el-image
              :src="`https://cdn.al.pelom.cn/${dir}/${item[name]['painting']}.png`"
              :style="{ backgroundImage: `url(https://cdn.al.pelom.cn/squareback/${[2, 2, 3, 4, 5, 6, 5, 6][item[name]['rarity'] - 1]}.png)` }"
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
    display: flex;
  }

  & img {
    object-fit: contain;
  }
}
</style>