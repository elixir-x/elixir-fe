<template>
  <div class="flex flex-col w-full h-full items-center justify-center">
    <div class="flex w-full flex-col items-center justify-center space-y-4 mb-6">
      <Logo width="96" height="96" class="fill-violet-600"/>
      <span class="text-3xl font-semibold">Login</span>
    </div>
    <LoginForm :on-submit="onSubmit"/>
    {{ securityStore.user }}
  </div>
</template>

<script lang="ts" setup>
import { useSecurityStore } from "../stores/security";
import { useRouter } from "vue-router";

const router = useRouter();
const securityStore = useSecurityStore();

const onSubmit = async ({ username, password }: any) => {
  await securityStore.login(username, password)
      .then(() => router.push({ path: '/dashboard', replace: true }));
};

import LoginForm from '../components/Form/LoginForm.vue';
import Logo from '../components/Logo.vue';
</script>
