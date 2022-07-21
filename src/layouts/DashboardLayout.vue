<script lang="ts" setup>
import TheNavbar from "../components/layout/TheNavbar.vue";
import TheSidebar from "../components/layout/TheSidebar.vue";
</script>

<template>
	<div
		class="grid-wrap grid h-full w-full grid-cols-[min-content] grid-rows-[min-content_auto]">
		<TheNavbar class="col-span-2" />
		<TheSidebar />
		<slot />
	</div>
</template>
