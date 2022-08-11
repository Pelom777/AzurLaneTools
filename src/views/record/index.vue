<script lang="ts" setup>
import { load } from '@/axios/data'

const vote = await load('vote', 'vote')
const name = {'cn': '国服', 'jp': '日服', 'en': '国际服'}
</script>

<template>
  <el-collapse accordion>
    <el-collapse-item>
      <template #title>
        <h1>
          <el-icon><i-ep-Trophy /></el-icon>
          人气投票
        </h1>
      </template>
      <el-timeline>
        <el-timeline-item
          v-for="(value, year) in vote"
          :timestamp="year"
          placement="top"
          size="large"
        >
          <el-row :gutter="40">
            <el-col
              :xs="24" :sm="12" :md="8" :lg="6" :xl="3"
              v-for="(winner, region) in value"
            >
              <el-card
                :style="{ backgroundImage: `url(https://ui.al.pelom.cn/assets/voteicon/${winner}.png)` }"
                @click="$router.push({
                  name: 'vote',
                  params: { year, region }
                })"
              >
                <h1>{{ name[region] }}</h1>
              </el-card>
            </el-col>
          </el-row>
        </el-timeline-item>
      </el-timeline>
    </el-collapse-item>
    <el-collapse-item>
      <template #title>
        <h1>
          <el-icon><i-ep-DataLine /></el-icon>
          统计
        </h1> 
      </template>
    </el-collapse-item>
  </el-collapse>
</template>

<style lang="scss" scoped>
h1 .el-icon {
  vertical-align: middle;
}

.el-timeline {
  margin-left: 5px;

  &:deep(.el-timeline-item__timestamp) {
    font-size: var(--el-font-size-middle);
  }
}

.el-card {
  height: 0;
  padding-bottom: 43.3%;
  background-size: cover;
  background-repeat: no-repeat;

  & h1 {
    color: white;
    mix-blend-mode: difference;
  }
}
</style>