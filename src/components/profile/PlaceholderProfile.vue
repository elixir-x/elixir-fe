<script lang="ts" setup>
import { UserCircleIcon } from "@heroicons/vue/outline";

defineProps<{
	logoClass: string;
}>();
</script>

<template>
	<div class="flex items-center justify-center rounded-full bg-neutral-800">
		<UserCircleIcon :class="['h-10 w-10', logoClass]" />
	</div>
</template>
