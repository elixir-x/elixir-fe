<script lang="ts" setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useSecurityStore } from "../stores/security";
import { storeToRefs } from "pinia";
import { ChevronDownIcon, ExternalLinkIcon, QuestionMarkCircleIcon, CogIcon } from "@heroicons/vue/solid";
import { RouterLink } from "vue-router";

const { user } = storeToRefs(useSecurityStore());

</script>

<template>
    <Menu as="div" class="relative inline-block" v-slot="{ open }">
        <MenuButton>
            <div class="flex items-center">
                <span class="font-medium pr-1 md:visible invisible">{{ user?.username }}</span>
                <img :src="user?.profileUrl" class="rounded-full w-7 h-7"/>
                <ChevronDownIcon class="w-5 h-5 transition-transform" :class="{ 'rotate-180': open }"/>
            </div>
        </MenuButton>
        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform duration-100 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <MenuItems class="absolute right-0 origin-top-right mt-2 w-64 shadow-lg">
                <MenuItem disabled>
                    <div class="flex items-center justify-center bg-neutral-800 rounded-t-md border-neutral-600 border-x-2 border-t-2 py-3 space-x-2">
                        <img :src="user?.profileUrl" class="rounded-full w-12 h-12 mb-2"/>
                        <div class="flex flex-col">
                            <span class="font-medium text-lg leading-4">{{ user?.username }}</span>
                            <span class="text-xs font-semibold text-violet-500">{{ user?.email }}</span>
                        </div>
                    </div>
                </MenuItem>
                <MenuItem v-slot="{ active }" class="">
                    <RouterLink to="/settings/profile" :class="[
                        active ? 'bg-violet-600 border-violet-300' : 'bg-neutral-800 border-neutral-600',
                        'border-item'
                    ]">
                        <CogIcon class="w-4 h-4" />
                        <div>Settings</div>
                    </RouterLink>
                </MenuItem>
                <MenuItem v-slot="{ active }" class="">
                    <RouterLink to="/help" :class="[
                        active ? 'bg-violet-600 border-violet-300' : 'bg-neutral-800 border-neutral-600',
                        'border-item'
                    ]">
                        <QuestionMarkCircleIcon class="w-4 h-4" />
                        <div>Help</div>
                    </RouterLink>
                </MenuItem>
                <MenuItem v-slot="{ active }" class="">
                    <RouterLink to="/logout" :class="[
                        active ? 'bg-violet-600 border-violet-300' : 'bg-neutral-800 border-neutral-600',
                        'bottom-item'
                    ]">
                        <ExternalLinkIcon class="w-4 h-4" />
                        <div>Logout</div>
                    </RouterLink>
                </MenuItem>
            </MenuItems>
        </transition>
    </Menu>
</template>

<style scoped>
    .border-item {
        @apply item border-x-2;
    }
    .top-item {
        @apply border-item border-t-2 rounded-t-md
    }
    .bottom-item {
        @apply border-item border-b-2 rounded-b-md
    }
    .item {
        @apply flex w-full font-medium items-center text-sm pl-4 py-2 space-x-1 transition-none no-underline;
    }
</style>