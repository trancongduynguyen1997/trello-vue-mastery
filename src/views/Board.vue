<template>
  <div class="board overflow-x-auto">
    <div class="flex flex-row items-start w-full">
      <div
        class="column"
        v-for="(column, columnIndex) in board.columns"
        :key="column.name"
        @drop="onDropColumn($event, columnIndex)"
        @dragover.prevent
        @dragenter.prevent
        draggable
        @dragstart.self="startDragColumn($event, columnIndex)"
      >
        <div class="flex items-center font-bold">{{column.name}}</div>

        <div
          class="w-full bg-white m-2 p-2 rounded"
          v-for="(task, taskIndex) in column.tasks"
          :key="task.id"
          @click="goToTask(task)"
          draggable
          @dragstart="startDragTask($event, taskIndex, columnIndex)"
          @drop="onDropTask($event, columnIndex, taskIndex)"
          @dragover.prevent
          @dragenter.prevent
        >
          <span>{{task.name}}</span>
        </div>

        <input
          class="add-task-input placeholder-gray-800"
          type="text"
          placeholder="+ Add new task"
          @keyup.enter="addNewTask($event, column.tasks)"
        />
      </div>
      <input
        class="p-2 mr-4 flex-grow"
        type="text"
        v-model="newColumnName"
        @keyup.enter="addNewColumn"
        placeholder="+ Add new column"
      />
    </div>

    <div v-if="isTaskOpen" @click.self="close" class="task-bg">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Board",
  components: {},
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name === "Task";
    }
  },
  methods: {
    goToTask(task) {
      if (this.$route.path !== `/task/${task.id}`) {
        this.$router.push({ name: "Task", params: { id: task.id } });
      }
    },
    close() {
      this.$router.push({ name: "Board" });
    },
    addNewTask(e, tasks) {
      this.$store.commit("CREATE_TASK", {
        tasks,
        name: e.target.value
      });
      e.target.value = "";
    },
    startDragTask(e, taskIndex, fromColumnIndex) {
      const dT = e.dataTransfer;
      dT.dropEffect = "move";
      dT.effectAllowed = "move";

      dT.setData("from-task-index", taskIndex);
      dT.setData("from-column-index", fromColumnIndex);
      dT.setData("drag-type", "task");
    },
    onDropTask(e, toColumnIndex, toTaskIndex) {
      const dT = e.dataTransfer;
      const dragType = dT.getData("drag-type");
      const fromTaskIndex = dT.getData("from-task-index");
      const fromColumnIndex = dT.getData("from-column-index");
      if (dragType === "task") {
        const fromTasks = this.board.columns[fromColumnIndex].tasks;
        const toTasks = this.board.columns[toColumnIndex].tasks;
        this.$store.commit("DROP_TASK", {
          fromTasks,
          toTasks,
          fromTaskIndex,
          toTaskIndex
        });
      }
    },
    startDragColumn(e, fromColumnIndex) {
      const dT = e.dataTransfer;
      dT.dropEffect = "move";
      dT.setData("from-column-index", fromColumnIndex);
      dT.setData("drag-type", "column");
    },

    onDropColumn(e, toColumnIndex) {
      const dT = e.dataTransfer;
      const dragType = dT.getData("drag-type");
      const fromColumnIndex = dT.getData("from-column-index");
      if (dragType === "column") {
        this.$store.commit("DROP_COLUMN", { fromColumnIndex, toColumnIndex });
      }
    },
    addNewColumn() {
      this.$store.commit("CREATE_COLUMN", this.newColumnName);
      this.newColumnName = "";
    }
  },
  data() {
    return {
      newColumnName: ""
    };
  }
};
</script>

<style lang="css">
.board {
  @apply p-4 bg-teal-800 h-full w-full relative;
}
.column {
  @apply bg-gray-500 p-2 mr-4 pr-4 text-left shadow rounded;
  min-width: 350px;
}
.task-bg {
  @apply h-full w-full absolute top-0 left-0;
  background: rgba(0, 0, 0, 0.5);
}
.add-task-input {
  @apply w-full m-2 p-2 rounded bg-transparent outline-none;
}
</style>
