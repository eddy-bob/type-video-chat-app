<script lang="ts" setup>
import { ref, inject, reactive } from "vue";
import letterGroups from "../mixins/letterGrouping";
import { useFriend } from "../core/store/index";

// initialize group store
const friendStore = useFriend();
// variables
const addFriend = ref(false);
const friends = ref<any[]>([]);
const letterGrouping = ref<any[]>([]);
const loading = ref(false);
// define get friends method
const getFriends = () => {
  loading.value = true;
  friendStore
    .fetchFriends()
    .then((res) => {
      console.log(res.data.data);
      friends.value = res.data.data;
      // group friends by letters
      letterGroups(friends, letterGrouping);
      loading.value = false;
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
    });
};
// fire get friends
getFriends();
</script>

<template>
  <div class="space-y-4 text-gray-300 bg-slate-800 border-r border-r-slate-600">
    <div class="px-6 space-y-6">
      <div class="flex justify-between pt-5">
        <p class="font-extrabold text-[22px]">Friends</p>
        <i
          @click="addFriend = !addFriend"
          class="fas fa-plus border border-gray-300 p-2 rounded-md cursor-pointer"
        ></i>
      </div>
      <!-- add friend section -->
      <!-- search bar -->
      <div v-if="addFriend == true">
        <div
          class="flex border py-1 px-2 rounded-md border-blue-700 focus-within:border-2"
        >
          <input
            type="text"
            value="Abdul "
            name="search box"
            class="w-full bg-transparent focus:outline-none outline-none"
            placeholder="Find User ..."
          />
          <i class="fas fa-search mt-1"></i>
        </div>
        <!-- search result -->
        <div class="space-y-3 mt-3">
          <p class="text-sm font-extrabold">3 search results :</p>
          <div class="space-y-4 overflow-y-scroll myOverflow max-h-96">
            <div class="flex justify-between">
              <div class="flex space-x-2 chathead">
                <div>
                  <img
                    src="/images/jpg/icon.jpg"
                    alt="img"
                    class="rounded-full w-8 h-8"
                  />
                </div>
                <p
                  class="text-[12px] font-extrabold mt-2 cursor-pointer ellipse"
                >
                  Abdul Daniel
                </p>
              </div>
              <button
                class="appBgGreen text-xs cursor-pointer font-extrabold rounded-md py-1 px-2"
              >
                Add friend
              </button>
            </div>
            <!--  -->
            <div class="flex justify-between">
              <div class="flex space-x-2 chathead">
                <div>
                  <img
                    src="/images/jpg/icon.jpg"
                    alt="img"
                    class="rounded-full w-8 h-8"
                  />
                </div>
                <p
                  class="text-[12px] font-extrabold mt-2 cursor-pointer ellipse"
                >
                  Abdulzamani Regha
                </p>
              </div>
              <button
                class="appBgGreen text-xs cursor-pointer font-extrabold rounded-md py-1 px-2"
              >
                Friends
              </button>
            </div>
            <!--  -->
            <div class="flex justify-between">
              <div class="flex space-x-2 chathead">
                <div>
                  <img
                    src="/images/jpg/icon.jpg"
                    alt="img"
                    class="rounded-full w-8 h-8"
                  />
                </div>
                <p
                  class="text-[12px] font-extrabold mt-2 cursor-pointer ellipse"
                >
                  Abdulmuftar Toyosi
                </p>
              </div>
              <button
                class="appBgGreen text-xs cursor-pointer font-extrabold rounded-md py-1 px-2"
              >
                Add friend
              </button>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="flex border py-1 px-2 rounded-md" v-if="addFriend == false">
        <input
          type="text"
          name="search box"
          class="w-full bg-transparent focus:outline-none outline-none"
          placeholder="Search Friend ..."
        />
        <i class="fas fa-search mt-1"></i>
      </div>
    </div>
    <!-- chat heads -->
    <div
      class="px-5 overflow-y-scroll myOverflow max-h-96"
      v-if="addFriend == false"
    >
      <!--line  -->

      <div
        v-if="loading == true"
        class="flex flex-col items-center justify-center h-[300px]"
      >
        <component :is="UIcomponent" />
      </div>
      <div v-else>
        <div v-if="friends[0]">
          <div v-for="letterGroup in letterGrouping" :key="letterGroup">
          <div class="flex space-x-4">
            <p>{{ Object.keys(letterGroup)[0].toUpperCase() }}</p>
            <p class="w-full border-b border-b-gray-500 mb-3"></p>
          </div>
          <div class="flex justify-between"  v-for="singleFriend in letterGroup[Object.keys(letterGroup)[0]]"
            :key="singleFriend._id">
            <div class="flex space-x-3 chathead">
              <div>
                <img
                  :src="
                    singleFriend.photo
                      ? singleFriend.photo.url
                      : '/images/svg/groupIcon.svg'
                  "
                  alt="img"
                  class="rounded-full w-8 h-8"
                />
                <p
                  class="absolute w-2 h-2 rounded-full bg-green-700 bottom-0 right-1"
                ></p>
              </div>
              <p class="text-[12px] font-extrabold mt-2">{{singleFriend.friendName}}</p>
            </div>
            <img src="/images/svg/option.svg" alt="" class="w-2" />
          </div>
        </div>

          <!--line  -->

          <!-- <div class="flex space-x-4">
            <p>D</p>
            <p class="w-full border-b border-b-gray-500 mb-3"></p>
          </div>
          <div class="flex justify-between">
            <div class="flex space-x-3 chathead">
              <div>
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
            <img src="/images/svg/option.svg" alt="" class="w-2" />
          </div> -->

          <!--  -->
          <!--line  -->

          <!-- <div class="flex space-x-4">
            <p>K</p>
            <p class="w-full border-b border-b-gray-500 mb-3"></p>
          </div>
          <div class="flex justify-between">
            <div class="flex space-x-3 chathead">
              <div>
                <img
                  src="/images/jpg/icon.jpg"
                  alt="img"
                  class="rounded-full w-8 h-8"
                />
                <p
                  class="absolute w-2 h-2 rounded-full bg-green-700 bottom-0 right-1"
                ></p>
              </div>
              <p class="text-[12px] font-extrabold mt-2">Kingsley Madu</p>
            </div>
            <img src="/images/svg/option.svg" alt="" class="w-2" />
          </div>
        </div>
      </div> -->
    </div>
    <div v-else class="mt-7">
      <div class="flex w-full justify-center">
        <img src="/images/svg/sadface.svg" alt="" class="w-20" />
      </div>
      <p class="text-sm text-center font-extrabold">
        oops... you do not have any friend yet<br class="mb-1" />
      </p>
    </div>
  </div>
</template>

<style scoped>
.chathead {
  padding: 5px 18px 5px 18px;
}
</style>
