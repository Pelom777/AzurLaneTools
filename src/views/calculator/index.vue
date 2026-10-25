<script lang="ts" setup>
const route = useRoute()
const active = computed(() => route.name === 'exp' || route.name === 'cd')
</script>

<template>
  <EntryGrid
    v-if="!active"
    :items="[
      { name: 'exp', label: '舰船经验' },
      { name: 'cd', label: '舰船射速' },
    ]"
  >
    <template #exp><i-ep-Plus /></template>
    <template #cd><i-ep-Timer /></template>
  </EntryGrid>
  <div v-else class="sub">
    <BackLink to="/calculator" />
    <div class="body">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
      </router-view>
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