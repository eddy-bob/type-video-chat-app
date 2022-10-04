<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watchEffect } from "vue";
import { notify } from "@kyvg/vue3-notification";
import {
  initiateCall,
  processCall,
  endCall as endVideoCall,
  answerCall,
  rejectCall,
} from "../composables/process_video_call";
import videoCallNotify from "../modals/video-call-notify.vue";
// import * as Peer from "https://unpkg.com/peerjs@1.3.2/dist/peerjs.min.js";

const localStream = ref<MediaStream>();
const peerId = ref("");
const remoteCall = ref<any[]>([]);
const peerConnection = ref();
const incomingCall = ref(false);
const showCaller = ref(false);
const muted = ref(false);
const videoCallProcessed = ref(false);
const callData = ref<{
  callerId: string;
  peerId: string;
  name: string;
  callId: string;
}>();
// create peer connection
peerConnection.value = new Peer();

const props = withDefaults(
  defineProps<{
    callStarted: boolean;
    status: string;
    socket: any;
    callData: any;
    recieverId: string;
  }>(),
  {
    callStarted: false,
  }
);
callData.value = { ...props.callData };

// methods
const accept = () => {
  console.log("on accept", callData);

  answerCall(
    props.socket,
    props.callData.callerId,
    props.callData.peerId,
    props.callData.callId,
    props.recieverId
  );
};
const reject = () => {
  rejectCall(
    props.socket,
    props.callData.callerId,
    props.callData.peerId,
    props.callData.callId
  );
};
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
const endCall = () => {
  peerConnection.value.close();

  endVideoCall(
    props.socket,
    callData.value?.callerId as string,
    callData.value?.peerId as string,
    callData.value?.callId as string
  );
};
showCaller.value = props.status === "outgoingCall" && true;

onMounted(() => {
  peerConnection.value.on("open", (id: string) => {
    console.log(id, "peer");
    peerId.value = id;

    if (props.callStarted == true && props.status === "outgoingCall") {
      let video: any = document.createElement("video");

      video.autoplay = true;
      video.id = "localVid";
      video.muted = true;

      // append video  to dom
      document.getElementById("video_container")?.append(video);
      console.log(document.getElementById("video_container"));
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true,
        })
        .then((stream) => {
          video!.srcObject = stream;
          localStream.value = stream;

          if (showCaller.value == true) {
            console.log(peerId.value);
            initiateCall(peerId.value, props.socket, props.recieverId);
          }
        })
        .catch((err) => {
          notify({
            type: "error",
            title: "Error",
            text: err.message ? err.message : "Could not process call",
          });
        });
      // if (video) {
      //   navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      // }
    }
  });
});

watchEffect(() => {
  // props.socket.once(
  //   "video_private_call_init",
  //   (data: {
  //     callerId: string;
  //     name: string;
  //     peerId: string;
  //     callId: string;
  //   }) => {
  //     callData.value = { ...data };
  //     incomingCall.value = true;
  //   }
  // );
  props.socket
    .off("private_video_call_authorize")
    .once(
      "private_video_call_authorize",
      (data: {
        callerId: string;
        name: string;
        peerId: string;
        callId: string;
      }) => {
        console.log("authorize event clicked");
        callData.value = { ...data };
        incomingCall.value = true;
        showCaller.value = true;

        navigator.mediaDevices
          .getUserMedia({
            audio: true,
            video: true,
          })
          .then((stream) => {
            const call = processCall(data.peerId, stream, peerConnection.value);
            let myVideo: any = document.createElement("video");
            myVideo.autoplay = true;
            myVideo.id = "localVid";
            myVideo.muted = true;
            // append video  to dom
            document.getElementById("video_container")?.append(myVideo);
            myVideo!.srcObject = stream;
            localStream.value = stream;

            call.off("stream").on("stream", (stream: MediaStream) => {
              console.log("streaming");

              if (!remoteCall.value[0]) {
                let video: any = document.createElement("video");
                video!.srcObject = stream;
                video.autoplay = true;
                console.log("yesss oooooo", call);
                remoteCall.value.push(call);
                document.getElementById("video_container")?.append(video);
              }

              videoCallProcessed.value = true;
            });
          })
          .catch((err) => {
            notify({
              type: "error",
              title: "Error",
              text: err.message ? err.message : "Could not process call",
            });
          });
      }
    );
  peerConnection.value.once("call", (call: any) => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        localStream.value = stream;
        call.answer(stream);
        call.off("stream").on("stream", (stream: any) => {
          console.log("streaming ooooooo");

          console.log(call);
          if (!remoteCall.value[0]) {
            let video: any = document.createElement("video");
            video.autoplay = true;
            video!.srcObject = stream;
            console.log("yessoooooo", call);
            remoteCall.value.push(call);

            document.getElementById("video_container")?.append(video);
          }

          videoCallProcessed.value = true;
        });
      })
      .catch((err) => {
        notify({
          type: "error",
          title: "Error",
          text: err.message ? err.message : "Could not process call",
        });
      });
  });
  props.socket.on(
    "private_video_call_end_inverse_success",
    (data: { message: string }) => {
      console.log(data.message);
    }
  );
});

onBeforeUnmount(() => {
  stopStreaming();
});
</script>

<template>
  <div>
    <!-- video notify component -->

    <div
      v-if="showCaller == true"
      class="bg-slate-800 shadow shadow-gray-300 text-gray-300 rounded-md p-8"
    >
      <div
        class="grid grid-cols-2 h-auto max-h-screen max-w-screen"
        id="video_container"
      >
        <!-- local video -->
        <!-- <video
        autoplay="true"
        id="localVid"
        class="h-[25rem] w-full py-4"
      ></video> -->
      </div>
      <div class="flex justify-center space-x-5 pt-4">
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
          @click="[endCall, $emit('endCall')]"
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
    <component
      @accept="accept()"
      @reject="reject()"
      :is="videoCallNotify"
      v-else
      :caller="callData"
    >
    </component>
  </div>
</template>

<style scoped>
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
