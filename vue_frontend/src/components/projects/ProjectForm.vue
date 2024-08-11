<template>
  <div>
    <h3>{{ editMode ? "Edit Project" : "Add Project" }}</h3>
    <v-form ref="form" @submit.prevent="save">
      <v-row>
        <v-col cols="12">
          <TextBox
            required
            v-model:value="localProject.done_at"
            title="Employer Name (where is it done?)"
            id="project-employer"
          />
        </v-col>
        <v-col cols="6">
          <TextBox
            required
            v-model:value="localProject.title"
            title="Title"
            id="project-title"
          />
        </v-col>
        <v-col cols="12">
          <TextArea
            required
            v-model:value="localProject.information"
            title="Information"
            id="project-information"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn color="primary" @click="save">Save</v-btn>
      </v-row>
    </v-form>
    <Snackbar :snackbar="snackbar" />
  </div>
</template>

<script setup>
import { ref, watchEffect, defineProps, defineEmits } from "vue";
import Snackbar from "../snackbar/Snack.vue"
import { updateSnackBar } from '../../utils/utils';
import TextBox from "../textbox/Textbox.vue"
import TextArea from '../textarea/Textarea.vue';

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const localProject = ref({ ...props.project });
const editMode = ref(!!props.project.id);
const emit = defineEmits(["save"]);
const snackbar = ref({
  value: false,
  color: '',
  text: '',
});
// Watch for changes in props.project
watchEffect(() => {
  localProject.value = { ...props.project };
  editMode.value = props.project?.id || null;
});

const save = () => {
  if (!localProject.value.title || !localProject.value.information || !localProject.value.done_at) {
    snackbar.value = updateSnackBar('Please fill in all required fields.', 'error');
  } else {
    console.log("Save:", localProject.value);
    emit("save", localProject.value);
    localProject.value = { ...props.project };
  }
};
</script>
