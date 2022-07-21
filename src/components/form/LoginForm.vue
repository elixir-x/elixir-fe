<script setup lang="ts">
import { RouterLink } from "vue-router";
import { string } from "zod";
import { useField } from "vee-validate";
import { toFieldValidator } from "@vee-validate/zod";
import Input from "./Input.vue";

const { value: username, errorMessage: usernameError } = useField(
	"username",
	toFieldValidator(
		string({
			required_error: "You must specify a username.",
			invalid_type_error: "You must specify a username."
		})
	),
	{ validateOnValueUpdate: true }
);

const { value: password, errorMessage: passwordError } = useField(
	"password",
	toFieldValidator(
		string({
			required_error: "You must enter a password.",
			invalid_type_error: "You must enter a password."
		})
	),
	{ validateOnValueUpdate: true }
);
</script>

<template>
	<form class="form">
		<Input
			v-model="username"
			name="username"
			:error="usernameError"
			label="Username"
			class="space-y-2" />
		<Input
			v-model="password"
			name="password"
			:error="passwordError"
			label="Password"
			type="password"
			class="space-y-2" />
		<button class="btn-primary">Login</button>
		<span class="mt-3 text-center text-sm text-neutral-300">
			Not signed up?
			<router-link to="/register" class="link-primary">
				Sign up here.
			</router-link>
		</span>
	</form>
</template>

<style scoped>
.field-wrapper {
	@apply space-y-2;
}
form {
	@apply flex w-96 max-w-7xl flex-col rounded-xl border-2 border-neutral-800 bg-neutral-900 p-6
    shadow-xl;
}

form > * {
	@apply transition-all duration-100;
}

.fields > * {
	@apply mt-1.5 mb-1.5 w-full transition-all duration-100;
}

label {
	@apply text-sm font-medium text-white;
}

button {
	@apply mt-3 h-10;
}
</style>
