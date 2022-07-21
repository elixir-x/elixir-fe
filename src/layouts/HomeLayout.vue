<script lang="ts" setup>
import TheNavbar from "../components/layout/TheNavbar.vue";
import TheFooter from "../components/layout/TheFooter.vue";
</script>

<template>
    <div>
        <TheNavbar/>
        <slot/>
        <TheFooter/>
    </div>
</template>
