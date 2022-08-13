import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => {
    return {
      expSetting: {
        level: 100,
        comfort: 400,
        buff: 0,
        count: 5
      }
    }
  },
  getters: {
    exp(state) {
      const { level, comfort, buff, count } = state.expSetting
      return Math.floor((240 + 12 * level) * (1 + comfort / (100 + comfort)) * (1 + buff / 100) * [1, 0.9, 0.8, 0.7, 0.64, 0.6][count - 1])
    }
  },
  persist: true,
})

export default useUserStore