import { createPinia, Pinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import useUserStore from './user'
import useJuusStore from './juus'
import useChatStore from './chat'

export const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const useStore = () => {
  return {
    user: useUserStore(),
    juus: useJuusStore(),
    chat: useChatStore(),
  }
}