import { createPinia, Pinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import useUserStore from './user'
import useCalcStore from './calc'
import useJuusStore from './juus'
import useChatStore from './chat'

export const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const useStore = () => {
  return {
    user: useUserStore(),
    calc: useCalcStore(),
    juus: useJuusStore(),
    chat: useChatStore(),
  }
}