<script lang="ts" setup>
import selector from './selector.vue'
import controller from './controller.vue'
import attribute from './attribute.vue'
import face from './face.vue'
import { load } from '@/axios/data'
import { Application, Sprite, Container, Rectangle, Texture, Loader, RenderTexture, BaseTexture } from './pixi'
import { Spine } from 'pixi-spine'

const cdn = import.meta.env.VITE_CDN
const route = useRoute()
const router = useRouter()
const loading = ref(true)
const ship = ref({}), skin = ref({}), attr = ref()
const name = route.params.name as string
const cur = ref(route.params.cur as string ?? name)
const ex = ref(false)
const option = ref([])
const panel = ref('')
const faceList = ref<number[]>([])
const faceCur = ref(-1)
const hasSpine = ref(false)
const app = new Application({ resolution: 2 })
const spineContainer = new Container()
const paintingContainer = new Container()
const container = ref<HTMLDivElement>()
let back: Sprite, spineBase: Sprite, paintingFace: Container | null = null
let spineChar: Spine | null = null
let ro: ResizeObserver | undefined

const assetLoader = new Loader()
const mediaLoader = new Loader()

const destroyOptions = { children: true, texture: true, baseTexture: true }

const destroyChildren = (container: Container | null) => {
  if (!container || container.destroyed) return
  container.removeChildren().forEach(child => child.destroy(destroyOptions))
}

;(async () => {
  const [s, k, a] = await Promise.all([load('ship'), load('skin'), load('ship-attr')])
  ship.value = s[name]
  skin.value = k[name]
  attr.value = a[name]
  const rarity = ship.value['rarity']
  assetLoader.add(`${cdn}/shipbackground/${rarity}.png`, res => {
    back = new Sprite(res.texture)
    back.anchor.set(0.5)
    back.scale.set(Math.max(app.screen.width / back.width, app.screen.height / back.height))
    back.position.set(app.screen.width / 2, app.screen.height / 2)
    app.stage.addChild(back)
  }).add(`${cdn}/spinebase/${rarity > 6 ? rarity - 2 : rarity}.png`, res => {
    spineBase = new Sprite(res.texture)
    spineBase.position.set(spineContainer.width / 2, spineContainer.height)
    spineContainer.addChild(spineBase)
    spineContainer.position.set(200, app.screen.height - 100)
  }).load(() => {
    loading.value = false
    handleChange(cur.value)
  })
})()

const composeSprite = (texture: Texture, mesh: string[]) => {
  const layer = new Container()
  const count = mesh.reduce((t, c) => t + (c[1] == 't' ? 1 : 0), 0)
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
    layer.addChild(sprite)
  }
  return layer
}

const loadPainting = async (name: string, json: {}) => {
  const loader = new Loader()
  const painting = new Container()
  const baseSize = json[name]['size'], baseView = json[name]['view'], baseScale = app.screen.height / baseView[1] * 0.9
  paintingFace = null
  for (let file of Object.keys(json)) {
    let size = json[file]['size'], rawSize = json[file]['rawSize'], pivot = json[file]['pivot'], position = json[file]['position']
    let layer: Container
    if (file === 'face') {
      paintingFace = new Container()
      paintingFace.scale.set(size[0] / rawSize[0], size[1] / rawSize[1])
      paintingFace.position.set(baseSize[0] / 2 - size[0] * pivot[0] + position[0], baseSize[1] / 2 - size[1] * pivot[1] + position[1])
      continue
    }
    const png: any = await new Promise(resolve => {
      loader.add(`${cdn}/painting/${name}/${file}.png`, res => resolve(res)).load()
    })
    if (json[file]['raw'] === true) {
      layer = new Container()
      let sprite = new Sprite(png.texture)
      sprite.position.set(0, sprite.height)
      sprite.scale.set(1, -1)
      layer.addChild(sprite)
    }
    else {
      const obj: any = await new Promise(resolve => {
        loader.add(`${cdn}/painting/${name}/${file}-mesh.obj`, res => resolve(res)).load()
      })
      layer = composeSprite(png.texture, obj.data.split('\r\n'))
    }
    layer.scale.set(size[0] / rawSize[0], size[1] / rawSize[1])
    if (file !== name) {
      layer.position.set(baseSize[0] / 2 - size[0] * pivot[0] + position[0], baseSize[1] / 2 - size[1] * pivot[1] + position[1])
    }
    painting.addChild(layer)
  }
  if (paintingFace) painting.addChild(paintingFace)
  loader.destroy()
  const basePos = json[name]['position']
  painting.pivot.set(baseSize[0] / 2 + basePos[0] + baseView[0] / 2, baseSize[1] / 2 + basePos[1])
  painting.position.set(0)
  painting.scale.set(baseScale, -baseScale)
  return painting
}

