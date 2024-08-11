<template>
  <div>
    <h3>{{ editMode ? "Edit Work Experience" : "Add Work Experience" }}</h3>
    <v-form ref="form" @submit.prevent="save">
      <v-row>
        <v-col cols="12">
          <TextBox
            required
            v-model:value="localExperience.employer"
            title="Employer Name"
            id="employer"
          />
        </v-col>
        <v-col cols="12">
          <TextBox
            required
            v-model:value="localExperience.position"
            title="Position"
            id="position"
          />
        </v-col>
        <v-col cols="6">
          <DatePicker
            required
            v-model:value="localExperience.from_date"
            title="From Date"
            id="from-date"
          />
        </v-col>
        <v-col cols="6">
          <DatePicker
            v-model:value="localExperience.to_date"
            title="To Date"
            id="to-date"
          />
        </v-col>
        <v-col cols="12">
          <TextArea
            required
            v-model:value="localExperience.information"
            title="Information"
            id="information"
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
import { updateSnackBar, isDateBefore } from '../../utils/utils';
import TextBox from "../textbox/Textbox.vue"
import TextArea from '../textarea/Textarea.vue';
import DatePicker from "../datePicker/DatePicker.vue"

const props = defineProps({
  experience: {
    type: Object,
    required: true,
  },
});

const localExperience = ref({ ...props.experience });
const editMode = ref(!!props.experience.id);
const emit = defineEmits(["save"]);
const snackbar = ref({
  value: false,
  color: '',
  text: '',
});

// Watch for changes in props.experience
watchEffect(() => {
  localExperience.value = { ...props.experience };
  editMode.value = props.experience?.id || null;
});

const save = () => {
  if (!localExperience.value.employer || !localExperience.value.position || !localExperience.value.from_date || !localExperience.value.information) {
    snackbar.value = updateSnackBar('Please fill in all required fields.', 'error');
  } else if (!isDateBefore(localExperience.value.from_date, localExperience.value.to_date)) {
    snackbar.value = updateSnackBar('From Date must be before To Date.', 'error');
  } else {
  console.log("Save:", localExperience.value);
  emit("save", localExperience.value);
  localExperience.value = { ...props.experience };
  }
};
</script>
