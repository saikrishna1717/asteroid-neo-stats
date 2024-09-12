<template>
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 p-4">
        <div class="bg-white rounded-lg shadow-lg p-6 w-98 text-center" role="alert">
            <p class="text-gray-800">{{ message }}</p>
            <button @click="close"
                class="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
                OK
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        message: {
            type: String,
            default: "",
        },
    },
    methods: {
        close() {
            this.$emit("close");
        },
    },
};
</script>

<style scoped></style>