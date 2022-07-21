<script lang="ts" setup>
import Logo from "../Logo.vue";
import { CogIcon, ViewGridIcon } from "@heroicons/vue/outline";
import { ChevronLeftIcon } from "@heroicons/vue/solid";
import { useRoute } from "vue-router";
import { ref } from "vue";

// possibly if route is selected show a solid icon rather than an outline (a feature later down the line)

const route = useRoute();

const expanded = ref(true);
</script>

<template>
	<div
		:class="[
			expanded ? ' w-64' : ' w-16',
			'duration-275 h-full bg-neutral-800/50 transition-all'
		]">
		<div
			:class="[
				expanded
					? 'group ml-8 mb-8 space-x-3'
					: 'mb-4 flex-col space-y-4',
				'mt-10 flex items-center'
			]">
			<Logo class="h-10 w-10 fill-violet-600" />
			<span
				:class="[
					'visible text-2xl font-semibold tracking-tight',
					expanded ? 'visible' : 'hidden'
				]">
				elixir
			</span>
			<ChevronLeftIcon
				:class="[
					expanded ? ' rotate-180 justify-end' : 'items-center',
					'flex h-4 w-4 flex-1 cursor-pointer transition-transform'
				]"
				@click="expanded = !expanded" />
		</div>
		<div
			:class="[
				expanded
					? 'space-y-1 px-6'
					: 'flex flex-col items-center space-y-4'
			]">
			<RouterLink
				to="/dashboard"
				:class="[
					'tab tab-text group',
					expanded ? 'py-1.5 px-3' : 'p-1',
					route.path.startsWith('/dashboard')
						? 'text-violet-500 group-hover:text-violet-400'
						: 'group text-neutral-300 group-hover:text-neutral-400'
				]">
				<ViewGridIcon :class="!expanded ? 'h-6 w-6' : 'h-5 w-5'" />
				<span :class="expanded ? 'visible' : 'hidden'">Dashboard</span>
			</RouterLink>
			<RouterLink
				to="/settings"
				:class="[
					'tab tab-text group',
					expanded ? 'py-1.5 px-3' : 'p-1',
					route.path.startsWith('/settings')
						? 'text-violet-500 group-hover:text-violet-400'
						: 'group text-neutral-300 group-hover:text-neutral-400'
				]">
				<CogIcon :class="!expanded ? 'h-6 w-6' : 'h-5 w-5'" />
				<span :class="expanded ? 'visible' : 'hidden'">Settings</span>
			</RouterLink>
		</div>
	</div>
</template>

<style scoped>
.tab {
	@apply flex cursor-pointer items-center rounded-md hover:bg-neutral-700;
}
.tab-text {
	@apply flex space-x-3 text-sm font-medium no-underline;
}
</style>
