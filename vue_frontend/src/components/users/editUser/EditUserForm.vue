<script setup>
import { ref, onMounted, toRefs, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import UserServices from '../../../services/UserServices.js';
import Snackbar from "../../snackbar/Snack.vue"
import { updateSnackBar } from '../../../utils/utils';

const router = useRouter();
const snackbar = ref({
  value: false,
  color: '',
  text: '',
});
const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  isAdmin: {
    type: Boolean,
  }
});

const { user, isAdmin } = toRefs(props);
const emit = defineEmits(["afterUpdate"]);
onMounted(()=> {
    console.log("is",isAdmin)
})
async function updateProfile() {
  try {
    if (
      user.value.first_name.length === 0 ||
      user.value.last_name.length === 0 ||
      user.value.email.length === 0 || user.value.phone_number.length === 0 || user.value.address.length === 0
    ) {
      snackbar.value = updateSnackBar('Please fill in all required fields', 'error');
      return;
    }
    await UserServices.updateUser(user.value);
    emit("afterUpdate");
  } catch (error) {
    console.log(error);
    snackbar.value = updateSnackBar(
      error?.response?.data?.message || 'Update failed!',
      'error'
    );
  }
}
</script>

<template>
  <div>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">First Name</div>
      <v-text-field
        v-model="user.first_name"
        density="compact"
        placeholder="First Name"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Last Name</div>
      <v-text-field
        v-model="user.last_name"
        density="compact"
        placeholder="Last Name"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Email</div>
      <v-text-field
        v-model="user.email"
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        readonly
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Phone Number</div>
      <v-text-field
        v-model="user.phone_number"
        density="compact"
        placeholder="Phone Number"
        prepend-inner-icon="mdi-phone-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Address</div>
      <v-text-field
        v-model="user.address"
        density="compact"
        placeholder="Address"
        prepend-inner-icon="mdi-home-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">LinkedIn URL</div>
      <v-text-field
        v-model="user.linkedin_url"
        density="compact"
        placeholder="LinkedIn URL"
        prepend-inner-icon="mdi-linkedin"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Portfolio</div>
      <v-text-field
        v-model="user.portfolio"
        density="compact"
        placeholder="Portfolio"
        prepend-inner-icon="mdi-web"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Professional Summary</div>
      <v-textarea
        v-model="user.professional_summary"
        density="compact"
        placeholder="Professional Summary"
        variant="outlined"
      ></v-textarea>

      <v-checkbox v-if="isAdmin"
        v-model="user.is_admin"
        label="Register as admin"
      ></v-checkbox>

      <v-btn class="mb-8" color="blue" size="large" variant="tonal" block @click="updateProfile">
        Update
      </v-btn>
    </v-card>
    <Snackbar :snackbar="snackbar" />
  </div>
</template>
