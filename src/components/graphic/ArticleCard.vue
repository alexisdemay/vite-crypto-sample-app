<template>
  <div
    class="
      max-w-4xl
      min-w-96
      py-4
      px-8
      bg-white
      shadow
      rounded-lg
      my-4
      hover:shadow-lg
      transition-shadow
      duration-300
      ease-in-out
      cursor-pointer
    "
  >
    <a :href="article.url" target="_blank">
      <div class="flex flex-column">
        <img class="w-32 h-32 mr-4" :src="article.imageurl" />
        <div>
          <h2 class="w-full text-gray-800 text-xl font-semibold">
            <a :href="article.url" target="_blank">{{ article.title }}</a>
          </h2>
          <p class="text-justify text-gray-700 my-2" v-html="truncateText(article.body)"></p>
          <div class="text-sm text-blue-900 mt-4 hover:underline transition duration-300 ease-in-out ">
            <span class="font-medium">Source : </span>{{ article.source_info.name }}
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Article } from '@/models/Articles';

export default defineComponent({
  name: 'ArticleCard',
  props: {
    article: {
      type: Object as PropType<Article>,
    },
  },
  methods: {
    truncateText(value) {
      if (value.length > 200) {
        const substr = value.substring(0, 200);
        return substr.substring(0, substr.lastIndexOf(' ')) + '...';
      } else {
        return value;
      }
    },
  },
});
</script>
