<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { useField } from "vee-validate";
import { toFieldValidator } from "@vee-validate/zod";
import { string } from "zod";
import { checkUsername } from "../../utils/user-fetch";
import Input from './Input.vue';

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
    if (usernameError.value !== undefined || username.value === undefined) return;

    // delay between checking the api for an available username
    clearTimeout(timer);
    timer = setTimeout(async () => {
        const success = await checkUsername(username.value as string);
        if (!success)
            setUsernameErrors('This username has been taken.');
        else setUsernameErrors('This username is available.');
    }, 1000);
};

</script>

<template>
    <form class="form">
        <div class="fields field-wrapper">

            <Input name="email" v-model="email" :error="emailError" label="Email" />
            <Input name="username" v-model="username" :error="usernameError" label="Username"
                   :error-class="usernameError?.includes('available') ? 'success' : 'error'" @keyup="onKeyUp" />
            <Input name="password" v-model="password" :error="passwordError" type="password" label="Password" />
            <Input name="confirm-password" v-model="confirmPassword" :error="confirmPasswordError" type="password" label="Confirm Password" />

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
