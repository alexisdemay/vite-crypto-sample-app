import { createApp } from 'vue';
import App from './App.vue';
import router, { RouteNames, routerPush } from './router';
import store from './store';

import './index.css';

import Analytics from 'analytics';
import googleAnalytics from '@analytics/google-analytics';
import perfumePlugin from '@analytics/perfumejs';
import Perfume from 'perfume.js';

const analytics = Analytics({
  app: 'vite-crypto-sample-app',
  plugins: [
    {
      name: 'custom-plugin',
      track: ({ payload }) => {
        console.log('paypload:', payload);
      },
    },
    googleAnalytics({
      trackingId: 'G-MVY0HQDEML',
      anonymizeIp: true
    }),
    perfumePlugin({
      category: 'performance',
      perfume: Perfume,
      destinations: {
        'google-analytics': true,
      },
    }),
  ],
});

const app = createApp(App);

app.use(router);
app.use(store);

routerPush(RouteNames.DASHBOARD);

function renderApp() {
  app.mount('#app');
}

function main() {
  renderApp();
}

main();
