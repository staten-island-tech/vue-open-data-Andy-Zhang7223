<template>
  <div>
    <h1>Where To Find Your Best Friends!</h1>
    <li>
      <Card v-for="data in apidata" :key="data.name" :data="data"></Card>
    </li>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chart.js'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
// const apidata = ref([])

// async function getdata() {
//   try {
//     const api = await fetch('https://data.cityofnewyork.us/resource/p937-wjvj.json')
//     const data = await api.json()
//     apidata.value = data
//   } catch (error) {
//     console.log(error)
//   }
// }

// onMounted(() => {
//   getdata()
// })

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March'],
        datasets: [{ data: [40, 20, 12] }],
      },
      chartOptions: {
        responsive: true,
      },
    }
  },
}
// import Chart from 'chart.js/auto'

// ;(async function () {
//   const data = [
//     { year: 2010, count: 10 },
//     { year: 2011, count: 20 },
//     { year: 2012, count: 15 },
//     { year: 2013, count: 25 },
//     { year: 2014, count: 22 },
//     { year: 2015, count: 30 },
//     { year: 2016, count: 28 },
//   ]

//   new Chart(document.getElementById('acquisitions'), {
//     type: 'bar',
//     data: {
//       labels: data.map((row) => row.year),
//       datasets: [
//         {
//           label: 'Acquisitions by year',
//           data: data.map((row) => row.count),
//         },
//       ],
//     },
//   })
// })()
</script>

<style scoped></style>
