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
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value;
    },
    DROP_TASK(state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0];
      console.log(fromTasks);
      toTasks.splice(toTaskIndex, 0, taskToMove);
      // toTasks.push(taskToMove);
    },
    DROP_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const columns = state.board.columns;
      const columnToMove = columns.splice(fromColumnIndex, 1)[0];
      columns.splice(toColumnIndex, 0, columnToMove);
    },
    CREATE_COLUMN(state, name) {
      state.board.columns.push({
        name,
        tasks: [],
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
