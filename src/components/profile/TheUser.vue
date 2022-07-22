<script lang="ts" setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useSessionStore } from "../../stores/session";
import { storeToRefs } from "pinia";
import {
	ChevronDownIcon,
	ExternalLinkIcon,
	QuestionMarkCircleIcon,
	CogIcon
} from "@heroicons/vue/solid";
import { RouterLink } from "vue-router";
import PlaceholderProfile from "./PlaceholderProfile.vue";

const { user } = storeToRefs(useSessionStore());
</script>

<template>
	<Menu v-slot="{ open }" as="div" class="relative block">
		<MenuButton>
			<div class="flex items-center space-x-1.5">
				<span class="invisible pr-1 font-medium md:visible">
					{{ user?.username }}
				</span>
				<img
					v-if="user?.profileUrl"
					:src="user.profileUrl"
					alt="user logo"
					class="h-7 w-7 rounded-full" />
				<PlaceholderProfile
					v-else
					class="h-7 w-7 bg-transparent"
					logo-class="w-7 h-7" />
				<ChevronDownIcon
					class="h-5 w-5 transition-transform"
					:class="{ 'rotate-180': open }" />
			</div>
		</MenuButton>
		<transition
			enter-active-class="transition duration-100 ease-out"
			enter-from-class="transform duration-100 opacity-0"
			enter-to-class="transform scale-100 opacity-100"
			leave-active-class="transition duration-75 ease-in"
			leave-from-class="transform scale-100 opacity-100"
			leave-to-class="transform scale-95 opacity-0">
			<MenuItems
				class="absolute right-0 mt-2 w-64 origin-top-right shadow-lg">
				<MenuItem disabled>
					<div
						class="flex items-center justify-center space-x-2 rounded-t-md border-x-2 border-t-2 border-neutral-600 bg-neutral-800 py-3">
						<img
							v-if="user?.profileUrl"
							:src="user.profileUrl"
							alt="user logo"
							class="mb-2 h-12 w-12 rounded-full" />
						<PlaceholderProfile v-else class="h-10 w-10" />
						<div class="flex flex-col">
							<span class="text-lg font-medium leading-4">
								{{ user?.username }}
							</span>
							<span class="text-xs text-violet-500">
								{{ user?.email }}
							</span>
						</div>
					</div>
				</MenuItem>
				<MenuItem v-slot="{ active }" class="">
					<RouterLink
						to="/settings"
						:class="[
							active
								? 'border-violet-300 bg-violet-600 text-white'
								: 'border-neutral-600 bg-neutral-800 text-neutral-400',
							'border-item'
						]">
						<CogIcon class="h-4 w-4" />
						<div>Settings</div>
					</RouterLink>
				</MenuItem>
				<MenuItem v-slot="{ active }" class="">
					<RouterLink
						to="/help"
						:class="[
							active
								? 'border-violet-300 bg-violet-600 text-white'
								: 'border-neutral-600 bg-neutral-800 text-neutral-400',
							'border-item'
						]">
						<QuestionMarkCircleIcon class="h-4 w-4" />
						<div>Help</div>
					</RouterLink>
				</MenuItem>
				<MenuItem v-slot="{ active }" class="">
					<a
						href="/logout"
						:class="[
							active
								? 'border-violet-300 bg-violet-600 text-white'
								: 'border-neutral-600 bg-neutral-800 text-neutral-400',
							'border-item'
						]">
						<ExternalLinkIcon class="h-4 w-4" />
						<div>Logout</div>
					</a>
				</MenuItem>
			</MenuItems>
		</transition>
	</Menu>
</template>

<style scoped>
.border-item {
	@apply item border-x-2 first:rounded-t-md first:border-t-2 last:rounded-b-md last:border-b-2;
}

.item {
	@apply flex w-full items-center space-x-2 py-2 pl-7 text-sm font-medium no-underline transition-none;
}
</style>
