<script setup lang="ts">
import { ref } from "vue";
import { user } from "../core/store/index";
const callerData = ref({});
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

console.log("na caller obj be this", props.caller);
const getProfile = (id: string) => {
  userStore
    .getUserProfile(id)
    .then((res) => {
      console.log(res.data.data);
      callerData.value = { ...res.data.data };
      // callerPic.value =
      //   res.data.data.photo && res.data.data.photo.url
      //     ? res.data.data.photo.url
      //     : "/images/jpeg/noImg.jpeg";
    })
    .catch((err) => {
      console.log(err);
    });
  // fetch profile
  getProfile(props.caller.callerId);
};
</script>
<template>
  <div class="flex justify-center">
    <div
      class="space-y-3 w-1/2 p-10 bg-slate-800 text-gray-300 rounded-md shadow shadow-gray-300"
    >
      <p class="font-extrabold text-gray-300 text-center">
        Incoming video call
      </p>
      <div class="space-y-2">
        <div class="flex justify-center">
          <img
            :src="
              callerData.photo && callerData.photo.url
                ? callerData.photo.url
                : '/images/jpeg/noImg.jpeg'
            "
            alt="caller-picture"
            class="rounded-full border-4 border-slate-800 w-20 h-20"
          />
        </div>
        <p class="text-center text-gray-300">{{ props.caller.name }}</p>
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
