<script lang="ts" setup></script>

<template>
  <div class="space-y-4 text-gray-300">
    <div class="px-6 space-y-6">
      <p class="font-extrabold text-[22px] pt-5">Recent chats</p>
      <!--  -->
      <div class="flex border py-1 px-2 rounded-md">
        <input
          type="text"
          name="search box"
          class="w-full bg-transparent focus:outline-none outline-none"
          placeholder="Search Recent Chat ..."
        />
        <i class="fas fa-search mt-1"></i>
      </div>
    </div>
    <!-- chat heads -->
    <div class="">
      <!--  -->
      <div class="flex space-x-3 chathead">
        <div class="relative">
          <img
            src="/images/jpg/icon.jpg"
            alt="img"
            class="rounded-full w-8 h-8"
          />
          <p
            class="absolute w-2 h-2 rounded-full bg-green-700 bottom-0 right-1"
          ></p>
        </div>
        <p class="text-[12px] font-extrabold mt-2">Destiny junior</p>
      </div>
      <!--  -->
      <div class="flex space-x-3 chathead">
        <div class="relative">
          <img
            src="/images/jpg/icon.jpg"
            alt="img"
            class="rounded-full w-8 h-8"
          />
          <p
            class="absolute w-2 h-2 rounded-full bg-green-700 bottom-0 right-1"
          ></p>
        </div>
        <p class="text-[12px] font-extrabold mt-2">Kingsley madu</p>
      </div>
      <!--  -->
      <div class="flex space-x-3 chathead">
        <div class="relative">
          <img
            src="/images/jpg/icon.jpg"
            alt="img"
            class="rounded-full w-8 h-8"
          />
          <p
            class="absolute w-2 h-2 rounded-full bg-green-700 bottom-0 right-1"
          ></p>
        </div>
        <p class="text-[12px] font-extrabold mt-2">Destiny junior</p>
      </div>
    </div>

    <!-- group chats -->
    <div class="px-6 space-y-6">
      <p class="font-extrabold text-[22px] pt-5">Recent group chats</p>

      <!-- group chat heads -->
      <div class="space-y-4">
        <!--  -->
        <div class="flex space-x-3">
          <div class="relative">
            <img
              src="/images/svg/groupIcon.svg"
              alt="img"
              class="rounded-full w-8 h-8"
            />
          </div>
          <p class="text-[12px] font-extrabold mt-2">
            php Channel <span class="px-2">#</span>
          </p>
        </div>
        <!--  -->
        <div class="flex space-x-3">
          <div class="relative">
            <img
              src="/images/svg/groupIcon.svg"
              alt="img"
              class="rounded-full w-8 h-8"
            />
          </div>
          <p class="text-[12px] font-extrabold mt-2">
            Javascript Channel <span class="px-2">#</span>
          </p>
        </div>
        <!--  -->
        <div class="flex space-x-3">
          <div class="relative">
            <img
              src="/images/svg/groupIcon.svg"
              alt="img"
              class="rounded-full w-8 h-8"
            />
          </div>
          <p class="text-[12px] font-extrabold mt-2">
            Fotocontest Channel <span class="px-2">#</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chathead:first-child {
  background-color: rgb(36, 154, 36);
}
.chathead {
  padding: 5px 18px 5px 18px;
}
</style>
