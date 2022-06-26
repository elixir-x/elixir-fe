<script setup lang="ts">
import { RouterLink } from "vue-router";
import { object, string } from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

defineEmits<{ (e: 'onsubmit', values: any): void }>();

const loginSchema = object({
  username: string()
      .required("You must specify a username.")
      .min(4, "Your username must be at least 4 characters."),
  password: string()
      .required("You must enter a password.")
      .min(8, "Your password must be at least 8 characters.")
});

</script>

<template>
  <Form v-slot="{ values }" @submit="$emit('onsubmit', values)" class="form" :validation-schema="loginSchema">
    {{ values }}
    <div class="fields wrapper">

      <label for="username">Username</label>
      <div class="wrapper">
        <Field type="text" name="username" />
        <ErrorMessage name="username" class="error" />
      </div>

      <label for="password">Password</label>
      <div class="wrapper">
        <Field type="password" name="password" />
        <ErrorMessage name="password" class="error" />
      </div>

    </div>
    <button class="btn-primary">Login</button>
    <span class="text-center mt-3 text-sm text-neutral-300">
      Not signed up?
      <router-link to="/register" class="link-primary">Sign up here.</router-link>
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
