<script lang="ts" setup>
import selector from './selector.vue'
import controller from './controller.vue'
import { load } from '@/axios/data'
import { Application, Sprite, Container, Rectangle, Texture, Loader } from './pixi'
import { Spine } from '@pixi-spine/all-3.8'

const cdn = import.meta.env.VITE_CDN
const route = useRoute()
const loading = ref(true)
const ship = ref({}), skin = ref({})
const name = route.params.name as string
let cur = route.params.cur as string ?? name
const option = ref([])
const app = new Application({ resolution: 2 })
const spineContainer = new Container()
let paintingContainer: Container
const container = ref<HTMLDivElement>()
let back: Sprite, spineBase: Sprite, spineChar: Spine

;(async () => {
  ship.value = (await load('ship'))[name]
  skin.value = (await load('skin'))[name]
  const rarity = ship.value['rarity']
  app.loader.add(`${cdn}/shipbackground/${rarity}.png`, res => {
    back = new Sprite(res.texture)
    back.anchor.set(0.5)
    back.scale.set(Math.max(app.screen.width / back.width, app.screen.height / back.height))
    back.position.set(app.screen.width / 2, app.screen.height / 2)
    app.stage.addChild(back)
  }).add(`${cdn}/spinebase/${rarity > 6 ? rarity - 2 : rarity}.png`, res => {
    spineBase = new Sprite(res.texture)
    spineBase.position.set(spineContainer.width / 2, spineContainer.height)
    spineContainer.addChild(spineBase)
    spineContainer.position.set(130, app.screen.height - 100)
  }).load(() => handleSwitch(cur))
})()

const composeSprite = (texture: Texture, mesh: string[]) => {
  let container = new Container()
  let count = mesh.reduce((t, c) => t + (c[1] == 't' ? 1 : 0), 0)
  for (let i = 1; i <= count; i += 4) {
    let v0: number[] = mesh[i].split(' ').slice(1).map(e => Number(e));
    let v1: number[] = mesh[i + 2].split(' ').slice(1).map(e => Number(e));
    let vt0: number[] = mesh[i + count].split(' ').slice(1).map(e => Number(e));
    let vt1: number[] = mesh[i + count + 2].split(' ').slice(1).map(e => Number(e));
    vt0 = [Math.round(vt0[0] * texture.width), Math.round(vt0[1] * texture.height)]
    vt1 = [Math.round(vt1[0] * texture.width), Math.round(vt1[1] * texture.height)]
    let rectangle = new Rectangle(vt0[0], texture.height - vt1[1], vt1[0] - vt0[0], vt1[1] - vt0[1])
    let sprite = new Sprite(new Texture(texture.baseTexture, rectangle))
    sprite.scale.set(1, -1)
    sprite.position.set(-v0[0], v1[1])
    container.addChild(sprite)
  }
  return container
}

const loadPainting = async (name: string, json: {}) => {
  const loader = new Loader()
  const paintingContainer = new Container()
  const baseSize = json[name]['size'], baseScale = app.screen.height / json[name]['view'][1] * 0.8;
  for (let file of Object.keys(json)) {
    let size = json[file]['size'], rawSize = json[file]['rawSize'], pivot = json[file]['pivot'], position = json[file]['position']
    let container: Container
    const png: any = await new Promise(resolve => {
      loader.add(`${cdn}/painting/${name}/${file}.png`, res => resolve(res)).load()
    })
    if (json[file]['raw'] === true) {
      container = new Container()
      let sprite = new Sprite(png.texture)
      sprite.position.set(0, sprite.height)
      sprite.scale.set(1, -1)
      container.addChild(sprite)
    }
    else {
      const obj: any = await new Promise(resolve => {
        loader.add(`${cdn}/painting/${name}/${file}-mesh.obj`, res => resolve(res)).load()
      })
      container = composeSprite(png.texture, obj.data.split('\r\n'))
    }
    container.scale.set(size[0] / rawSize[0], size[1] / rawSize[1])
    if (file !== name) {
      container.position.set(baseSize[0] / 2 - size[0] * pivot[0] + position[0], baseSize[1] / 2 - size[1] * pivot[1] + position[1])
    }
    paintingContainer.addChild(container)
  }
  paintingContainer.scale.set(baseScale, -baseScale)
  paintingContainer.position.set(app.screen.width / 2 - (baseSize[0] / 2 + json[name]['position'][0]) * baseScale, app.screen.height / 2 + (baseSize[1] / 2 + json[name]['position'][1]) * baseScale)
  return paintingContainer
}

const handleSwitch = (name: string) => {
  loading.value = true
  app.loader.reset().add(`${cdn}/painting/${name}/${name}.json`,async res => {
    paintingContainer?.destroy(true)
    paintingContainer = await loadPainting(name, res.data)
    paintingContainer.interactive = true
    paintingContainer.on('pointerdown', e => {
      let { x, y } = e.data.global
      paintingContainer.on('pointermove', e => {
        paintingContainer.position.set(paintingContainer.position.x + e.data.global.x - x, paintingContainer.position.y + e.data.global.y - y)
        x = e.data.global.x, y = e.data.global.y
      }).on('pointerup', () => {
        paintingContainer.off('pointermove')
      })
    })
    app.stage.addChild(paintingContainer)
    app.stage.addChild(spineContainer)
    loading.value = false
  }).add(`${cdn}/spine/${name}/${name}.skel`, res => {
    spineChar?.destroy()
    spineChar = new Spine(res.spineData)
    spineChar.scale.set(0.5)
    spineChar.position.set(spineContainer.width / 2, spineContainer.height - 25)
    spineContainer.addChild(spineChar)
    spineChar.state.setAnimation(0, 'stand', true)
    spineChar.interactive = true
    spineChar.on('pointertap', () => {
      paintingContainer.visible = false
      spineBase.visible = false
      spineChar.scale.set(1)
      spineContainer.position.set(app.screen.width / 3, app.screen.height / 2 + spineContainer.height / 3)
      spineChar.state.setAnimation(0, 'normal', true)
      option.value = spineChar.state.data.skeletonData.animations.map((item) => {
        return item.name
      })
    })
  }).load()
}

const handleBack = () => {
  option.value = []
  paintingContainer.visible = true
  spineBase.visible = true
  spineChar.scale.set(0.5)
  spineContainer.position.set(160, app.screen.height - 100)
  spineChar.state.setAnimation(0, 'stand', true)
}

const handleAction = (opt: string) => {
  spineChar.state.setAnimation(0, opt, true)
}

onMounted(() => {
  container.value.appendChild(app.view)
  app.renderer.resize(container.value.offsetWidth, container.value.offsetHeight)
})

onUnmounted(() => {
  app.destroy(true, true)
})
</script>

<template>
  <div>
    <div id="pixi" ref="container" v-loading="loading"></div>
    <selector
      v-show="option.length == 0"
      :name="cur"
      :ship="ship"
      :skin="skin"
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
</style>