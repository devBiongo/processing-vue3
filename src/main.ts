import { createApp } from 'vue';

import Antd from 'ant-design-vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import './global.less';
// icon
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
 
library.add(fas);

const app = createApp(App);
app.use(router);
app.use(Antd);
app.use(createPinia());
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');