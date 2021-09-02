import Vue from 'vue'
import axios from 'axios'

import { LocalStorage } from 'quasar'

Vue.prototype.$axios = axios

const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
})

export default ({ store, Vue }) => {
    api.interceptors.request.use(async req => {
        const token = await LocalStorage.getItem('token')
        req.headers.Authorization = `Bearer ${token}`
        return req
    })

    Vue.prototype.$api = api
    store.$api = axios
}

const token = LocalStorage.getItem('token')
Vue.prototype.$token = token

export { axios, api, token }

