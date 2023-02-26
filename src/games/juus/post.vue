<script lang="ts" setup>
import { toPng } from 'html-to-image'
import drawerSelector from '@/components/drawer-selector.vue'
import { useStore } from '@/store'
import { load } from '@/axios/data'

const props = defineProps<{
  id: number
}>()
const { juus: { list } } = useStore()
const option = ref({}), ship = ref({}), name = ref({})
;(async () => {
  option.value = await load('option')
  ship.value = await load('ship')
  name.value = await load('nickname')
})()
const cdn = 'https://cdn.al.pelom.cn'
const screenshot = ref(false)
const showDrawer = ref(false)
const showDialog = ref(false)
const input = ref('')
let cur: any

const avatar = (name: string) => {
  return name == 'commader'
    ? `${cdn}/juusui/txdi_3.png`
    : `${cdn}/squareicon/${name}.png`
}

const addComment = (target: {}[]) => {
  target.push({
    name: 'commader',
    text: input.value === '' ? 'Add a comment' : input.value,
    reply: []
  })
  input.value = ''
}

const handleUpload = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = () => {
    if (input.files[0]) {
      const file = new FileReader()
      file.readAsDataURL(input.files[0])
      file.onload = e => {
        list[props.id].photo = e.target.result
      }
    }
  }
  input.click()
}

