import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../pages/Login.vue";
import User from "../pages/User.vue";
import Admin from "../pages/Admin.vue";
import Register from "../pages/Register.vue";
import { useAuthStore } from "../stores/auth.store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/user/:id",
      name: "user",
      component: User,
      props: true,
    },
    {
      path: "/admin/:id",
      name: "admin",
      component: Admin,
      props: true,
    },
  ],
});

router.beforeEach(async (to, from) => {
  if (to.name == "login") return true;
  const auth = useAuthStore();
  if (!auth.isLoggedIn() && to.name !== "login") {
    return { name: "login" };
  }
  if (!auth.user) {
    await auth.initUser();
  }
  if (to.name !== auth.user!.role || to.params.id !== auth.user!.id.toString()) {
    return { name: auth.user!.role, params: { id: auth.user!.id } };
  }
});

export default router;
