// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import Vuelidate from 'vuelidate'
import App from './App.vue'


console.log(Vue)
console.log(Vuelidate)
Vue.use(Vuelidate)

new Vue({
	render: h => h(App)
}).$mount('#app')

