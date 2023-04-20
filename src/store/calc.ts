import { defineStore } from 'pinia'

const useCalcStore = defineStore('calc', {
  state: () => {
    return {
      exp: {
        list: []
      },
      cd: {
        list: []
      },
    }
  },
  persist: true,
})

export default useCalcStore