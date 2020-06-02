
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from 'pages/App.vue'
const PORT = process.env.PORT || 5000
Vue.use(VueResource)
new Vue({
el: '#app',
render: a => a(App).listen(PORT, () => console.log(`Listening on ${ PORT }`))
})


