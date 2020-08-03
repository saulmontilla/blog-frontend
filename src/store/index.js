import Vue from 'vue'
import Vuex from 'vuex'
import {auth} from '@/store/modules/auth.js'
import {notification} from '@/store/modules/notification.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    notification
  }
})
