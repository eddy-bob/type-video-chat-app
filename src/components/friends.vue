<script lang="ts" setup>
import { ref, inject, reactive, customRef } from "vue";
import UIcomponent from "../components/UIcomponent/spinner.vue";
import letterGroups from "../mixins/letterGrouping";
import { VueCookieNext } from "vue-cookie-next";
import { notify } from "@kyvg/vue3-notification";
import { useFriend, user, useFriendRequestStore } from "../core/store/index";

// initialize group store
const friendStore = useFriend();
// initialize user store
const userStore = user();

// initialize friend request store
const friendRequestStore = useFriendRequestStore();
// variables
const addFriend = ref(false);
const friends = ref<any[]>([]);
const letterGrouping = ref<any[]>([]);
const loading = ref(false);
const query = ref("");
const users = ref([]);
const searchErr = ref("");
// define get friends method
const getFriends = () => {
  loading.value = true;
  friendStore
    .fetchFriends()
    .then((res) => {
      console.log(res.data.data);
      friends.value = res.data.data;
      // group friends by letters
      letterGroups(friends, letterGrouping, "friendName");
      if (friends.value.length == 0) {
        searchErr.value = "You have no friends yet.";
      }
      loading.value = false;
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
    });
};
// fire get friends
getFriends();
const searchUser = () => {
  if (query.value !== "") {
    loading.value = true;
    userStore
      .fetchUser(query.value)
      .then((res) => {
        users.value = res.data.data;
        if (!users.value[0]) {
          searchErr.value = "Sorry no user matched your search";
        }
        // group friends by letters
        loading.value = false;
      })
      .catch((err) => {
        console.log(err);
        searchErr.value = err.data
          ? err.data.Error
          : "..Oops something went wrong";
        loading.value = false;
      });
  }
};

const sendFriendRequest = (id: string) => {
  friendRequestStore
    .sendFriendRequest(id)
    .then((res) => {
      console.log(res.data.data);
      //   send out notification to tell that friend request send was successful
      notify({
        type: "success",
        title: "Success",
        text: "Friend request sent successfully.",
      });
    })
    .catch((err) => {
      notify({
        type: "error",
        title: "Error",
        text: err.data ? err.data.Error : "Oops something went wrong",
      });
    });
};

const isFriends = (id: string, email: string) => {
  let isFriend;

  if (
    VueCookieNext.getCookie(import.meta.env.VITE_USERDETAILS).customerReg
      .email === email
  ) {
    return (isFriend = "You");
  }

  isFriend = friends.value.find((friend) => {
    return friend.friend === id;
  });
  return isFriend;
};
</script>

<template>
  <div class="space-y-4 text-gray-300 bg-slate-800 border-r border-r-slate-600">
    <div class="px-6 space-y-6">
      <div class="flex justify-between pt-5">
        <p class="font-extrabold text-[22px]">Friends</p>
        <i
          @click="(addFriend = !addFriend), (searchErr = '')"
          class="fas fa-plus border border-gray-300 p-2 rounded-md cursor-pointer"
        ></i>
      </div>
      <!-- add friend section -->
      <!-- search bar -->
      <div v-if="addFriend == true">
        <div
          class="flex border pl-2 rounded-md border-blue-700 focus-within:border-2"
        >
          <input
            type="text"
            v-model="query"
            name="search box"
            class="w-full bg-transparent focus:outline-none outline-none"
            placeholder="Find User ..."
          />
          <div
            class="flex appBgGreen px-2 space-x-1 py-1 rounded-sm cursor-pointer"
            @click="searchUser"
          >
            <p>Search</p>
            <i class="fas fa-search mt-1"></i>
          </div>
        </div>
        <div
          v-if="loading == true"
          class="flex flex-col items-center justify-center h-[300px]"
        >
          <component :is="UIcomponent" />
        </div>
        <!-- search result -->

        <div class="mt-3" v-else>
          <div v-if="users[0]" class="space-y-3">
            <p class="text-sm font-extrabold">
              {{ users.length }} search results :
            </p>
            <div
              v-for="user in users"
              :key="user"
              class="space-y-4 overflow-y-scroll myOverflow max-h-96"
            >
              <div class="flex justify-between">
                <div class="flex space-x-2 chathead">
                  <div>
                    <img
                      :src="
                        user.photo
                          ? user.photo.url
                          : '/images/svg/groupIcon.svg'
                      "
                      alt="img"
                      class="rounded-full w-8 h-8"
                    />
                  </div>
                  <p
                    class="text-[12px] font-extrabold mt-2 cursor-pointer ellipse"
                  >
                    {{ user.firstName }} {{ user.lastName }}
                  </p>
                </div>
                <button
                  @click="sendFriendRequest(user._id)"
                  class="appBgGreen text-xs cursor-pointer font-extrabold rounded-md py-1 px-2"
                  :disabled="
                    isFriends(user._id, user.email) === 'You'
                      ? true
                      : isFriends(user._id, user.email) == true
                      ? true
                      : false
                  "
                >
                  <component v-if="isLoading == true" :is="UIcomponent" />

                  {{
                    typeof isFriends(user._id, user.email) === "undefined"
                      ? "Add Friend"
                      : isFriends(user._id, user.email) === "You"
                      ? "You"
                      : "Friend"
                  }}
                </button>
              </div>
              <!--  -->
            </div>
          </div>
          <div v-else class="mt-7">
            <div v-if="searchErr !== ''">
              <div class="flex w-full justify-center">
                <img src="/images/svg/sadface.svg" alt="" class="w-20" />
              </div>

              <p class="text-sm text-center font-extrabold">
                {{ searchErr }}
              </p>
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
            <div
              class="flex justify-between"
              v-for="singleFriend in letterGroup[Object.keys(letterGroup)[0]]"
              :key="singleFriend._id"
            >
              <div
                class="flex space-x-3 chathead cursor-pointer"
                @click="
                  $router.push({
                    name: 'page.privateChat',
                    params: { userId: singleFriend.friend },
                  })
                "
              >
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
                <p class="text-[12px] font-extrabold mt-2">
                  {{ singleFriend.friendName }}
                </p>
              </div>
              <img src="/images/svg/option.svg" alt="" class="w-2" />
            </div>
          </div>
        </div>
        <div v-else class="mt-7">
          <div class="flex w-full justify-center">
            <img src="/images/svg/sadface.svg" alt="" class="w-20" />
          </div>
          <p class="text-sm text-center font-extrabold">
            {{ searchErr }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chathead {
  padding: 5px 18px 5px 18px;
}
</style>
