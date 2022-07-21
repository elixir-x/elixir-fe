<script lang="ts" setup>
import { ref } from "vue";
import { ExternalLinkIcon } from "@heroicons/vue/solid";
import ChooseImageModal from "./ChooseImageModal.vue";
import PlaceholderProfile from "../profile/PlaceholderProfile.vue";

defineProps<{
	change?: boolean;
	profileUrl: any;
}>();

const open = ref(false);
const hovered = ref(false);
</script>

<template>
	<div>
		<ChooseImageModal
			:open="open"
			@state-change="(state) => (open = state)" />
		<div class="relative">
			<div
				class="min-w-32 min-h-32 relative h-32 w-32 rounded-full"
				@mouseenter="hovered = true"
				@mouseleave="hovered = false"
				@focusin="hovered = true"
				@focusout="hovered = false">
				<img
					v-if="profileUrl"
					:src="profileUrl"
					alt="user logo"
					class="w-full rounded-full" />
				<PlaceholderProfile v-else class="h-full w-full" />
				<transition
					enter-from-class="opacity-0"
					enter-to-class="opacity-full"
					enter-active-class="ease-out duration-200"
					leave-to-class="opacity-0"
					leave-from-class="opacity-full"
					leave-active-class="ease-in duration-200"
					v-show="hovered"
					v-if="change">
					<div
						class="absolute left-0 top-0 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-full bg-black/70 text-center"
						@click="open = true"
						@keyup="open = true">
						<ExternalLinkIcon class="h-5 w-5" />
						<span class="text-[0.6rem]">Change picture</span>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
