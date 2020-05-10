import Vue from "vue";
import VueRouter from "vue-router";
import Board from "../views/Board.vue";
import Task from "../views/Task.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Board",
    component: Board,
    children: [
      {
        name: "Task",
        path: "/task/:id",
        component: Task,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
