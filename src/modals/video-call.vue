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
// import {Peer} from "peerjs"

const localStream = ref<MediaStream>();
const peerId = ref("");
const remoteStream = ref<MediaStream[]>([]);
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
}>({ callerId: "", peerId: "", name: "", callId: "" });
// create peer connection
// peerConnection.value=new peer()

peerConnection.value.on("open", (id: string) => {
  console.log(id);
  peerId.value = id;
});

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
// methods
const accept = () => {
  answerCall(
    props.socket,
    props.callData.callerId,
    props.callData.peerId,
    props.callData.callId
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
    callData.value.callerId,
    callData.value.peerId,
    callData.value.callId
  );
};

onMounted(() => {
  if (props.callStarted == true) {
    let video: any = document.createElement("video");
    video.autoplay = true;
    video.id = "localVid";
    video.muted = true;
    // append video  to dom
    document.getElementById("video_container")?.append(video);
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        video!.srcObject = stream;
        localStream.value = stream;
        showCaller.value = props.status === "outgoingCall" && true;
        if (showCaller.value == true) {
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
  props.socket.once(
    "private_video_call_authorize",
    (data: {
      callerId: string;
      name: string;
      peerId: string;
      callId: string;
    }) => {
      callData.value = { ...data };
      incomingCall.value = true;
      showCaller.value = true;

      let video: any = document.createElement("video");
      video.autoplay = true;
      video.muted = true;
      // append video  to dom
      document.getElementById("video_container")?.append(video);
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true,
        })
        .then((stream) => {
          video!.srcObject = stream;
          localStream.value = stream;
          const call = processCall(data.peerId, stream, peerConnection.value);
          call.on("stream", (stream: MediaStream) => {
            let video: any = document.createElement("video");
            video.autoplay = true;
            document.getElementById("video_container")?.append(video);
            video!.srcObject = stream;
            remoteStream.value.push(stream);
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
  peerConnection.value.on("call", (call: any) => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        localStream.value = stream;
        call.answer(stream);
        call.on("stream", (stream: any) => {
          let video: any = document.createElement("video");
          video.autoplay = true;
          document.getElementById("video_container")?.append(video);
          video!.srcObject = stream;
          remoteStream.value.push(stream);
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
    <component
      @accept="accept()"
      @reject="reject()"
      :is="videoCallNotify"
      v-if="showCaller == false"
      :caller="callData"
    >
    </component>
    <div
      v-else
      class="bg-slate-800 shadow shadow-gray-300 text-gray-300 rounded-md"
    >
      <div class="grid grid-cols-2" id="video_container">
        <!-- local video -->
        <!-- <video
        autoplay="true"
        id="localVid"
        class="h-[25rem] w-full py-4"
      ></video> -->
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
  </div>
</template>

<style scoped>
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
