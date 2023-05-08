import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router';
import './styles/styles.css';

const pinia = createPinia()
const app = createApp(App)
  
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/service-worker.js')
        .then(function (registration) {
          console.log('Service worker registered with scope:', registration.scope)
        })
        .catch(function (error) {
          console.log('Service worker registration failed:', error)
        })
    })
  }
  

app.use(pinia)
app.use(router)
app.mount('#app')