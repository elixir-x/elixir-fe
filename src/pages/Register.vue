<script lang="ts" setup>
import { useSessionStore } from "../stores/session";
import RegisterForm from "../components/form/RegisterForm.vue";
import Logo from "../components/Logo.vue";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";

const sessionStore = useSessionStore();
const router = useRouter();

const { handleSubmit } = useForm();

const onSubmit = handleSubmit(async ({ email, username, password }: any) => {
	await sessionStore.register(email, username, password);
	await router.push({ path: `/login` });
});
</script>

<template>
	<div class="flex h-full w-full flex-col items-center justify-center">
		<div
			class="mb-6 flex w-full flex-col items-center justify-center space-y-4">
			<Logo width="96" height="96" class="fill-violet-600" />
			<span class="text-3xl font-semibold">Create an account</span>
		</div>
		<RegisterForm @submit="onSubmit" />
	</div>
</template>
