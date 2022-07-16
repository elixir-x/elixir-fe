<script lang="ts" setup>
import TheUser from "../TheUser.vue";
import Logo from "../Logo.vue";
</script>

<template>
    <div class="relative flex items-center h-16 bg-neutral-800 space-x-16 w-full min-w-full">
<!--        <Logo class="h-full p-2 md:ml-24 md:relative md:translate-x-0 md:translate-y-0 md:left-0 md:top-0-->
<!--        absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] fill-violet-600"/>-->
        <!--        <input class="h-8 w-96 invisible md:visible" placeholder="Ctrl+K to search...">-->
        <div class="flex items-center justify-end h-full flex-1">
            <TheUser class="mr-5"/>
        </div>
    </div>
</template>

<style scoped>
</style>
