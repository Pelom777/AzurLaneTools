<script lang="ts" setup>
import { load } from '@/axios/data'
import icon from '@/components/icon.vue'

const option = ref({}), ship = ref({}), skin = ref({})
;(async () => {
  option.value = await load('option')
  ship.value = await load('ship')
  skin.value = await load('skin')

  watchEffect(() => {
    list.value = []
    Object.keys(ship.value).forEach((name) => {
      if (
        Object.keys(filter.value).every((key) => {
          return filter.value[key].length == 0
            || filter.value[key].includes(ship.value[name][key])
        })
        && ship.value[name]['name'].includes(input.value)
      ) list.value.push(name)
    })
    count.value = list.value.length
  })
})()

const showOption = ref(false)
const input = ref(''), filter = ref({ 'type': [], 'rarity': [], 'nationality': [] }), list = ref([]), count = ref(0)
const showSkin = ref(false), showBack = ref(false), showFrame = ref(false)
</script>

<template>
  <el-container>
    <el-header>
      <div class="toolbar">
        <el-tag size="large" class="count">
          <el-icon><i-ep-Filter /></el-icon>
          {{ count }}
        </el-tag>
        <el-input
          class="search"
          size="large"
          clearable
          placeholder="搜索舰船名称"
          v-model.lazy="input"
        >
          <template #prepend>
            <el-badge is-dot :hidden="Object.keys(filter).every(key => filter[key].length == 0)">
              <el-button size="large" @click="showOption=!showOption">
                <el-icon>
                  <i-ep-ArrowUpBold v-show="showOption" />
                  <i-ep-ArrowDownBold v-show="!showOption" />
                </el-icon>
                筛选
              </el-button>
            </el-badge>
          </template>
          <template #append>
            <el-badge is-dot :hidden="input == ''">
              <el-button size="large">
                <el-icon><i-ep-search /></el-icon>
                搜索
              </el-button>
            </el-badge>
          </template>
        </el-input>
        <el-button-group size="large" type="primary">
          <el-button bg :text="!showSkin" @click="showSkin=!showSkin">
            <el-icon><i-ep-MagicStick /></el-icon>
            换装
          </el-button>
          <el-button bg :text="!showBack" @click="showBack=!showBack">
            <el-icon><i-ep-Picture /></el-icon>
            背景
          </el-button>
          <el-button bg :text="!showFrame" @click="showFrame=!showFrame">
            <el-icon><i-ep-FullScreen /></el-icon>
            边框
          </el-button>
        </el-button-group>
      </div>

      <div v-show="showOption" class="filters">
        <div v-for="(opt, key) in option" :key="key" class="filter-row">
          <el-button
            class="filter-label"
            size="large"
            type="primary"
            :disabled="(filter[key] as []).length == 0"
            @click="(filter[key] as [])=[]"
          >
            {{ {'type':'类型', 'rarity': '稀有度', 'nationality': '阵营'}[key] }}
          </el-button>
          <el-checkbox-group size="large" v-model="filter[key]">
            <el-checkbox-button v-for="item in opt" :key="item[0]" :label="item[0]">
              {{ item[1] }}
            </el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
    </el-header>

    <el-main>
      <el-row :class="{
        showSkin: showSkin,
        hideBack: !showBack,
        showFrame: showFrame
      }">
        <el-col
          :xs="8" :sm="6" :md="4" :lg="3" :xl="2"
          v-for="name in list"
          :key="name"
        >
          <icon :name="name" :ship="ship[name]" :skin="skin[name]" />
        </el-col>
      </el-row>
      <el-empty v-show="count == 0" description="没有匹配的舰船" />
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  flex-direction: column;
}

.el-header {
  flex-shrink: 0;
  flex-direction: column;
  height: fit-content;
  padding: $space-3 $space-1 $space-3;
  background: transparent;
  box-sizing: border-box;
}

.toolbar {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: $space-3;
}

.count {
  justify-self: start;
  width: 6rem;
  height: 40px;
  font-size: 1rem;
  justify-content: flex-start;
  background-color: $color-surface;
  border-color: $color-border;
  color: $color-primary;
}

.search {
  justify-self: center;
  width: 560px;
  max-width: 100%;
}

.toolbar :deep(.el-button-group) {
  justify-self: end;
}

.toolbar :deep(.el-button-group .el-button.is-text) {
  background-color: $color-surface;
  border: 1px solid $color-border;
  color: $color-primary;

  &:hover {
    background-color: var(--el-color-primary-light-9);
    border-color: var(--el-color-primary-light-7);
  }
}

.search :deep(.el-input-group__prepend),
.search :deep(.el-input-group__append) {
  background-color: $color-bg;
  box-shadow: 0 0 0 1px $color-border inset;
}

.search :deep(.el-input-group__prepend .el-button),
.search :deep(.el-input-group__append .el-button) {
  background-color: $color-surface;
  border: none;
}

:deep(.el-badge__content) {
  top: 10px;
  right: -5px;
}

.filters {
  margin-top: $space-3;
}

.filter-row {
  display: flex;
  align-items: flex-start;
  gap: $space-3;
  margin-bottom: $space-2;

  &:last-child {
    margin-bottom: 0;
  }
}

.filter-label {
  flex-shrink: 0;
  width: 5.5rem;
}

.el-main {
  overflow-y: auto;

  & .el-col {
    padding: $space-4 $space-2;
  }
}

@media screen and (max-width: 768px) {
  .toolbar {
    grid-template-columns: auto 1fr;
    row-gap: $space-3;
  }

  .search {
    grid-column: 1 / -1;
    grid-row: 2;
    width: 100%;
  }

  .toolbar :deep(.el-button-group) {
    flex-wrap: nowrap;
  }

  .toolbar :deep(.el-button-group .el-button) {
    padding: 8px 10px;
  }

  .filter-row {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>