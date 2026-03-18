<template>
  <div>
    {{ data.borough }}
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped></style>
