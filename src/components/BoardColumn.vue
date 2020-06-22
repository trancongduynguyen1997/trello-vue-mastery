<template>
  <AppDrop @onDrop="drop($event)">
    <AppDrag class="column" :dragData="{
      'from-column-index': columnIndex
    }">
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
    </AppDrag>
  </AppDrop>
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

    drop(e) {
      const fromColumnIndex = e["from-column-index"];
      this.$store.commit("DROP_COLUMN", {
        fromColumnIndex,
        toColumnIndex: this.columnIndex
      });
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