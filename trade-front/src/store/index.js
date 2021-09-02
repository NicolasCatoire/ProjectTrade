import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import auth from './auth'
import constants from './constants'
import company from './company'
import admin from './admin'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    user,
    auth,
    constants,
    company,
    admin
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEBUGGING
})

export default function (/* { ssrContext } */) {

  return Store
}

export { Store }
