<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Field, Form, ErrorMessage } from "vee-validate";
import { object, string, ValidationError } from "yup";

const emit = defineEmits<{
  (e: 'submit', values: any): void,
  (e: 'checkUsername', username: string): void
}>();

const props = defineProps<{
  usernameAvailable: Promise<boolean | ValidationError>
}>();

const registerSchema = object({
  email: string()
      .required("You must specify an email.")
      .email("You must enter a valid email."),
  username: string()
      .required("You must specify a username.")
      .min(4, "Your username must be at least 4 characters.")
      .max(32, "Your username cannot be longer than 32 characters.")
      .test('checkUsername', function () {
        return props.usernameAvailable;
      }),
  password: string()
      .required("You must enter a password.")
      .min(8, "Your password must be at least 8 characters.")
      .max(128, "Your username cannot be longer than 128 characters.")

});

let timer: NodeJS.Timeout;

const onKeyUp = (username: string) => {
  clearTimeout(timer);
  timer = setTimeout(() => emit('checkUsername', username), 500);
};

</script>

<template>
  <Form v-slot="{ values }" @submit="$emit('submit', values)" class="form" :validation-schema="registerSchema">
    <div class="fields wrapper">

      <label for="email">Email</label>
      <div class="wrapper">
        <Field type="text" name="email"/>
        <ErrorMessage name="email" class="error"/>
      </div>

      <label for="username">Username</label>
      <div class="wrapper">
        <Field type="text" name="username" @keyup="() => onKeyUp(values.username)" />
        <ErrorMessage name="username" class="error"/>
      </div>

      <label for="password">Password</label>
      <div class="wrapper">
        <Field type="password" name="password"/>
        <ErrorMessage name="password" class="error"/>
      </div>

      <div class="text-sm text-neutral-300">
        <Field type="checkbox" name="terms" class="check" />
        <span> Please accept the </span>
        <a href="/terms" class="link-primary">terms and conditions.</a>
      </div>

    </div>
    <button class="btn-primary">Register</button>
    <span class="text-center mt-4 text-sm text-neutral-300">
      Already have an account?
      <router-link to="/login" class="link-primary">Login here.</router-link>
    </span>
  </Form>
</template>

<style scoped>
.error {
  @apply text-sm mt-1 text-red-500
}

.wrapper {
  @apply flex flex-wrap flex-col
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
