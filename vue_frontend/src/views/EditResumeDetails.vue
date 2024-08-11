<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="text-start">
        <h1
          class="my-6"
          style="color: #196ca2; font-style: italic; font-variant: small-caps"
        >
          Edit Resume Details
        </h1>
      </v-col>
    </v-row>
    <Resume :resumeDetails="resumeDetails" @save="updateResume" :edit="true" v-if="!loading" />
    <v-progress-circular v-else
      color="primary"
      indeterminate
    ></v-progress-circular>
    <Snackbar :snackbar="snackbar" />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Resume from "../components/Resume/Resume.vue";
import ResumeServices from "../services/ResumeServices";
import Snackbar from "../components/snackbar/Snack.vue";
import { updateSnackBar } from "../utils/utils";

const route = useRoute();
const router = useRouter();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const resumeDetails = ref({
  userDetails: {},
  education: [],
  experiences: [],
  projects: [],
  resumeSkills: [],
  extraCurricular: [],
  honorAwards: [],
  id: "",
  type: 1
});
const loading = ref(false);

const fetchResumeDetails = async (id) => {
  try {
    const response = await ResumeServices.getResumeById(id);
    const resumeData = response.data;
    resumeDetails.value = {
      id: resumeData.id,
      userDetails: {
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
    };
  } catch (error) {
    console.log(error);
    snackbar.value = updateSnackBar(
      error?.response?.data?.message || "Failed to fetch resume details!",
      "error"
    );
  }
};

const updateResume = () => {
  loading.value = true;
  // Logic to create resume and make API call
  ResumeServices.updateResume({ ...resumeDetails.value })
    .then((res) => {
      console.log(res);
      snackbar.value = updateSnackBar("Resume updated Successfully", "success");
      router.push({ name: 'view-resume-details', params: { id: route.params.id}})
      loading.value = false;
    })
    .catch((err) => {
      console.log(err);
      snackbar.value = updateSnackBar(
        err?.response?.data?.message || "Failed to update Resume!",
        "error"
      );
      loading.value = false;
    });
};

onMounted(() => {
  const resumeId = route.params.id;
  fetchResumeDetails(resumeId);
});
</script>
