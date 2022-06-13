<template>
  <div class="flex flex-col w-full h-full items-center justify-center">
    <div class="flex w-full flex-col items-center justify-center space-y-4 mb-6">
      <Logo width="96" height="96" class="fill-violet-600"/>
      <span class="text-3xl font-semibold">Create an account</span>
    </div>
    <RegisterForm :on-submit="onSubmit"/>
  </div>
</template>

<script lang="ts" setup>
import { useSecurityStore } from "../stores/security";

const securityStore = useSecurityStore();

const onSubmit = async ({ email, username, password }: any) => {
  await securityStore.register(email, username, password);
};

import RegisterForm from '../components/Form/RegisterForm.vue';
import Logo from '../components/Logo.vue';
</script>
