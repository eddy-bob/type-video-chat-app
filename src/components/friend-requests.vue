<script lang="ts" setup></script>

<template>
  <div class="space-y-4 text-gray-300 bg-slate-800 border-r border-r-slate-600">
    <div class="px-6 space-y-6">
      <p class="font-extrabold text-[22px] pt-5">Friend Requests</p>
      <!--  -->
      <div class="flex border py-1 px-2 rounded-md">
        <input
          type="text"
          name="search box"
          class="w-full bg-transparent focus:outline-none outline-none"
          placeholder="Search request ..."
        />
        <i class="fas fa-search mt-1"></i>
      </div>
    </div>
    <!-- request heads -->

    <div class="overflow-y-scroll myOverflow max-h-96 space-y-6">
      <!--  -->
      <div class="flex space-x-3 requesthead border-b mx-4">
        <div class="cursor-pointer">
          <img
            src="/images/jpg/icon.jpg"
            alt="img"
            class="rounded-full w-8 h-8"
          />
        </div>
        <div class="space-y-4 text-[12px] mb-5">
          <p class="font-extrabold">Destiny junior</p>
          <div class="flex space-x-4 text-gray-800">
            <button class="bg-green-500 rounded-md py-2 px-2">Accept</button>
            <button class="bg-red-500 rounded-md py-2 px-2">Reject</button>
          </div>
        </div>
      </div>

      <!--  -->
      <div class="flex space-x-3 requesthead border-b mx-4">
        <div class="cursor-pointer">
          <img
            src="/images/jpg/icon.jpg"
            alt="img"
            class="rounded-full w-8 h-8"
          />
        </div>
        <div class="space-y-4 text-[12px] mb-5">
          <p class="font-extrabold">Destiny junior</p>
          <div class="flex space-x-4 text-gray-800">
            <button class="bg-green-500 rounded-md py-2 px-2">Accept</button>
            <button class="bg-red-500 rounded-md py-2 px-2">Reject</button>
          </div>
        </div>
      </div>

      <!--  -->
      <div class="flex space-x-3 requesthead mx-4">
        <div class="cursor-pointer">
          <img
            src="/images/jpg/icon.jpg"
            alt="img"
            class="rounded-full w-8 h-8"
          />
        </div>
        <div class="space-y-4 text-[12px]">
          <p class="font-extrabold">Destiny junior</p>
          <div class="flex space-x-4 text-gray-800">
            <button class="bg-green-500 rounded-md py-2 px-2">Accept</button>
            <button class="bg-red-500 rounded-md py-2 px-2">Reject</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.requesthead {
  padding: 5px 18px 5px 18px;
}
</style>
