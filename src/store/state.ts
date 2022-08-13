import { defineStore } from 'pinia'
import { ElLoading } from 'element-plus'

const useStateStore = defineStore('state', {
  state: () => {
    return {
      loading: null,
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