# VueJS Sample Application

:rocket: A Vue.js 3 (+ Vite.js) sample application to test performance optimization and that includes the following
 dependencies:
* Vue 3
* Vite 2
* Vue Router 4
* Vuex 4
* Tailwind CSS 2
* Headless UI 1

# Usage

## Installing

To install the application, you have to run the following command:
```
npm install
```

Create a `.env.local` file and add the following values:

```
VITE_COIN_MARKET_CAP_API_KEY=<Your coin market API key>
VITE_BINANCE_API_KEY=<Your binance api key>
```

## Running
### With compiles and hot-reloads for development

```
npm run serve
```

### With express server

```
npm run build
npm run start
```

## Deploying

This project is automatically built and deployed on [Heroku](https://www.google.com) at each push on master branch. You can see the `main.yml` file in `.github/worflows` to have more details about the deployment.