const handleDowload = (flag: boolean) => {
  if (flag) {
    toPng(document.getElementById('post'), {
      backgroundColor: '#222c',
      pixelRatio: 2
    }).then(dataUrl => {
      const link = document.createElement('a')
      link.download = 'juus.png'
      link.href = dataUrl
      link.click()
    })
  }
  else {
    screenshot.value = true
    nextTick(() => {
      toPng(document.getElementById('talk'), {
        backgroundColor: '#e9f3f7',
        pixelRatio: 2
      }).then(dataUrl => {
        const link = document.createElement('a')
        link.download = 'talk.png'
        link.href = dataUrl
        link.click()
        screenshot.value = false
      })
    })
  }
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
  <el-card>
    <el-container id="post">
      <el-main>
        <el-image class="logo" :src="`${cdn}/juusui/zs2.png`" />
        <el-image
          class="photo"
          fit="cover"
          :src="list[id].photo"
          @click="handleUpload"
        />
        <div class="icon">
          <el-image class="like" :src="`${cdn}/juusui/icon_ax_2.png`" />
          <el-image :src="`${cdn}/juusui/icon_pl.png`" />
          <div class="flex-grow"></div>
          <el-image
            :src="`${cdn}/juusui/icon_fx.png`"
            @click="showDialog = true"
          />
        </div>
        <div class="info">
          <span>999+</span>
          <span>次赞</span>
          <div class="flex-grow"></div>
          <span>刚刚</span>
        </div>
      </el-main>
      <el-aside>
        <el-container
          id="talk"
          :class="{ screenshot }"
        >
          <el-header>
            <el-image class="tip" :src="`${cdn}/juusui/guanzhu.png`" />
            <el-row>
              <el-avatar
                :src="`${cdn}/squareicon/${list[id].name}.png`"
                :size="64"
                @click="handleClick(list[id])"
              />
              <el-image class="dot" :src="`${cdn}/juusui/tx.png`" />
              <span>{{ name[list[id].name] ?? list[id].name }}</span>
              <el-image class="follow" :src="`${cdn}/juusui/guanzhu1.png`" />
            </el-row>
          </el-header>
          <el-main class="text-wrapper">
            <div
              class="text"
              contenteditable="true"
              @blur="list[id].text = ($event.target as HTMLDivElement).textContent"
            >
              {{ list[id].text }}
            </div>
          </el-main>
          <el-main class="comment-wrapper">
            <div
              class="comment-card"
              v-for="comment, index in list[id].comment"
            >
              <div class="comment">
                <el-avatar
                  :src="avatar(comment.name)"
                  :size="44"
                  @click="handleClick(comment)"
                />
                <div class="text">
                  <span>{{ name[comment.name] ?? comment.name }}.</span>
                  <span
                    contenteditable="true"
                    @blur="comment.text = ($event.target as HTMLSpanElement).textContent"
                  >
                    {{ comment.text }}
                  </span>
                </div>
              </div>
              <div class="reply-info">
                <span>1min reply</span>
                <span class="flex-grow">reply</span>
                <span>
                  <el-image
                    :src="`${cdn}/juusui/qipao.png`"
                    @click="comment.reply.push({ name: 'commader', text: 'Add a reply...' })"
                  />
                  {{ comment.reply.length }}
                </span>
              </div>
              <div
                class="reply"
                v-for="reply, index in comment.reply"
              >
                <el-avatar
                  :src="avatar(reply.name)"
                  :size="44"
                  @click="handleClick(reply)"
                />
                <div class="text">
                  <span>{{ name[reply.name] ?? reply.name }}.</span>
                  <span
                    contenteditable="true"
                    @blur="reply.text = ($event.target as HTMLSpanElement).textContent"
                  >
                    {{ reply.text }}
                  </span>
                </div>
                <el-icon
                  class="del"
                  @click="comment.reply.splice(index, 1)"
                >
                  <i-ep-Close />
                </el-icon>
              </div>
              <el-icon
                class="del"
                @click="list[id].comment.splice(index, 1)"
              >
                <i-ep-Close />
              </el-icon>
            </div>
          </el-main>
          <el-footer>
            <el-avatar :src="`${cdn}/juusui/txdi_3.png`" :size="44" />
            <el-input v-model="input" placeholder="Add a comment..." />
            <el-image
              :src="`${cdn}/juusui/qipao2.png`"
              @click="addComment(list[id].comment)"
            />
          </el-footer>
        </el-container>
      </el-aside>
    </el-container>
    <drawer-selector
      v-model:show="showDrawer"
      :option="option"
      :item="ship"
      dir="squareicon"
      @check="handleCheck"
    />
    <el-dialog
      v-model="showDialog"
      width="30%"
    >
    <el-button
      size="large"
      type="primary"
      round
      @click="handleDowload(true)"
    >
      截取全屏
    </el-button>
    <el-button
      size="large"
      type="primary"
      round
      @click="handleDowload(false)"
    >
      截取对话
    </el-button>
    </el-dialog>
  </el-card>
</template>

<style lang="scss" scoped>
.el-card {
  width: 1050px;
  height: 640px;
  position: absolute;
  left: 115px;
  top: 40px;
  border: none;
  background-color: #222c;
}

:deep(.el-card__body) {
  height: 100%;
  padding: 0;
}

.logo {
  width: 180px;
  position: absolute;
  top: 0;
  left: 0;
}

.photo {
  width: 500px;
  height: 500px;
  position: absolute;
  top: 50px;
  left: 70px;
  border-radius: 4px;
}

.icon {
  width: 500px;
  height: 32px;
  position: absolute;
  left: 70px;
  bottom: 45px;
  display: flex;
  align-items: center;

  &>.el-image {
    height: 32px;
  }

  &>.like {
    height: 72.8px;
    margin: 0 3.2px 0 -20.8px;
  }
}

.info {
  width: 500px;
  position: absolute;
  left: 70px;
  bottom: 10px;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #e8e8e8;

  &>span:first-child {
    margin-right: 14px;
  }
}

.el-aside {
  width: 400px;
  background-color: #e9f3f7;
}

.el-header {
  height: 120px;
  border-radius: 0 0 25px 25px;
  box-shadow: 0 3px 20px 0 #0004;
  align-items: center;
  background-color: #fafffa;
  font-size: 20px;

  &>.el-row {
    align-items: center;
  }
}

.tip {
  height: 14px;
  position: absolute;
  top: 10px;
  right: 10px;
}

.dot {
  height: 8px;
  margin: 0 14px 0 18px;
}

.follow {
  height: 32px;
  margin: 4px;
}

.text-wrapper {
  height: 80px;
  flex-shrink: 0;
  padding-bottom: 0;

  &>.text {
    height: 100%;
    overflow: hidden;
    border-bottom: 3px #dfe8ea solid;
  }
}

.comment-wrapper {
  padding: 0 6px 0 12px;
  margin: 10px 0;

  &::-webkit-scrollbar {
    display: none;
  }
}

.comment-card {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 10px;
  background-color: #fafffa;
  border-radius: 4px;

  &+& {
    margin-top: 24px;
  }

  & .el-avatar {
    flex-shrink: 0;
    margin-right: 10px;
  }

  & .text>span {
    &:first-child {
      font-weight: 700;
    }

    &:last-child {
      color: #808080;
    }
  }

  &:hover>.del {
    opacity: 1;
  }
}

.comment {
  display: flex;
}

.reply {
  display: flex;
  margin: 20px 0 0 60px;
  position: relative;

  &>.del {
    top: -6px;
    right: -6px;
  }

  &:hover>.del {
    opacity: 1;
  }
}

.reply-info {
  display: flex;
  margin: 10px 0 0 50px;
  color: #808080;

  & .el-image {
    height: 14px;
    margin-right: 4px;
  }

  &>span{
    &:first-child {
      width: 116px;
    }

    &:last-child {
      display: flex;
      align-items: center;
    }
  }
}

.del {
  position: absolute;
  top: 4px;
  right: 4px;
  opacity: 0;
  transition: .2s;
}

.el-footer {
  height: 60px;
  display: flex;
  padding: 10px;
  box-shadow: 0 3px 20px 0 #0004;
  align-items: center;
  justify-content: space-between;
  background-color: whitesmoke;

  &>.el-image {
    width: 40px;
    height: 40px;
    filter: invert(1);
  }
}

.el-input {
  width: 280px;
  height: 50px;
  font-size: 20px;
}

:deep(.el-input__wrapper) {
  background-color: inherit;
  box-shadow: none;
}

:deep(.el-dialog__body) {
  display: flex;
  justify-content: space-around;
}

.screenshot {
  height: auto;
}
</style>