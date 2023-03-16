<script lang="ts" setup>
import { useStore } from '@/store'
import { load } from '@/axios/data'

const emits = defineEmits(['open'])
const name = ref({})
;(async () => {
  name.value = await load('nickname')
})()
const { chat: { list, add } } = useStore()

const abstract = (target: any) => {
  return !!target
    ? `${name.value[target.name] ?? target.name}: ${!!target.image ? '[图片]' : target.text}`
    : ''
}
</script>

<template>
  <el-container>
    <el-header>
      <el-icon @click="$router.back()">
        <i-ep-ArrowLeftBold />
      </el-icon>
      <span>啾信</span>
      <el-popover
        placement="bottom-end"
        :width="150"
        trigger="click"
      >
        <el-button
          text
          @click="add"
        >
          <el-icon><i-ep-ChatRound /></el-icon>
          <span>发起群聊</span>
        </el-button>
        <template #reference>
          <el-icon>
            <i-ep-MoreFilled />
          </el-icon>
        </template>
      </el-popover>
    </el-header>
    <el-main>
      <el-row
        v-for="item, index in list"
        @click="$emit('open', index)"
      >
        <el-avatar :size="48" shape="square" />
        <div class="text">
          <span>{{ item.name }}</span>
          <span>{{ abstract(item.chat.at(-1)) }}</span>
        </div>
        <el-icon
          class="del"
          @click.stop="list.splice(index, 1)"
        >
          <i-ep-Close />
        </el-icon>
      </el-row>
    </el-main>
    <el-footer>
      <el-icon :size="24" color="#87cefa">
        <i-ep-ChatRound />
      </el-icon>
      <el-icon :size="24">
        <i-ep-User />
      </el-icon>
      <el-icon :size="24">
        <i-ep-Compass />
      </el-icon>
    </el-footer>
  </el-container>
</template>

<style lang="scss" scoped>
.el-container {
  background-color: #f5f5f5;
}

.el-header {
  height: 50px;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: #eee;

  &>span {
    min-width: 20px;
  }
}

.el-button {
  width: 100%;
  justify-content: left;
}

.el-main::-webkit-scrollbar {
  display: none;
}

.el-main {
  padding: 10px;
}

.el-row {
  padding: 5px;

  &+& {
    margin-top: 10px;
  }

  &:hover>.del {
    opacity: 1;
  }
}

.text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10px;

  &>span {
    &:last-child {
      height: 1em;
      font-size: 14px;
      color: #808080;
      overflow: hidden;
      word-break: break-all;
    }
  }
}

.del {
  opacity: 0;
  transition: .2s;
}

.el-footer {
  height: 50px;
  display: flex;
  padding: 10px 40px;
  align-items: center;
  justify-content: space-between;
  background-color: #eee;

  &>.el-image {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    filter: invert(1);
  }
}
</style>