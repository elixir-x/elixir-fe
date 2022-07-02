<script lang="ts" setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import http from "../../http-common";

const route = useRoute();

onMounted(() => {
  http.get(`/email-verification?token=${route.params.token}`)
      .then(response => {

      });
});

</script>

<template>
  <div class="flex items-center justify-center w-full h-full">
    <div class="flex space-y-4 flex-col p-6 rounded-md border border-neutral-700">
      <span class="rounded-md p-2 bg-neutral-800 text-neutral-200 max-w-sm">We sent you an email verification code, please check your email
        <span class="text-violet-500">{{ $route.params.username }}.</span>
      </span>
      <div class="label flex flex-col space-y-2">
        <label for="verification-code">Verification Code</label>
        <input type="text" name="verification-code"/>
        <span class="text-xs text-violet-500 cursor-pointer text-sm hover:text-violet-400">Resend code</span>
      </div>
      <div class="text-sm">
        <input type="checkbox"/>
        Don't ask to verify again on this computer.
      </div>
      <button class="btn-primary h-10">Verify Now</button>
    </div>
  </div>
</template>

<style scoped>
span {
  @apply text-sm;
}
div, span {
  @apply transition-all duration-200;
}
</style>