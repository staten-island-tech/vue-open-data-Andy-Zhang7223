<template>
  <div>
    <h2>{{ data.name }}</h2>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
//Park Trails :D :
// https://data.cityofnewyork.us/resource/vjbm-hsyr.json

//Air quality:
//https://data.cityofnewyork.us/resource/c3uy-2p5r.json
const apidata = ref([])
const route = useRoute()

async function getdata() {
  try {
    const api = await fetch('https://data.cityofnewyork.us/resource/c3uy-2p5r.json')
    const data = await api.json()
    apidata.value = data
  } catch (error) {
    console.log(error)
  }
}

watch(
  () => route.params.id,
  function () {
    getdata()
  },
)

onMounted(function () {
  getdata(route.params.id)
})
</script>

<style scoped></style>
