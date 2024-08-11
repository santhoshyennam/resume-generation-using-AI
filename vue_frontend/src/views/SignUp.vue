<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import CreateUser from "../components/users/createUser/CreateUser.vue"

const router = useRouter();
onMounted(() => {
  if (localStorage.getItem("user") !== null) {
    router.push({ name: "home" });
  }
});

</script>

<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <h2 class="my-6" style="color: #196ca2">Story Teller</h2>
      </v-col>
    </v-row>
    <CreateUser :isRegistration="true" />
  </div>
</template>
