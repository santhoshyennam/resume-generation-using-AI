<script setup>
import { ref, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../../../services/UserServices.js";
import Snackbar from "../../snackbar/Snack.vue";
import { updateSnackBar } from "../../../utils/utils";

const router = useRouter();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const user = ref({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  phone_number: "",
  address: "",
  linkedin_url: "",
  portfolio: "",
  professional_summary: "",
  is_admin: false,
});
const props = defineProps({
  isRegistration: {
    type: Boolean,
  }
});

const { isRegistration } = toRefs(props);
const showViewUsersButton = ref(false);

const visible = ref(false);
const step = ref(1);

onMounted(() => {
  if (localStorage.getItem("user") == null) {
    router.push({ name: "home" });
  }
});

function validateStep1() {
  return (
    user.value.first_name.length > 0 &&
    user.value.last_name.length > 0 &&
    user.value.email.length > 0 &&
    user.value.password.length > 0
  );
}

function validateStep2() {
  return user.value.phone_number.length > 0 && user.value.address.length > 0;
}

function nextStep() {
  if (step.value === 1 && validateStep1()) {
    step.value = 2;
  } else {
    snackbar.value = updateSnackBar("Please fill in all fields", "error");
  }
}

function previousStep() {
  if (step.value === 2) {
    step.value = 1;
  }
}

async function signup() {
  try {
    if (validateStep1() && validateStep2()) {
      const { data } = await UserServices.signup(user.value);
      if(isRegistration.value){
        snackbar.value = updateSnackBar("Signup successful!", "green");
        window.localStorage.setItem("user", JSON.stringify(data));
        router.push({ name: "home" });
      } else {
        snackbar.value = updateSnackBar("User is Created Successfully!", "green");
        showViewUsersButton.value = true;
      }
    } else {
      snackbar.value = updateSnackBar("Please fill in all fields", "error");
    }
  } catch (error) {
    console.log(error);
    snackbar.value = updateSnackBar(
      error?.response?.data?.message || "Signup failed!",
      "error"
    );
  }
}

const goToUsersPage = () => {
  router.push({ name: "manage-users" });
}
</script>

<template>
  <div>
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <template v-if="step === 1">
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
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Password</div>
        <v-text-field
          v-model="user.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
          @click="nextStep"
        >
          Next
        </v-btn>
      </template>

      <template v-if="step === 2">
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

        <div class="text-subtitle-1 text-medium-emphasis">
          Professional Summary
        </div>
        <v-textarea
          v-model="user.professional_summary"
          density="compact"
          placeholder="Professional Summary"
          variant="outlined"
        ></v-textarea>

        <v-checkbox
          v-model="user.is_admin"
          label="Register as admin"
        ></v-checkbox>

        <v-row class="mb-8">
          <v-col>
            <v-btn
              color="grey"
              size="large"
              variant="tonal"
              block
              @click="previousStep"
            >
              Back
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              color="blue"
              size="large"
              variant="tonal"
              block
              @click="signup"
              v-if="isRegistration"
            >
              Sign Up
            </v-btn>
              <v-btn
              color="blue"
              size="large"
              variant="tonal"
              block
              @click="signup"
              v-else
            >
              Create User
            </v-btn>
          </v-col>
          <v-col v-if="showViewUsersButton">
          <v-btn
              color="blue"
              size="large"
              variant="tonal"
              block
              @click="goToUsersPage"
            >
              Go to Users Page
            </v-btn>
          </v-col>
        </v-row>
      </template>

      <v-card-text class="text-center" v-if="isRegistration">
        <a
          class="text-blue text-decoration-none"
          href="/signin"
          rel="noopener noreferrer"
        >
          Already have account? <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
    <Snackbar :snackbar="snackbar" />
  </div>
</template>
