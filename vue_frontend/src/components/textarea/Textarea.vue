<template>
  <v-textarea
    variant="outlined"
    v-model="value"
    :label="title"
    :disabled="disabled"
    @input="$emit('update:value', $event.target.value)"
  >
    <template v-slot:label>
      {{ title }} <span v-if="required" style="color: red;">*</span>
    </template>
  </v-textarea>
</template>
  
  <script setup>
  import { defineProps, toRefs, computed } from "vue";
  
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  });
  
  const { title, value, disabled, required } = toRefs(props);
  
  const computedLabel = computed(() => {
    return required.value ? `${title.value} *` : title.value;
  });
  </script>
  