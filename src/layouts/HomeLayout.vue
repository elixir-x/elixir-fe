<script lang="ts" setup>
  import TheNavbar from "../components/Layout/TheNavbar.vue";
  import TheFooter from "../components/Layout/TheFooter.vue";
</script>

<template>
  <div>
    <TheNavbar />
    <slot />
    <TheFooter />
  </div>
</template>