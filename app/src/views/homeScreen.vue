<template>
  <div>
    <h1>Where To Find Your Best Friends!</h1>
    <li>
      <Card v-for="data in apidata" :key="data.name" :data="data"></Card>
    </li>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script setup>
import Card from '@/components/Card.vue'
import { ref, onMounted } from 'vue'
import { Chart } from 'chart.js'
const apidata = ref([])

async function getdata() {
  try {
    const api = await fetch('https://data.cityofnewyork.us/resource/p937-wjvj.json')
    const data = await api.json()
    apidata.value = data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getdata()
})

const ctx = document.getElementById('myChart')

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: '',
      data: [],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
})
</script>

<style scoped></style>
