<script lang="ts" setup>
import TheNavbar from "../components/Layout/TheNavbar.vue";
import TheSidebar from "../components/Layout/TheSidebar.vue";
</script>

<template>
    <div class="grid w-full h-full grid-cols-[min-content_auto]">
        <TheSidebar />
        <div>
            <TheNavbar />
            <slot />
        </div>
    </div>
</template>
