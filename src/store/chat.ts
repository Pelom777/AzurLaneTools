import { defineStore } from 'pinia'

const template = {
  name: '猫猫',
  chat: [
    {
      name: 'chaijun',
      text: '亲~爱~的~！',
    },
    {
      name: 'commander',
      text: '怎么了？',
    }
  ]
}

const useChatStore = defineStore('chat', {
  state: () => {
    return {
      list: [JSON.parse(JSON.stringify(template))]
    }
  },
  actions: {
    add() {
      this.list.push(JSON.parse(JSON.stringify(template)))
    }
  },
  persist: true,
})

export default useChatStore