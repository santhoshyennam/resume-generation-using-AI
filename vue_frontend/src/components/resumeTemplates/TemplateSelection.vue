<template>
    <div>
      <h3>Select a Template</h3>
      <v-row>
        <v-col v-for="(template, index) in templates" :key="index" cols="3">
          <v-card @click="selectTemplate(index + 1)" :class="{ 'selected': selectedTemplate === index + 1 }">
            <v-img :src="`/templates/template${index + 1}.png`" height="200" cover></v-img>
            <v-card-title>Template {{ index + 1 }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script setup>
  import { ref,toRefs } from 'vue';
  
  const props = defineProps({
    selectedTemplate: {
        type: Number,
        required: true
    }
    });

const { selectedTemplate } = toRefs(props);
  
  const emit = defineEmits(['update:selectedTemplate']);
  
  const templates = ref([1, 2, 3, 4]); // Assuming we have 4 templates
  
  const selectTemplate = (templateNumber) => {
    emit('update:selectedTemplate', templateNumber);
    // selectedTemplate.value = templateNumber;
  };
  </script>
  
  <style scoped>
  .selected {
    border: 2px solid blue;
  }
  </style>
  