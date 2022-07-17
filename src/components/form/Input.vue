<script lang="ts" setup>
import { ref } from "vue";

defineProps<{
    name: string,
    modelValue?: any
    type?: string,
    placeholder?: string,
    label?: string,
    error?: string
    errorClass?: string
}>();

const emit = defineEmits(['update:modelValue']);
const updateValue = (e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value);
</script>

<template>
    <div class="field-wrapper">
        <label class="block" :for="name">{{ label }}</label>
        <input class="w-full" :type="type" :name="name" :placeholder="placeholder" :value="modelValue" @input="updateValue">
        <span class="error">{{ error }}</span>
    </div>
</template>

<style scoped>

</style>
