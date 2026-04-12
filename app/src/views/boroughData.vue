<template>
  <div>
    <a href="/">Back to The Home Screen?</a>
  </div>
  <div>
    <Card v-for="borough in Boroughs" :key="borough.name" :Borough="borough" />
  </div>
  <div>
    <Bar class="chart" id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script setup>
import Card from '@/components/Card.vue'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

const route = useRoute()

const apidata = ref([])

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

let Passed = ref(0)
let FailedforRatAct = ref(0)
let FailedforOtherR = ref(0)
let RatActivity = ref(0)

let Boroughs = ref([])

let DataforSpecificBorough = ref([])

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
      text: 'Rat Activity In This Perticular Borough',
      padding: {
        top: 10,
        bottom: 10,
      },
    },
  },
}

async function getdata(Borough) {
  try {
    Passed.value = 0
    FailedforRatAct.value = 0
    FailedforOtherR.value = 0
    RatActivity.value = 0
    DataforSpecificBorough.value = []
    const api = await fetch('https://data.cityofnewyork.us/resource/p937-wjvj.json')
    const data = await api.json()
    apidata.value = data

    apidata.value.forEach((item) => {
      const borough = item.borough?.toLowerCase().replace(/\s+/g, '')
      if (borough === Borough.toLowerCase().replace(/\s+/g, '')) {
        DataforSpecificBorough.value.push(item)
      }
    })

    DataforSpecificBorough.value.forEach((item) => {
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
      data: apidata.value.filter((i) => i.borough === b),
    }))

    chartData.value = {
      labels: chartData.value.labels,
      datasets: [
        {
          label: '# of Results',
          data: [Passed.value, FailedforRatAct.value, FailedforOtherR.value, RatActivity.value],
          backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
        },
      ],
    }
  } catch (error) {
    console.log(error)
  }
}

watch(
  () => route.params.Borough,
  function (Borough) {
    getdata(Borough)
  },
)

onMounted(function () {
  getdata(route.params.Borough)
})
</script>

<style scoped></style>
