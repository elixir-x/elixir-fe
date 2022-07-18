<script lang="ts" setup>
import TheNavbar from "../components/layout/TheNavbar.vue";
import TheSidebar from "../components/layout/TheSidebar.vue";
</script>

<template>
    <div class="grid-wrap grid grid-cols-[min-content] grid-rows-[min-content_auto] w-full h-full">
        <TheNavbar class="col-span-2" />
        <TheSidebar />
        <slot />
    </div>
</template>
