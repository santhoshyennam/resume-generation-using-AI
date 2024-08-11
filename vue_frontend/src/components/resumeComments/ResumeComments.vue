<template>
  <v-card class="mx-auto my-4">
    <v-card-title class="text-h6">Comments</v-card-title>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="comment in localComments" :key="comment.id">
        <v-list-item-content>
          <v-list-item-title class="text-subtitle-1 font-weight-bold">
            {{ comment.user.first_name }} {{ comment.user.last_name }}
          </v-list-item-title>
          <p class="text-body-2">
            {{ comment.comment }}
          </p>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider v-if="isAdmin"></v-divider>
    <v-card-actions v-if="isAdmin">
      <v-textarea
        v-model="newComment"
        label="Add a comment"
        rows="3"
        outlined
        clearable
      ></v-textarea>
      <v-btn color="green" @click="submitComment">Submit</v-btn>
    </v-card-actions>
    <Snackbar :snackbar="snackbar" />
  </v-card>
</template>

<script setup>
import { defineProps, toRefs, ref, onMounted, watch } from 'vue';
import ResumeServices from "../../services/ResumeServices";
import Snackbar from '../snackbar/Snack.vue';
import { updateSnackBar } from '../../utils/utils';

const props = defineProps({
  comments: {
    type: Array,
    required: true
  },
  resumeId: {
    type: Number,
    required: true
  }
});

const { comments, resumeId } = toRefs(props);
const localComments = ref([...comments.value]); 
const newComment = ref('');
const isAdmin = ref(false);
const userId = ref(null);
const snackbar = ref({ value: false, color: '', text: '' });

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    isAdmin.value = user.is_admin;
    userId.value = user.id;
  }
});

watch(comments, (newComments) => {
  localComments.value = [...newComments]; 
});

const submitComment = async () => {
  const requestData = {
    comment: newComment.value,
    resumeId: resumeId.value,
    userId: userId.value
  };
  try {
    await ResumeServices.addComment(requestData);
    snackbar.value = updateSnackBar("Commented on the Resume!", "success");
    newComment.value = '';
    const { data } = await ResumeServices.getResumeComments(resumeId.value);
    localComments.value = data; // Update local state
  } catch (err) {
    console.log(err);
    snackbar.value = updateSnackBar(
      err?.response?.data?.message || "Failed to Comment on the Resume!",
      "error"
    );
  }
};
</script>

<style scoped>
.text-subtitle-1 {
  color: #3f51b5; /* Primary color for the username */
}
.text-body-2 {
  color: #757575; /* Secondary color for the comment text */
}
</style>
