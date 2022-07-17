<script lang="ts" setup>
import { ref } from "vue";
import { ExternalLinkIcon } from "@heroicons/vue/solid";

defineProps<{
    change?: boolean,
    profileUrl?: string,
}>();

const hovered = ref(false);
</script>

<template>
    <div class="w-32 relative" @mouseenter="hovered = true" @mouseleave="hovered = false">
        <img :src="profileUrl" alt="user logo" class="w-full rounded-full">
        <transition
            enter-from-class="opacity-0"
            enter-to-class="opacity-full"
            enter-active-class="ease-out duration-200"
            leave-to-class="opacity-0"
            leave-from-class="opacity-full"
            leave-active-class="ease-in duration-200"
            v-show="hovered"
            v-if="change"
        >
            <div class="cursor-pointer absolute left-0 top-0 flex flex-col text-center
         items-center justify-center w-full h-full rounded-full bg-black/70"
            >
                <ExternalLinkIcon class="w-5 h-5"/>
                <span class="text-[0.6rem]">Change picture</span>
            </div>
        </transition>
    </div>
</template>

<style scoped>

</style>
