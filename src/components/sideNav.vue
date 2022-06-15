<script setup lang="ts">
import { ref, reactive, shallowRef } from "vue";
import friends from "../components/friends.vue";
import groups from "../components/groups.vue";
import friendRequests from "../components/friend-requests.vue";
import peopleYouMayKnow from "../components/people-you-may-know.vue";
import recentChats from "../components/recent-chats.vue";
const active = shallowRef(recentChats);
const Show = (id: string) => {
  const ele = (document.getElementById(id)!.style.display = "block");
};
const Hide = (id: string) => {
  document.getElementById(id)!.style.display = "none";
};
</script>
<template>
  <div class="flex">
    <div
      class="px-6 pt-20 bg-slate-600 min-h-screen h-auto space-y-12 text-white"
    >
      <!--  -->
      <div class="relative flex cursor-pointer">
        <i
          @click="active = recentChats"
          class="fas fa-comment fa-xl"
          @mouseenter="Show('recentChats')"
          @mouseleave="Hide('recentChats')"
        ></i>

        <p
          id="recentChats"
          class="absolute ]z-50 left-5 hidden bg-gray-800 py-2 px-3"
        >
          chats
        </p>
      </div>
      <!--  -->
      <div class="relative flex cursor-pointer">
        <i
          class="fas fa-user-friends fa-xl"
          @click="active = friends"
          @mouseenter="Show('friends')"
          @mouseleave="Hide('friends')"
        ></i>

        <p
          id="friends"
          class="absolute z-50 left-5 hidden bg-gray-800 py-2 px-3"
        >
          friends
        </p>
      </div>
      <!--  -->
      <div class="relative flex cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-[35px]"
          @click="active = groups"
          @mouseenter="Show('groups')"
          @mouseleave="Hide('groups')"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>

        <p
          id="groups"
          class="absolute z-50 left-5 hidden bg-gray-800 py-2 px-3"
        >
          channels
        </p>
      </div>
      <!--  -->
      <div class="relative flex cursor-pointer">
        <i
          class="fas fa-bell fa-xl"
          @click="active = friendRequests"
          @mouseenter="Show('friendRequests')"
          @mouseleave="Hide('friendRequests')"
        ></i>

        <p
          id="friendRequests"
          class="absolute z-50 left-5 hidden bg-gray-800 py-2 px-3"
        >
          requests
        </p>
      </div>
      <!--  -->
      <div class="relative flex cursor-pointer">
        <i
          class="fas fa-search-location fa-xl"
          @click="active = peopleYouMayKnow"
          @mouseenter="Show('peopleYouMayKnow')"
          @mouseleave="Hide('peopleYouMayKnow')"
        ></i>

        <p
          id="peopleYouMayKnow"
          class="absolute z-50 left-5 hidden bg-gray-800 py-2 px-3"
        >
          nearbys
        </p>
      </div>
    </div>
    <!-- options -->
    <component :is="active" />
  </div>
</template>

<style scoped>
p {
  font-family: "Times New Roman", Times, serif;
  font-style: normal;
  font-weight: 400;
}
</style>
