<template>
  <div>
    <v-row justify="center">
      <v-col class="text-center">
        <h1 style="color:#196CA2;font-style: italic;">ExtraCurricular Activities</h1>
      </v-col>
    </v-row>
    <!-- Chips for ExtraCurriculars -->
    <v-row justify="center">
      <v-col cols="12">
        <v-chip-group multiple>
          <v-chip v-for="(extraCurricular, index) in extraCurricular" :key="index" close @click:close="setEditExtraCurricular(index)">
            {{ extraCurricular.organization_name }}
            <v-icon small @click="setEditExtraCurricular(index)" :style="`margin-left:2px;`">mdi-pencil</v-icon>
            <v-icon small @click="removeExtraCurricular(index)">mdi-close</v-icon>
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>

    <!-- Add/Edit ExtraCurricular Form -->
    <ExtraCurricularForm :extraCurricular="editExtraCurricular" @save="saveExtraCurricular" />

    <!-- Snackbar for Notifications -->
    <Snackbar :snackbar="snackbar" />
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import ExtraCurricularForm from './ExtraCurricularForm.vue'; 
import Snackbar from '../snackbar/Snack.vue'

const props = defineProps({
  extraCurricular: {
    type: Array,
    required: true
  }
});

const { extraCurricular } = toRefs(props);
const defaulExtraCurricular = {
    organization_name: '',information:'', heading: 'Leadership'
};
const editExtraCurricular = ref({...defaulExtraCurricular});
const snackbar = ref({ value: false, color: '', text: '' });

// Method to save or update an extraCurricular
const saveExtraCurricular = (newExtraCurricular) => {
    console.log("save extraCurricular",newExtraCurricular)
  if (newExtraCurricular.id) {
    // Update existing extraCurricular
    const index = extraCurricular.value.findIndex(edu => edu.id === newExtraCurricular.id);
    if (index !== -1) {
      extraCurricular.value.splice(index, 1, newExtraCurricular);
    }
    snackbar.value = { value: true, color: 'success', text: 'ExtraCurricular Activity is Updated.' };
  } else {
    // Add new extraCurricular
    newExtraCurricular.id = extraCurricular.value.length + 1; // Simulated auto-increment ID
    extraCurricular.value.push(newExtraCurricular);
    snackbar.value = { value: true, color: 'success', text: 'ExtraCurricular Activity is Added.' };
  }
    editExtraCurricular.value = {...defaulExtraCurricular}
    console.log("extraCurricular.value",extraCurricular.value)
};

// Method to remove an extraCurricular
const removeExtraCurricular = (index) => {
    if(editExtraCurricular.value?.id === extraCurricular.value[index].id){
        editExtraCurricular.value = {...defaulExtraCurricular}
    }
    extraCurricular.value.splice(index, 1);
    snackbar.value = { value: true, color: 'error', text: 'ExtraCurricular Activity is removed.' };
};

const setEditExtraCurricular = (index) => {
    console.log("set", extraCurricular.value[index])
    editExtraCurricular.value = extraCurricular.value[index];
}
</script>
