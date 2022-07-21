<script lang="ts" setup>
import TheUser from "../profile/TheUser.vue";
</script>

<template>
    <div class="relative flex items-center h-16 bg-neutral-800 space-x-16 w-full min-w-full">
<!--        <input class="h-8 w-96 invisible md:visible" placeholder="Ctrl+K to search...">-->
        <div class="flex items-center justify-end h-full flex-1">
            <TheUser class="mr-5"/>
        </div>
    </div>
</template>

<style scoped>
</style>
