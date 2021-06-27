<template>
  <div
    class="
      w-96
      min-w-96
      py-4
      px-8
      bg-white
      shadow
      rounded-lg
      my-2
      hover:shadow-lg
      transition-shadow
      duration-300
      ease-in-out
      cursor-pointer
    "
  >
    <div>
      <h2 class="w-full text-gray-800 text-2xl font-semibold">{{ currency.name }}</h2>
    </div>
    <TransitionRoot
      :show="!isLoading"
      enter="transition transform duration-500 ease-in-out"
      enter-from="-translate-x-4 opacity-0"
      enter-to="translate-x-0 opacity-100"
      leave="transition-opacity duration-500 ease-in-out"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <div class="flex flex-column items-center">
        <div class="flex-grow">
          <div class="flex flex-column items-center flex-wrap">
            <div class="my-2 mr-4">
              <img class="w-12 h-12 object-cover rounded-full shadow" :src="currencyImage" />
            </div>
            <div>
              <div>
                <b>{{ currency.from }}</b
                >/{{ currency.to }}
              </div>
              <div>
                <span class="font-bold">{{ ticker.price || '' }}</span> {{ currency.to }}
              </div>
            </div>
          </div>
        </div>
        <div class="text-right">
          <div :class="[trendingIsUp ? 'text-green-700' : 'text-red-600']">
            <div class="flex flex-row font-bold items-center text-xl">
              <TrendingUpIcon class="h-8 w-8 mr-2" v-if="trendingIsUp" />
              <TrendingDownIcon class="h-8 w-8 mr-2" v-else />
              {{ ticker.percent }}<span>%</span>
            </div>
          </div>
          <div>
            <span class="font-extralight text-gray-700">{{ ticker.vol }}</span>
          </div>
        </div>
      </div>
    </TransitionRoot>
    <div v-if="isLoading">
      <ContentLoader :width="320" :height="64" :speed="2">
        <circle cx="26" cy="30" r="26" />
        <rect x="60" y="8" rx="6" ry="6" width="88" height="20" />
        <rect x="220" y="8" rx="6" ry="6" width="100" height="20" />
        <rect x="60" y="34" rx="6" ry="6" width="120" height="20" />
        <rect x="240" y="34" rx="6" ry="6" width="80" height="20" />
      </ContentLoader>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Ticker } from '@/models/Tickers';
import { Currency } from '@/models/Currencies';
import { TrendingUpIcon, TrendingDownIcon } from '@heroicons/vue/outline';
import { ContentLoader } from 'vue-content-loader';
import { TransitionRoot } from '@headlessui/vue';

export default defineComponent({
  name: 'CryptoCard',
  components: {
    TrendingUpIcon,
    TrendingDownIcon,
    ContentLoader,
    TransitionRoot,
  },
  props: {
    ticker: {
      type: Object as PropType<Ticker>,
      required: true,
    },
    currency: {
      type: Object as PropType<Currency>,
      required: true,
    },
  },
  computed: {
    currencyImage(): string {
      return `https://s2.coinmarketcap.com/static/img/coins/64x64/${this.currency.imgId}.png`;
    },
    trendingIsUp(): boolean {
      return this.ticker.percent != undefined && parseFloat(this.ticker.percent) > 0;
    },
    isLoading(): boolean {
      return this.ticker.price === undefined;
    },
  },
});
</script>
