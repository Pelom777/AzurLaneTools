<script lang="ts" setup>
import { useStore } from '@/store'
import { load } from '@/axios/data'

const emits = defineEmits(['open'])
const name = ref({})
;(async () => {
  name.value = await load('nickname')
})()
const cdn = import.meta.env.VITE_CDN
const { juus: { list, add } } = useStore()
const showDialog = ref(false)
</script>

<template>
  <el-card>
    <el-scrollbar always>
      <div
        class="item"
        v-for="item, index in list"
        @click="$emit('open', index)"
      >
        <div class="info">
          <el-avatar :size="60" :src="`${cdn}/squareicon/${item.name}.png`" />
          <span>{{ name[item.name] ?? item.name }}</span>
        </div>
        <el-image class="photo" fit="cover" :src="item.photo" />
        <span class="text">{{ item.text }}</span>
        <el-image class="like" :src="`${cdn}/juusui/icon_ax_3.png`" />
        <span>999+</span>
        <el-icon
          class="del"
          @click.stop="list.splice(index, 1)"
        >
          <i-ep-Close />
        </el-icon>
      </div>
      <div class="item" @click="add">
        <el-icon :size="24"><i-ep-Plus/></el-icon>
      </div>
    </el-scrollbar>
    <el-image
      class="help"
      :src="`${cdn}/juusui/bangzhu.png`"
      @click="showDialog = true"
    />
    <el-dialog
      v-model="showDialog"
      title="碧蓝航线JUUs动态生成器"
      width="30%"
      center
    >
    <h3>
      <ul>
        <li>点击图片、头像或文字编辑内容</li>
        <li>点击加号图标新增一篇帖子</li>
        <li>点击气泡图标新增一条评论或回复</li>
        <li>点击纸飞机图标为你的作品生成截图</li>
        <li>已编辑内容会缓存在浏览器中</li>
        <li>主站<a href="https://al.pelom.cn">al.pelom.cn</a></li>
      </ul>
    </h3>
    </el-dialog>
  </el-card>
</template>

<style lang="scss" scoped>
.el-card {
  width: 1050px;
  height: 550px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: none;
  font-size: 20px;
  background-color: #222c;
}

:deep(.el-card__body) {
  height: 100%;
  padding: 30px;
}

.el-scrollbar {
  padding: 0;
}

:deep(.el-scrollbar__view) {
  height: 100%;
}

:deep(.el-scrollbar__bar.is-vertical) {
  width: 12px;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  transform: scale(.9);
  transform-origin: 100% 100%;
  background-color: #5f5a55;
}

:deep(.el-scrollbar__thumb) {
  background-color: #fbfef9;
  opacity: 1;
}

.help {
  width: 36px;
  position: absolute;
  right: 20px;
  top: 30px;
}

.item{
  height: 100px;
  margin-right: 48px;
  padding: 0 16px 0 10px;
  background-color: #c8cdc8;
  border-radius: 4px;
  display: flex;
  align-items: center;
  position: relative;

  &:active {
    background-color: #b1afa9;
  }

  &:hover>.del {
    opacity: 1;
  }

  &+& {
    margin-top: 32px;
  }

  &:last-child {
    justify-content: center;
  }
}

.info {
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 24px
}

.photo {
  width: 70px;
  height: 70px;
  margin-right: 16px;
}

.text {
  max-height: 70px;
  flex: 1;
  overflow: hidden;
  margin-right: -20px;
}

.like {
  height: 72.8px;
  margin: 0 3.2px;
}

.del {
  position: absolute;
  top: 4px;
  right: 4px;
  opacity: 0;
  transition: .2s;
}

.el-avatar {
  margin-bottom: 4px;
}
</style>