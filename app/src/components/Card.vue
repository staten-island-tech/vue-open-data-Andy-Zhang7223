<template>
  <router-link :to="Path" class="card">
    {{ data.job_id }}
    <h2>{{ id }}</h2>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';
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
