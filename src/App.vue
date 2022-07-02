<template>
  <div class="w-full h-full bg-neutral-900">
    <component :is="currentLayout">
      <RouterView />
    </component>
  </div>
</template>

<script setup lang="ts">
import DefaultLayout from "./layouts/DefaultLayout.vue";
import { RouterView, useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const currentLayout = computed(() => {
  return (route.meta.layout || DefaultLayout);
})

</script>
