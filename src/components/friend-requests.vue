<script lang="ts" setup>
import { ref } from "vue";
import { useFriendRequestStore } from "../core/store/index";
import { notify } from "@kyvg/vue3-notification";
import UIcomponent from "../components/UIcomponent/spinner.vue";
// initialize friend request store
const friendRequestStore = useFriendRequestStore();
// variables
const friendRequests = ref([]);
const error = ref<string>();
const loading = ref(false);
const disabled = ref(false);
const getFriendRequests = () => {
  console.log("fired");
  loading.value = true;
  disabled.value = true;
  friendRequestStore
    .getFriendRequests()
    .then((res) => {
      friendRequests.value = res.data.data;
      console.log(res.data.data);
      loading.value = false;
      disabled.value = false;
    })
    .catch((err) => {
      error.value =
        err.data.Error || "Unable to fetch friend requests at the moment";
      loading.value = false;
      disabled.value = false;
    });
};
getFriendRequests();
const acceptFriendRequest = (requestId: string, index: number) => {
  let spinner = document.getElementById(requestId);
  let disabledBtn = document.getElementById(requestId + index);
  spinner!.style.display = "flex";
  disabledBtn!.style.display = "none";

  friendRequestStore
    .acceptFriendRequest(requestId)
    .then((res) => {
      spinner!.style.display = "none";
      disabledBtn!.style.display = "flex";
      // delete request from friend request array using its index
      friendRequests.value.splice(index, 1);
      notify({
        type: "success",
        title: "Success",
        text: "Accepted Request successfully",
      });
    })
    .catch((err) => {
      spinner!.style.display = "none";
      disabledBtn!.style.display = "flex";
      notify({
        type: "error",
        title: "Error",
        text: err.data.Error || "opps something went wrong",
      });
    });
};
const rejectFriendRequest = (requestId: string, index: number) => {
  let spinner = document.getElementById(requestId);
  let disabledBtn = document.getElementById(requestId + index);
  spinner!.style.display = "flex";
  disabledBtn!.style.display = "none";
  loading.value = true;
  friendRequestStore
    .rejectFriendRequest(requestId)
    .then((res) => {
      spinner!.style.display = "none";
      disabledBtn!.style.display = "flex";
      // delete request from friend request array using its index
      friendRequests.value.splice(index, 1);
      notify({
        type: "success",
        title: "Success",
        text: "Rejected Request successfully",
      });
    })
    .catch((err) => {
      spinner!.style.display = "none";
      disabledBtn!.style.display = "flex";
      notify({
        type: "error",
        title: "Error",
        text: err.data.Error || "opps something went wrong",
      });
    });
};
</script>

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

    <div>
      <div
        v-if="loading == true"
        class="flex flex-col items-center justify-center h-[300px]"
      >
        <component :is="UIcomponent" />
      </div>
      <div v-else class="overflow-y-scroll myOverflow max-h-96 space-y-6">
        <!--  -->
        <div
          v-if="!friendRequests[0]"
          class="space-y-4 flex flex-col items-center justify-center h-[70px]"
        >
          <p class="text-sm text-center font-extrabold">
            you do not have any recent friend <br class="mb-1" />
            Request at the moment.
          </p>
        </div>
        <!--  -->
        <div
          v-else
          v-for="(request, i) in friendRequests"
          :key="request._id"
          class="flex space-x-3 requesthead border-b mx-4"
        >
          <div class="cursor-pointer">
            <img
              :src="
                request.pendingFriendPhoto
                  ? request.pendingFriendPhoto.url
                  : '/images/jpg/icon.jpg'
              "
              alt="img"
              class="rounded-full w-8 h-8"
            />
          </div>
          <div class="space-y-4 text-[12px] mb-5">
            <p class="font-extrabold">{{ request.pendingFriendName }}</p>
            <div>
              <div
                :id="request._id"
                class="hidden flex-col items-center justify-center"
              >
                <component :is="UIcomponent" />
              </div>
              <div :id="request._id + i" class="flex space-x-4 text-gray-800">
                <button
                  class="bg-green-500 rounded-md py-2 px-2"
                  :disabled="disabled"
                  @click="acceptFriendRequest(request._id, i)"
                >
                  Accept
                </button>
                <button
                  :disabled="disabled"
                  class="bg-red-500 rounded-md py-2 px-2"
                  @click="rejectFriendRequest(request._id, i)"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>

        <!--  -->
        <!-- <div class="flex space-x-3 requesthead border-b mx-4">
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
        </div> -->

        <!--  -->
        <!-- <div class="flex space-x-3 requesthead mx-4">
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
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.requesthead {
  padding: 5px 18px 5px 18px;
}
</style>
