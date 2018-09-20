import Vue from "vue";
import Router from "vue-router";
import home from "@/pages/home";
// import introduce from "@/pages/introduce/introduce";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
      redirect: '/templateList',
      children: [
        {
          path: "/templateList",
          name: "templateList",
          component: () => import("@/pages/list")
        },
        {
          path: "/addTemplate",
          name: "addTemplate",
          component: () => import("@/pages/addTemplate/index")
        },
        {
          path: "/editTemplate/:id",
          name: "editTemplate",
          component: () => import("@/pages/addTemplate/index")
        },
        {
          path: '/preview/:id',
          name: 'preview',
          component: () => import("@/pages/preview")
        }
      ]
    },
    // myTemplate
    {
      path: '/myTemplate/:id',
      name: 'myTemplate',
      component: () => import("@/pages/myTemplate")
    }
  ]
});
