<template>
  <div>

  <p>{{ title }} <span v-if="required" style="color: red;">*</span>  </p>
  <input type="date" class="date" name="date" v-model="value" @input="$emit('update:value', $event.target.value)">
</div>

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

  required: {
    type: Boolean,
    default: false
  }
});

const { title, value, required } = toRefs(props);

const computedLabel = computed(() => {
  return required.value ? `${title.value} *` : title.value;
});
</script>

<style scoped>
.date {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
