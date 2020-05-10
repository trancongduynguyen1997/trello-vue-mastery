import Vue from "vue";
import Vuex from "vuex";
import defaultBoard from "../data/default-board";
import { saveStatePlugin } from "../utils/storeUtil";
import uuid from "../utils/uuid";

Vue.use(Vuex);

const board = JSON.parse(localStorage.getItem("board")) || defaultBoard;

export default new Vuex.Store({
  state: {
    board,
  },
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        id: uuid(),
        name,
        description: "",
        userAssigned: null,
      });
    },
  },
  actions: {},
  getters: {
    getTask(state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id == id) {
              console.log(task.name);
              return task;
            }
          }
        }
        return null;
      };
    },
  },
  modules: {},
  plugins: [saveStatePlugin],
});
