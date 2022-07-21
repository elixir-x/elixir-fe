<script lang="ts" setup>

import { ref } from "vue";

const imageInput = ref<HTMLInputElement | null>(null);

type ImageProps = {
    src: string,
    type: string
}

const props = defineProps<{
    modelValue: ImageProps
    accept?: string
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: ImageProps): void;
}>();

const pickImage = () => {
    const files = imageInput.value?.files;
    if (files && files[0]) {
        if (props.modelValue.src)
            URL.revokeObjectURL(props.modelValue.src);
        emit('update:modelValue', { src: URL.createObjectURL(files[0]), type: files[0].type });
    }
};
</script>

<template>
    <div class="image-picker" :style="{ 'background-image': `url(${modelValue.src})` }" @click="imageInput?.click()">
        <slot v-if="!modelValue" />
        <input type="file" ref="imageInput" @change="pickImage" :accept="accept">
    </div>
</template>

<style scoped>
    input[type=file] {
        @apply hidden;
    }
    .image-picker {
        @apply cursor-pointer bg-no-repeat bg-cover;
    }
</style>
