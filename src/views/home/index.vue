<script lang="ts" setup>
import { load } from '@/axios/data'
import icon from '@/components/icon.vue'

const info = ref({}), ship = ref({}), skin = ref({})
;(async () => {
  ship.value = await load('ship')
  skin.value = await load('skin')
  info.value = await load('new')
})()

const isNarrow = ref(false)
const mq = window.matchMedia('(max-width: 768px)')
const sync = () => isNarrow.value = mq.matches
sync()
mq.addEventListener('change', sync)
onUnmounted(() => mq.removeEventListener('change', sync))
</script>

<template>
  <section class="hero">
    <el-carousel
      :interval="6000"
      indicator-position="none"
      :type="isNarrow ? '' : 'card'"
    >
      <el-carousel-item v-for="url, index in info['cg']" :key="url">
        <el-image
          :src="url"
          loading="lazy"
          :preview-src-list="info['cg']"
          :initial-index="index"
          hide-on-click-modal
          :preview-teleported="true"
        />
      </el-carousel-item>
    </el-carousel>
  </section>

  <section v-if="info['ship']?.length" class="block">
    <h2 class="block-title">新增舰船</h2>
    <el-row>
      <el-col
        v-for="name in info['ship']"
        :key="name"
        :xs="6" :sm="4" :md="3" :lg="2" :xl="2"
      >
        <icon :name="name" :ship="ship[name]" :skin="skin[name]" frame />
      </el-col>
    </el-row>
  </section>

  <section v-if="Object.keys(info['skin'] ?? {}).length" class="block">
    <h2 class="block-title">新增换装</h2>
    <el-row>
      <el-col
        v-for="val, key in info['skin'] as {}"
        :key="key"
        :xs="6" :sm="4" :md="3" :lg="2" :xl="2"
      >
        <icon :name="val" :ship="ship[val]" :skin="skin[val]" :cur="key" frame />
      </el-col>
    </el-row>
  </section>
</template>

<style lang="scss" scoped>
:deep(.el-carousel__container) {
  height: clamp(220px, 26vw, 420px);
  padding-bottom: 0;
}

:deep(.el-image) {
  width: 100%;
  height: 100%;
}

:deep(.el-image img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

:deep(.el-carousel__item--card .el-image img) {
  object-fit: contain;
}

.block {
  margin-top: $space-6;

  .el-col {
    padding: $space-2 $space-1;
    font-size: .8rem;
  }
}

.block-title {
  margin-bottom: $space-3;
  padding-left: $space-3;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.4;
  color: $color-text;
  border-left: 3px solid $color-gold;
}
</style>