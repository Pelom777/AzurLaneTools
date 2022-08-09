<script lang="ts" setup>
import controller from './controller.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore, dataStore } from '@/store'
import { load } from '@/axios/data'
import { Application, Container, Sprite } from 'pixi.js'
import { Spine } from '@pixi-spine/all-3.8'

const route = useRoute()
const store = useStore()
const data = dataStore()

data.ship = data.ship ?? await load('ui', 'ship')
data.skin = data.ship ?? await load('ui', 'skin')
const name = route.params.name as string
const [name_cn, type, rarity, nationality] = data.ship[name]
const option = ref([])

const app = new Application({ resolution: 2 })
let container: HTMLElement, back: Sprite, spine: Container, base: Sprite, char: Spine

onMounted(() => {
  container = document.getElementById('pixi')
  container.appendChild(app.view)
  app.renderer.resize(container.offsetWidth, container.offsetHeight)
  app.loader
    .add('back', `https://ui.al.pelom.cn/assets/shipbackground/${rarity}.png`)
    .add('char', `https://sd.al.pelom.cn/assets/spine/${name}/${name}.skel`)
    .add('base', `https://ui.al.pelom.cn/assets/spinebase/${rarity > 6 ? rarity - 2 : rarity}.png`)
    .load((loader, resources) => {
      back = new Sprite(resources.back.texture)
      back.anchor.set(0.5)
      back.scale.set(app.screen.width / back.width)
      back.position.set(app.screen.width / 2, app.screen.height / 2)
      app.stage.addChild(back)

      spine = new Container()
      base = new Sprite(resources.base.texture)
      char = new Spine(resources.char.spineData)
      spine.addChild(base)
      char.scale.set(0.5)
      char.position.set(spine.width / 2, spine.height - 25)
      spine.addChild(char)
      spine.position.set(160, app.screen.height - 100)
      app.stage.addChild(spine)
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
    })
})

onUnmounted(() => {
  app.destroy(true, true)
})

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
</script>

<template>
  <div id="pixi"></div>
  <div id="ui" v-show="option.length != 0">
    <controller
      :option="option as []"
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
    scale: 0.5;
  }
}

#ui {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>