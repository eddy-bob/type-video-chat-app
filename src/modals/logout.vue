<script setup lang="ts">
import { ref } from "vue";
const emit = defineEmits<{ (e: "close-logout"): void }>();
</script>

<template>
  <div
    class="space-y-3 bg-slate-800 text-gray-300 rounded-md shadow shadow-gray-300"
  >
    <p class="font-extrabold">Are you sure you want to signout?</p>
    <div class="flex text-sm font-extrabold justify-between text-gray-300">
      <button
        class="px-3 py-2 confirm rounded-md"
        @click="emit('close-logout')"
      >
        Confirm
      </button>
      <button class="px-3 py-2 cancel rounded-md" @click="emit('close-logout')">
        Cancel
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
