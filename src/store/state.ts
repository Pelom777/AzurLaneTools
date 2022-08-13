import { defineStore } from 'pinia'
import { ElLoading } from 'element-plus'

const useStateStore = defineStore('state', {
  state: () => {
    return {
      loading: null,
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

export default useStateStore