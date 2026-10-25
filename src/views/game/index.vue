<script lang="ts" setup>
import Camera from '~icons/ep/camera'
import ChatDotRound from '~icons/ep/chat-dot-round'
</script>

<template>
  <EntryGrid
    :items="[
      { name: 'juus', label: 'JUUs', icon: Camera },
      { name: 'chat', label: 'JuuChat', icon: ChatDotRound },
    ]"
  />
</template>