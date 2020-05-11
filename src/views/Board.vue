<template>
  <div class="board overflow-x-auto">
    <div class="flex flex-row items-start w-full">
      <BoardColumn
        v-for="(column, columnIndex) in board.columns"
        :key="column.name"
        :board ="board"
        :column="column"
        :columnIndex="columnIndex"
      />

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
import BoardColumn from "../components/BoardColumn";
export default {
  name: "Board",
  components: { BoardColumn },
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name === "Task";
    }
  },
  methods: {
    close() {
      this.$router.push({ name: "Board" });
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

.task-bg {
  @apply h-full w-full absolute top-0 left-0;
  background: rgba(0, 0, 0, 0.5);
}
.add-task-input {
  @apply w-full m-2 p-2 rounded bg-transparent outline-none;
}
</style>
