<script lang="ts" setup>
import selector from './selector.vue'
import controller from './controller.vue'
import { load } from '@/axios/data'
import { Application, Sprite, Container } from './pixi'
import { Spine } from '@pixi-spine/all-3.8'

const route = useRoute()
const loading = ref(true)
const ship = ref({}), skin = ref({})
const name = route.params.name as string
let currentName: string
const option = ref([])
const app = new Application({ resolution: 2 })
const spine = new Container()
let container: HTMLElement, back: Sprite, base: Sprite, char: Spine

;(async () => {
  ship.value = await load('ui', 'ship')
  skin.value = await load('ui', 'skin')
  const [, , rarity,] = ship.value[name]
  app.loader
    .add('back', `https://ui.al.pelom.cn/assets/shipbackground/${rarity}.png`)
    .add('base', `https://ui.al.pelom.cn/assets/spinebase/${rarity > 6 ? rarity - 2 : rarity}.png`)
    .load((loader, resources) => {
      back = new Sprite(resources.back.texture)
      back.anchor.set(0.5)
      back.scale.set(app.screen.width / back.width)
      back.position.set(app.screen.width / 2, app.screen.height / 2)
      app.stage.addChild(back)
      
      base = new Sprite(resources.base.texture)
      base.position.set(spine.width / 2, spine.height)
      spine.addChild(base)
      spine.position.set(160, app.screen.height - 100)
      app.stage.addChild(spine)

      handleSwitch(name)
    })
})()

const handleSwitch = (name: string) => {
  if (name == currentName)
    return
  currentName = name
  loading.value = true
  app.loader
    .reset()
    .add('char', `https://sd.al.pelom.cn/assets/spine/${name}/${name}.skel`)
    .load((loader, resources) => {
      char?.destroy()
      char = new Spine(resources.char.spineData)
      char.scale.set(0.5)
      char.position.set(spine.width / 2, spine.height - 25)
      spine.addChild(char)
      char.state.setAnimation(0, 'stand', true)
      char.interactive = true
      char.on('pointertap', () => {
        base.visible = false
        char.scale.set(1)
        spine.position.set(app.screen.width / 4, app.screen.height / 2 + spine.height / 3)
        char.state.setAnimation(0, 'normal', true)
        option.value = char.state.data.skeletonData.animations.map((item) => {
          return item.name
        })
      })
      loading.value = false
    })
}

const handleBack = () => {
  option.value = []
  base.visible = true
  char.scale.set(0.5)
  spine.position.set(160, app.screen.height - 100)
  char.state.setAnimation(0, 'stand', true)
}

const handleAction = (opt: string) => {
  char.state.setAnimation(0, opt, true)
}

onMounted(() => {
  container = document.getElementById('pixi')
  container.appendChild(app.view)
  app.renderer.resize(container.offsetWidth, container.offsetHeight)
})

onUnmounted(() => {
  app.destroy(true, true)
})
</script>

<template>
  <div id="pixi"></div>
  <div id="ui" v-loading="loading">
    <selector
      v-show="option.length == 0"
      :name="name"
      :name_cn="ship[name]?.[0] ?? ''"
      :skin="skin[name] ?? []"
      @switch="handleSwitch"
    />
    <controller
      v-show="option.length != 0"
      :option="option"
      @back="handleBack"
      @action="handleAction"
    />
  </div>
</template>

<style lang="scss" scoped>
#pixi {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;

  &:deep(canvas) {
    transform-origin: 0 0;
    scale: .5;
  }
}

#ui {
  display: flex;
  width: 100%;
  height: 100%;

  &:deep(.el-card) {
    background: #fff8;
    backdrop-filter: blur(5px);
    
    & .el-card__header {
      background: #fffa;
    }

    & .el-card__body {
      overflow-y: scroll;
      
      &::-webkit-scrollbar {
        display: none;
      }
    }

    & .el-col {
      padding: 5px;
    }

    & .el-button {
      width: 100%;
    }
  }
}
</style>