<script setup lang="ts">
import { ref, inject } from "vue";
import letterGroups from "../mixins/letterGrouping";
import { useGroupStore } from "../core/store/index";
import { useRouter } from "vue-router";
import UIcomponent from "../components/UIcomponent/spinner.vue";
import moment from "moment";
// define open channel modal func
// initialize route
const router = useRouter();
const showModal = inject("showCreateGroup");

const singleGroupId = ref<string>();

// initialize store
const store = useGroupStore();
const loading = ref(false);
const groups = ref([]);
const letterGrouping = ref<any[]>([]);
// fetch all group user belongs to

const getActiveGroup = () => {
  loading.value = true;

  store
    .getGroups()
    .then((res) => {
      groups.value = res.data.data;
      console.log(res.data.data);
      // group groups by letters

      letterGroups(groups, letterGrouping, "name");
      console.log(letterGrouping.value);

      loading.value = false;
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
    });
};
// initialize fetch group
getActiveGroup();
// pass groupId to the home chat page
const fetchGroupChat = (id: string) => {
  singleGroupId!.value = id;
};
</script>

<template>
  <div class="space-y-4 text-gray-300 w-full bg-slate-800 border-r border-r-slate-600">
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
    <div
      v-if="loading == true"
      class="flex flex-col items-center justify-center h-[300px]"
    >
      <component :is="UIcomponent" />
    </div>
    <div v-else class="px-5 overflow-y-scroll myOverflow max-h-96">
      <!--line  -->

      <div
        v-if="!groups[0]"
        class="space-y-4 flex flex-col items-center justify-center h-[300px]"
      >
        <p class="text-sm text-center font-extrabold">
          you do not belong to any channel at the moment<br class="mb-1" />
          Click on the button below to create your first group
        </p>
        <div class="flex justify-center">
          <i
            class="fas fa-plus border border-gray-300 p-2 rounded-md cursor-pointer"
            @click="showModal = !showModal"
          ></i>
        </div>
      </div>
      <div v-else>
        <div v-for="letterGroup in letterGrouping" :key="letterGroup">
          <div class="flex space-x-4">
            <p>{{ Object.keys(letterGroup)[0].toUpperCase() }}</p>
            <p class="w-full border-b border-b-gray-500 mb-3"></p>
          </div>

          <div
            class="flex justify-between"
            v-for="singleGroup in letterGroup[Object.keys(letterGroup)[0]]"
            :key="singleGroup._id"
          >
            <div
              class="flex space-x-3 chathead cursor-pointer"
              @click="
                $router.push({
                  name: 'page.GroupChat',
                  params: { groupId: singleGroup._id },
                })
              "
            >
              <div class="relative">
                <img
                  :src="
                    singleGroup.photo
                      ? singleGroup.photo.url
                      : '/images/jpeg/noImg.jpeg'
                  "
                  alt="img"
                  class="rounded-full w-8 h-8"
                />
              </div>
              <p class="text-[12px] font-extrabold mt-2">
                {{ singleGroup.name }}
              </p>
            </div>
            <img src="/images/svg/option.svg" alt="" class="w-2" />
          </div>
        </div>
        <!--  -->
      </div>
      <!-- <div class="flex space-x-4">
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
      </div> -->

      <!--line  -->
      <!-- 
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
      </div> -->
      <!-- <div class="flex justify-between">
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
      </div>   <div class="flex space-x-4">
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
      </div> -->
      <!--  -->
      <!-- <div class="flex space-x-4">
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
      </div> -->

      <!--line  -->

      <!-- <div class="flex space-x-4">
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
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.chathead {
  padding: 5px 18px 5px 18px;
}
</style>
