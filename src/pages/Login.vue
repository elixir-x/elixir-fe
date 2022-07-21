<script lang="ts" setup>
import { useSessionStore } from "../stores/session";
import { useRouter } from "vue-router";
import LoginForm from "../components/form/LoginForm.vue";
import Logo from "../components/Logo.vue";
import { useForm } from "vee-validate";

const router = useRouter();
const sessionStore = useSessionStore();
const { handleSubmit } = useForm();

const onSubmit = handleSubmit(async ({ username, password }: any) => {
	const success = await sessionStore.login(username, password);
	if (success) await router.push({ path: "/dashboard", replace: true });
});
</script>

<template>
	<div class="flex h-full w-full flex-col items-center justify-center">
		<div
			class="mb-6 flex w-full flex-col items-center justify-center space-y-4">
			<Logo width="96" height="96" class="fill-violet-600" />
			<span class="text-3xl font-semibold">Login</span>
		</div>
		<LoginForm @submit="onSubmit" />
	</div>
</template>
