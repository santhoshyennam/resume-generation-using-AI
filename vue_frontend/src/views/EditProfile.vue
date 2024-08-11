<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices.js";
import Snackbar from "../components/snackbar/Snack.vue";
import { updateSnackBar } from "../utils/utils";
import EditUserForm from "../components/users/editUser/EditUserForm.vue";

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
  phone_number: "",
  address: "",
  linkedin_url: "",
  portfolio: "",
  professional_summary: "",
  is_admin: false,
});

onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (!storedUser) {
    router.push({ name: "signin" });
  } else {
    user.value = {
      first_name: storedUser.first_name,
      last_name: storedUser.last_name,
      email: storedUser.email,
      phone_number: storedUser.phone_number || "",
      address: storedUser.address || "",
      linkedin_url: storedUser.linkedin_url || "",
      portfolio: storedUser.portfolio || "",
      professional_summary: storedUser.professional_summary || "",
      is_admin: storedUser.is_admin || false,
      id: storedUser.id,
    };
  }
});

const afterUpdate = async () => {
  console.log("after update...");
  const { data: userData } = await UserServices.getUserById(user.value.id);
  window.localStorage.setItem("user", JSON.stringify(userData));
  snackbar.value = updateSnackBar("Profile updated successfully!", "green");
  router.push({ name: "home" });
};
</script>

<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <h2 class="my-6" style="color: #196ca2">Edit Profile</h2>
      </v-col>
    </v-row>
    <EditUserForm :user="user" @afterUpdate="afterUpdate" :isAdmin="false" />
    <Snackbar :snackbar="snackbar" />
  </div>
</template>
