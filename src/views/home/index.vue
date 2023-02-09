<script lang="ts" setup>
import { load } from '@/axios/data'
import icon from '@/components/icon.vue'

const info = ref({}), ship = ref({}), skin = ref({})
;(async () => {
  ship.value = await load('ship')
  skin.value = await load('skin')
  info.value = await load('new')
})()
</script>

<template>
  <el-carousel
    :interval="6000"
    indicator-position="none"
    type="card"
  >
    <el-carousel-item v-for="url, index in info['cg']">
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
  <el-row class="showFrame">
    <el-col
      :xs="6" :sm="4" :md="3" :lg="2" :xl="1"
      v-for="name in info['ship']"
      :key="name"
    >
      <icon
        :name="name"
        :ship="ship[name]"
        :skin="skin[name]"
      />
    </el-col>
  </el-row>
  <el-row class="showFrame">
    <el-col
      :xs="6" :sm="4" :md="3" :lg="2" :xl="1"
      v-for="val, key in info['skin'] as {}"
      :key="key"
    >
      <icon
        :name="val"
        :ship="ship[val]"
        :skin="skin[val]"
        :cur="key"
      />
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
:deep(.el-carousel__container) {
  height: 0;
  padding-bottom: 28%;
}

.el-row {
  margin-top: 10px;

  & .el-button {
    width: 5rem;
  }
}

.el-col {
  padding: 8px 4px;
  font-size: .8rem;
}
</style>