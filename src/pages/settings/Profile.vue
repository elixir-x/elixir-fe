<script lang="ts" setup>
import { useSecurityStore } from "../../stores/security";
import { storeToRefs } from "pinia";
import ProfilePicturePreview from "../../components/ProfilePicturePreview.vue";
import http, { handleResponse } from "../../../http-common";
import { useField, useForm } from "vee-validate";
import { toFieldValidator } from "@vee-validate/zod";
import { string } from "zod";
import LimitedTextArea from "../../components/form/LimitedTextArea.vue";
import Input from '../../components/form/Input.vue';
import { ref } from "vue";
const { handleSubmit } = useForm();

const { user } = storeToRefs(useSecurityStore());

const { value: email, errorMessage: emailError } = useField("email",
    toFieldValidator(
        string({ required_error: "You must specify an email.", invalid_type_error: "You must specify an email." })
            .email("You must enter a valid email.")
            .optional()
    ), { validateOnValueUpdate: true, initialValue: user.value?.email });

const { value: username, errorMessage: usernameError, setErrors: setUsernameErrors } = useField("username",
    toFieldValidator(
        string({ invalid_type_error: "You must specify a username." })
            .min(3, "Your username must be at least 3 characters.")
            .max(48, "Your username cannot be longer than 48 characters.")
            .optional()
    ), { validateOnValueUpdate: true, initialValue: user.value?.username });

const { value: password, errorMessage: passwordError } = useField("password", toFieldValidator(
    string({ invalid_type_error: "You must enter a password." })
        .min(8, "Your password must be at least 8 characters.")
        .max(128, "Your password cannot be longer than 128 characters.")
        .optional()
), { validateOnValueUpdate: true });
const { value: confirmPassword, errorMessage: confirmPasswordError } = useField("confirm-password", toFieldValidator(
    string({ invalid_type_error: "You must enter a password." })
        .optional()
        .refine((val) => val === password.value, 'Passwords don\'t match.')
), { validateOnValueUpdate: true });

const { value: bio, errorMessage: bioError } = useField("bio", toFieldValidator(
    string()
        .max(300, "Your bio cannot be longer than 128 characters.")
        .optional()
), { validateOnValueUpdate: true, initialValue: user.value?.bio });

const onSubmit = handleSubmit(async ({ email, username, bio }: any) => {

    const response = await handleResponse(http.patch('/user', {
        email,
        username,
        bio
    }));
    console.log(bio);
    if (response.code === 200)
        successModal.value = true;
});

const successModal = ref(false);

</script>

<template>
    <div class="space-y-8">
        <div class="tracking-tight font-semibold text-2xl mb-1">Account</div>
        <div class="flex md:flex-row flex-col md:space-x-8">
            <form @submit.prevent="onSubmit" class="block space-y-4">
                <ProfilePicturePreview :profile-url="user?.profileUrl" :change="true"/>
                <div class="grid grid-cols-2">
                    <!--Form-->
                    <div class="w-96">
                        <Input name="username" v-model="username" :error="usernameError" label="Username" class="space-y-2" />
                        <Input name="email" v-model="email" :error="emailError" label="Email" class="space-y-2" />
                        <Input name="password" v-model="password" :error="passwordError" type="password" label="Password" class="space-y-2" />
                        <Input name="confirm-password" v-model="confirmPassword" :error="confirmPasswordError" type="password" label="Confirm Password" class="space-y-2" />
                        <div class="field-wrapper">
                            <label class="block" for="bio">Bio</label>
                            <LimitedTextArea class="w-full h-full" :max-length="300" v-model="bio" />
                            <span class="error">{{ bioError }}</span>
                        </div>
                        <button class="btn-primary w-full">Update Profile</button>
                    </div>
                    <!--Preview-->
                    <div class="py-2 rounded-md">
                        <label class="block">Preview</label>
                        <div class="flex items-center space-x-2">
                            <ProfilePicturePreview :profile-url="user?.profileUrl" />
                            <div>
                                <div class="text-xl text-white font-semibold">{{ username }}</div>
                                <div class="max-w-md text-sm">{{ bio }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
label {
    @apply mb-2;
}
</style>
