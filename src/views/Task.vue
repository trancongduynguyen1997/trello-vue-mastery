<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
        <input
          class="p-2 w-full mr-2 block text-xl font-bold"
          type="text"
          :value="task ? task.name : ''"
          @keydown.enter="updateTask($event,'name')"
        />
        <textarea
          class="relative w-full bg-transparent px-2 border mt-2 h-64 border-none leading-normal"
          :value="task? task.description : ''"
          @keydown.enter="updateTask($event,'description')"
        ></textarea>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    updateTask(e, key) {
      const value = e.target.value;
      this.$store.commit("UPDATE_TASK", { task: this.task, key, value });
    }
  },
  computed: {
    ...mapGetters(["getTask"]),
    task() {
      return this.getTask(this.$route.params.id);
    }
  },
  mounted() {
    if (!this.task) {
      this.$router.push({ name: "Board" });
    }
  }
};
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white mx-4 m-32 mx-auto p-4 text-left rounded shadow;
  max-width: 700px;
}
</style>