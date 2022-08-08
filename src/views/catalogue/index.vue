<script lang="ts" setup>
import shipyard from './shipyard.vue'
import { ref } from 'vue'
import { useStore, dataStore } from '@/store'
import { load } from '@/axios/data'

const store = useStore()
const data = dataStore()

data.option = data.option ?? await load('ui', 'option')
data.ship = data.ship ?? await load('ui', 'ship')
data.skin = data.skin ?? await load('ui', 'skin')

const input = ref(store.input)
</script>

<template>
  <el-container>
    <el-header :class="{ hideHeader: store.headerType }">
      <el-row justify="space-between">
        <el-tag size="large">
          <el-icon><i-ep-Filter /></el-icon>
          {{ store.count }}
        </el-tag>
        <el-col :span="10">
          <el-input
            size="large"
            clearable
            placeholder="Type something"
            v-model.lazy="input"
            @clear="store.input=input"
            @keyup.enter.native="store.input=input"
          >
            <template #prepend>
              <el-badge is-dot :hidden="
                store.filter[0].length == 0
                && store.filter[1].length == 0
                && store.filter[2].length == 0
              ">
                <el-button size="large" @click="store.headerType = !store.headerType">
                  <el-icon>
                    <i-ep-ArrowUpBold v-show="!store.headerType" />
                    <i-ep-ArrowDownBold v-show="store.headerType" />
                  </el-icon>
                  筛选
                </el-button>
              </el-badge>
            </template>
            <template #append>
              <el-badge is-dot :hidden="store.input == ''">
                <el-button size="large" @click="store.input = input">
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
          <el-button bg :text="!store.showSkin" @click="store.showSkin=!store.showSkin">
            <el-icon><i-ep-MagicStick /></el-icon>
            换装
          </el-button>
          <el-button bg :text="!store.showBack" @click="store.showBack=!store.showBack">
            <el-icon><i-ep-Picture /></el-icon>
            背景
          </el-button>
          <el-button bg :text="!store.showFrame" @click="store.showFrame=!store.showFrame">
            <el-icon><i-ep-FullScreen /></el-icon>
            边框
          </el-button>
        </el-button-group>
      </el-row>
      <el-row v-for="(opt, key, index) in data.option as {}">
        <el-col :span="2">
          <el-button
            size="large"
            type="primary"
            :disabled="store.filter[index].length==0"
            @click="store.filter[index]=[]"
          >
            {{ key }}
          </el-button>
        </el-col>
        <el-col :span="22">
          <el-checkbox-group size="large" v-model="store.filter[index]">
            <el-checkbox-button v-for="item in opt" :label="item[0]">
              {{ item[1] }}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <shipyard />
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.el-header {
  height: 270px;
  transition: .3s;
  overflow: hidden;
  flex-direction: column;
  box-shadow: 0 10px 5px -10px gray;

  &.hideHeader {
    height: 60px;
  }
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

  &:first-child {
    margin-bottom: 30px;
  }

  &:last-child .el-checkbox-button {
    margin-bottom: 5px;
  }
}

.el-main {
  overflow-y: overlay;
}
</style>