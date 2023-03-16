<script lang="ts" setup>
import { toPng } from 'html-to-image'
import drawerSelector from '@/components/drawer-selector.vue'
import { useStore } from '@/store'
import { load } from '@/axios/data'

const props = defineProps<{
  id: number
}>()
const emits = defineEmits(['back'])
const { chat: { list } } = useStore()
const option = ref({}), ship = ref({}), name = ref({})
;(async () => {
  option.value = await load('option')
  ship.value = await load('ship')
  name.value = await load('nickname')
})()
const cdn = import.meta.env.VITE_CDN
const screenshot = ref(false)
const showDrawer = ref(false)
const input = ref('')
let cur: any

const avatar = (name: string) => {
  return name == 'commander'
    ? `${cdn}/juusui/txdi_3.png`
    : `${cdn}/squareicon/${name}.png`
}

const handleUpload = (target: any) => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = () => {
    if (input.files[0]) {
      const file = new FileReader()
      file.readAsDataURL(input.files[0])
      file.onload = e => {
        target.image= e.target.result
      }
    }
  }
  input.click()
}

const handleDowload = () => {
  screenshot.value = true
  nextTick(() => {
    toPng(document.getElementById('chat'), {
      pixelRatio: 2
    }).then(dataUrl => {
      const link = document.createElement('a')
      link.download = 'chat.png'
      link.href = dataUrl
      link.click()
      screenshot.value = false
    })
  })
}

const addText = () => {
  list[props.id].chat.push({ name: 'commander', text: input.value })
  input.value = ''
}

const addImage = () => {
  list[props.id].chat.push({ name: 'commander' })
  handleUpload(list[props.id].chat.at(-1))
}

const handleClick = (target: {}) => {
  cur = toRefs(target)
  showDrawer.value = true
}

const handleCheck = (name: string) => {
  cur.name.value = name
  showDrawer.value = false
}
</script>

<template>
  <el-container id="chat" :class="{ screenshot }">
    <el-header>
      <el-icon @click="$emit('back')"><i-ep-ArrowLeftBold /></el-icon>
      <span
        contenteditable
        @blur="list[id].name = ($event.target as HTMLDivElement).textContent"
      >
        {{ list[id].name }}
      </span>
      <el-popover
        placement="bottom-end"
        :width="150"
        trigger="click"
      >
        <el-button
          text
          @click="handleDowload"
        >
          <el-icon><i-ep-Crop /></el-icon>
          <span>截取全屏</span>
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
        v-for="chat, index in list[id].chat"
        :class="{ right: chat.name === 'commander' }"
      >
        <el-avatar
          :src="avatar(chat.name)"
          :size="44"
          @click="handleClick(chat)"
        />
        <div class="text">
          <span>{{ name[chat.name] ?? chat.name }}</span>
          <el-image
            v-if="!!chat.image"
            :src="chat.image"
            @click="handleUpload(chat)"
          />
          <span
            v-else
            contenteditable
            @blur="chat.text = ($event.target as HTMLDivElement).textContent"
          > 
            {{ chat.text }}
          </span>
        </div>
        <el-icon
          class="del"
          @click="list[id].chat.splice(index, 1)"
        >
          <i-ep-Close />
        </el-icon>
      </el-row>
    </el-main>
    <el-footer>
      <el-icon
        :size="36"
        @click="addImage"
      >
        <i-ep-PictureRounded />
      </el-icon>
      <el-input
        v-model="input"
        @keyup.enter.native="addText"
      />
      <el-image
        :src="`${cdn}/juusui/icon_pl.png`"
        @click="addText"
      />
    </el-footer>
  </el-container>
  <drawer-selector
    v-model:show="showDrawer"
    :option="option"
    :item="ship"
    dir="squareicon"
    @check="handleCheck"
  />
</template>

<style lang="scss" scoped>
.el-container {
  background-color: #eee;
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
  &+& {
    margin-top: 10px;
  }

  &.right {
    direction: rtl;

    &>.text>span:last-child {
      background-color: #87cefa;
      direction: ltr;
      border-radius: 8px 0 8px 8px;
    }
  }

  &:hover>.del, &:focus-within>.del {
    opacity: 1;
  }
}

.text {
  display: flex;
  flex-direction: column;
  max-width: 70%;
  margin: 0 8px;

  &>span {
    width: fit-content;

    &:first-child {
      font-size: 14px;
      color: #808080;
    }

    &:last-child {
      background-color: #f5f5f5;
      padding: 8px;
      border-radius: 0 8px 8px 8px;
      word-break: break-all;
      box-shadow: var(--el-box-shadow-lighter);
    }
  }
}

.del {
  margin-top: 18px;
  opacity: 0;
  transition: .2s;
}

.el-footer {
  height: 50px;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f5;

  &>.el-image {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    filter: invert(1);
  }
}

.el-input {
  width: 100%;
  min-height: 40px;
  margin: 0 10px;
  font-size: 20px;
}

.screenshot {
  height: auto;
}
</style>