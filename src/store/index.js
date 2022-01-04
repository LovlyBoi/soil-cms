import { createStore } from 'vuex'
import login from './login'

const store = createStore({
  state() {
    return {}
  },
  mutations: {},
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store