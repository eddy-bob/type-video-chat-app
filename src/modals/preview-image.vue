<script setup lang="ts">
import { ref, inject } from "vue";
const prop = defineProps<{ image: any }>();

const emit = defineEmits<{
  (e: "close-preview"): void;
  (e: "choose-image"): void;
}>();
const chooseAndClose = () => {
  emit("choose-image"), emit("close-preview");
};

// methods
const submitPhoto = () => {
  chooseAndClose();
  showSide!.value = true;
};
// inject and provide
const showSide = inject<{ value: boolean }>("showSide");
</script>

<template>
  <div
    class="bg-slate-900 lg:left-[25%] lg:right-[25%] lg:top-[4%] top-[9%] lg:h-[80%] lg:m-0 m-4 h-1/2 rounded-md lg:p-2 lg-pb-0 pb-5 text-gray-300 space-y-3"
  >
    <p class="text-right cursor-pointer p-1" @click="emit('close-preview')">
      X
    </p>
    <div class="flex justify-center h-[80%]">
      <img :src="prop.image" alt="" class="w-[70%] h-full" />
    </div>
    <!--  -->
    <div class="w-full flex justify-center">
      <button
        class="appBgGreen text-sm font-extrabold py-3 px-5"
        @click="submitPhoto"
      >
        choose image
      </button>
    </div>
  </div>
</template>

<style></style>
