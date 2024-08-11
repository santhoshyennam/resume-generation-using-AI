<template>
  <div>
    <h3>{{ editMode ? "Edit Education" : "Add Education" }}</h3>
    <v-form ref="form" @submit.prevent="save" v-model="validForm">
      <v-row>
        <v-col cols="12">
          <TextBox
            required
            v-model:value="localEducation.university_name"
            title="University Name"
            id="university-name"
          />
        </v-col>
        <v-col cols="12">
          <TextBox
            required
            v-model:value="localEducation.course"
            title="Major"
            id="course"
          />
        </v-col>
        <v-col cols="6">
          <TextBox
            v-model:value="localEducation.specialization"
            title="Specialization"
            id="specialization"
          />
        </v-col>
        <v-col cols="6">
          <TextBox
            v-model:value="localEducation.gpa"
            title="GPA"
            id="gpa"
          />
        </v-col>
        <v-col cols="6">
          <DatePicker
            v-model:value="localEducation.from_date"
            title="From Date"
            id="date"
            required
          />
        </v-col>
        <v-col cols="6">
          <DatePicker
            v-model:value="localEducation.to_date"
            title="To Date"
            id="to-date"
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
import { updateSnackBar, isDateBefore } from '../../utils/utils';
import Snackbar from "../snackbar/Snack.vue"
import TextBox from "../textbox/Textbox.vue"
import DatePicker from "../datePicker/DatePicker.vue"

const props = defineProps({
  education: {
    type: Object,
    required: true,
  },
});
const validForm = ref(false);
const localEducation = ref({ ...props.education });
const editMode = ref(!!props.education.id);
const emit = defineEmits(["save"]);
const snackbar = ref({
  value: false,
  color: '',
  text: '',
});

// Watch for changes in props.education
watchEffect(() => {
  localEducation.value = { ...props.education };
  editMode.value = props.education?.id || null;
});

const save = () => {
  if (!localEducation.value.university_name || !localEducation.value.course || !localEducation.value.from_date) {
    snackbar.value = updateSnackBar('Please fill in all required fields.', 'error');
  } else if (!isDateBefore(localEducation.value.from_date, localEducation.value.to_date)) {
    snackbar.value = updateSnackBar('From Date must be before To Date.', 'error');
  } else {
    console.log('Save:', localEducation.value);
    emit('save', localEducation.value);
    localEducation.value = { ...props.education };
  }
};
</script>
