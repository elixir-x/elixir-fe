<script lang="ts" setup>
import { Dialog, DialogPanel, DialogTitle, DialogDescription } from "@headlessui/vue";
import { PlusCircleIcon } from "@heroicons/vue/solid";
import ImagePicker from './ImagePicker.vue';
import { onUnmounted, ref } from "vue";
import { CircleStencil, Cropper } from "vue-advanced-cropper";
import { useSessionStore } from "../../stores/session";

type ImageType = { src: string, type: string };

defineProps<{
    open: boolean
}>();

const image = ref<ImageType>({ src: "", type: "" });
const step = ref(1);
const cropper = ref<typeof Cropper>();
const sessionStore = useSessionStore();

const emit = defineEmits<{
    (e: 'stateChange', state: boolean): void
}>();

const updateState = (state: boolean) => {
    if (!state) {
        // reset to original image
        step.value = 1;
        URL.revokeObjectURL(image.value.src);
    }
    emit('stateChange', state);
}

const finishCrop = async () => {
    const { canvas } = cropper.value?.getResult();
    canvas.toBlob(async (blob: Blob) => {
        sessionStore.update({ profileBlob: blob, profileUrl: URL.createObjectURL(blob) });
    }, image.value.type);
    updateState(false);
};

</script>

<template>
    <div>
        <div class="left-0 top-0 bg-black/50 backdrop-blur-sm w-full h-full z-10 absolute" v-show="open"></div>
        <Dialog :open="open" @close="updateState"
                class="z-20 absolute left-0 right-0 top-0 bottom-0 m-auto bg-neutral-800 w-96 h-96 rounded-md">
            <DialogPanel v-if="step === 1" class="h-full w-full flex flex-col items-center justify-center space-y-6">
                <div class="text-center">
                    <DialogTitle class="title tracking-tighter font-semibold text-2xl">Change Picture</DialogTitle>
                    <DialogDescription class="tracking-tight text-neutral-500 text-sm">
                        Choose a picture that best suits you.
                    </DialogDescription>
                </div>
                <ImagePicker v-model="image" accept="image/jpeg, image/png"
                             class="group relative w-48 h-48 rounded-full bg-neutral-700 border-2
                             border-neutral-500 hover:border-neutral-300 [&>*]:transition-all duration-150">
                    <PlusCircleIcon class="group-hover:text-neutral-300 absolute w-7 h-7 text-neutral-400 left-0
                    right-0 bottom-0 top-0 m-auto"/>
                </ImagePicker>
                <div class="space-x-4">
                    <button class="btn px-[1.461rem]" @click="updateState(false)">Cancel</button>
                    <button class="btn-primary" @click="step = 2" :disabled="!image.src">Continue</button>
                </div>
            </DialogPanel>
            <DialogPanel v-if="step === 2" class="h-full w-full flex flex-col items-center justify-center space-y-6">
                <div class="text-center">
                    <DialogTitle class="title tracking-tighter font-semibold text-2xl">Crop Picture</DialogTitle>
                    <DialogDescription class="tracking-tight text-neutral-500 text-sm">
                        Choose a picture that best suits you.
                    </DialogDescription>
                </div>
                <div class="w-48 h-48">
                    <Cropper
                        ref="cropper"
                        class="w-48 h-48"
                        :src="image.src"
                        :stencil-component="CircleStencil"
                    />
                </div>
                <div class="space-x-3 mt-2">
                    <button class="btn px-8" @click="step = 1">Back</button>
                    <button class="btn-primary px-6" @click="finishCrop">Choose</button>
                </div>
            </DialogPanel>
        </Dialog>
    </div>
</template>

<style scoped>

</style>
