<script lang="ts" setup>
import Logo from "../components/Logo.vue";
import { RouterLink } from "vue-router";
</script>

<template>
    <div class="w-full h-full">
        <div class="flex items-center justify-center relative w-full h-[80%]">

            <div
                class="absolute text-center md:text-left flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                <Logo width="250" height="250" class="fill-neutral-200"/>
                <div class="md:flex md:flex-col space-y-4">
                    <div class="flex flex-col">
                        <span class="text-4xl md:text-7xl font-bold">The Elixir Platform</span>
                        <span
                            class="font-medium md:text-xl text-neutral-200">The software that you want to enjoy.</span>
                    </div>
                    <div class="space-x-2 flex-col">
                        <RouterLink to="/register" class="btn-primary no-underline px-12 py-2">Register</RouterLink>
                        <RouterLink to="/login" class="btn no-underline px-14 py-2">Login</RouterLink>
                    </div>
                </div>
            </div>

            <svg viewBox="0 0 900 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                 preserveAspectRatio="none">
                <defs>
                    <filter id="blur" width="120%" height="120%">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                        <feGaussianBlur stdDeviation="161" result="effect1_foregroundBlur"></feGaussianBlur>
                    </filter>
                </defs>
                <g filter="url(#blur)">
                    <circle cx="86" cy="232" fill="#9b00cc" r="357"></circle>
                    <circle cx="795" cy="42" fill="#6600FF" r="357"></circle>
                    <circle cx="654" cy="265" fill="#6600FF" r="357"></circle>
<!--                    <circle cx="265" cy="387" fill="#9b00cc" r="357"></circle>-->
                </g>
            </svg>
        </div>
    </div>
</template>

<style scoped>
</style>
