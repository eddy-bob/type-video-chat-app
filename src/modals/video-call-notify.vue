<script setup lang="ts">
import { ref, onMounted } from "vue";
import { user } from "../core/store/index";
const callerData = ref<any>();
// initialize store
const userStore = user();
const props = defineProps<{
  caller: {
    callerId: string;
    peerId: string;
    name: string;
    callId: string;
  };
}>();

const getProfile = (id: string) => {
  console.log(id, "it got to notify");
  userStore
    .getUserProfile(id)
    .then((res) => {
      console.log("this is the video notify res", res);
      callerData.value = { ...res.data.data };
    })
    .catch((err) => {
      console.log("this is the video notify res", err);
      console.log(err);
    });
  // fetch profile
};
getProfile(props.caller.callerId);
</script>
<template>
  <div class="flex justify-center">
    <div
      class="space-y-3 lg:w-1/2 w-screen lg:p-10 p-5 bg-slate-800 text-gray-300 rounded-md shadow shadow-gray-300"
    >
      <p class="font-extrabold text-gray-300 text-center">
        Incoming video call
      </p>
      <div class="space-y-2">
        <div class="flex justify-center">
          <img
            :src="
              callerData && callerData.photo && callerData.photo.url
                ? callerData.photo.url
                : '/images/jpeg/noImg.jpeg'
            "
            alt="caller-picture"
            class="rounded-full border-4 border-slate-800 w-20 h-20"
          />
        </div>
        <p class="text-center text-gray-300 font-extrabold text-md">
          {{ props.caller.name }}
        </p>
      </div>
      <div class="flex text-sm font-extrabold justify-between text-gray-300">
        <button
          class="px-3 py-2 confirm rounded-md bg-red"
          @click="$emit('accept')"
        >
          Accept
        </button>
        <button class="px-3 py-2 cancel rounded-md" @click="$emit('reject')">
          Reject
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
