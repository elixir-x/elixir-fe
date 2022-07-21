<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import http, { handleResponse } from "../lib/http";
import { Form, Field, ErrorMessage } from "vee-validate";
import { string } from "zod";
import { XIcon } from "@heroicons/vue/solid";
import { toFieldValidator } from "@vee-validate/zod";

const route = useRoute();

const exists = ref(false);
const incorrectModal = ref(false);

onMounted(async () => {
	if (route.query.token) {
		const res = await handleResponse(
			http.get(`/email-verification?token=${route.query.token}`)
		);
		exists.value = res.code === 200;
	}
});

const onVerify = async ({ code }: any) => {
	const res = await handleResponse(
		http.get(`/email-verification?token=${route.query.token}&code=${code}`)
	);
	incorrectModal.value = res.code !== 200;
};

const codeValidator = toFieldValidator(
	string({
		required_error: "A code must be entered.",
		invalid_type_error: "You must specify a code."
	})
		.min(6, "The code must be 6 digits long.")
		.max(6, "The code must be 6 digits long.")
);
</script>

<template>
	<Form
		@submit="onVerify"
		v-if="exists"
		class="flex h-full w-full items-center justify-center">
		<div
			class="flex flex-col space-y-4 rounded-md border border-neutral-700 p-6">
			<span
				class="max-w-sm rounded-md bg-neutral-800 p-2 text-neutral-200">
				We sent you an email verification code, please check your email.
			</span>
			<div class="label flex flex-col space-y-2">
				<span v-if="incorrectModal" class="modal relative">
					The verification code entered was incorrect.
					<XIcon
						class="absolute right-3 h-4 w-4 cursor-pointer"
						@click="incorrectModal = !incorrectModal" />
				</span>
				<label for="code">Verification Code</label>
				<Field name="code" :rules="codeValidator" />
				<ErrorMessage name="verification-code" class="error" />
				<span
					class="cursor-pointer text-xs text-sm text-violet-500 hover:text-violet-400">
					Resend code
				</span>
			</div>
			<div class="text-sm">
				<Field name="stay-verified" type="checkbox" />
				Don't ask to verify again on this device.
			</div>
			<button class="btn-primary h-10">Verify Now</button>
		</div>
	</Form>
	<div v-else class="flex h-full w-full items-center justify-center">
		<div
			class="flex flex-col space-y-2 rounded-md border border-neutral-700 p-6 text-center">
			<span>No email verification code was specified or valid.</span>
			<span>Sorry mate, go somewhere else.</span>
		</div>
	</div>
</template>

<style scoped>
.modal {
	@apply flex items-center space-x-2 rounded-md bg-purple-500/70 py-2 px-2 shadow-2xl;
}

span {
	@apply text-sm;
}

div,
span {
	@apply transition-all duration-200;
}
</style>
