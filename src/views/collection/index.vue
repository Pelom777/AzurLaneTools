<script lang="ts" setup>

</script>

<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
      <el-card @click="$router.push({ name: 'illustration' })">
        <h1>
          <el-icon><i-ep-PictureFilled /></el-icon>
          插画
        </h1>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
      <el-card @click="$router.push({ name: 'music' })">
        <h1>
          <el-icon><i-ep-Headset /></el-icon>
          音乐
        </h1>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.el-col {
  padding: 10px;
}

.el-card {
  height: 0;
  padding-bottom: 60%;
  cursor: pointer;
}

.el-icon {
  vertical-align: middle;
}
</style>