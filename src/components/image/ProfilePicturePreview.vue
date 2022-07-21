<script lang="ts" setup>
import { ref } from "vue";
import { ExternalLinkIcon } from "@heroicons/vue/solid";
import ChooseImageModal from './ChooseImageModal.vue';
import { UserCircleIcon } from "@heroicons/vue/outline";
defineProps<{
    change?: boolean,
    profileUrl: any
}>();

const open = ref(false);
const hovered = ref(false);
</script>

<template>
    <div>
        <ChooseImageModal :open="open" @state-change="state => open = state" />
        <div class="relative">
            <div class="w-32 h-32 min-w-32 min-h-32 relative rounded-full" @mouseenter="hovered = true" @mouseleave="hovered = false">
                <img v-if="profileUrl" :src="profileUrl" alt="user logo" class="w-full rounded-full">
                <div v-else class="flex items-center justify-center w-full h-full bg-neutral-800">
                    <UserCircleIcon class="w-8 h-8" />
                </div>
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
                         @click="open = true"
                    >
                        <ExternalLinkIcon class="w-5 h-5"/>
                        <span class="text-[0.6rem]">Change picture</span>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
