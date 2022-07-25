<script setup lang="ts">
import { ref, reactive, shallowRef, inject } from "vue";
import profile from "../components/profile.vue";
import friends from "../components/friends.vue";
import call from "../components/calls.vue";
import groups from "../components/groups.vue";
import friendRequests from "../components/friend-requests.vue";
import peopleYouMayKnow from "../components/people-you-may-know.vue";
import recentChats from "../components/recent-chats.vue";

const active = shallowRef(recentChats);

const showLogout = inject<any>("showLogout");

const show = (id: string) => {
  const ele = (document.getElementById(id)!.style.display = "block");
};

const hide = (id: string) => {
  document.getElementById(id)!.style.display = "none";
};
</script>
<template>
  <div class="flex">
    <div
      class="px-3 pt-20 bg-slate-700 min-h-screen h-auto space-y-12 text-white"
    >
      <!--  -->
      <div class="relative flex cursor-pointer">
        <i
          @click="active = recentChats"
          class="fas fa-comment fa-md"
          @mouseenter="show('recentChats')"
          @mouseleave="hide('recentChats')"
        ></i>

        <p
          id="recentChats"
          class="absolute z-50 left-5 hidden bg-gray-800 py-2 px-3"
        >
          chats
        </p>
      </div>
      <!--  -->
      <div class="relative flex cursor-pointer">
        <i
          class="fas fa-user-friends fa-md"
          @click="active = friends"
          @mouseenter="show('friends')"
          @mouseleave="hide('friends')"
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
          class="w-[25px]"
          @click="active = groups"
          @mouseenter="show('groups')"
          @mouseleave="hide('groups')"
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
          class="fas fa-bell fa-lg"
          @click="active = friendRequests"
          @mouseenter="show('friendRequests')"
          @mouseleave="hide('friendRequests')"
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
        <img
          src="/images/svg/location.svg"
          alt="location"
          class="location w-[22px]"
          @click="active = peopleYouMayKnow"
          @mouseenter="show('peopleYouMayKnow')"
          @mouseleave="hide('peopleYouMayKnow')"
        />

        <p
          id="peopleYouMayKnow"
          class="absolute z-50 left-5 hidden bg-gray-800 py-2 px-3"
        >
          nearbys
        </p>
      </div>
      <!--  -->

      <div class="relative flex cursor-pointer">
        <i
          class="fas fa-user fa-lg"
          @click="active = profile"
          @mouseenter="show('profile')"
          @mouseleave="hide('profile')"
        ></i>

        <p
          id="profile"
          class="absolute z-50 left-5 hidden bg-gray-800 py-2 px-3"
        >
          Profile
        </p>
      </div>
      <div class="relative flex cursor-pointer">
        <i
          class="fas fa-phone fa-lg"
          @click="active = call"
          @mouseenter="show('call')"
          @mouseleave="hide('call')"
        ></i>

        <p id="call" class="absolute z-50 left-5 hidden bg-gray-800 py-2 px-3">
          calls
        </p>
      </div>
      <div class="relative flex cursor-pointer">
        <i
          @click="showLogout = !showLogout"
          class="fas fa-sign-out-alt fa-2xl fa-red logout"
          @mouseenter="show('logout')"
          @mouseleave="hide('logout')"
        ></i>

        <p
          id="logout"
          class="absolute z-50 left-5 hidden bg-gray-800 py-2 px-3"
        >
          logout
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
.logout {
  color: rgb(160, 16, 16);
}
.location {
  color: white;
}
</style>
