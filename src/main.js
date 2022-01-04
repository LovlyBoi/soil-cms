import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
import './global'
import * as ElIconModules from '@element-plus/icons-vue'

const app = createApp(App)

for (let iconName in ElIconModules) {
  app.component(iconName, ElIconModules[iconName])
}

app.use(store)
setupStore()
app.use(router)
app.mount('#app')
