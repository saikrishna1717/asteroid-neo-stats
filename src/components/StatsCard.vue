<template>
  <div
    class="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 max-w-full md:max-w-2xl overflow-hidden">
    <img v-if="asteroidData.speed"
      class="object-cover w-full md:w-1/3 h-62 md:h-auto rounded-t-lg md:rounded-none md:rounded-s-lg shrink-0"
      src="../assets/speed.jpg" alt="Speed" />
    <img v-if="asteroidData.distance"
      class="object-cover w-full md:w-1/3 h-62 md:h-auto rounded-t-lg md:rounded-none md:rounded-s-lg shrink-0"
      src="../assets/location.jpg" alt="Closest" />
    <img v-if="asteroidData.size"
      class="object-cover w-full md:w-1/3 h-62 md:h-auto rounded-t-lg md:rounded-none md:rounded-s-lg shrink-0"
      src="../assets/asteroid_size.jpg" alt="Size" />
    <div class="flex flex-col justify-between p-4 leading-normal w-full md:w-2/3">
      <h5
        class="mb-2 text-lg md:text-xl font-bold tracking-tight text-gray-600 dark:text-white overflow-hidden text-ellipsis">
        {{ title }}
      </h5>
      <p class="font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis">
        <span v-if="asteroidData.id">ID: {{ asteroidData.id }}</span>
        <span v-if="asteroidData.size">Size: {{ asteroidData.size }} km</span>
      </p>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis">
        <span v-if="asteroidData.speed">Speed: {{ asteroidData.speed }} km/h</span>
        <span v-if="asteroidData.distance">Distance: {{ asteroidData.distance }} km</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    asteroidData: Object,
  },
};
</script>