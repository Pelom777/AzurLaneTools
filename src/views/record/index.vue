<script lang="ts" setup>
const route = useRoute()
const active = computed(() => route.name === 'vote' || route.name === 'vote-chart' || route.name === 'statistic')
</script>

<template>
  <EntryGrid
    v-if="!active"
    :items="[
      { name: 'vote', label: '人气投票' },
      { name: 'statistic', label: '统计' },
    ]"
  >
    <template #vote><i-ep-Trophy /></template>
    <template #statistic><i-ep-DataLine /></template>
  </EntryGrid>
  <div v-else class="sub">
    <BackLink to="/record" />
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