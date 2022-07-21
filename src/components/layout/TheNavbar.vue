<script lang="ts" setup>
import TheUser from "../profile/TheUser.vue";
</script>

<template>
	<div
		class="relative flex h-16 w-full min-w-full items-center space-x-16 bg-neutral-800">
		<!--        <input class="h-8 w-96 invisible md:visible" placeholder="Ctrl+K to search...">-->
		<div class="flex h-full flex-1 items-center justify-end">
			<TheUser class="mr-5" />
		</div>
	</div>
</template>

<style scoped></style>
