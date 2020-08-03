import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import SpinnerComponent from './components/globals/SpinnerComponent'

Vue.component('spinner-component', SpinnerComponent)

Vue.config.productionTip = false

Vue.use(Vuelidate)

new Vue({
  router,
  store,
  created () {
    const userString = localStorage.getItem('user')
    const access_token = localStorage.getItem('access_token')
    
    if (userString && access_token) {
      const userData = {
        user: JSON.parse(userString),
        access_token
      }
      this.$store.commit('auth/SET_USER_DATA', userData)
    }

    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('auth/logout')
        }
        return Promise.reject(error)
      }
    )
  },
  render: h => h(App)
}).$mount('#app')
