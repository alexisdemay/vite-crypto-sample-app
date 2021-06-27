<template>
  <section class="flex justify-center">
    <div>
      <ArticleCard v-for="article in allArticles" :key="article.id" :article="article" />
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CryptoCompareService from '@/services/CryptoCompareService';
import { Store, useStore } from 'vuex';
import { RootState } from '@/models/store/RootState';
import { ApplicationMutation } from '@/store/modules/application';
import { Article } from '@/models/Articles';
import ArticleCard from '@/components/graphic/ArticleCard.vue';

export default defineComponent({
  name: 'Actuality',
  components: {
    ArticleCard,
  },
  setup() {
    const cryptoCompareService = CryptoCompareService.getInstance();
    const store: Store<RootState> = useStore();

    cryptoCompareService.getNews().then(news => store.commit(ApplicationMutation.UPDATE_ARTICLES, news));

    return {
      cryptoCompareService,
      store,
    };
  },
  computed: {
    allArticles(): Article[] {
      return this.store.state.application.articles;
    },
  },
});
</script>
