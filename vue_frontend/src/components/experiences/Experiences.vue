<template>
  <div>
    <v-row justify="center">
      <v-col class="text-center">
        <h1 style="color:#196CA2;font-style: italic;">Work Experience</h1>
      </v-col>
    </v-row>
    <!-- Chips for Experiences -->
    <v-row justify="center">
      <v-col cols="12">
        <v-chip-group multiple>
          <v-chip v-for="(experience, index) in experiences" :key="index" close @click:close="setEditExperience(index)">
            {{ experience.employer }}
            <v-icon small @click="setEditExperience(index)" :style="`margin-left:2px;`">mdi-pencil</v-icon>
            <v-icon small @click="removeExperience(index)">mdi-close</v-icon>
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>

    <!-- Add/Edit Experience Form -->
    <ExperienceForm :experience="editExperience" @save="saveExperience" />

    <!-- Snackbar for Notifications -->
    <Snackbar :snackbar="snackbar" />
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import ExperienceForm from './ExperienceForm.vue'; 
import Snackbar from '../snackbar/Snack.vue'

const props = defineProps({
  experiences: {
    type: Array,
    required: true
  }
});

const { experiences } = toRefs(props);
const defaulExperience = {
    employer: '', position: '',location:'', from_date: '', to_date: '',information:''
};
const editExperience = ref({...defaulExperience});
const snackbar = ref({ value: false, color: '', text: '' });

// Method to save or update an experience
const saveExperience = (experience) => {
    console.log("save experience",experience)
  if (experience.id) {
    // Update existing experience
    const index = experiences.value.findIndex(edu => edu.id === experience.id);
    if (index !== -1) {
      experiences.value.splice(index, 1, experience);
    }
    snackbar.value = { value: true, color: 'success', text: 'Experience is Updated.' };
  } else {
    // Add new experience
    experience.id = experiences.value.length + 1; // Simulated auto-increment ID
    experiences.value.push(experience);
    snackbar.value = { value: true, color: 'success', text: 'Experience is Added.' };
  }
    editExperience.value = {...defaulExperience}
    console.log("experiences.value",experiences.value)
};

// Method to remove an experience
const removeExperience = (index) => {
    if(editExperience.value?.id === experiences.value[index].id){
        editExperience.value = {...defaulExperience}
    }
    experiences.value.splice(index, 1);
    snackbar.value = { value: true, color: 'error', text: 'Experience is removed.' };
};

const setEditExperience = (index) => {
    console.log("set", experiences.value[index])
    editExperience.value = experiences.value[index];
}
</script>
