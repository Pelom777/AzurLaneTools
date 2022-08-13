<script lang="ts" setup>
import icon from './icon.vue'
import { ref, watchEffect } from 'vue'
import { load } from '@/axios/data'

const option = ref(), ship = ref(), skin = ref()
;(async () => {
  option.value = await load('ui', 'option')
  ship.value = await load('ui', 'ship')
  skin.value = await load('ui', 'skin')

  watchEffect(() => {
    list.value = []
    for (let name in ship.value) {
      if (
        filter.value.every((filter: number[], index) => {
          return filter.length == 0
            || filter.includes(ship.value[name][index + 1] as number)
        })
        && ship.value[name][0].includes(input.value)
      ) list.value.push(name)
    }
    count.value = list.value.length
  })
})()

const showOption = ref(false)
const input = ref(''), filter = ref([[], [], []]), list = ref([]), count = ref(0)
const showSkin = ref(false), showBack = ref(false), showFrame = ref(false)
</script>

<template>
  <el-container>
    <el-header>
      <el-row justify="space-between">
        <el-tag size="large">
          <el-icon><i-ep-Filter /></el-icon>
          {{ count }}
        </el-tag>
        <el-col :lg="10">
          <el-input
            size="large"
            clearable
            placeholder="Type something"
            v-model.lazy="input"
          >
            <template #prepend>
              <el-badge is-dot :hidden="
                filter[0].length == 0
                && filter[1].length == 0
                && filter[2].length == 0
              ">
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
                  <el-icon>
                    <i-ep-search />
                  </el-icon>
                  搜索
                </el-button>
              </el-badge>
            </template>
          </el-input>
        </el-col>
        <el-button-group size="large" type="danger">
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
      </el-row>
      <el-row
        v-show="showOption"
        v-for="(opt, key, index) in option as {}"
      >
        <el-col :lg="2">
          <el-button
            size="large"
            type="primary"
            :disabled="filter[index].length==0"
            @click="filter[index]=[]"
          >
            {{ key }}
          </el-button>
        </el-col>
        <el-col :lg="22">
          <el-checkbox-group size="large" v-model="filter[index]">
            <el-checkbox-button v-for="item in opt" :label="item[0]">
              {{ item[1] }}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :class="{
        showSkin: showSkin,
        hideBack: !showBack,
        showFrame: showFrame
      }">
        <el-col
          :xs="8" :sm="6" :md="4" :lg="3" :xl="2"
          v-show="list.includes(name)"
          v-for="name in list"
        >
          <icon
            :name="name"
            :ship="ship?.[name]"
            :skin="skin?.[name]"
          />
        </el-col>
      </el-row>
      <el-empty v-show="count == 0" />
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.el-header {
  height: fit-content;
  flex-direction: column;
  box-shadow: 0 10px 5px -10px gray;
}

.el-tag {
  width: 5rem;
  height: 40px;
  font-size: 1rem;
  justify-content: start;
}

.el-input:deep(.el-badge__content) {
    top: 10px;
    right: -5px;
}

.el-row {
  margin-bottom: 10px;

  & .el-button {
    width: 5rem;
  }
}

:deep(.el-main) {
  overflow-y: overlay;

  & .el-col {
    padding: 15px 10px;
  }
}
</style>