<script lang="ts" setup>
import Logo from '../Logo.vue';
import { CogIcon, ViewGridIcon } from "@heroicons/vue/outline";
import { CogIcon as SolidCogIcon, ViewGridIcon as SolidViewGridIcon, ChevronLeftIcon } from "@heroicons/vue/solid";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();

const expanded = ref(true);
</script>

<template>
    <div :class="[expanded ? ' w-64' : ' w-16', 'bg-neutral-800/50 h-full transition-all duration-275']">
        <div :class="[expanded ? 'group ml-8 space-x-3 mb-8' : 'flex-col space-y-2 mb-4', 'flex items-center mt-10']">
            <Logo class="w-10 h-10 fill-violet-600" />
            <span :class="['visible font-semibold tracking-tight text-2xl', expanded ? 'visible' : 'hidden']">elixir</span>
            <ChevronLeftIcon :class="[expanded ? ' rotate-180 justify-end' : 'items-center', 'w-4 h-4 flex flex-1 cursor-pointer transition-transform']" @click="expanded = !expanded" />
        </div>
        <div :class="[expanded ? 'space-y-1 px-6' : 'space-y-4 flex flex-col items-center']">
            <RouterLink to="/dashboard" :class="['tab group tab-text', expanded ? 'py-1.5 px-3' : 'p-1', route.path.startsWith('/dashboard') ? 'text-violet-500 group-hover:text-violet-400' : 'group text-neutral-300 group-hover:text-neutral-400']">
                <ViewGridIcon :class="!expanded ? 'w-6 h-6' : 'w-5 h-5'" />
                <span :class="expanded ? 'visible' : 'hidden'">Dashboard</span>
            </RouterLink>
            <RouterLink to="/settings" :class="['tab group tab-text', expanded ? 'py-1.5 px-3' : 'p-1', route.path.startsWith('/settings') ? 'text-violet-500 group-hover:text-violet-400' : 'group text-neutral-300 group-hover:text-neutral-400']">
                <CogIcon :class="!expanded ? 'w-6 h-6' : 'w-5 h-5'" />
                <span :class="expanded ? 'visible' : 'hidden'">Settings</span>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
    .tab {
        @apply flex items-center hover:bg-neutral-700 rounded-md cursor-pointer;
    }
    .tab-text {
        @apply no-underline text-sm font-medium flex space-x-3;
    }
</style>
