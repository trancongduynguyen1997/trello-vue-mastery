<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div class="column" v-for="column in board.columns" :key="column.name">
        <div class="flex items-center font-bold">{{column.name}}</div>

        <div
          class="w-full bg-white m-2 p-2 rounded"
          v-for="task in column.tasks"
          :key="task.id"
          @click="goToTask(task)"
        >
          <span>{{task.name}}</span>
        </div>
      </div>
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
      this.$router.push({name: "Board"})
    }
  }
};
</script>

<style lang="css">
.board {
  @apply p-4 bg-teal-800 h-full overflow-auto relative;
}
.column {
  @apply bg-gray-500 p-2 mr-4 pr-4 text-left shadow rounded;
  min-width: 350px;
}
.task-bg {
  @apply h-full w-full absolute top-0 left-0;
  background: rgba(0,0,0,0.5);
}
</style>
