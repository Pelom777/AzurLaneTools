<script lang="ts" setup>
import PictureFilled from '~icons/ep/picture-filled'
import Headset from '~icons/ep/headset'
</script>

<template>
  <EntryGrid
    :items="[
      { name: 'illustration', label: '插画', icon: PictureFilled },
      { name: 'music', label: '音乐', icon: Headset },
    ]"
  />
</template>