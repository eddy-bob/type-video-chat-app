<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { notify } from "@kyvg/vue3-notification";

const localStream = ref<MediaStream>();
const localVideoObj = ref<any>({});
const muted = ref(false);
const pcConfig = ref<RTCConfiguration>();
const peerConnection = ref<RTCPeerConnection>();
const handleIceCandidate = ref<any>();
const handleRemoteStreamRemoved = ref<any>();

const props = withDefaults(defineProps<{ callStarted: boolean }>(), {
  callStarted: false,
});
// methods
const stopStreaming = () => {
  let video: any = document.getElementById("localVid");
  video.pause();
  localStream.value!.getTracks().forEach((track) => {
    video.src = " ";
    track.stop();
  });
};

const mute = () => {
  let video: any = document.getElementById("localVid");
  video.muted = !video.muted;
  video.muted == true ? (muted.value = true) : (muted.value = false);
  console.log(video.muted);
};

// emits
const emit = defineEmits<{ event: "endCall" }>();

onMounted(() => {
  if (props.callStarted == true) {
    let video: any = document.getElementById("localVid");
    let media = navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        video!.srcObject = stream;
        localStream.value = stream;
      })
      .catch((err) => {
        notify({
          type: "error",
          title: "Error",
          text: err.message ? err.message : "Could not process call",
        });
      });
    if (video) {
      navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    }
  }
});

onBeforeUnmount(() => {
  stopStreaming();
});

// const createPeerConnection = () => {
//   try {
//     peerConnection.value = new RTCPeerConnection(pcConfig.value);
//     peerConnection.value.onicecandidate = handleIceCandidate.value;
//     peerConnection.value.onremovestream = handleRemoteStreamRemoved.value;
//   } catch (err) {}
// };
// const createConnectionAndAddStream = () => {
//   createPeerConnection();
//   peerConnection.value!.addStream(localStream.value);
// };
// const ready = () => {
//   return navigator.mediaDevices
//     .getUserMedia({ audio: true, video: true })
//     .then((stream) => {
//       localStream.value = stream;
//       localVideoObj.value.srcObj = stream;
//       return createConnectionAndAddStream;
//     })
//     .catch((err) => {
//       notify({
//         type: "error",
//         title: "Error",
//         text: err.name ? err.name : "Could not process call",
//       });
//     });
// };
</script>

<template>
  <div class="bg-slate-800 shadow shadow-gray-300 text-gray-300 rounded-md">
    <div class="">
      <!-- local video -->
      <video
        autoplay="true"
        id="localVid"
        class="h-[25rem] w-full py-4"
      ></video>
    </div>
    <div class="flex justify-center space-x-5">
      <div
        class="bg-slate-700 rounded-lg py-2 px-4 font-extrabold text-xs text-white cursor-pointer"
      >
        <i
          @click="mute"
          :class="
            muted == false ? 'fas fa-microphone-slash' : 'fas fa-microphone'
          "
        ></i>
      </div>
      <button
        class="bg-red-500 rounded-lg py-2 px-4 font-extrabold text-xs text-white"
        @click="$emit('endCall')"
      >
        End Call
      </button>
      <div
        class="bg-slate-700 rounded-lg py-2 px-4 font-extrabold text-xs text-white cursor-pointer"
      >
        <i class="fas fa-desktop"></i>
      </div>
    </div>
  </div>
</template>

<style></style>
