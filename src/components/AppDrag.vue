<template>
  <div @dragover.prevent @dragenter.prevent draggable @dragstart.self.stop="startDrag($event)">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    dragData: {
      type: Object,
      required: true
    }
  },
  methods: {
    startDrag(e) {
      const dT = e.dataTransfer;
      dT.dropEffect = "move";
      dT.effectAllowed = "move";
      dT.setData("payload", JSON.stringify(this.dragData));
    }
  }
};
</script>

<style>
</style>