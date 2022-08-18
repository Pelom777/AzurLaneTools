<script lang="ts" setup>
import { load } from '@/axios/data'

const vote = ref({})
;(async () => {
  vote.value = await load('vote')
})()
const name = {'cn': '国服', 'jp': '日服', 'en': '国际服'}
</script>

<template>
  <el-timeline>
    <el-timeline-item v-for="(value, year) in vote" :timestamp="year" placement="top" size="large">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="3" v-for="(winner, region) in value">
          <el-card
            :style="{ backgroundImage: `url(https://cdn.al.pelom.cn/voteicon/${winner}.png)` }"
            @click="$router.push({
              name: 'vote-chart',
              params: { year, region }
            })"
          >
            <h1>{{ name[region] }}</h1>
          </el-card>
        </el-col>
      </el-row>
    </el-timeline-item>
  </el-timeline>
</template>

<style lang="scss" scoped>
.el-card {
  height: 0;
  padding-bottom: 43.3%;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;

  & h1 {
    color: white;
    mix-blend-mode: difference;
  }
}
</style>