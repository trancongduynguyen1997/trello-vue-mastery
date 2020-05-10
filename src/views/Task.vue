<template>
  <div class="task-view">{{task ? task.name : ''}}</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
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