
import { createApp } from "vue";
import App from "./App.vue"
import Notifications from '@kyvg/vue3-notification'
import router from "./core/router";
import { createPinia } from "pinia";

import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import vueCountryRegionSelect from 'vue3-country-region-select'

// plugins
// import VueVirtualScroller from 'vue3-virtual-scroller';
// import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css';

// css
import "./assets/css/index.css";
import "animate.css";

const XmerchantApp = createApp(App);

XmerchantApp.use(createPinia());
XmerchantApp.use(router);
XmerchantApp.use(Notifications);
XmerchantApp.use(VueTelInput);
XmerchantApp.use(vueCountryRegionSelect);


// Vue.use(VueVirtualScroller);
// mount vue app
XmerchantApp.mount("#app");