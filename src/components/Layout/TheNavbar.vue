<script lang="ts" setup>
import TheUser from "../TheUser.vue";
import Logo from "../Logo.vue";
</script>

<template>
    <div class="relative flex items-center h-16 bg-neutral-800 space-x-16 w-full min-w-full">
<!--        <div class="text-violet-500 font-semibold text-3xl pl-24">Elixir</div>-->
        <Logo class="h-full p-2 ml-24 fill-violet-600" />
<!--        <input class="h-8 w-96 invisible md:visible" placeholder="Ctrl+K to search...">-->
        <div class="flex items-center justify-end h-full flex-1"><TheUser class="mr-5" /></div>
    </div>
</template>

<style scoped>
</style>
