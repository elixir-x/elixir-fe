<script lang="ts" setup>
import { useSessionStore } from "../../stores/session";
import { storeToRefs } from "pinia";
import ProfilePicturePreview from "../../components/image/ProfilePicturePreview.vue";
import { useField, useForm } from "vee-validate";
import { toFieldValidator } from "@vee-validate/zod";
import { string } from "zod";
import LimitedTextArea from "../../components/form/LimitedTextArea.vue";
import Input from '../../components/form/Input.vue';
import { ref } from "vue";
import { checkUsername, updateUserInfo } from "../../utils/user-fetching";
import InputWrapper from "../../components/form/InputWrapper.vue";

const { handleSubmit } = useForm();

const sessionStore = useSessionStore();
const { user } = storeToRefs(sessionStore);


const successProfileModal = ref(false);
const successAccountModal = ref(false);

let timer: NodeJS.Timeout;

const onKeyUp = () => {
    // check if the user typed the same username and remove the error
    if (username.value === user.value?.username) {
        setUsernameErrors('');
        return;
    }
    // check if there is already an error being displayed
    if (usernameError.value !== undefined) return;

    // delay between checking the api for an available username
    clearTimeout(timer);
    timer = setTimeout(async () => {
        const success = await checkUsername(username.value as string);
        if (!success)
            setUsernameErrors('This username has been taken.');
        else setUsernameErrors('This username is available.');
    }, 1000);
};

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

const { value: password, errorMessage: passwordError, setErrors: setPasswordErrors } = useField("password", toFieldValidator(
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

const updateProfile = handleSubmit(async ({ bio }: Record<string, any>) => {
    successProfileModal.value = await updateUserInfo({ bio, profileBlob: user.value?.profileBlob });
});

const updateAccount = handleSubmit(async ({ username, email, password, confirmPassword }: Record<string, any>) => {
    if (!password && (username !== user.value?.username || email !== user.value?.email)) {
        setPasswordErrors('You must enter a password to change important user details.');
        return;
    }
    successAccountModal.value = await updateUserInfo({
        username,
        email,
        password,
        confirmPassword
    });
});

</script>

<template>
    <div class="space-y-8">
        <div class="grid grid-flow-col grid-cols-[min-content_auto] gap-16">
            <div class="w-[28rem]">
                <!--Profile-->
                <h2 class="tracking-tight font-semibold text-2xl mb-4">Profile</h2>
                <form @submit.prevent="updateProfile" class="block space-y-2">
                    <div class="flex items-center space-x-8">
                        <ProfilePicturePreview :profile-url="user?.profileUrl" :change="true" class="w-[7.125rem] min-w-[7.125rem]"/>
                        <div>
                            <div class="text-xl text-white font-semibold">{{ username }}</div>
                            <p class="text-sm break-all">{{ bio }}</p>
                        </div>
                    </div>
                    <InputWrapper name="bio" label="Bio" :error="bioError">
                        <LimitedTextArea :max-length="300" height-class="h-[152px]" v-model="bio"/>
                    </InputWrapper>
                    <button class="btn-primary w-full">Update Profile</button>
                </form>
            </div>
            <!--Account-->
            <div class="w-96">
                <h2 class="tracking-tight font-semibold text-2xl mb-4">Account</h2>
                <form @submit.prevent="updateAccount" class="block space-y-2">
                    <Input name="username" v-model="username" :error="usernameError" label="Username"
                           :error-class="usernameError?.includes('available') ? 'success' : 'error'" @keyup="onKeyUp"/>
                    <Input name="email" v-model="email" :error="emailError" label="Email"/>
                    <Input name="password" v-model="password" :error="passwordError" type="password" label="Password" />
                    <Input name="confirm-password" v-model="confirmPassword" :error="confirmPasswordError" type="password" label="Confirm Password" />
                    <button class="btn-primary w-full">Update Account</button>
                </form>
            </div>
            <div class="w-96">
                <h2 class="tracking-tight font-semibold text-2xl mb-4">Branding</h2>

            </div>
        </div>
    </div>
</template>

<style scoped>
.field-wrapper {
    @apply space-y-2;
}
</style>
