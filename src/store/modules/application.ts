import { Module } from 'vuex';
import { ApplicationState } from '@/models/store/ApplicationState';
import initialCurrencies from '@/assets/initialCurrencies.json';
import { Ticker } from '@/models/Tickers';
import { Article } from '@/models/Articles';

export enum ApplicationMutation {
  UPDATE_TICKER = 'application/updateTicker',
  UPDATE_ARTICLES = 'application/updateArticles',
}

const store: Module<ApplicationState, unknown> = {
  // By default, actions, mutations and getters inside modules are still registered under the global namespace - this
  // allows multiple modules to react to the same mutation/action type.
  // For i.e, to call the mutation updateTicker, we need to use store.commit('application/updateTicker', payload)
  // For more information: https://vuex.vuejs.org/guide/modules.html#namespacing
  namespaced: true,
  state() {
    return {
      tickers: {},
      currencies: initialCurrencies,
      articles: [],
    };
  },
  mutations: {
    updateTicker: (state: ApplicationState, payload: Ticker) => {
      const symbol = state.tickers[payload.symbol];
      payload.pchg = symbol ? (payload.price > symbol.price ? 1 : -1) : 1;
      state.tickers[payload.symbol] = payload;
    },
    updateArticles: (state: ApplicationState, payload: Article[]) => {
      state.articles = payload;
    },
  },
  actions: {},
  getters: {},
};

export default store;
