<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h3>User Details</h3>
        <p><strong>First Name:</strong> {{ resumeDetails.userDetails.first_name }}</p>
        <p><strong>Last Name:</strong> {{ resumeDetails.userDetails.last_name }}</p>
        <p><strong>Email:</strong> {{ resumeDetails.userDetails.email }}</p>
        <p><strong>Phone Number:</strong> {{ resumeDetails.userDetails.phone_number }}</p>
        <p><strong>Address:</strong> {{ resumeDetails.userDetails.address }}</p>
        <p><strong>LinkedIn URL:</strong> {{ resumeDetails.userDetails.linkedin_url }}</p>
        <p><strong>Portfolio:</strong> {{ resumeDetails.userDetails.portfolio }}</p>
        <p><strong>Professional Summary:</strong> {{ resumeDetails.userDetails.professional_summary }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3 v-if="resumeDetails.education.length !=0">Education</h3>
        <div v-for="education in resumeDetails.education" :key="education.id">
          <p><strong>University Name:</strong> {{ education.university_name }}</p>
          <p><strong>Major:</strong> {{ education.course }}</p>
          <p><strong>Specialization:</strong> {{ education.specialization }}</p>
          <p><strong>GPA:</strong> {{ education.gpa }}</p>
          <p><strong>Location:</strong> {{ education.location }}</p>
          <p><strong>From Date:</strong> {{ education.from_date }}</p>
          <p><strong>To Date:</strong> {{ education.to_date }}</p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3 v-if="resumeDetails.experiences.length !=0">Work Experience</h3>
        <div v-for="experience in resumeDetails.experiences" :key="experience.id">
          <p><strong>Employer:</strong> {{ experience.employer }}</p>
          <p><strong>Position:</strong> {{ experience.position }}</p>
          <p><strong>Location:</strong> {{ experience.location }}</p>
          <p><strong>From Date:</strong> {{ experience.from_date }}</p>
          <p><strong>To Date:</strong> {{ experience.to_date }}</p>
          <p><strong>Information:</strong> {{ experience.information }}</p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3 v-if="resumeDetails.projects.length !=0">Projects</h3>
        <div v-for="project in resumeDetails.projects" :key="project.id">
          <p><strong>Done At:</strong> {{ project.done_at }}</p>
          <p><strong>Title:</strong> {{ project.title }}</p>
          <p><strong>Information:</strong> {{ project.information }}</p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3 v-if="resumeDetails.resumeSkills.length !=0">Skills</h3>
        <div v-for="skill in resumeDetails.resumeSkills" :key="skill.id">
          {{ skill.skill.name }} 
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3 v-if="resumeDetails.extraCurricular.length !=0">Extra Curricular Activities</h3>
        <div v-for="extra in resumeDetails.extraCurricular" :key="extra.id">
          <p><strong>Heading:</strong> {{ extra.heading }}</p>
          <p><strong>Organization Name:</strong> {{ extra.organization_name }}</p>
          <p><strong>Information:</strong> {{ extra.information }}</p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3 v-if="resumeDetails.honorAwards.length !=0">Honors and Awards</h3>
        <div v-for="award in resumeDetails.honorAwards" :key="award.id">
          <p><strong>Title:</strong> {{ award.title }}</p>
          <p><strong>Information:</strong> {{ award.information }}</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs } from 'vue';

const props = defineProps({
  resumeDetails: {
    type: Object,
    required: true
  }
});

const { resumeDetails } = toRefs(props);

</script>