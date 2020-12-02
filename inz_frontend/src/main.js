import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';


Vue.config.productionTip = false

Vue.use({
  install (Vue) {
  Vue.prototype.$api = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
  })
}
})

new Vue({
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
