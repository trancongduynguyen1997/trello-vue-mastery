<template>
  <div
    class="column"
    @drop="onDropColumn($event, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    draggable
    @dragstart.self="startDragColumn($event, columnIndex)"
  >
    <div class="flex items-center font-bold">{{column.name}}</div>
    <ColumnTask
      v-for="(task, taskIndex) in column.tasks"
      :key="task.id"
      :board="board"
      :task="task"
      :taskIndex="taskIndex"
      :columnIndex="columnIndex"
    />

    <input
      class="add-task-input placeholder-gray-800"
      type="text"
      placeholder="+ Add new task"
      @keyup.enter="addNewTask($event, column.tasks)"
    />
  </div>
</template>

<script>
import ColumnTask from "./ColumnTask";
export default {
  components: {
    ColumnTask
  },
  props: {
    board: {
      type: Object,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    addNewTask(e, tasks) {
      this.$store.commit("CREATE_TASK", {
        tasks,
        name: e.target.value
      });
      e.target.value = "";
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
    }
  }
};
</script>

<style>
.column {
  @apply bg-gray-500 p-2 mr-4 pr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>