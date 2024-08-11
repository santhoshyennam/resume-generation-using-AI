<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="text-start">
        <h1
          class="my-6"
          style="color: #196ca2; font-style: italic; font-variant: small-caps"
        >
          Create Resume
        </h1>
      </v-col>
    </v-row>
    <Resume :resumeDetails="resumeDetails" @save="createResume" v-if="!loading" />
    <v-progress-circular v-else
      color="primary"
      indeterminate
    ></v-progress-circular>
    <Snackbar :snackbar="snackbar" />
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import Resume from "../components/Resume/Resume.vue";
import ResumeServices from "../services/ResumeServices";
import Snackbar from "../components/snackbar/Snack.vue";
import { updateSnackBar } from "../utils/utils";
import { useRouter } from "vue-router";

const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const resumeDetails = ref({
  userDetails: JSON.parse(localStorage.getItem("user")) || {
    first_name: "",
    last_name: "",
    email: "",
  },
  education: [],
  experiences: [],
  projects: [],
  resumeSkills: [],
  extraCurricular: [],
  honorAwards: [],
  type: 1
});
const loading = ref(false);
const router = useRouter();

const createResume = async () => {
  loading.value = true;
  try {
    const res = await ResumeServices.addResume({
      ...resumeDetails.value,
      userId: resumeDetails.value.userDetails.id,
    });
    snackbar.value = updateSnackBar("Resume Created Successfully", "success");
    router.push({ name: 'view-resume-details', params: { id: res.data.id } });
  } catch (err) {
    console.error(err);
    snackbar.value = updateSnackBar(
      err?.response?.data?.message || "Failed to create Resume!",
      "error"
    );
  } finally {
    loading.value = false;
  }
};
</script>
