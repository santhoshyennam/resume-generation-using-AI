<script setup>
import { onUnmounted, defineEmits, ref } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../../../services/UserServices.js";
import Loading from "../../Loader/Loading.vue";
import Snackbar from "../../snackbar/Snack.vue";
import { updateSnackBar } from "../../../utils/utils";
import EditUserForm from './EditUserForm.vue'

const props = defineProps({
  user: Object,
});
const router = useRouter();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const user = ref({ ...props.user })
const emit = defineEmits(["getUsers"]);

const afterUpdate = async() => {
    console.log("after update user...")
    router.push({ name: 'manage-users' });
    snackbar.value = updateSnackBar("User is updated successfully.","success")
}
onUnmounted(() => {
  emit('getUsers')
});
</script>

<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <h2 class="my-6" style="color:#196CA2;">Edit User</h2>
      </v-col>
    </v-row>
    <EditUserForm :user="user" @afterUpdate="afterUpdate" :isAdmin="false" />
    <Snackbar :snackbar="snackbar" />
  </div>
</template>

<style scoped>
.add {
  margin-right: 20px;
  height: 40px;
  margin-top: 5px;
}
.heading {
    margin-top: 10px;
    justify-content: space-between;
}
</style>