const changeFace = async (index: number) => {
  if (!paintingFace) return
  faceCur.value = index
  if (index < 0) {
    destroyChildren(paintingFace)
    return
  }
  const old = paintingFace.children[0] as Sprite | undefined
  const oldBase = old?.texture?.baseTexture
  if (oldBase) BaseTexture.removeFromCache(oldBase)
  const url = `${cdn}/paintingface/${cur.value}/${index}.png`
  const res: any = await new Promise(resolve => {
    new Loader().add(url, res => resolve(res)).load()
  })
  if (!paintingFace || paintingFace.destroyed) return
  let sprite = new Sprite(res.texture)
  sprite.position.set(0, sprite.height)
  sprite.scale.set(1, -1)
  destroyChildren(paintingFace)
  paintingFace.addChild(sprite)
}

const handleChange = (name: string) => {
  loading.value = true
  hasSpine.value = false
  spineChar?.destroy(destroyOptions)
  spineChar = null
  mediaLoader.reset().add(`${cdn}/painting/${name}/${name}${ex.value ? '_ex' : ''}.json`,async res => {
    faceList.value = res.data['face']?.['list'] ?? []
    faceCur.value = -1
    destroyChildren(paintingContainer)
    paintingContainer.addChild(await loadPainting(name, res.data))
    paintingContainer.pivot.set(0)
    paintingContainer.scale.set(1)
    paintingContainer.position.set(app.screen.width / 2, app.screen.height / 2)
    app.stage.addChild(paintingContainer)
    app.stage.addChild(spineContainer)
    loading.value = false
  }).add(`${cdn}/spine/${name}/${name}.skel`, res => {
    if (res.error) return
    spineChar = new Spine(res.spineData)
    spineChar.scale.set(0.5)
    spineChar.position.set(spineContainer.width / 2, spineContainer.height - 25)
    spineContainer.addChild(spineChar)
    spineChar.state.setAnimation(0, 'stand', true)
    hasSpine.value = true
  }).load()
}

watch([cur, ex], () => handleChange(cur.value))

const handleBack = () => {
  panel.value = ''
  option.value = []
  paintingContainer.visible = true
  spineBase.visible = true
  if (!spineChar) return
  spineChar.scale.set(0.5)
  spineContainer.position.set(200, app.screen.height - 100)
  spineChar.state.setAnimation(0, 'stand', true)
}

const handleAction = (opt: string) => {
  spineChar?.state.setAnimation(0, opt, true)
}

const showSpine = () => {
  if (!spineChar) return
  panel.value = 'spine'
  paintingContainer.visible = false
  spineBase.visible = false
  spineChar.scale.set(1)
  spineContainer.position.set(app.screen.width / 3 + spineContainer.width / 2, app.screen.height / 2 + spineContainer.height / 3)
  spineChar.state.setAnimation(0, 'normal', true)
  option.value = spineChar.state.data.skeletonData.animations.map(item => item.name)
}

const handleDownload = () => {
  const bounds = paintingContainer.getLocalBounds()
  const originalPivot = paintingContainer.pivot.clone()
  const originalPosition = paintingContainer.position.clone()
  const originalScale = paintingContainer.scale.clone()
  paintingContainer.pivot.set(bounds.x, bounds.y)
  paintingContainer.position.set(0)
  paintingContainer.scale.set(1)
  paintingContainer.updateTransform()
  const renderTexture = RenderTexture.create({
    width: paintingContainer.width,
    height: paintingContainer.height,
    resolution: app.renderer.resolution
  })
  try {
    app.renderer.render(paintingContainer, { renderTexture })
    const img = app.renderer.plugins.extract.image(renderTexture, 'image/png', 1.0)

    const a = document.createElement('a')
    a.href = img.src
    a.download = cur.value
    a.click()
    a.remove()
  } finally {
    renderTexture.destroy(true)
    paintingContainer.pivot.copyFrom(originalPivot)
    paintingContainer.position.copyFrom(originalPosition)
    paintingContainer.scale.copyFrom(originalScale)
    paintingContainer.updateTransform()
  }
}

