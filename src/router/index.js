import Vue from "vue";
import storage from "store";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Login from "@/views/login/Login";
import NotFound from "@/components/exception/404";
import Forbidden from "@/components/exception/403";
import { ACCESS_TOKEN } from "@/store/mutation-types";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "登录页",
    component: Login,
    hideInMenu: true
  },
  {
    path: "/",
    component: () => import("../layouts/BasicLayouts"),
    children: [
      {
        path: "/",
        redirect: "/dashboard/tableList"
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: "el-icon-s-home",
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/tableList",
            name: "查询列表",
            icon: "el-icon-info",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/dashboard/List"
              )
          }
        ]
      },
      {
        path: "/user",
        name: "个人中心",
        icon: "el-icon-user",
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/user/profile",
            name: "个人信息",
            icon: "el-icon-info",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/user/Profile"
              )
          }
        ]
      }
    ]
  }, {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//白名单地址
const whiteList = ['login']
const loginRoutePath = "/login";
const defaultRoutePath = "/dashboard/tableList";

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (storage.get(ACCESS_TOKEN)) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      NProgress.done();
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.name)) {
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
  // if (to.path !== from.path) {
  //   NProgress.start();
  // }
  // next();
});

router.afterEach(() => {
  NProgress.done();
});

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router;
