<script lang="ts" setup>
const route = useRoute()
const active = computed(() => route.name === 'illustration' || route.name === 'music')
</script>

<template>
  <EntryGrid
    v-if="!active"
    :items="[
      { name: 'illustration', label: '插画' },
      { name: 'music', label: '音乐' },
    ]"
  >
    <template #illustration><i-ep-PictureFilled /></template>
    <template #music><i-ep-Headset /></template>
  </EntryGrid>
  <div v-else class="sub">
    <BackLink to="/collection" />
    <div class="body">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sub {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}
</style>