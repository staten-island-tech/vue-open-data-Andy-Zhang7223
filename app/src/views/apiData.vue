<template>
  <div>{{ apidata }}</div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const apidata = ref([])
const route = useRoute()

async function getdata() {
  try {
    const api = await fetch(`https://data.cityofnewyork.us/resource/p937-wjvj.json/`)
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
