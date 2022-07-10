<script lang="ts" setup>
import TheNavbar from "../components/Layout/TheNavbar.vue";
import TheSidebar from "../components/Layout/TheSidebar.vue";
</script>

<template>
<!--  <div class="flex flex-col h-full min-h-full">-->
<!--      <TheNavbar class="w-full" />-->
<!--    <div class="flex w-full h-full">-->
<!--        <TheSidebar />-->
<!--        <slot class="flex-1" />-->
<!--    </div>-->
<!--  </div>-->
    <TheNavbar />
    <slot />
</template>