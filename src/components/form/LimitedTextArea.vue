<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps<{
    modelValue: any
    heightClass?: string,
    minLength?: number
    maxLength?: number
}>();
const emit = defineEmits(['update:modelValue']);

const currentLength = ref(props.modelValue?.length);

const updateValue = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    currentLength.value = value.length;
    emit('update:modelValue', value)
};
</script>

<template>
    <div class="relative">
            <textarea :class="['p-2 w-full', heightClass ? heightClass : 'h-full']" :minlength="minLength" :maxlength="maxLength"
                      :value="modelValue"
                      @input="updateValue" />
        <span v-if="maxLength"
              :class="['select-none absolute right-3 bottom-3 text-xs', currentLength >= maxLength || minLength && currentLength < minLength ? 'text-red-500' : 'text-neutral-400']">
            {{ currentLength }}/{{ maxLength }}
        </span>
    </div>
</template>
