<template>
  <div class="flex flex-col items-start">
    <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
      <p class="flex-shrink-0 text-center sm:text-left mt-2">
        Select a date range to view NEO stats :
      </p>
      <VueDatePicker ref="datePicker" v-model="dateRange" :range="true" :enable-time-picker="false"
        :disabled="isNotificationActive" format="yyyy-MM-dd"
        class="w-full sm:w-auto border-gray-300 rounded-md shadow-sm" :class="{
          'bg-gray-200 cursor-not-allowed text-gray-500': isNotificationActive,
        }" />
      <button @click="submitDates"
        class="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition">
        Submit
      </button>
    </div>

    <Notification :visible="showAlert" :message="alertMessage" @close="closeNotification" />
  </div>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";
import Notification from "./Notification.vue";

export default {
  components: {
    VueDatePicker,
    Notification,
  },
  data() {
    return {
      dateRange: [],
      alertMessage: "",
      showAlert: false,
      isNotificationActive: false,
    };
  },
  methods: {
    submitDates() {
      this.isNotificationActive = false;

      if (!this.dateRange || this.dateRange.length < 2) {
        this.showAlertNotification("Please select a complete date range.");
        this.$emit("clear-data");
        return;
      }

      const [startDate, endDate] = this.dateRange;

      // Check if the date range is more than 7 days
      const start = moment(startDate);
      const end = moment(endDate);
      const duration = end.diff(start, "days");

      if (duration > 7) {
        this.showAlertNotification("The selected date range cannot be more than 7 days.");
        this.$emit("clear-data");
        return;
      }

      const formattedStartDate = moment(startDate).format("YYYY-MM-DD");
      const formattedEndDate = moment(endDate).format("YYYY-MM-DD");
      this.$emit("submit-dates", { startDate: formattedStartDate, endDate: formattedEndDate });
    },
    showAlertNotification(message) {
      this.alertMessage = message;
      this.showAlert = true;
      this.isNotificationActive = true;
    },
    closeNotification() {
      this.showAlert = false;
      this.isNotificationActive = false;
    },
  },
};
</script>

<style scoped></style>
