<script setup lang="ts">
import { ref } from "vue";
const prop = defineProps<{ image: ArrayBuffer }>();
const emit = defineEmits<{
  (e: "close-preview"): void;
  (e: "choose-image", chossen: string): void;
}>();
</script>

<template>
  <div
    class="bg-slate-900 left-[25%] right-[25%] top-[4%] h-[80%] rounded-md p-2 text-gray-300 space-y-3"
  >
    <p class="text-right cursor-pointer" @click="emit('close-preview')">X</p>
    <div class="flex justify-center h-[80%]">
      <img :src="prop.image" alt="" class="w-[70%] h-full" />
    </div>
    <!--  -->
    <div class="w-full flex justify-center">
      <button
        class="appBgGreen text-sm font-extrabold py-3 px-5"
        @click="emit('choose-image'), emit('close-preview')"
      >
        choose image
      </button>
    </div>
  </div>
</template>

<style></style>
