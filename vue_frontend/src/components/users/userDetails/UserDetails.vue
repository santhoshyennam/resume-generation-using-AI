<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <h2 class="my-6" style="color:#196CA2;font-style: italic;">User Details</h2>
      </v-col>
    </v-row>
      <!-- First Name, Last Name -->
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="userDetails.first_name" label="First Name" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="userDetails.last_name" label="Last Name" variant="outlined"></v-text-field>
        </v-col>
      </v-row>

      <!-- Email, Mobile -->
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="userDetails.email" label="Email" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="userDetails.mobile" label="Mobile" variant="outlined"></v-text-field>
        </v-col>
      </v-row>

      <!-- Address -->
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="userDetails.address" label="Address" variant="outlined"></v-text-field>
        </v-col>
      </v-row>

      <!-- LinkedIn, Website URL -->
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="userDetails.linkedin_url" label="LinkedIn URL" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="userDetails.portfolio" label="Website URL" variant="outlined"></v-text-field>
        </v-col>
      </v-row>

      <!-- Summary -->
      <v-row>
        <v-col cols="12">
          <v-textarea v-model="userDetails.professional_summary" label="Professional Summary" variant="outlined" rows="5"></v-textarea>
        </v-col>
      </v-row>
  </div>
</template>

<script setup>
import { ref, defineProps, toRef } from 'vue';

const props = defineProps({
  userDetails: Object
});
const userDetails = toRef(props, 'userDetails');

</script>
