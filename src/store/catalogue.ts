import { defineStore } from 'pinia'

const useCatalogueStore = defineStore('catalogue', {
  state: () => {
    return {
      showSkin: false,
      showBack: false,
      showFrame: false,
    }
  },
  persist: true,
})

export default useCatalogueStore