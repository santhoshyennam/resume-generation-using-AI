<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6" class="text-start">
        <h1
          class="my-6"
          style="color: #196ca2; font-style: italic; font-variant: small-caps"
        >
          Resume Details
        </h1>
      </v-col>
      <v-col cols="6" class="text-end">
        <v-btn
          color="primary"
          @click="editResume"
          style="margin-top: 36px; margin-right: 5px"
          >Edit</v-btn
        >
        <v-btn @click="viewAsPdf" style="margin-top: 36px"
          >View AI Generated Resume</v-btn
        >
      </v-col>
    </v-row>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" rounded="lg">
      <ResumeDetails :resumeDetails="resumeDetails" />
      <Snackbar :snackbar="snackbar" />
    </v-card>
    <ResumeComments :comments="resumeDetails.comments" :resumeId="resumeDetails.id" />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ResumeServices from "../services/ResumeServices";
import Snackbar from "../components/snackbar/Snack.vue";
import { updateSnackBar } from "../utils/utils";
import ResumeDetails from "../components/resumeDetails/ResumeDetails.vue";
import PdfServices from '../services/PdfServices';
import ResumeComments from "../components/resumeComments/ResumeComments.vue"

const route = useRoute();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const router = useRouter();
const resumeDetails = ref({
  userDetails: {},
  education: [],
  experiences: [],
  projects: [],
  resumeSkills: [],
  extraCurricular: [],
  honorAwards: [],
  id: "",
  comments: []
});

const fetchResumeDetails = async (id) => {
  try {
    const response = await ResumeServices.getResumeById(id);
    const resumeData = response.data;
    resumeDetails.value = {
      id: resumeData.id,
      userDetails: {
        generated_resume_url: resumeData.generated_resume_url,
        first_name: resumeData.first_name,
        last_name: resumeData.last_name,
        email: resumeData.email,
        phone_number: resumeData.phone_number,
        address: resumeData.address,
        linkedin_url: resumeData.linkedin_url,
        portfolio: resumeData.portfolio,
        professional_summary: resumeData.professional_summary,
        userId: resumeData.userId,
      },
      education: resumeData.education,
      experiences: resumeData.experiences,
      projects: resumeData.projects,
      resumeSkills: resumeData.resumeSkills,
      extraCurricular: resumeData.extraCurricular,
      honorAwards: resumeData.honorAwards,
      comments: resumeData.comments
    };
  } catch (error) {
    console.log(error);
    snackbar.value = updateSnackBar(
      error?.response?.data?.message || "Failed to fetch resume details!",
      "error"
    );
  }
};
const editResume = () => {
  const resumeId = route.params.id;
  router.push(`/edit-resume-details/${resumeId}`);
};

const viewAsPdf = async () => {
  try {
    const response = await PdfServices.getPdf(resumeDetails.value.id);
    const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const fileLink = document.createElement('a');
    fileLink.href = fileURL;
    fileLink.setAttribute('target', '_blank');
    document.body.appendChild(fileLink);
    fileLink.click();
    document.body.removeChild(fileLink);
  } catch (error) {
    console.error('Failed to view PDF:', error);
    snackbar.value = updateSnackBar('Failed to view PDF!', 'error');
  }
}

onMounted(() => {
  const resumeId = route.params.id;
  fetchResumeDetails(resumeId);
});
</script>
