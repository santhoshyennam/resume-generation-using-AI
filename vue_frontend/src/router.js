import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signin",
      name: "signin",
      component: () => import("./views/SignIn.vue"),
    },
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/SignUp.vue"),
    },
    {
      path: "/edit-profile",
      name: "edit-profile",
      component: () => import("./views/EditProfile.vue"),
    },
    {
      path: "/create-resume",
      name: "create-resume",
      component: () => import("./views/CreateResume.vue"),
    },
    {
      path: "/view-resume-details/:id",
      name: "view-resume-details",
      component: () => import("./views/ViewResume.vue"),
    },
    {
      path: "/edit-resume-details/:id",
      name: "edit-resume-details",
      component: () => import("./views/EditResumeDetails.vue"),
    },
    {
      path: "/my-resumes/",
      name: "my-resumes",
      component: () => import("./views/AllResumes.vue"),
    },
    {
      path: "/all-resumes/",
      name: "all-resumes",
      component: () => import("./views/AllResumes.vue"),
    },
    {
      path: "/manage-users/",
      name: "manage-users",
      component: () => import("./views/Users.vue"),
    },
    {
      path: "/manage-skills/",
      name: "manage-skills",
      component: () => import("./views/Skills.vue"),
    },
    {
      path: "/manage-resumes/",
      name: "manage-resumes",
      component: () => import("./views/Resumes.vue"),
    },
    {
      path: "/create-user/",
      name: "create-user",
      component: () => import("./components/users/createUser/CreateUser.vue"),
    },
    {
      path: "/home",
      redirect: "/",
    },
  ],
});

export default router;
