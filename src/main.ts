import { createApp } from 'vue';
import App from './App.vue';
import router, { RouteNames, routerPush } from './router';
import store from './store';

import './index.css';

const app = createApp(App);

app.use(router);
app.use(store);

routerPush(RouteNames.DASHBOARD);

app.mount('#app');
