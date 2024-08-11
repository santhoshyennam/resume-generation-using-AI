<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="text-start">
        <h1
          class="my-6"
          style="color: #196ca2; font-style: italic; font-variant: small-caps"
        >
          {{ pageTitle }}
        </h1>
      </v-col>
    </v-row>
    <v-row v-if="resumes.length !== 0">
      <v-col v-for="(resume, index) in resumes" :key="resume.id" cols="6">
        <user-resume-card
          :resume="resume"
          :index="index"
          @edit="editResume"
          @delete="confirmDelete"
          @view="viewResume"
          @download="downloadResume"
        />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-card style="padding: 30px; width: 100%;">
        <h4>No resumes to display, please generate a resume!</h4>
      </v-card>
    </v-row>
    <!-- Dialog for Delete Confirmation -->
    <v-dialog v-model="dialogDelete" persistent max-width="300">
      <v-card>
        <v-card-title class="headline">Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete this resume?
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" text @click="dialogDelete = false">Cancel</v-btn>
          <v-btn
            color="error"
            @click="deleteResume"
            :loading="deleteLoading"
            :disabled="deleteLoading"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ResumeServices from "../services/ResumeServices";
import { updateSnackBar } from "../utils/utils";
import PdfServices from '../services/PdfServices';
import UserResumeCard from '../components/userResumeCard/UserResumeCard.vue';

const router = useRouter();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const resumes = ref([]);
const dialogDelete = ref(false);
const deleteLoading = ref(false);
let resumeToDeleteId = ref(null);
const user = ref(null);
const isAdmin = ref(false);
const pageTitle = ref("");

const fetchResumes = async () => {
  try {
    const localUser = localStorage.getItem("user");
    user.value = JSON.parse(localUser);
    // Check if the user is an admin
    if (
      user.value &&
      user.value.is_admin &&
      router.currentRoute.value.name === "all-resumes"
    ) {
      isAdmin.value = true;
      pageTitle.value = "All Resumes";
      // Fetch all resumes for admin
      const response = await ResumeServices.getAllResumes();
      resumes.value = response.data;
    } else {
      isAdmin.value = false;
      pageTitle.value = "My Resumes";
      // Fetch resumes for the current user
      const response = await ResumeServices.getResumeByUserId(user.value.id);
      resumes.value = response.data;
    }
  } catch (error) {
    console.error("Failed to fetch resumes:", error);
    snackbar.value = updateSnackBar(
      error?.response?.data?.message || "Failed to fetch resumes!",
      "error"
    );
  }
};

const editResume = (id) => {
  router.push({
    name: "edit-resume-details",
    params: { id },
  });
};

const downloadResume = async(id) => {
 try {
    const response = await PdfServices.downloadPdf(id);
    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    const fileLink = document.createElement('a');

    fileLink.href = fileURL;
    fileLink.setAttribute('download', `resume_${id}.pdf`);
    document.body.appendChild(fileLink);

    fileLink.click();
    document.body.removeChild(fileLink);
  } catch (error) {
    console.error('Failed to download PDF:', error);
    snackbar.value = updateSnackBar('Failed to download PDF!', 'error');
  }
}

const viewResume = (id) => {
  router.push({
    name: "view-resume-details",
    params: { id },
  });
};

const confirmDelete = (id) => {
  resumeToDeleteId.value = id;
  dialogDelete.value = true;
};

const deleteResume = async () => {
  if (!resumeToDeleteId.value) return;

  try {
    deleteLoading.value = true;
    await ResumeServices.deleteResume(resumeToDeleteId.value);
    // Remove the deleted resume from the list
    resumes.value = resumes.value.filter(
      (resume) => resume.id !== resumeToDeleteId.value
    );
    snackbar.value = updateSnackBar("Resume deleted successfully.", "success");
  } catch (error) {
    console.error("Failed to delete resume:", error);
    snackbar.value = updateSnackBar(
      error?.response?.data?.message || "Failed to delete resume!",
      "error"
    );
  } finally {
    deleteLoading.value = false;
    dialogDelete.value = false;
    resumeToDeleteId.value = null;
  }
};

onMounted(fetchResumes);
</script>
