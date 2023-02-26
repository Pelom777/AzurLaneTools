import { defineStore } from 'pinia'

const template = {
  name: 'pulimaosi',
  photo: 'https://s2.loli.net/2023/02/26/tyQ4TbPp8NCiRxr.png',
  text: '因为今天是情人节，所以普利茅斯带来了慰问品。希望您能高兴，指挥官大人♪',
  comment: [
    {
      name: 'commader',
      text: '谢谢你，普利茅斯。',
      reply: [
        {
          name: 'pulimaosi',
          text: '指挥官大人能感到高兴就再好不过了。'
        }
      ]
    }
  ]
}

const useJuusStore = defineStore('juus', {
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

export default useJuusStore