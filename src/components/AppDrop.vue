<template>
  <div @drop.stop="onDrop($event)" @dragover.prevent @dragenter.prevent>
      <slot/>
  </div>
</template>

<script>
export default {
  methods: {
    onDrop(e) {
        const dT = e.dataTransfer;
        const payload = JSON.parse(dT.getData("payload"));
        this.$emit("onDrop", payload);
    }
  }
};
</script>

<style>
</style>