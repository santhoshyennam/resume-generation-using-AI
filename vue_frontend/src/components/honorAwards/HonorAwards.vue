<template>
  <div>
    <v-row justify="center">
      <v-col class="text-center">
        <h1 style="color:#196CA2;font-style: italic;">Awards</h1>
      </v-col>
    </v-row>
    <!-- Chips for HonorAwards -->
    <v-row justify="center">
      <v-col cols="12">
        <v-chip-group multiple>
          <v-chip v-for="(honorAward, index) in honorAwards" :key="index" close @click:close="setEditHonorAward(index)">
            {{ honorAward.title }}
            <v-icon small @click="setEditHonorAward(index)" :style="`margin-left:2px;`">mdi-pencil</v-icon>
            <v-icon small @click="removeHonorAward(index)">mdi-close</v-icon>
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>

    <!-- Add/Edit HonorAward Form -->
    <HonorAwardForm :honorAward="editHonorAward" @save="saveHonorAward" />

    <!-- Snackbar for Notifications -->
    <Snackbar :snackbar="snackbar" />
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import HonorAwardForm from './HonorAwardForm.vue'; 
import Snackbar from '../snackbar/Snack.vue'

const props = defineProps({
  honorAwards: {
    type: Array,
    required: true
  }
});

const { honorAwards } = toRefs(props);
const defaulHonorAward = {
    title: '',information:''
};
const editHonorAward = ref({...defaulHonorAward});
const snackbar = ref({ value: false, color: '', text: '' });

// Method to save or update an honorAward
const saveHonorAward = (honorAward) => {
    console.log("save honorAward",honorAward)
  if (honorAward.id) {
    // Update existing honorAward
    const index = honorAwards.value.findIndex(edu => edu.id === honorAward.id);
    if (index !== -1) {
      honorAwards.value.splice(index, 1, honorAward);
    }
    snackbar.value = { value: true, color: 'success', text: 'Award is Updated.' };
  } else {
    // Add new honorAward
    honorAward.id = honorAwards.value.length + 1; // Simulated auto-increment ID
    honorAwards.value.push(honorAward);
    snackbar.value = { value: true, color: 'success', text: 'Award is Added.' };
  }
    editHonorAward.value = {...defaulHonorAward}
    console.log("honorAwards.value",honorAwards.value)
};

// Method to remove an honorAward
const removeHonorAward = (index) => {
    if(editHonorAward.value?.id === honorAwards.value[index].id){
        editHonorAward.value = {...defaulHonorAward}
    }
    honorAwards.value.splice(index, 1);
    snackbar.value = { value: true, color: 'error', text: 'Award is removed.' };
};

const setEditHonorAward = (index) => {
    console.log("set", honorAwards.value[index])
    editHonorAward.value = honorAwards.value[index];
}
</script>
