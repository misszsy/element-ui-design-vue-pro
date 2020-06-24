import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../layouts/BasicLayouts"),
    children: [
      {
        path: "/",
        redirect: "/user/list"
      },
      {
        path: "/user",
        name: "user",
        meta: { icon: "dashboard", title: "用户管理" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/user/list",
            name: "list",
            meta: { title: "用户列表" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/user/List"
              )
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
