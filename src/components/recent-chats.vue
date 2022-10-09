<script lang="ts" setup>
import { onMounted, ref, inject } from "vue";
import { useRecentPrivateChatStore } from "../core/store/index";
import UIcomponent from "../components/UIcomponent/spinner.vue";
import { useRoute } from "vue-router";
// initialize friend request store
const recentPrivateChatStore = useRecentPrivateChatStore();
// initialize route
const route = useRoute();
// variables
// const recentChats = ref<any[]>([]);
const loading = ref(false);
const chatsError = ref("");
const activeColor = ref("rgb(36, 154, 36)");
// provide in inject
const showSide = inject("showSide");
// functions
const fetchRecentChats = () => {
  loading.value = true;
  recentPrivateChatStore
    .getRecentPrivateChats()
    .then((res) => {
      loading.value = false;
      recentPrivateChatStore.recentChats = res.data.data;
      if (!recentPrivateChatStore.recentChats[0]) {
        chatsError.value =
          "You have no recent chats at the moment.Go the friends tab to start a conversation";
      }
    })
    .catch((err) => {
      console.log(err);
      chatsError.value = err.data
        ? err.data.Error
        : "..Oops something went wrong";
      loading.value = false;
    });
};
fetchRecentChats();
const makeActive = (id: string) => {
  console.log(route.query.userId);
  if (document.getElementById(route.query.userId as string)) {
    document.getElementById(
      route.query.userId as string
    )!.style.backgroundColor = "";
  }
  document.getElementById(id)!.style.backgroundColor = activeColor.value;
};
</script>

<template>
  <div
    class="space-y-4 text-gray-300 w-full bg-slate-800 border-r border-r-slate-600"
  >
    <div class="px-6 space-y-6">
      <div class="flex justify-between pt-5">
        <p class="font-extrabold text-[22px]">Recent Chats</p>
        <i
          class="fas fa-plus border border-gray-300 p-2 rounded-md cursor-pointer"
        ></i>
      </div>
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
    <div
      v-if="loading == true"
      class="flex flex-col items-center justify-center h-[300px]"
    >
      <component :is="UIcomponent" />
    </div>
    <div v-else>
      <div v-if="recentPrivateChatStore.recentChats[0]">
        <div
          v-for="chat in recentPrivateChatStore.recentChats"
          :key="chat.friend"
          :id="chat.friend"
          :class="chat.friend === $route.query.userId ? `bg-[#189f18]` : ''"
          class="overflow-y-scroll myOverflow max-h-44 chathead cursor-pointer"
        >
          <!--  -->
          <div
            @click="
              makeActive(chat.friend),
                (showSide = false),
                $router.push({
                  name: 'page.privateChat',
                  query: {
                    userId: chat.friend,
                    id: chat.relationship,
                  },
                })
            "
            class="flex space-x-3"
          >
            <div class="relative">
              <img
                :src="chat.photo ? chat.photo.url : '/images/jpeg/noImg.jpeg'"
                alt="img"
                class="rounded-full w-8 h-8"
              />

              <!-- <p
                class="absolute w-2 bg-green-700 h-2 rounded-full bottom-0 right-1"
              ></p> -->
            </div>
            <p class="text-[12px] font-extrabold mt-2">{{ chat.friendName }}</p>
          </div>
        </div>
      </div>
      <div v-else class="mt-7">
        <div v-if="chatsError !== ''">
          <div class="flex w-full justify-center">
            <img src="/images/svg/sadface.svg" alt="" class="w-20" />
          </div>

          <p class="text-sm text-center font-extrabold px-6">
            {{ chatsError }}
          </p>
        </div>
      </div>
    </div>
    <!-- group chats -->
    <div class="px-6 space-y-6">
      <p class="font-extrabold text-[22px] pt-5">Recent group chats</p>

      <!-- group chat heads -->
      <div class="space-y-4 overflow-y-scroll myOverflow max-h-44">
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
/* .chathead:first-child {
  background-color: v-bind(activeColor);
} */
.chathead {
  padding: 5px 18px 5px 18px;
}
</style>
