<template>
  <router-link :to="Path" class="card">
    {{ data.job_id }}
    {{ data.location }}
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
})
const Path = computed(() => {
  return `/test/${props.data.job_id}`
})
</script>

<style scoped></style>
