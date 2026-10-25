<template>
  <EntryGrid
    :items="[
      { name: 'juus', label: 'JUUs' },
      { name: 'chat', label: 'JuuChat' },
    ]"
  >
    <template #juus><i-ep-Camera /></template>
    <template #chat><i-ep-ChatDotRound /></template>
  </EntryGrid>
</template>