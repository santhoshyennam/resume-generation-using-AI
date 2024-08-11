<template>
  <v-container>
    <div :style="`display:flex;`">
      <h1>Skills</h1>
      <v-btn
        color="primary"
        @click="openCreateDialog"
        :style="`margin-left:20px; margin-top:10px;`"
        >Create</v-btn
      >
    </div>
    <v-dialog v-model="dialogVisible" max-width="500">
      <v-card>
        <v-card-title>Create Skill</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newSkillName"
            label="Skill Name"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="createSkill">Create</v-btn>
          <v-btn @click="closeCreateDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row :style="`margin-top:30px;`">
      <v-col v-for="Skill in Skills" :key="Skill.id" cols="12" md="4">
        <v-card class="mb-3">
          <v-card-title class="font-weight-medium">{{
            Skill.name
          }}</v-card-title>
          <v-card-actions>
            <v-btn text @click="editSkill(Skill)">Edit</v-btn>
            <v-btn text @click="confirmDelete(Skill)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" max-width="500">
      <v-card>
        <v-card-title>Edit Skill</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editedSkillName"
            label="Skill Name"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="cancelEdit">Cancel</v-btn>
          <v-btn color="primary" @click="updateSkill">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteConfirmation" max-width="500">
      <v-card>
        <v-card-title>Confirm Deletion</v-card-title>
        <v-card-text
          >Are you sure you want to delete
          {{ selectedSkill?.name }}?</v-card-text
        >
        <v-card-actions>
          <v-btn text @click="cancelDelete">Cancel</v-btn>
          <v-btn color="primary" @click="deleteSkill">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Snackbar :snackbar="snackbar" />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SkillServices from "../services/SkillServices.js";
import { updateSnackBar } from "../utils/utils";

const Skills = ref([]);
const editDialog = ref(false);
const editedSkillName = ref("");
const deleteConfirmation = ref(false);
let selectedSkill = null;
const dialogVisible = ref(false);
const newSkillName = ref("");
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});

onMounted(async () => {
  try {
    const response = await SkillServices.getAllSkills();
    Skills.value = response.data;
  } catch (error) {
    console.error("Error fetching Skills:", error);
    snackbar.value = updateSnackBar(
      error?.response?.data?.message || "failer to fetch! try again later",
      "error"
    );
  }
});

const openCreateDialog = () => {
  dialogVisible.value = true;
};

const closeCreateDialog = () => {
  dialogVisible.value = false;
};

const createSkill = async () => {
  try {
    const response = await SkillServices.addSkill({ name: newSkillName.value });
    Skills.value.push(response.data);
    closeCreateDialog();
  } catch (error) {
    console.error("Error creating Skill:", error);
    snackbar.value = updateSnackBar(
      error?.response?.data?.message || "failer to create! try again later",
      "error"
    );
  }
};

const editSkill = (Skill) => {
  selectedSkill = Skill;
  editedSkillName.value = Skill.name;
  editDialog.value = true;
};

const cancelEdit = () => {
  selectedSkill = null;
  editedSkillName.value = "";
  editDialog.value = false;
};

const updateSkill = async () => {
  try {
    const updatedSkill = { ...selectedSkill, name: editedSkillName.value };
    await SkillServices.updateSkill(updatedSkill);
    // Refresh Skill list after update
    const response = await SkillServices.getAllSkills();
    Skills.value = response.data;
    editDialog.value = false;
    selectedSkill = null;
    editedSkillName.value = "";
  } catch (error) {
    console.error("Error updating Skill:", error);
    snackbar.value = updateSnackBar(
      error?.response?.data?.message || "failer to updae! try again later",
      "error"
    );
  }
};

const confirmDelete = (Skill) => {
  selectedSkill = Skill;
  deleteConfirmation.value = true;
};

const cancelDelete = () => {
  selectedSkill = null;
  deleteConfirmation.value = false;
};

const deleteSkill = async () => {
  try {
    await SkillServices.deleteSkill(selectedSkill.id);
    // Refresh Skill list after deletion
    const response = await SkillServices.getAllSkills();
    Skills.value = response.data;
    deleteConfirmation.value = false;
    selectedSkill = null;
  } catch (error) {
    console.error("Error deleting Skill:", error);
    snackbar.value = updateSnackBar(
      error?.response?.data?.message || "failer to delete! try again later",
      "error"
    );
  }
};
</script>

<style scoped>
.v-card {
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
