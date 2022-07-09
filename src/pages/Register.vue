<script lang="ts" setup>
import { useSecurityStore } from "../stores/security";
import RegisterForm from '../components/Form/RegisterForm.vue';
import Logo from '../components/Logo.vue';
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";

const securityStore = useSecurityStore();
const router = useRouter();

const { handleSubmit } = useForm();

const onSubmit = handleSubmit(async ({ email, username, password }: any) => {
    console.log('submit');
    await securityStore.register(email, username, password);
    await router.push({ path: `/email-verification` });
});

</script>

<template>
    <div class="flex flex-col w-full h-full items-center justify-center">
        <div class="flex w-full flex-col items-center justify-center space-y-4 mb-6">
            <Logo width="96" height="96" class="fill-violet-600"/>
            <span class="text-3xl font-semibold">Create an account</span>
        </div>
        <RegisterForm @submit="onSubmit"/>
    </div>
</template>
