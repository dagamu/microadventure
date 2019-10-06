import Vue from 'vue'
import App from './App'

// firebase
import * as VueFire from 'vuefire'

import {store} from './store/store.js';

Vue.use(VueFire);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App }
})