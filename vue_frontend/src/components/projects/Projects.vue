<template>
  <div>
    <v-row justify="center">
      <v-col class="text-center">
        <h1 style="color:#196CA2;font-style: italic;">Projects</h1>
      </v-col>
    </v-row>
    <!-- Chips for Projects -->
    <v-row justify="center">
      <v-col cols="12">
        <v-chip-group multiple>
          <v-chip v-for="(project, index) in projects" :key="index" close @click:close="setEditProject(index)">
            {{ project.done_at }}
            <v-icon small @click="setEditProject(index)" :style="`margin-left:2px;`">mdi-pencil</v-icon>
            <v-icon small @click="removeProject(index)">mdi-close</v-icon>
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>

    <!-- Add/Edit Project Form -->
    <ProjectForm :project="editProject" @save="saveProject" />

    <!-- Snackbar for Notifications -->
    <Snackbar :snackbar="snackbar" />
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import ProjectForm from './ProjectForm.vue'; 
import Snackbar from '../snackbar/Snack.vue'

const props = defineProps({
  projects: {
    type: Array,
    required: true
  }
});

const { projects } = toRefs(props);
const defaulProject = {
    done_at: '', title: '',location:'', from_date: '', to_date: '',information:''
};
const editProject = ref({...defaulProject});
const snackbar = ref({ value: false, color: '', text: '' });

// Method to save or update an project
const saveProject = (project) => {
    console.log("save project",project)
  if (project.id) {
    // Update existing project
    const index = projects.value.findIndex(edu => edu.id === project.id);
    if (index !== -1) {
      projects.value.splice(index, 1, project);
    }
    snackbar.value = { value: true, color: 'success', text: 'Project is Updated.' };
  } else {
    // Add new project
    project.id = projects.value.length + 1; // Simulated auto-increment ID
    projects.value.push(project);
    snackbar.value = { value: true, color: 'success', text: 'Project is Added.' };
  }
    editProject.value = {...defaulProject}
    console.log("projects.value",projects.value)
};

// Method to remove an project
const removeProject = (index) => {
    if(editProject.value?.id === projects.value[index].id){
        editProject.value = {...defaulProject}
    }
    projects.value.splice(index, 1);
    snackbar.value = { value: true, color: 'error', text: 'Project is removed.' };
};

const setEditProject = (index) => {
    console.log("set", projects.value[index])
    editProject.value = projects.value[index];
}
</script>
