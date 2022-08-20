import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => {
    return {
      level: 100,
      technology: {
        loading: 0,
      },
      cat: {
        loading: 0,
      },
      backyard: {
        comfort: 400,
        buff: 0,
        count: 5,
      },
    }
  },
  getters: {
    exp(state) {
      const { level, backyard: { comfort, buff, count } } = state
      return Math.floor((240 + 12 * level) * (1 + comfort / (100 + comfort)) * (1 + buff / 100) * [1, 0.9, 0.8, 0.7, 0.64, 0.6][count - 1])
    },
    loading(state) {
      return state.technology.loading + state.cat.loading
    }
  },
  persist: true,
})

export default useUserStore