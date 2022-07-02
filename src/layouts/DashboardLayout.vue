<script lang="ts" setup>
import TheNavbar from "../components/Layout/TheNavbar.vue";
import TheSidebar from "../components/Layout/TheSidebar.vue";
</script>

<template>
  <div>
    <TheSidebar />
    <TheNavbar />
    <slot/>
  </div>
</template>