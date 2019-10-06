import Vue from 'vue'
import App from './App'

// firebase
import * as VueFire from 'vuefire'

Vue.use(VueFire);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})