<template>
  <div>
    <h3>{{ editMode ? "Edit Skill" : "Add Skill" }}</h3>
    <v-form ref="form" @submit.prevent="save">
      <v-row>
        <v-col cols="4">
          <v-combobox
            v-model="localSkill.name"
            class="outlined-purple"
            :items="allSkills"
            label="Skill"
            variant="outlined"
            allow-overflow
          >
            >
            <template v-slot:label>
              Skill <span style="color: red">*</span>
            </template>
          </v-combobox>
        </v-col>
        <v-col justify="center">
          <v-btn color="primary" @click="save" style="margin-top: 10px"
            >Save</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
    <Snackbar :snackbar="snackbar" />
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, onMounted } from "vue";
import SkillServices from "../../services/SkillServices";
import Snackbar from "../snackbar/Snack.vue";
import { updateSnackBar } from "../../utils/utils";

const props = defineProps({
  skill: {
    type: Object,
    required: true,
  },
});

const localSkill = ref({ name: "" });
const editMode = ref(!!props.skill.id);
const emit = defineEmits(["save"]);
const allSkills = ref([]);
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});

// Watch for changes in props.skill
watch(
  () => props.skill,
  (newSkill) => {
    if (newSkill?.id) {
      localSkill.value = { ...newSkill };
      editMode.value = true;
    } else {
      localSkill.value = { name: "" };
      editMode.value = false;
    }
    console.log("local", localSkill.value);
  },
  { immediate: true }
);

const save = () => {
  if (!localSkill.value.name) {
    snackbar.value = updateSnackBar(
      "Please fill in all required fields.",
      "error"
    );
  } else {
    console.log("Save:", localSkill.value);
    emit("save", { skill: localSkill.value });
    // Reset the combobox after save
    localSkill.value = { name: "" };
  }
};

onMounted(async () => {
  const { data } = await SkillServices.getAllSkills();
  allSkills.value = data.map((item) => item.name);
});
</script>
