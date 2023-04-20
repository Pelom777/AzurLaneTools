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
  persist: true,
})

export default useUserStore