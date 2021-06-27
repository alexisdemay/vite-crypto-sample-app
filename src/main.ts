import { createApp } from 'vue';
import App from './App.vue';
import router, { RouteNames, routerPush } from './router';
import store from './store';
import Analytics from 'analytics';
import googleAnalytics from '@analytics/google-analytics';
import perfumePlugin from '@analytics/perfumejs';
import Perfume from 'perfume.js';

import './index.css';

const app = createApp(App);

app.use(router);
app.use(store);

routerPush(RouteNames.DASHBOARD);

const analytics = Analytics({
  app: 'vite-crypto-sample-app',
  plugins: [
    googleAnalytics({
      trackingId: 'G-MVY0HQDEML',
    }),
    perfumePlugin({
      category: 'performance',
      perfume: Perfume,
    }),
  ],
});

function renderApp() {
  app.mount('#app');
}

function main() {
  renderApp();
}

main();

const sleep = () => new Promise<void>(resolve => setTimeout(() => resolve(), 100));
const init = async () => {
  performance.mark('One');
  await sleep();
  performance.mark('Two');
  await sleep();
  performance.mark('Three');
  await sleep();
  performance.mark('Four');
};

init().then(() => {
  performance.measure('🐪 Outer 🐪', 'One', 'Four');
  performance.measure('🐪 Inner 🐪', 'Two', 'Three');
});
