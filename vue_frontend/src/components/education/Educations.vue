<template>
  <div>
    <v-row justify="center">
      <v-col class="text-center">
        <h1 style="color:#196CA2;font-style: italic;">Education</h1>
      </v-col>
    </v-row>
    <!-- Chips for Educations -->
    <v-row justify="center">
      <v-col cols="12">
        <v-chip-group multiple>
          <v-chip v-for="(education, index) in educations" :key="index" close @click:close="setEditEducation(index)">
            {{ education.university_name }}
            <v-icon small @click="setEditEducation(index)" :style="`margin-left:2px;`">mdi-pencil</v-icon>
            <v-icon small @click="removeEducation(index)">mdi-close</v-icon>
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>

    <!-- Add/Edit Education Form -->
    <EducationForm :education="editEducation" @save="saveEducation" />

    <!-- Snackbar for Notifications -->
    <Snackbar :snackbar="snackbar" />
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import EducationForm from './EducationForm.vue'; 
import Snackbar from '../snackbar/Snack.vue'

const props = defineProps({
  educations: {
    type: Array,
    required: true
  }
});

const { educations } = toRefs(props);
const defaulEducation = {
    university_name: '', course: '',specialization:'',gpa:'',location:'', from_date: '', to_date: ''
};
const editEducation = ref({...defaulEducation});
const snackbar = ref({ value: false, color: '', text: '' });

// Method to save or update an education
const saveEducation = (education) => {
    console.log("save education",education)
  if (education.id) {
    // Update existing education
    const index = educations.value.findIndex(edu => edu.id === education.id);
    if (index !== -1) {
      educations.value.splice(index, 1, education);
    }
    snackbar.value = { value: true, color: 'success', text: 'Education is Updated.' };
  } else {
    // Add new education
    education.id = educations.value.length + 1; // Simulated auto-increment ID
    educations.value.push(education);
    snackbar.value = { value: true, color: 'success', text: 'Education is Added.' };
  }
    editEducation.value = {...defaulEducation}
    console.log("educations.value",educations.value)
};

// Method to remove an education
const removeEducation = (index) => {
    if(editEducation.value?.id === educations.value[index].id){
        editEducation.value = {...defaulEducation}
    }
    educations.value.splice(index, 1);
    snackbar.value = { value: true, color: 'error', text: 'Education is removed.' };
};

const setEditEducation = (index) => {
    console.log("set", educations.value[index])
    editEducation.value = educations.value[index];
}
</script>
