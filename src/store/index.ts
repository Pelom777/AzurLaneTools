import { createPinia, defineStore } from 'pinia'
import { ElLoading } from 'element-plus'

export const pinia = createPinia()

export const useStore = defineStore('store', {
  state: () => {
    return {
      loading: null,
      sidebarType: false,
      headerType: true,
      input: '',
      filter: [[], [], []],
      ship: null,
      count: 0,
      showSkin: false,
      showBack: false,
      showFrame: false,
      page: 1,
      rankType: 0,
      serverId: 0,
      rank: [[], [], []]
    }
  },
  getters: {},
  actions: {
    startLoading() {
      this.loading?.close()
      this.loading = ElLoading.service({
        target: '.el-main',
        lock: true
      })
    },
    endLoading() {
      this.loading?.close()
    }
  }
})

export const dataStore = defineStore('data', {
  state: () => {
    return {
      option: null,
      ship: null,
      skin: null,
      cg: null,
      server: null,
    }
  },
  getters: {},
  actions: {}
})