import { createPinia, Pinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import useStateStore from './state'
import useUserStore from './user'

export const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const useStore = () => {
  return {
    state: useStateStore(pinia),
    user: useUserStore(pinia),
  }
}