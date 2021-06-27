<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />
    <div class="px-8 py-4 overflow-auto">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/navigation/NavBar.vue';
export default defineComponent({
  name: 'App',
  components: {
    NavBar,
  },
});
</script>
