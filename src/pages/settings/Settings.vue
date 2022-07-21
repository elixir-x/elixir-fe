<script lang="ts" setup>
import { ref } from "vue";
import { RouterView, useRouter } from "vue-router";
import { Tab, TabGroup, TabList } from "@headlessui/vue";

const router = useRouter();

const onChangeTab = (index: number) => {
	router.push({ path: tabs.value[index].path });
};

const tabs = ref([
	{
		name: "General",
		path: "/settings"
	},
	{
		name: "Profile",
		path: "/settings/profile"
	}
]);

const getRouterIndex = () =>
	tabs.value.findIndex(
		(route) => route.path === router.currentRoute.value.path
	);
</script>

<template>
	<div class="mx-8 mt-6 space-y-4 p-16">
		<div>
			<h1 class="title mb-1 text-4xl font-semibold tracking-tighter">
				Settings
			</h1>
			<TabGroup
				@change="onChangeTab"
				class="mb-6 space-x-2"
				:default-index="getRouterIndex()">
				<TabList>
					<Tab
						v-for="(tab, index) in tabs"
						:key="index"
						v-slot="{ selected }">
						<div
							class="tab"
							:class="
								selected
									? 'text-violet-500 underline underline-offset-2'
									: 'text-neutral-300'
							">
							{{ tab.name }}
						</div>
					</Tab>
				</TabList>
			</TabGroup>
		</div>
		<div>
			<RouterView />
		</div>
	</div>
</template>

<style scoped>
.tab {
	@apply border-none outline-none ring-0;
}
</style>
