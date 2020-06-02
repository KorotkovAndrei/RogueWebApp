
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from 'pages/App.vue'
const port = argv.port || 8081;

app.listen(argv.port, ()=>{
    console.log('Probably listening to heroku $PORT now ', argv.port); // unless $PORT is undefined, in which case you're listening to 8081.
});
Vue.use(VueResource)
new Vue({
el: '#app',
render: a => a(App)
})


