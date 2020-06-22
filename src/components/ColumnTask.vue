<template>
  <AppDrop @onDrop="drop($event)">
    <AppDrag
      class="w-full bg-white m-2 p-2 rounded"
      :dragData="{
      'from-column-index': columnIndex,
      'from-task-index': taskIndex
    }"
    >
      <span>{{task.name}}</span>
    </AppDrag>
  </AppDrop>
</template>

<script>
export default {
  props: {
    board: {
      type: Object,
      required: true
    },
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToTask(task) {
      if (this.$route.path !== `/task/${task.id}`) {
        this.$router.push({ name: "Task", params: { id: task.id } });
      }
    },
    drop(e) {
      const fromTaskIndex = e["from-task-index"];
      const fromColumnIndex = e["from-column-index"];
      const fromTasks = this.board.columns[fromColumnIndex].tasks;
      const toTasks = this.board.columns[this.columnIndex].tasks;
      this.$store.commit("DROP_TASK", {
        fromTasks,
        toTasks,
        fromTaskIndex,
        toTaskIndex: this.taskIndex
      });
    }
  }
};
</script>

<style>
</style>