<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { useField } from "vee-validate";
import { toFieldValidator } from "@vee-validate/zod";
import { string } from "zod";
import http from "../../../http-common";

const { value: email, errorMessage: emailError } = useField("email",
    toFieldValidator(
        string({ required_error: "You must specify an email.", invalid_type_error: "You must specify an email." })
            .email("You must enter a valid email.")
    ), { validateOnValueUpdate: true });

const { value: username, errorMessage: usernameError, setErrors: setUsernameErrors } = useField("username",
    toFieldValidator(
        string({ required_error: "You must specify a username.", invalid_type_error: "You must specify a username." })
            .min(3, "Your username must be at least 3 characters.")
            .max(48, "Your username cannot be longer than 48 characters.")
    ), { validateOnValueUpdate: true });

const { value: password, errorMessage: passwordError } = useField("password", toFieldValidator(
    string({ required_error: "You must enter a password.", invalid_type_error: "You must enter a password." })
        .min(8, "Your password must be at least 8 characters.")
        .max(128, "Your password cannot be longer than 128 characters.")
), { validateOnValueUpdate: true });
const { value: confirmPassword, errorMessage: confirmPasswordError } = useField("confirm-password", toFieldValidator(
    string({ required_error: "You must enter a password.", invalid_type_error: "You must enter a password." })
        .min(8, "Your password must be at least 8 characters.")
        .max(128, "Your password cannot be longer than 128 characters.")
        .refine((val) => val === password.value, 'Passwords don\'t match.')
), { validateOnValueUpdate: true });


let timer: NodeJS.Timeout;

const onKeyUp = () => {
    // check if there is already an error being displayed
    if (usernameError.value !== undefined) return;

    // delay between checking the api for an available username
    clearTimeout(timer);
    timer = setTimeout(async () => {
        const response = await http.get(`/check-username?username=${username.value}`);
        if (response.status !== 200)
            setUsernameErrors('This username has been taken.');
        else setUsernameErrors('This username is available.');
    }, 1000);
};

</script>

<template>
    <form class="form">
        <div class="fields field-wrapper">

            <label for="email">Email</label>
            <div class="field-wrapper">
                <input type="text" v-model="email"/>
                <span class="error">{{ emailError }}</span>
            </div>

            <label for="username">Username</label>
            <div class="field-wrapper">
                <input type="text" name="username" @keyup="onKeyUp" v-model="username"/>
                <span :class="usernameError?.includes('available') ? 'available' : 'error'">{{ usernameError }}</span>
            </div>

            <label for="password">Password</label>
            <div class="field-wrapper">
                <input type="password" name="password" v-model="password"/>
                <span class="error">{{ passwordError }}</span>
            </div>

            <label for="confirm-password">Confirm Password</label>
            <div class="field-wrapper">
                <input type="password" name="confirm-password" v-model="confirmPassword"/>
                <span class="error">{{ confirmPasswordError }}</span>
            </div>

            <div class="text-sm text-neutral-300">
                <input type="checkbox" name="terms" class="check"/>
                <span> Please accept the </span>
                <a href="/terms" class="link-primary">terms and conditions.</a>
            </div>

        </div>
        <button class="btn-primary">Register</button>
        <span class="text-center mt-4 text-sm text-neutral-300">
          Already have an account?
          <router-link to="/login" class="link-primary">Login here.</router-link>
        </span>
    </form>
</template>

<style scoped>
.error, .available {
    @apply text-sm mt-1 text-red-500
}

.available {
    @apply text-green-500;
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

button {
    @apply h-10 mt-3;
}
</style>
