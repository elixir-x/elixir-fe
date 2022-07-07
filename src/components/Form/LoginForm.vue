<script setup lang="ts">
import { RouterLink } from "vue-router";
import { object, string } from "zod";
import { useForm } from "vee-validate";

const emit = defineEmits<{ (e: 'submit', values: Object): void }>();

const loginSchema = object({
    username: string({
        required_error: "You must specify a username.",
    }),
    password: string({
        required_error: "You must enter a password."
    })
});
</script>

<template>
    <form class="form">
        <div class="fields field-wrapper">

            <label for="username">Username</label>
            <div class="field-wrapper">
                <input name="username"/>
            </div>

            <label for="password">Password</label>
            <div class="field-wrapper">
                <input type="password" name="password"/>
            </div>

        </div>
        <button class="btn-primary">Login</button>
        <span class="text-center mt-3 text-sm text-neutral-300">
      Not signed up?
      <router-link to="/register" class="link-primary">Sign up here.</router-link>
    </span>
    </form>
</template>

<style scoped>
.error {
    @apply text-sm mt-1 text-red-500
}

form {
    @apply flex flex-col w-96 max-w-7xl border-2 bg-neutral-900 border-neutral-800 rounded-xl p-6
    shadow-xl;
}

form > * {
    @apply transition-all duration-100;
}

.fields > * {
    @apply w-full transition-all duration-100 mt-1.5 mb-1.5;
}

label {
    @apply text-white text-sm font-medium;
}

button {
    @apply h-10 mt-3;
}
</style>
