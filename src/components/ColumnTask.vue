<template>
  <div
    class="w-full bg-white m-2 p-2 rounded"
    @click="goToTask(task)"
    draggable
    @dragstart="startDragTask($event,columnIndex, taskIndex )"
    @drop="onDropTask($event, columnIndex, taskIndex)"
    @dragover.prevent
    @dragenter.prevent
  >
    <span>{{task.name}}</span>
  </div>
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
        type:Number,
        required:true
    }
  },
  methods: {
    goToTask(task) {
      if (this.$route.path !== `/task/${task.id}`) {
        this.$router.push({ name: "Task", params: { id: task.id } });
      }
    },
    startDragTask(e, fromColumnIndex, taskIndex) {
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
    }
  }
};
</script>

<style>
</style>