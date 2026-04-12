<template>
  <router-link :to="linkPath">
    <h2>{{ Borough.name }}</h2>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  Borough: {
    type: Object,
    required: true,
  },
})

const linkPath = computed(() => {
  return `/link/${props.Borough.name}`
})
</script>

<style scoped></style>
