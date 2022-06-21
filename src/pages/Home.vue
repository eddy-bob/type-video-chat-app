<script lang="ts" setup>
import { ref, reactive, onMounted, provide } from "vue";
import sideNav from "../components/sideNav.vue";
import appLogout from "../modals/logout.vue";
import createGroup from "../modals/create-group.vue";
import overlay from "../modals/overlay.vue";

const isShowCreateGroup = ref(false);
const isLogout = ref(false);

provide("showCreateGroup", isShowCreateGroup);

provide("showLogout", isLogout);
</script>
<template>
  <div class="flex relative">
    <!-- logout -->
    <div v-if="isLogout == true">
      <component :is="overlay" />
      <component
        :is="appLogout"
        class="absolute top-[30%] left-[50%] z-50 w-auto p-5"
        @close-logout="isLogout = false"
      />
    </div>

    <!-- group create modal -->
    <div v-if="isShowCreateGroup == true">
      <component :is="overlay" />
      <component
        :is="createGroup"
        class="absolute top-[5%] left-[40%] z-50 w-auto p-5"
      />
    </div>

    <!-- side nav -->
    <component :is="sideNav" class="w-[30rem]" />

    <!-- chat -->
    <div class="w-full bg-slate-800">
      <!-- nav -->
      <div
        class="flex px-8 py-4 text-gray-300 justify-between bg-slate-700 fixed w-[74%] top-0"
      >
        <!--  -->
        <div class="flex space-x-4">
          <div class="relative">
            <img
              src="/images/jpg/icon.jpg"
              alt="img"
              class="rounded-full w-12 h-12"
            />
            <p
              class="absolute w-2 h-2 rounded-full bg-green-700 bottom-0 right-2"
            ></p>
          </div>
          <div>
            <p class="font-extrabold text-[16px]">Eddy madu</p>
            <p class="text-xs">Active</p>
          </div>
        </div>
        <!--  -->
        <div class="flex space-x-4">
          <i class="fas fa-search"></i>
          <i class="fas fa-phone-volume"></i>
          <i class="fas fa-video"></i>
        </div>
      </div>
      <!--  -->
      <!-- chats -->
      <div class="px-10 py-10 space-y-5 mt-20">
        <!--  -->
        <div class="flex justify-end space-x-1 text-gray-300 relative w-full">
          <img src="/images/svg/option.svg" alt="" class="w-2 mb-20" />
          <!--chat options -->
          <div
            class="bg-slate-700 p-3 space-y-5 absolute right-[25%] top-[70%] text-sm rounded-lg hidden"
          >
            <div class="flex justify-between">
              <p>Forward</p>
              <img src="" alt="" />
            </div>
            <div class="flex justify-between">
              <p>Copy</p>
              <img src="" alt="" />
            </div>
            <div class="flex justify-between">
              <p>Delete</p>
              <img src="" alt="" />
            </div>
          </div>
          <div class="text-right flex space-x-2">
            <div class="space-y-2">
              <p
                class="bg-slate-500 px-4 py-4 rounded-md w-auto text-sm max-w-[50rem]"
                style="overflow-wrap: break-word"
              >
                hello i am eddy
              </p>
              <div class="flex justify-end space-x-3">
                <div>
                  <img src="/images/svg/check.svg" alt="check" class="w-2" />
                  <img src="/images/svg/check.svg" alt="check" class="w-2" />
                </div>
                <p>12:36pm</p>
                <p class="font-extrabold">You</p>
                <div class="flex-col justify-end flex">
                  <img
                    src="/images/jpg/icon.jpg"
                    alt="img"
                    class="rounded-full w-10 h-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--  -->
        <!--  -->

        <div
          class="flex justify-start space-x-1 text-gray-300 text-sm w-auto max-w-[50rem]"
        >
          <div class="text-left flex space-x-2">
            <div class="space-y-2">
              <p
                class="bg-slate-500 px-4 py-4 rounded-md w-auto max-w-[50rem]"
                style="overflow-wrap: break-word"
              >
                hello eddy
              </p>
              <div class="flex justify-end space-x-3">
                <div class="">
                  <img
                    src="/images/jpg/icon.jpg"
                    alt="img"
                    class="rounded-full w-10 h-10"
                  />
                </div>
                <p class="font-extrabold">Sam</p>
                <p>12:36pm</p>
                <div>
                  <img src="/images/svg/check.svg" alt="check" class="w-2" />
                  <img src="/images/svg/check.svg" alt="check" class="w-2" />
                </div>
              </div>
            </div>
          </div>
          <img src="/images/svg/option.svg" alt="" class="w-2 mb-20" />
          <!--chat options -->
          <div
            class="bg-slate-700 p-3 space-y-5 absolute left-[47%] top-[35%] text-sm rounded-lg hidden"
          >
            <div class="flex justify-between">
              <p>Forward</p>
              <img src="" alt="" />
            </div>
            <div class="flex justify-between">
              <p>Copy</p>
              <img src="" alt="" />
            </div>
            <div class="flex justify-between">
              <p>Delete</p>
              <img src="" alt="" />
            </div>
          </div>
        </div>
        <!--  -->
      </div>
      <!--  -->
      <!-- input field -->
      <div class="fixed bottom-0 w-full my-2 text-gray-200 px-10">
        <div class="flex space-x-3">
          <div class="flex space-x-5">
            <img src="/images/svg/option.svg" alt="" class="w-2" />
            <img
              src="/images/svg/smileyl.svg"
              alt="emoji"
              class="w-6 h-6 mt-2 bg-slate-900 rounded-full"
            />
          </div>

          <input
            type="text"
            name="message"
            class="focus:outline-none outline-none bg-slate-700 py-2 px-3 w-[60%] text-sm"
            placeholder="message here . . ."
          />
          <!--  -->
          <div class="bg-slate-700 p-2 rounded-full">
            <img src="/images/svg/send.svg" alt="send" class="w-[30px]" />
          </div>
        </div>
      </div>
      <!-- end of input -->
    </div>
  </div>
</template>

<style scoped></style>
