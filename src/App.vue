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
import { computed, onMounted } from "vue";
import http, { handleResponse } from "../http-common";
import { useSecurityStore } from "./stores/security";

const route = useRoute();
const securityStore = useSecurityStore();

const currentLayout = computed(() => {
  return (route.meta.layout || DefaultLayout);
})

onMounted(async () => {
    if (route.meta.secure) {
        const res = await handleResponse(http.get('/user'));
        securityStore.user = res.res.data;
    }
});

</script>
