
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from 'pages/App.vue'


Vue.use(VueResource)
console.log(check 1);
new Vue({
el: '#app',
render: a => a(App)
})


