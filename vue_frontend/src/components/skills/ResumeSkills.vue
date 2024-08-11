<template>
  <div>
    <v-row justify="center">
      <v-col class="text-center">
        <h1 style="color:#196CA2;font-style: italic;">Skills</h1>
      </v-col>
    </v-row>
    <!-- Chips for Skills -->
    <v-row justify="center">
      <v-col cols="12">
        <v-chip-group multiple>
          <v-chip v-for="(skill, index) in skills" :key="index" close @click:close="setEditSkill(index)">
            {{ skill.skill.name }}
            <!-- <v-icon small @click="setEditSkill(index)" :style="`margin-left:2px;`">mdi-pencil</v-icon> -->
            <v-icon small @click="removeSkill(index)">mdi-close</v-icon>
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>

    <!-- Add/Edit Skill Form -->
    <SkillForm :skill="editSkill" @save="saveSkill" />

    <!-- Snackbar for Notifications -->
    <Snackbar :snackbar="snackbar" />
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import SkillForm from './SkillForm.vue'; 
import Snackbar from '../snackbar/Snack.vue'

const props = defineProps({
  skills: {
    type: Array,
    required: true
  }
});

const { skills } = toRefs(props);
const defaulSkill = {
  skill: {
    name: ''
  }
};
const editSkill = ref({...defaulSkill});
const snackbar = ref({ value: false, color: '', text: '' });
// Method to save or update an skill
const saveSkill = (skill) => {
    console.log("save skill",skill)
    console.log(" skills",skills)
  if (skill.id) {
    // Update existing skill
    const index = skills.value.findIndex(edu => edu.id === skill.id);
    if (index !== -1) {
      skills.value.splice(index, 1, skill);
    }
    snackbar.value = { value: true, color: 'success', text: 'Skill is Updated.' };
  } else {
    // Add new skill
    skill.id = skills.value.length + 1; // Simulated auto-increment ID
    skills.value.push(skill);
    snackbar.value = { value: true, color: 'success', text: 'Skill is Added.' };
  }
    editSkill.value = {...defaulSkill}
    console.log("skills.value",skills.value)
};

// Method to remove an skill
const removeSkill = (index) => {
    if(editSkill.value?.id === skills.value[index].id){
        editSkill.value = {...defaulSkill}
    }
    skills.value.splice(index, 1);
    snackbar.value = { value: true, color: 'error', text: 'Skill removed.' };
};

const setEditSkill = (index) => {
    console.log("set", skills.value[index])
    editSkill.value = skills.value[index];
}


</script>
