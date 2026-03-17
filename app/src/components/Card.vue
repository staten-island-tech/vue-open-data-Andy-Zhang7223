<template>
  <div>
    {{ data.result }}
    {{ data.location }}
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
