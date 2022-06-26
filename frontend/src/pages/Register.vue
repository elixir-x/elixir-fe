<script lang="ts" setup>
import { ref } from "vue";
import { useSecurityStore } from "../stores/security";
import RegisterForm from '../components/Form/RegisterForm.vue';
import Logo from '../components/Logo.vue';
import { checkUsername } from "../utils/user-fetch";
import { ValidationError } from "yup";

const securityStore = useSecurityStore();

const onSubmit = async ({ email, username, password }: any) => {
  await onCheckUsername(username);
  await securityStore.register(email, username, password);
};

const usernameAvailable = ref<boolean | ValidationError>();

const onCheckUsername = async (username: string) => {
  usernameAvailable.value = await checkUsername(username);
  console.log(usernameAvailable.value);
};

</script>

<template>
  <div class="flex flex-col w-full h-full items-center justify-center">
    <div class="flex w-full flex-col items-center justify-center space-y-4 mb-6">
      <Logo width="96" height="96" class="fill-violet-600"/>
      <span class="text-3xl font-semibold">Create an account</span>
    </div>
    <RegisterForm @submit="onSubmit" @checkUsername="onCheckUsername" :usernameAvailable="usernameAvailable"/>
  </div>
</template>
