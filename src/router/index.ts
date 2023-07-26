import { getToken } from "@/utils/auth";
import { useStore } from "@/pinia";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "ログイン",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/wf",
    name: "wf",
    component: () => import("../layout/CommonLayout.vue"),
    children: [
      {
        path: "home",
        name: "ホームページ",
        component: () => import("@/views/protected/home/HomeView.vue"),
      },
      {
        path: "taskList",
        name: "タスク一覧",
        component: () => import("@/views/protected/business/CargoList.vue"),
      },
      {
        path: "cargoManifest",
        name: "船積確認書",
        component: () =>
          import("@/views/protected/business/CargoManifest.vue"),
      },
      {
        path: "manage",
        name: "ユーザー管理",
        component: () => import("@/views/protected/system/SysUser/SysUserView.vue"),
      },
      {
        path: "company",
        name: "会社管理",
        component: () => import("@/views/protected/system/SysCompany/SysCompany.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

function findName(key: string) {
  return routes[1].children?.find((s) => `/wf/${s.path}` === key)?.name;
}
const whiteList = ["/login", "/register"];
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  if (!getToken()) {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next("login");
    }
  } else {
    const store = useStore();
    const index = store.navTags.findIndex((s) => s.key === to.path);
    if (index === -1) {
      store.navTags.push({
        key: to.path,
        label: (findName(to.path) as string) || "",
        note: `${to.query.uuid || ""}`,
      });
    } else {
      store.navTags[index].note = `${to.query.uuid || ""}`;
    }
    store.selectedKey = to.path;
    next();
  }
});

export default router;
