import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Home from "../pages/Home.vue";
import User from "../pages/User.vue";
import Device from "../pages/Device.vue";
import Admin from "../pages/Admin.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/user/:id",
      name: "User",
      component: User,
      props: true,
    },
    {
      path: "/device/:id",
      name: "Device",
      component: Device,
      props: true,
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
    },
  ],
});
