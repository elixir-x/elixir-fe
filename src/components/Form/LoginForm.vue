<script setup lang="ts">
import { RouterLink } from "vue-router";
import { string } from "zod";
import { useField } from "vee-validate";
import { toFieldValidator } from "@vee-validate/zod";

const { value: username, errorMessage: usernameError } = useField("username",
    toFieldValidator(
        string({ required_error: "You must specify a username.", invalid_type_error: "You must specify a username." })
    ), { validateOnValueUpdate: true });

const { value: password, errorMessage: passwordError } = useField("password", toFieldValidator(
    string({ required_error: "You must enter a password.", invalid_type_error: "You must enter a password." })
), { validateOnValueUpdate: true });
</script>

<template>
    <form class="form">
        <div class="fields field-wrapper">

            <label for="username">Username</label>
            <div class="field-wrapper">
                <input type="text" v-model="username"/>
                <span class="error">{{ usernameError }}</span>
            </div>

            <label for="password">Password</label>
            <div class="field-wrapper">
                <input type="password" v-model="password"/>
                <span class="error">{{ passwordError }}</span>
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
