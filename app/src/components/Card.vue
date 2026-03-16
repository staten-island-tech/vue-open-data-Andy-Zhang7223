<template>
  <div>
    {{ data.unique_id }}
    {{ data.name }}
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
