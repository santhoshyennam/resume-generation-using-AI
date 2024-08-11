<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="text-start">
        <h1 class="my-6" style="color:#196CA2;font-style: italic;font-variant: small-caps;">Resume Review</h1>
      </v-col>
    </v-row>
    <ResumeDetails :resumeDetails="resumeDetails" />
  </v-container>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import ResumeDetails from "../resumeDetails/ResumeDetails.vue"
const props = defineProps({
  resumeDetails: {
    type: Object,
    required: true
  }
});

const { resumeDetails } = toRefs(props);

</script>

