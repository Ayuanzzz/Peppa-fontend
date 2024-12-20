import { createRouter, createWebHistory } from "vue-router";

import Layout from "@/layout/index.vue";

export const constantRoutes = [
  {
    path: "/",
    redirect: "/dashboard",
  },

  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/register",
    component: () => import("@/views/register/index.vue"),
  },
  {
    path: "/dashboard",
    component: Layout,
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: { title: "首页", icon: "SuitcaseLine" },
      },
    ],
  },
  {
    path: "/userSub/:id",
    component: Layout,
    children: [
      {
        path: "",
        name: "usersub",
        component: () => import("@/views/userSub/index.vue"),
      },
    ],
  },
  {
    path: "/proSub/:id",
    component: Layout,
    children: [
      {
        path: "",
        name: "prosub",
        component: () => import("@/views/proSub/index.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/error/404.vue"),
  },
];

export const asyncRoutes = [
  {
    path: "/doing",
    component: Layout,
    meta: { roles: ["user"] },
    children: [
      {
        path: "",
        name: "doing",
        component: () => import("@/views/doing/index.vue"),
        meta: { title: "进行中", roles: ["user"], icon: "Menu" },
      },
    ],
  },
  {
    path: "/done",
    component: Layout,
    meta: { roles: ["user"] },
    children: [
      {
        path: "",
        name: "done",
        component: () => import("@/views/done/index.vue"),
        meta: { title: "已完成", roles: ["user"], icon: "CircleCheck" },
      },
    ],
  },
  {
    path: "/project",
    component: Layout,
    meta: { roles: ["admin"] },
    children: [
      {
        path: "",
        name: "project",
        component: () => import("@/views/project/index.vue"),
        meta: { title: "项目管理", roles: ["admin"], icon: "SuitcaseLine" },
      },
    ],
  },
  {
    path: "/hidden",
    component: Layout,
    meta: { roles: ["admin"] },
    children: [
      {
        path: "",
        name: "hidden",
        component: () => import("@/views/hiddenPro/index.vue"),
        meta: { title: "隐藏项目", roles: ["admin"], icon: "Hide" },
      },
    ],
  },
  {
    path: "/employee",
    component: Layout,
    meta: { roles: ["admin"] },
    children: [
      {
        path: "",
        name: "employee",
        component: () => import("@/views/employee/index.vue"),
        meta: { title: "员工管理", roles: ["admin"], icon: "User" },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

export default router;