onMounted(() => {
  container.value.appendChild(app.view)
  app.renderer.resize(container.value.offsetWidth, container.value.offsetHeight)

  ro = new ResizeObserver(() => {
    app.renderer.resize(container.value.offsetWidth, container.value.offsetHeight)
  })
  ro.observe(container.value)

  container.value.onwheel = e => {
    paintingContainer.pivot.x += (e.offsetX / 2 - paintingContainer.position.x) / paintingContainer.scale.x
    paintingContainer.pivot.y += (e.offsetY / 2 - paintingContainer.position.y) / paintingContainer.scale.y
    paintingContainer.position.set(e.offsetX / 2, e.offsetY / 2)
    paintingContainer.scale.set(Math.min(Math.max(paintingContainer.scale.x + e.deltaY * -0.005, 0.25), 4))
  }

  paintingContainer.interactive = true
  paintingContainer.on('pointerdown', e => {
    let { x, y } = e.data.global
    paintingContainer.on('pointermove', e => {
      paintingContainer.position.x += e.data.global.x - x
      paintingContainer.position.y += e.data.global.y - y
      x = e.data.global.x, y = e.data.global.y
    }).on('pointerup', () => {
      paintingContainer.off('pointermove')
    })
  })
})

onUnmounted(() => {
  ro?.disconnect()
  destroyChildren(paintingContainer)
  destroyChildren(spineContainer)
  assetLoader.destroy()
  mediaLoader.destroy()
  app.destroy(true, true)
})
</script>

<template>
  <div class="profile">
    <div
      id="pixi"
      ref="container"
      v-loading="loading"
    ></div>
    <div
      class="topbar"
      v-show="panel == ''"
    >
      <selector
        v-model:name="cur"
        v-model:ex="ex"
        :skin="skin"
      />
      <el-button
        @click="router.push('/catalogue')"
        circle
      >
        <el-icon><i-ep-ArrowLeftBold /></el-icon>
      </el-button>
      <el-button
        @click="handleDownload"
        circle
      >
        <el-icon><i-ep-Download /></el-icon>
      </el-button>
      <div class="flex-grow" />
      <el-button
        @click="panel = 'face'"
        circle
        :disabled="faceList.length == 0"
      >
        <el-icon><i-ep-PictureRounded /></el-icon>
      </el-button>
      <el-button
        @click="showSpine"
        circle
        :disabled="!hasSpine"
      >
        <el-icon><i-ep-VideoPlay /></el-icon>
      </el-button>
      <el-button
        @click="panel = 'attr'"
        circle
      >
        <el-icon><i-ep-DataAnalysis /></el-icon>
      </el-button>
    </div>
    <controller
      v-show="panel == 'spine'"
      :option="option"
      @back="handleBack"
      @action="handleAction"
    />
    <face
      v-show="panel == 'face' && faceList.length != 0"
      :name="cur"
      :list="faceList"
      :current="faceCur"
      @back="panel = ''"
      @check="changeFace"
      @clear="changeFace(-1)"
    />
    <attribute
      v-if="!!attr"
      v-show="panel == 'attr'"
      :attr="attr"
      @back="panel = ''"
    />
  </div>
</template>

<style lang="scss" scoped>
.profile {
  position: relative;
  height: 100%;
  padding: $main-padding-y $main-padding-x;
  box-sizing: border-box;
}

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

.topbar {
  position: relative;
  display: flex;
  align-items: center;
  gap: $space-2;
  z-index: 1;
}

.flex-grow {
  flex: 1;
}

.el-button {
  --el-button-bg-color: #8AC8FF;
  --el-button-border-color: #8AC8FF;
  --el-button-text-color: #fff;
  --el-button-hover-bg-color: #6DB8FF;
  --el-button-hover-border-color: #6DB8FF;
  --el-button-hover-text-color: #fff;
  --el-button-disabled-bg-color: #8AC8FF;
  --el-button-disabled-border-color: #8AC8FF;
  --el-button-disabled-text-color: #fff;
  position: relative;
  z-index: 1;
  width: 40px;
  height: 40px;
  font-size: 20px;

  &.is-disabled {
    opacity: .45;
  }
}

@media screen and (max-width: 768px) {
  .profile {
    padding: $space-4;
  }
}
</style>