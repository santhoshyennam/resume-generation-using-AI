<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h1 class="text-h4 font-weight-bold mb-6">Manage All Resumes</h1>
        </v-col>
      </v-row>
  
      <v-row v-if="loading">
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-col>
      </v-row>
  
      <v-row v-else-if="Object.keys(groupedResumes).length === 0">
        <v-col cols="12">
          <v-alert type="info">No resumes found.</v-alert>
        </v-col>
      </v-row>
  
      <template v-else>
        <v-row v-for="(userResumes, userId) in groupedResumes" :key="userId">
          <v-col cols="12">
            <v-card class="mb-4">
            <v-card-title class="headline" v-bind="attrs" v-on="on">
            User : {{ userResumes[0].first_name }}
            </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="6" v-for="resume in userResumes" :key="resume.id">
                    <user-resume-card 
                      :resume="resume"
                      @view="viewResume"
                      @edit="editResume"
                      @delete="confirmDelete"
                      @download="downloadResume"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </template>
  
      <v-dialog v-model="dialogDelete" persistent max-width="300">
        <v-card>
          <v-card-title class="headline">Confirm Delete</v-card-title>
          <v-card-text>Are you sure you want to delete this resume?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteResume" :loading="deleteLoading">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
        {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar.show = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import UserResumeCard from '../components/userResumeCard/UserResumeCard.vue'
  import ResumeServices from '../services/ResumeServices'
  import PdfServices from '../services/PdfServices'
  
  const router = useRouter()
  const resumes = ref([])
  const loading = ref(true)
  const dialogDelete = ref(false)
  const deleteLoading = ref(false)
  const resumeToDeleteId = ref(null)
  const snackbar = ref({
    show: false,
    text: '',
    color: ''
  })
  
  const groupedResumes = computed(() => {
    return resumes.value.reduce((acc, resume) => {
      if (!acc[resume.userId]) {
        acc[resume.userId] = []
      }
      acc[resume.userId].push(resume)
      console.log("resume",resume)
      return acc
    }, {})
  })
  
  const fetchResumes = async () => {
    try {
      loading.value = true
      const response = await ResumeServices.getAllResumes()
      resumes.value = response.data
    } catch (error) {
      console.error('Failed to fetch resumes:', error)
      showSnackbar('Failed to fetch resumes', 'error')
    } finally {
      loading.value = false
    }
  }
  
  const viewResume = (id) => {
    router.push({ name: 'view-resume-details', params: { id } })
  }
  
  const editResume = (id) => {
    router.push({ name: 'edit-resume-details', params: { id } })
  }
  
  const confirmDelete = (id) => {
    resumeToDeleteId.value = id
    dialogDelete.value = true
  }
  
  const deleteResume = async () => {
    if (!resumeToDeleteId.value) return
  
    try {
      deleteLoading.value = true
      await ResumeServices.deleteResume(resumeToDeleteId.value)
      resumes.value = resumes.value.filter(resume => resume.id !== resumeToDeleteId.value)
      showSnackbar('Resume deleted successfully', 'success')
    } catch (error) {
      console.error('Failed to delete resume:', error)
      showSnackbar('Failed to delete resume', 'error')
    } finally {
      deleteLoading.value = false
      dialogDelete.value = false
      resumeToDeleteId.value = null
    }
  }
  
  const downloadResume = async (id) => {
    try {
      const response = await PdfServices.downloadPdf(id)
      const fileURL = window.URL.createObjectURL(new Blob([response.data]))
      const fileLink = document.createElement('a')
      fileLink.href = fileURL
      fileLink.setAttribute('download', `resume_${id}.pdf`)
      document.body.appendChild(fileLink)
      fileLink.click()
      document.body.removeChild(fileLink)
      showSnackbar('Resume downloaded successfully', 'success')
    } catch (error) {
      console.error('Failed to download PDF:', error)
      showSnackbar('Failed to download PDF', 'error')
    }
  }
  
  const showSnackbar = (text, color) => {
    snackbar.value = {
      show: true,
      text,
      color
    }
  }
  
  const getUserDetail = (userId, detail) => {
    const userResume = resumes.value.find(resume => resume.userId === userId)
    if (!userResume) return ''
    switch (detail) {
      case 'name':
        return `${userResume.first_name} ${userResume.last_name}`
      case 'email':
        return userResume.email
      case 'phone':
        return userResume.phone_number
      case 'address':
        return userResume.address
      default:
        return ''
    }
  }
  
  onMounted(fetchResumes)
  </script>
  