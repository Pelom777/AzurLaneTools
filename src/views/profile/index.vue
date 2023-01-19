<script lang="ts" setup>
import selector from './selector.vue'
import controller from './controller.vue'
import { load } from '@/axios/data'
import { Application, Sprite, Container, Rectangle, Texture } from './pixi'
import { Spine } from '@pixi-spine/all-3.8'

const route = useRoute()
const loading = ref(true)
const ship = ref({}), skin = ref({})
const name = route.params.name as string
let currentName: string
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
  app.loader
    .add('back', `https://cdn.al.pelom.cn/shipbackground/${rarity}.png`)
    .add('spineBase', `https://cdn.al.pelom.cn/spinebase/${rarity > 6 ? rarity - 2 : rarity}.png`)
    .load((loader, resources) => {
      back = new Sprite(resources.back.texture)
      back.anchor.set(0.5)
      back.scale.set(Math.max(app.screen.width / back.width, app.screen.height / back.height))
      back.position.set(app.screen.width / 2, app.screen.height / 2)
      app.stage.addChild(back)

      spineBase = new Sprite(resources.spineBase.texture)
      spineBase.position.set(spineContainer.width / 2, spineContainer.height)
      spineContainer.addChild(spineBase)
      spineContainer.position.set(130, app.screen.height - 100)

      handleSwitch(name)
    })
})()

const composeSprite = (texture: Texture, mesh: string[]) => {
  let container: Container = new Container()
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

const handleSwitch = (name: string) => {
  if (name == currentName)
    return
  currentName = name
  loading.value = true
  app.loader
    .reset()
    .add('paintingJson',`https://cdn.al.pelom.cn/painting/${name}/${name}.json`)
    .add('spineChar', `https://cdn.al.pelom.cn/spine/${name}/${name}.skel`)
    .load((loader, resources) => {
      paintingContainer?.destroy(true)
      paintingContainer = new Container()
      let paintingJson: Object = resources.paintingJson.data
      Object.keys(paintingJson).forEach((file) => {
        app.loader.add(`${file}Png`, `https://cdn.al.pelom.cn/painting/${name}/${file}.png`)
        if(paintingJson[file]['raw'] === true)
          return
        app.loader.add(`${file}Obj`, `https://cdn.al.pelom.cn/painting/${name}/${file}-mesh.obj`)
      })
      app.loader
        .load((loader, resources) => {
          let baseSize = [0, 0], baseOffset = [0, 0], baseScale = 1;
          Object.keys(paintingJson).forEach((file) => {
            let size = paintingJson[file]['size'], rawSize = paintingJson[file]['rawSize'], pivot = paintingJson[file]['pivot'], position = paintingJson[file]['position']
            let container: Container
            if(paintingJson[file]['raw'] === true){
              container = new Container()
              let sprite = new Sprite(resources[`${file}Png`].texture)
              sprite.position.set(0, sprite.height)
              sprite.scale.set(1, -1)
              container.addChild(sprite)
            }
            else {
              container = composeSprite(resources[`${file}Png`].texture, resources[`${file}Obj`].data.split('\r\n'))
              container.scale.set(size[0] / rawSize[0], size[1] / rawSize[1])
            }
            if (file == name) {
              baseSize = size
              baseOffset = [size[0] / 2 + position[0], size[1] / 2 + position[1]]
              baseScale = app.screen.height / paintingJson[file]['view'][1] * 0.8
            }
            else {
              container.position.set(baseSize[0] / 2 - size[0] * pivot[0] + position[0], baseSize[1] / 2 - size[1] * pivot[1] + position[1])
            }
            paintingContainer.addChild(container)
          })
          paintingContainer.scale.set(baseScale, -baseScale)
          paintingContainer.position.set(app.screen.width / 2 - baseOffset[0] * baseScale, app.screen.height / 2 + baseOffset[1] * baseScale)
          app.stage.addChild(paintingContainer)
          
          app.stage.addChild(spineContainer)

          loading.value = false
        })

      spineChar?.destroy()
      spineChar = new Spine(resources.spineChar.spineData)
      spineChar.scale.set(0.5)
      spineChar.position.set(spineContainer.width / 2, spineContainer.height - 25)
      spineContainer.addChild(spineChar)
      spineChar.state.setAnimation(0, 'stand', true)
      spineChar.interactive = true
      spineChar.on('pointertap', () => {
        paintingContainer.visible = false
        spineBase.visible = false
        spineChar.scale.set(1)
        spineContainer.position.set(app.screen.width / 4, app.screen.height / 2 + spineContainer.height / 3)
        spineChar.state.setAnimation(0, 'normal', true)
        option.value = spineChar.state.data.skeletonData.animations.map((item) => {
          return item.name
        })
      })
    })
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
  <div id="pixi" ref="container" v-loading="loading"></div>
  <div id="ui">
    <selector
      v-show="option.length == 0"
      :name="name"
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