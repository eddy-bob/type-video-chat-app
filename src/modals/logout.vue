<script setup lang="ts">
import { ref } from "vue";
const emit = defineEmits<{ (e: "close-logout"): void }>();
</script>

<template>
  <div
    class="space-y-3 bg-slate-600 text-gray-300 rounded-md shadow shadow-gray-300"
  >
    <p class="font-extrabold">Are you sue you want to signout?</p>
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
.cancel {
  background-color: rgb(160, 16, 16);
}
.confirm {
  background-color: rgb(36, 154, 36);
}
</style>
