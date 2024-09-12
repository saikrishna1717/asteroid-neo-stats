<template>
  <div class="LineChart bg-white rounded-lg shadow-md mt-6">
    <canvas ref="chartCanvas" class="w-full h-72"></canvas>
  </div>
</template>

<script>
import { Chart } from 'chart.js/auto';

export default {
  props: {
    chartData: Object,
  },
  mounted() {
    console.log('chart data', this.chartData);
    this.renderChart();
  },
  methods: {
    renderChart() {
      new Chart(this.$refs.chartCanvas, {
        type: 'line',
        data: this.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'category',
              title: {
                display: true,
                text: 'Date',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of Asteroids',
              },
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.LineChart {
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow: hidden;
}
</style>
