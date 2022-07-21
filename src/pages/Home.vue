<script lang="ts" setup>
import Logo from "../components/Logo.vue";
import { RouterLink } from "vue-router";
</script>

<template>
	<div class="h-full w-full">
		<div class="relative flex h-[80%] w-full items-center justify-center">
			<div
				class="absolute flex flex-col items-center space-y-4 text-center md:flex-row md:space-y-0 md:space-x-8 md:text-left">
				<Logo width="250" height="250" class="fill-neutral-200" />
				<div class="space-y-4 md:flex md:flex-col">
					<div class="flex flex-col">
						<span class="text-4xl font-bold md:text-7xl">
							The Elixir Platform
						</span>
						<span class="font-medium text-neutral-200 md:text-xl">
							The software that you want to enjoy.
						</span>
					</div>
					<div class="flex-col space-x-2">
						<RouterLink
							to="/register"
							class="btn-primary px-12 py-2 no-underline">
							Register
						</RouterLink>
						<RouterLink
							to="/login"
							class="btn px-14 py-2 no-underline">
							Login
						</RouterLink>
					</div>
				</div>
			</div>

			<svg
				viewBox="0 0 900 600"
				width="100%"
				height="100%"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="none">
				<defs>
					<filter id="blur" width="120%" height="120%">
						<feFlood
							flood-opacity="0"
							result="BackgroundImageFix"></feFlood>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="BackgroundImageFix"
							result="shape"></feBlend>
						<feGaussianBlur
							stdDeviation="161"
							result="effect1_foregroundBlur"></feGaussianBlur>
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

<style scoped></style>
