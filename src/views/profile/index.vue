<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
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

const app = new Application()
let container: HTMLElement

onMounted(() => {
  container = document.getElementById('pixi')
  container.appendChild(app.view)
  app.renderer.resize(container.offsetWidth, container.offsetHeight)
  app.loader
    .add('back', `https://ui.al.pelom.cn/assets/shipbackground/${rarity}.png`)
    .add('char', `https://sd.al.pelom.cn/assets/spine/${name}/${name}.skel`)
    .add('base', `https://ui.al.pelom.cn/assets/spinebase/${rarity > 10 ? rarity % 10 : rarity > 6 ? rarity - 2 : rarity}.png`)
    .load((loader, resources) => {
      const back = new Sprite(resources.back.texture)
      back.anchor.set(0.5)
      back.scale.set(app.screen.width / back.width)
      back.position.set(app.screen.width / 2, app.screen.height / 2)
      app.stage.addChild(back)

      const spine = new Container()
      const base = new Sprite(resources.base.texture)
      const char = new Spine(resources.char.spineData)
      spine.addChild(base)
      char.scale.set(0.5)
      char.position.set(spine.width / 2, spine.height - 25)
      spine.addChild(char)
      spine.position.set(160, app.screen.height - 100)
      app.stage.addChild(spine)

      if (char.state.hasAnimation('stand'))
        char.state.setAnimation(0, 'stand', true)
    })
})

onUnmounted(() => {
  app.destroy(true, true)
})
</script>

<template>
  <el-page-header
    title="返回"
    :content="name_cn"
    @back="$router.push('/catalogue')"
  />
  <div id="pixi"></div>
</template>

<style lang="scss" scoped>
#pixi {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: gray;
  overflow: hidden;
}
</style>