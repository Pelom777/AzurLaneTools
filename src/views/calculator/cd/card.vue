<script lang="ts" setup>
const props = defineProps<{
  ship: string,
  index: string,
  attr: [string, number, number, number],
}>()

const equipment = ref(['', '', ''])
</script>

<template>
  <el-card>
    <h1>
      <el-avatar size="large" :src="`https://cdn.al.pelom.cn/squareicon/${ship}.png`" />
      <el-divider direction="vertical" />
      <span>{{ attr[0] }}</span>
      <el-button circle type="danger" size="small" @click="$emit('remove', index)">
        <el-icon>
          <i-ep-Close />
        </el-icon>
      </el-button>
    </h1>
    <h1>
      <el-avatar
        shape="square"
        size="large"
        v-for="item in equipment"
        @click=""
      >
        <i-ep-Plus v-if="item == ''" />
        <img v-else :src="`https://cdn.al.pelom.cn/equipmenticon/${item}.png`" />
      </el-avatar>
    </h1>
    <h3>
      <sapn>装填</sapn>
    </h3>
  </el-card>
</template>

<style lang="scss" scoped>
.el-card {
  min-height: 256px;
}

h1,
h3 {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-family: consolas;
}

.el-icon {
  margin: auto;
}

.el-button {
  margin-left: auto;
}

.el-avatar {
  &+& {
    margin-left: 5px;
  }
}
</style>