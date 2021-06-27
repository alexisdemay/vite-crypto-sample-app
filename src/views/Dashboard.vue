<template>
  <section class="flex flex-row justify-center flex-wrap justify-around">
    <CryptoCard
      v-for="(currency, index) in currencies"
      :key="currency.symbol"
      :ticker="tickers[currency.symbol] || {}"
      :currency="currency"
      :tabIndex="index + 1"
    />
  </section>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import CryptoCard from '@/components/graphic/CryptoCard.vue';
import BinanceService from '@/services/BinanceService';
import { Store, useStore } from 'vuex';
import { RootState } from '@/models/store/RootState';
import { ApplicationMutation } from '@/store/modules/application';

export default defineComponent({
  name: 'Dashboard',
  components: {
    CryptoCard,
  },
  setup() {
    const binanceService = BinanceService.getInstance();
    const store: Store<RootState> = useStore();
    const { tickers, currencies } = store.state.application;
    return {
      tickers: computed(() => tickers),
      currencies: computed(() => currencies),
      binanceService,
      store,
    };
  },
  created() {
    this.currencies.forEach(currency => {
      this.binanceService.subscribeSymbol(currency.symbol, ticker => {
        this.store.commit(ApplicationMutation.UPDATE_TICKER, ticker);
      });
    });
  },
  unmounted() {
    this.binanceService.unsubscribeAll();
  },
});
</script>
