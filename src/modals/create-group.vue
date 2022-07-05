<script setup lang="ts">
import { ref, inject, reactive } from "vue";
import preview from "../modals/preview-image.vue";
import { useGroupStore } from "../core/store/index";
// initialize group store
const groupStore = useGroupStore();
// variables
const createGroupInfo = reactive({});
// create group function
const createGroupMethod = () => {
  groupStore.createGroup;
};
const showFriends = ref(false);
const showModal: any = inject("showCreateGroup");
</script>

<template>
  <div class="bg-slate-800 shadow shadow-gray-300 text-gray-300 rounded-md">
    <div class="flex justify-between border-b pb-4">
      <p class="font-extrabold text-[19px]">create channel</p>
      <p
        class="font-extrabold text-[22px] cursor-pointer"
        @click="showModal = !showModal"
      >
        x
      </p>
    </div>
    <div>
      <!--  -->
      <div class="space-y-2">
        <p class="font-extrabold text-[16px] pt-5">Name</p>
        <input
          type="text"
          name="group-name"
          placeholder="Enter Group Name"
          class="w-full bg-transparent border focus:outline-none outline-none py-1 px-2 rounded-md"
        />
      </div>
      <!--  -->
      <div>
        <div class="space-y-3">
          <div class="flex justify-between pt-3">
            <p class="font-extrabold text-[16px]">Add members</p>
            <i
              v-if="showFriends == false"
              class="fas fa-chevron-down cursor-pointer mt-2"
              @click="showFriends = true"
            ></i>
            <i
              v-else
              class="fas fa-chevron-up cursor-pointer mt-2"
              @click="showFriends = false"
            ></i>
          </div>
          <div
            class="overflow-y-scroll myOverflow h-40 relative"
            v-if="showFriends == true"
          >
            <div class="px-6">
              <!--  -->
              <div
                class="flex border py-1 px-2 rounded-md fixed w-[31%] top-[35%] z-50 bg-gray-500"
              >
                <input
                  type="text"
                  name="search box"
                  class="w-full bg-transparent focus:outline-none outline-none text-gray-900"
                  placeholder="Search Friend ..."
                />
                <i class="fas fa-search mt-1"></i>
              </div>
            </div>
            <!-- chat heads -->
            <div class="px-5 mt-6">
              <!--line  -->
              <div class="flex space-x-4">
                <p>A</p>
                <p class="w-full border-b border-b-gray-500 mb-3"></p>
              </div>
              <div class="flex justify-between">
                <label class="text-[12px] font-extrabold mt-2 container">
                  <div class="flex space-x-3">
                    <div>
                      <img
                        src="/images/jpg/icon.jpg"
                        alt="img"
                        class="rounded-full w-8 h-8"
                      />
                    </div>
                    <p>Abdul Daniel</p>
                  </div>

                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
              </div>

              <!--line  -->

              <div class="flex space-x-4">
                <p>K</p>
                <p class="w-full border-b border-b-gray-500 mb-3"></p>
              </div>
              <div class="flex justify-between">
                <label class="text-[12px] font-extrabold mt-2 container">
                  <div class="flex space-x-3">
                    <div>
                      <img
                        src="/images/jpg/icon.jpg"
                        alt="img"
                        class="rounded-full w-8 h-8"
                      />
                    </div>
                    <p>Kingsley Madu</p>
                  </div>

                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
              </div>

              <!--  -->
              <!--line  -->

              <div class="flex space-x-4">
                <p>M</p>
                <p class="w-full border-b border-b-gray-500 mb-3"></p>
              </div>
              <div class="flex justify-between">
                <label class="text-[12px] font-extrabold mt-2 container">
                  <div class="flex space-x-3">
                    <div>
                      <img
                        src="/images/jpg/icon.jpg"
                        alt="img"
                        class="rounded-full w-8 h-8"
                      />
                    </div>
                    <p>Muftar Kamilu</p>
                  </div>

                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="space-y-3">
        <p class="font-extrabold text-[16px] pt-5">Description</p>
        <textarea
          name="description"
          id=""
          cols="40"
          rows="2"
          class="bg-transparent border px-1 rounded-md"
        ></textarea>
      </div>
      <!--  -->
      <div class="pt-3">
        <button
          class="w-full font-extrabold text-sm py-2 rounded-sm bg-blue-800"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
