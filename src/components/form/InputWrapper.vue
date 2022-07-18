<script lang="ts" setup>
defineProps<{
    name: string,
    label?: string,
    labelClass?: string,
    error?: string
    errorClass?: string
}>();
</script>

<template>
    <div class="field-wrapper">
        <label class="block" :class="labelClass" :for="name">{{ label }}</label>
        <slot />
        <span class="error" :class="errorClass">{{ error }}</span>
    </div>
</template>

<style scoped>

</style>
