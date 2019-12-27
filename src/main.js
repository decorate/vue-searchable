import Vue from 'vue'
import App from './App.vue'
import '@babel/polyfill'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

Vue.use(Router)
Vue.use(BootstrapVue)

const router = new Router

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
