<template>
  <div>
    <h1>Where To Find Your Best Friends!</h1>
    <h2>This Website Will Show You Where it is Most Likely To Find Rats(Cuz Why Not)</h2>
    <div>
      <Card v-for="Borough in Boroughs" :key="Borough.name" :Boroughs="Borough.data"/>
    </div>
    <Pie class="chart" id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script setup>
import Card from '@/components/Card.vue'
import { ref, onMounted } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

const apidata = ref([])

ChartJS.register(Title, Tooltip, Legend, ArcElement)

let Passed = ref(0)
let FailedforRatAct = ref(0)
let FailedforOtherR = ref(0)
let RatActivity = ref(0)

let Boroughs = ref([])

const chartData = ref({
  labels: ['Passed', 'Failed for Rat Act', 'Failed for Other R', 'Rat Activity'],
  datasets: [
    {
      label: 'Counts',
      data: [Passed.value, FailedforRatAct.value, FailedforOtherR.value, RatActivity.value],
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
    },
  ],
})

const chartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Rat Activity In NYC',
      padding: {
        top: 10,
        bottom: 10,
      },
    },
  },
}

async function getdata() {
  try {
    const api = await fetch('https://data.cityofnewyork.us/resource/p937-wjvj.json')
    const data = await api.json()
    apidata.value = data

    apidata.value.forEach((item) => {
      const result = item.result?.toLowerCase().replace(/\s+/g, '')
      if (result === 'passed') {
        Passed.value++
      } else if (result.includes('rat') && result.includes('fail')) {
        FailedforRatAct.value++
      } else if (result.includes('other') && result.includes('fail')) {
        FailedforOtherR.value++
      } else {
        RatActivity.value++
      }
    })

    const test = [...new Set(apidata.value.map((i) => i.borough))]

    Boroughs.value = test.map((b) => ({
      name: b,
      data: apidata.value.filter((i) => i.borough === b)
    }))

    chartData.value = {
      labels: chartData.value.labels,
      datasets: [
        {
          label: 'Counts',
          data: [Passed.value, FailedforRatAct.value, FailedforOtherR.value, RatActivity.value],
          backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
        },
      ],
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getdata()
})
</script>

<style scoped></style>
