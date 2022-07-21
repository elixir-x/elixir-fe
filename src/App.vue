<script setup lang="ts">
import DefaultLayout from "./layouts/DefaultLayout.vue";
import { RouterView, useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import http, { handleResponse } from "../http-common";
import { useSessionStore } from "./stores/session";

const route = useRoute();
const sessionStore = useSessionStore();

const currentLayout = computed(() => {
  return (route.meta.layout || DefaultLayout);
});

onMounted(async () => {
    if (route.meta.secure) {
        const res = await handleResponse(http.get('/user'));
        sessionStore.user = res.res?.data;
    }
});

</script>

<template>
    <div class="w-full h-full bg-neutral-900">
        <component :is="currentLayout">
            <RouterView />
        </component>
    </div>
</template>
