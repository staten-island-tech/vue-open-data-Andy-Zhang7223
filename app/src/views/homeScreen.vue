<template>
  <div>
    <Card v-for="data in apidata" :key="data.name" :data="data"></Card>
  </div>
</template>

<script setup>
import Card from '@/components/Card.vue'
import { ref, onMounted } from 'vue'
const apidata = ref([])

async function getdata() {
  try {
    const api = await fetch('https://data.cityofnewyork.us/resource/c3uy-2p5r.json')
    const data = await api.json()
    apidata.value = data
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getdata()
})
</script>

<style scoped></style>
