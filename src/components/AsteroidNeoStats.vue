<template>
  <nav class="bg-white shadow-md flex items-center p-4">
    <!-- Logo -->
    <a href="/" class="flex items-center">
      <img src="../assets/asteroidLogo.png" alt="Logo" class="w-8 h-8 mr-2" />
      <p class="text-2xl font-bold text-blue-600">Asteroid NEO Stats</p>
    </a>
  </nav>

  <div class="px-10 py-6">
    <!-- Date Range Picker -->
    <h2 class="text-lg font-semibold mb-2 text-gray-800">NEO Feed</h2>
    <DatePicker @submit-dates="fetchData" @clear-data="clearData"/>

    <!-- Fastest, Closest, Average Asteroid -->
    <h2 v-if="stats" class="mt-6 text-lg font-semibold text-gray-800">Date range : {{ formatDate(start_date) }} to {{ formatDate(end_date) }}
    </h2>
    <div v-if="stats" class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
      <StatsCard title="Fastest Asteroid" :asteroidData="stats.fastest" />
      <StatsCard title="Closest Asteroid" :asteroidData="stats.closest" />
      <StatsCard title="Average Asteroid Size" :asteroidData="stats.averageSize" />
    </div>

    <!-- No Of Asteroids Chart -->
    <h2 v-if="chartData" class="mt-6 text-lg font-semibold text-gray-800">Total number of asteroids each day</h2>
    <AsteroidChart v-if="chartData" :chartData="chartData" class="mt-2" />

    <Spinner v-if="loading" />
  </div>

</template>

<script>
import api from '../services/api';
import DatePicker from './DatePicker.vue';
import StatsCard from './StatsCard.vue';
import AsteroidChart from './AsteroidChart.vue';
import Spinner from './Spinner.vue';
import moment from "moment";

export default {
  components: {
    DatePicker,
    StatsCard,
    AsteroidChart,
    Spinner
  },
  data() {
    return {
      stats: null,
      chartData: null,
      loading: false,
      start_date: '',
      end_date: ''
    };
  },
  methods: {
    async fetchData(dates) {
      this.stats = null;
      this.chartData = null;
      this.loading = true;
      this.start_date = dates.startDate;
      this.end_date = dates.endDate

      try {
        const data = await api.fetchNeoData(dates.startDate, dates.endDate);
        this.calculateStats(data.near_earth_objects);
        this.prepareChartData(data.near_earth_objects);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },
    calculateStats(neoData) {
      this.stats = {
        fastest: {
          id: '',
          speed: ''
        },
        closest: {
          id: '',
          distance: ''
        },
        averageSize: {
          size: ''
        },
      };

      let totalDiameter = 0;
      let count = 0;

      for (const date in neoData) {
        if (neoData.hasOwnProperty(date)) {
          neoData[date].forEach(asteroid => {
            // Calculate speed in km/h
            const velocityKmh = parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour);

            // Check for the fastest asteroid
            if (this.stats.fastest.speed === '' || velocityKmh > parseFloat(this.stats.fastest.speed)) {
              this.stats.fastest.id = asteroid.id;
              this.stats.fastest.speed = velocityKmh.toFixed(2);
            }

            // Check for the closest asteroid
            const distanceKm = parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers);
            if (this.stats.closest.distance === '' || distanceKm < parseFloat(this.stats.closest.distance)) {
              this.stats.closest.id = asteroid.id;
              this.stats.closest.distance = distanceKm.toFixed(2);
            }

            // Calculate the average size
            const minDiameter = parseFloat(asteroid.estimated_diameter.kilometers.estimated_diameter_min);
            const maxDiameter = parseFloat(asteroid.estimated_diameter.kilometers.estimated_diameter_max);
            totalDiameter += (minDiameter + maxDiameter) / 2;
            count++;
          });
        }
      }

      // Compute the average size
      if (count > 0) {
        this.stats.averageSize.size = (totalDiameter / count).toFixed(2);
      }
    },
    prepareChartData(neoData) {
      // Extracting the date labels and counting asteroids per date
      const labels = Object.keys(neoData);
      const data = labels.map((date) => neoData[date].length);

      // Setting up chart data structure
      this.chartData = {
        labels,
        datasets: [
          {
            label: "No of Asteroids",
            data,
            borderColor: "#4f46e5",
            backgroundColor: "rgba(79, 70, 229, 0.2)",
          },
        ],
      };
    },
    clearData(){
      this.stats = null;
      this.chartData = null;
    },
    formatDate(date){
      return moment(date).format("DD-MMM-YYYY")
    }
  },
};
</script>

<style scoped></style>
