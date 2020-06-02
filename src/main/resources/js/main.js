
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from 'pages/App.vue'
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
Vue.use(VueResource)
new Vue({
el: '#app',
render: a => a(App)
})


