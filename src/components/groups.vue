<script setup lang="ts">
import { ref, inject } from "vue";

// define open channel modal func
const showModal = inject<any>("showCreateGroup");

// const openChannelModal = () => {
//   emit("open-group-modal");
// };
</script>

<template>
  <div class="space-y-4 text-gray-300 bg-slate-800 border-r border-r-slate-600">
    <div class="px-6 space-y-6">
      <div class="flex justify-between pt-5">
        <p class="font-extrabold text-[22px]">Channels#</p>
        <i
          class="fas fa-plus border border-gray-300 p-2 rounded-md cursor-pointer"
          @click="showModal = !showModal"
        ></i>
      </div>

      <!--  -->
      <div class="flex border py-1 px-2 rounded-md">
        <input
          type="text"
          name="search box"
          class="w-full bg-transparent focus:outline-none outline-none"
          placeholder="Search Channel ..."
        />
        <i class="fas fa-search mt-1"></i>
      </div>
    </div>
    <!-- chat heads -->
    <div class="px-5 overflow-y-scroll myOverflow max-h-96">
      <!--line  -->

      <div class="flex space-x-4">
        <p>C</p>
        <p class="w-full border-b border-b-gray-500 mb-3"></p>
      </div>
      <div class="flex justify-between">
        <div class="flex space-x-3 chathead">
          <div class="relative">
            <img
              src="/images/svg/groupIcon.svg"
              alt="img"
              class="rounded-full w-8 h-8"
            />
            <p
              class="absolute w-2 h-2 rounded-full bg-green-700 bottom-0 right-1"
            ></p>
          </div>
          <p class="text-[12px] font-extrabold mt-2">C++</p>
        </div>
        <img src="/images/svg/option.svg" alt="" class="w-2" />
      </div>

      <!--line  -->

      <div class="flex space-x-4">
        <p>F</p>
        <p class="w-full border-b border-b-gray-500 mb-3"></p>
      </div>
      <div class="flex justify-between">
        <div class="flex space-x-3 chathead">
          <div class="relative">
            <img
              src="/images/svg/groupIcon.svg"
              alt="img"
              class="rounded-full w-8 h-8"
            />
            <p
              class="absolute w-2 h-2 rounded-full bg-green-700 bottom-0 right-1"
            ></p>
          </div>
          <p class="text-[12px] font-extrabold mt-2">Film Production</p>
        </div>
        <img src="/images/svg/option.svg" alt="" class="w-2" />
      </div>
      <div class="flex justify-between">
        <div class="flex space-x-3 chathead">
          <div class="relative">
            <img
              src="/images/svg/groupIcon.svg"
              alt="img"
              class="rounded-full w-8 h-8"
            />
            <p
              class="absolute w-2 h-2 rounded-full bg-green-700 bottom-0 right-1"
            ></p>
          </div>
          <p class="text-[12px] font-extrabold mt-2">fotocon</p>
        </div>
        <img src="/images/svg/option.svg" alt="" class="w-2" />
      </div>
      <!--  -->
      <div class="flex space-x-4">
        <p>P</p>
        <p class="w-full border-b border-b-gray-500 mb-3"></p>
      </div>
      <div class="flex justify-between">
        <div class="flex space-x-3 chathead">
          <div class="relative">
            <img
              src="/images/svg/groupIcon.svg"
              alt="img"
              class="rounded-full w-8 h-8"
            />
            <p
              class="absolute w-2 h-2 rounded-full bg-green-700 bottom-0 right-1"
            ></p>
          </div>
          <p class="text-[12px] font-extrabold mt-2">Programming</p>
        </div>
        <img src="/images/svg/option.svg" alt="" class="w-2" />
      </div>

      <!--line  -->

      <div class="flex space-x-4">
        <p>S</p>
        <p class="w-full border-b border-b-gray-500 mb-3"></p>
      </div>
      <div class="flex justify-between">
        <div class="flex space-x-3 chathead">
          <div class="relative">
            <img
              src="/images/svg/groupIcon.svg"
              alt="img"
              class="rounded-full w-8 h-8"
            />
            <p
              class="absolute w-2 h-2 rounded-full bg-green-700 bottom-0 right-1"
            ></p>
          </div>
          <p class="text-[12px] font-extrabold mt-2">Software Engineering</p>
        </div>
        <img src="/images/svg/option.svg" alt="" class="w-2" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.chathead {
  padding: 5px 18px 5px 18px;
}
</style>
