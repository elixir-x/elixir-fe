<script lang="ts" setup>
import InputWrapper from "./InputWrapper.vue";

defineProps<{
    name: string,
    wrapperClass?: string,
    modelValue?: any
    label?: string,
    labelClass?: string,
    error?: string
    errorClass?: string
}>();

const emit = defineEmits(['update:modelValue']);
const updateValue = (e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value);
</script>

<script lang="ts">
export default {
    inheritAttrs: false
}
</script>

<template>
    <InputWrapper :name="name" :class="wrapperClass" :label="label" :label-class="labelClass" :error="error" :error-class="errorClass">
        <input class="w-full" :name="name" v-bind="$attrs" :value="modelValue" @input="updateValue">
    </InputWrapper>
</template>

<style scoped>

</style>
