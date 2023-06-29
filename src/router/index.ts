import { getToken } from "@/utils/auth";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/cargoManifest",
    name: "cargoManifest",
    component: () => import("@/views/protected/business/CargoManifest.vue"),
  },
  {
    path: "/cargoManifestUpdate",
    name: "cargoManifestUpdate",
    component: () =>
      import("@/views/protected/business/CargoManifestUpdate.vue"),
  },
  {
    path: "/success",
    name: "success",
    component: () => import("@/views/result/SuccessView.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../layout/CommonLayout.vue"),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/protected/home/HomeView.vue"),
      },
      {
        path: "newTask",
        name: "newTask",
        component: () => import("@/views/protected/NewTaskList.vue"),
      },
      {
        path: "taskList",
        name: "taskList",
        component: () => import("@/views/protected/business/CargoList.vue"),
      },
      {
        path: "task",
        name: "task1",
        component: () => import("@/views/protected/business/TaskViewOld.vue"),
      },
      {
        path: "manage",
        name: "manage",
        component: () => import("@/views/protected/system/SysUserView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
const whiteList = ["/login", "/register"];
router.beforeEach((to, from, next) => {
  if (!getToken()) {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next({ name: "login", query:  to.fullPath==='/'?{}:{ redirect:to.fullPath } });
    }
  }
  next();
});

export default router;
