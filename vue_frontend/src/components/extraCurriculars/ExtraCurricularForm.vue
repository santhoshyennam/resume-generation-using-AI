<template>
  <div>
    <h3>{{ editMode ? "Edit ExtraCurricular Activity" : "Add ExtraCurricular Activity" }}</h3>
    <v-form ref="form" @submit.prevent="save">
      <v-row>
        <v-col cols="12">
          <TextBox
            required
            v-model:value="localExtraCurricular.organization_name"
            title="Organization Name"
            id="organization-name"
          />
        </v-col>
        <v-col cols="12">
          <TextArea
            required
            v-model:value="localExtraCurricular.information"
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
import { updateSnackBar } from '../../utils/utils';
import TextBox from "../textbox/Textbox.vue"
import TextArea from '../textarea/Textarea.vue';

const props = defineProps({
  extraCurricular: {
    type: Object,
    required: true,
  },
});

const localExtraCurricular = ref({ ...props.extraCurricular });
const editMode = ref(!!props.extraCurricular.id);
const emit = defineEmits(["save"]);
const snackbar = ref({
  value: false,
  color: '',
  text: '',
});

// Watch for changes in props.extraCurricular
watchEffect(() => {
  localExtraCurricular.value = { ...props.extraCurricular };
  editMode.value = props.extraCurricular?.id || null;
});

const save = () => {
  if (!localExtraCurricular.value.organization_name || !localExtraCurricular.value.information) {
    snackbar.value = updateSnackBar('Please fill in all required fields.', 'error');
  } else {
  console.log("Save:", localExtraCurricular.value);
  emit("save", localExtraCurricular.value);
  localExtraCurricular.value = { ...props.extraCurricular };
  }
};
</script>
