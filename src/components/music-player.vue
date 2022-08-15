<script lang="ts" setup>
const props = defineProps<{
  id: number
}>()

const audio = ref<HTMLAudioElement>()
const show = ref(false), progress = ref(0), max = ref(0), paused = ref(true)

watch(props, () => {
  audio.value.src = `http://music.163.com/song/media/outer/url?id=${props.id}.mp3`
  show.value = true
  paused.value = false
})

const onLoadedmetadata = () => {
  max.value = audio.value.duration
}

const onTimeupdate = () => {
  progress.value = audio.value.currentTime
}

const onEnded = () => {
  paused.value = true
}

const onChange = (val: number) => {
  audio.value.currentTime = val
  audio.value.play()
  paused.value = false
}

const onInput = () => {
  audio.value.pause()
  paused.value = true
}

const onClick = () => {
  paused.value
    ? audio.value.play()
    : audio.value.pause()
  paused.value = !paused.value
}

const mmss = (val: number) => {
  return new Date(val * 1000).toISOString().substring(14, 19)
}
</script>

<template>
  <div class="music-player" v-show="show">
    <el-button size="large" text circle @click="onClick">
      <el-icon color="#409EFF" size="72px">
        <i-ep-VideoPlay v-show="paused" />
        <i-ep-VideoPause v-show="!paused" />
      </el-icon>
    </el-button>
    <audio
      ref="audio"
      autoplay
      @loadedmetadata="onLoadedmetadata"
      @timeupdate="onTimeupdate"
      @ended="onEnded"
    >
    </audio>
    {{ mmss(progress) }} / {{ mmss(max) }}
    <el-slider
      v-model="progress"
      :max="max"
      :format-tooltip="mmss"
      @change="onChange"
      @input="onInput"
    />
  </div>
</template>

<style lang="scss" scoped>
.music-player {
  position: sticky;
  height: 100px;
  bottom: 0;
  padding: 50px 20px;
  margin-top: 60px;
  background: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  filter: drop-shadow(0 0 12px darkgray);
}

.el-button {
  --el-button-size: 100px;
  position: absolute;
  top: -50px;
  background: inherit;
}
</style>