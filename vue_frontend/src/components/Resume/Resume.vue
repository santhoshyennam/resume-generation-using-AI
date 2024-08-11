<template>
  <div>
    <!-- Step 1: User Details -->
    <v-card v-if="currentStep === 1" class="mx-auto pa-12 pb-8" elevation="8" rounded="lg">
      <UserDetails :userDetails="resumeDetails.userDetails" />
    </v-card>

    <!-- Step 2: Educations -->
    <v-card v-if="currentStep === 2" class="mx-auto pa-12 pb-8" elevation="8" rounded="lg">
      <Educations :educations="resumeDetails.education" />
    </v-card>

    <!-- Step 3: Experiences -->
    <v-card v-if="currentStep === 3" class="mx-auto pa-12 pb-8" elevation="8" rounded="lg">
      <Experiences :experiences="resumeDetails.experiences" />
    </v-card>

    <!-- Step 4: Projects -->
    <v-card v-if="currentStep === 4" class="mx-auto pa-12 pb-8" elevation="8" rounded="lg">
      <Projects :projects="resumeDetails.projects" />
    </v-card>

    <!-- Step 5: Resume Skills -->
    <v-card v-if="currentStep === 5" class="mx-auto pa-12 pb-8" elevation="8" rounded="lg">
      <ResumeSkills :skills="resumeDetails.resumeSkills" />
    </v-card>

    <!-- Step 6: Extra Curricular -->
    <v-card v-if="currentStep === 6" class="mx-auto pa-12 pb-8" elevation="8" rounded="lg">
      <ExtraCurricular :extraCurricular="resumeDetails.extraCurricular" />
    </v-card>

    <!-- Step 7: Honor Awards -->
    <v-card v-if="currentStep === 7" class="mx-auto pa-12 pb-8" elevation="8" rounded="lg">
      <HonorAwards :honorAwards="resumeDetails.honorAwards" />
    </v-card>

    <!-- Step 8: Template Selection -->
    <v-card v-if="currentStep === 8" class="mx-auto pa-12 pb-8" elevation="8" rounded="lg">
      <TemplateSelection v-model:selectedTemplate="resumeDetails.type" />
    </v-card>

    <!-- Step 9: Review Resume -->
    <v-card v-if="currentStep === 9" class="mx-auto pa-12 pb-8" elevation="8" rounded="lg">
      <ReviewResume :resumeDetails="resumeDetails" />
    </v-card>

    <!-- Navigation buttons -->
    <v-row justify="end" class="mt-4"> 
      <v-col cols="2">
        <v-btn v-if="currentStep > 1" color="grey" block @click="prevStep">Back</v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn v-if="currentStep < totalSteps" color="blue" block @click="nextStep">Next</v-btn>
        <div v-else>
          <v-btn v-if="!edit" color="green" @click="createResume">Create Resume</v-btn>
          <v-btn v-else color="green" @click="createResume">Update Resume</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, watch, toRefs, defineEmits } from 'vue';
import UserDetails from '../users/userDetails/UserDetails.vue';
import Educations from '../education/Educations.vue';
import Experiences from '../experiences/Experiences.vue';
import Projects from '../projects/Projects.vue';
import ResumeSkills from '../skills/ResumeSkills.vue';
import ExtraCurricular from '../extraCurriculars/ExtraCurricular.vue';
import HonorAwards from '../honorAwards/HonorAwards.vue';
import TemplateSelection from '../resumeTemplates/TemplateSelection.vue';
import ReviewResume from '../reviewResume/ReviewResume.vue';

const currentStep = ref(1);
const totalSteps = 9; // Updated total number of steps

const props = defineProps({
  resumeDetails: {
    type: Object,
    required: true
  },
  edit: {
    type: Boolean,
  }
});

const { resumeDetails, edit } = toRefs(props);
const emit = defineEmits(["save"]);

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const createResume = () => {
  emit("save");
};

// Initialize the type if it's not set
if (!resumeDetails.value.type) {
  resumeDetails.value.type = 1;
}
</script>

<style>
h3 {
  margin-bottom: 10px;
}
</style>
