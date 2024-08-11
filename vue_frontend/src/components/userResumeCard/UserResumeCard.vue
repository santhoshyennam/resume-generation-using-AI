<!-- UserResumeCard.vue -->
<template>
    <v-card class="mb-4">
      <v-card-title>
        {{ resume.first_name }} {{ resume.last_name }}
        <v-spacer></v-spacer>
        <v-chip color="primary" small>{{ resume.email }}</v-chip>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="3" v-for="(value, key) in resumeDetails" :key="key">
            <v-sheet class="pa-2" rounded>
              <strong>{{ key }}:</strong> {{ value }}
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="$emit('view', resume.id)">
          <v-icon left>mdi-eye</v-icon> View
        </v-btn>
        <v-btn color="secondary" text @click="$emit('edit', resume.id)">
          <v-icon left>mdi-pencil</v-icon> Edit
        </v-btn>
        <v-btn color="error" text @click="$emit('delete', resume.id)">
          <v-icon left>mdi-delete</v-icon> Delete
        </v-btn>
        <v-btn color="success" text @click="$emit('download', resume.id)">
          <v-icon left>mdi-download</v-icon> Download
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    resume: {
      type: Object,
      required: true
    }
  });
  
  const resumeDetails = computed(() => {
    return {
      'Phone': props.resume.phone_number,
      'Address': props.resume.address,
      'LinkedIn': props.resume.linkedin_url,
      'Portfolio': props.resume.portfolio,
      'Skills': props.resume.resumeSkills ? props.resume.resumeSkills?.map(skill => skill.skill?.name).join(', ') : '',
      'Experiences': props.resume.experiences ? props.resume.experiences.length : 0,
      'Education': props.resume.education ? props.resume.education.length : 0,
      'Projects': props.resume.projects ? props.resume.projects.length : 0
    }
  });
  
  defineEmits(['view', 'edit', 'delete', 'download']);
  </script>
  