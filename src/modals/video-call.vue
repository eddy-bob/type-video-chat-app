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
import { Peer } from "peerjs";
import { useVibrate } from "@vueuse/core";

// import * as Peer from "https://unpkg.com/peerjs@1.3.2/dist/peerjs.min.js";

const localStream = ref<MediaStream>();
const peerId = ref("");
const remoteCall = ref<any[]>([]);

const peerConnection = ref();
const incomingCall = ref(false);
const showCaller = ref(false);
const muted = ref(false);
const { vibrate, stop, isSupported } = useVibrate({
  pattern: [1000, 1000, 3000],
});
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
showCaller.value = props.status === "outgoingCall" && true;
callData.value = { ...props.callData };
console.log(callData.value);

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
    props.callData.callId,
    props.recieverId
  );
};
const stopStreaming = () => {
  console.log("stop streaming reached");
  let video: any = document.getElementById("localVid");

  if (video) {
    video.pause();

    localStream.value!.getTracks().forEach((track) => {
      video.src = null;
      track.stop();

      video.remove();
    });
  }
};

const mute = () => {
  let video: any = document.getElementById("localVid");
  video.muted = !video.muted;
  video.muted == true ? (muted.value = true) : (muted.value = false);
  console.log(video.muted);
};

// emits
const emit = defineEmits<{ (event: "endCall"): void }>();
const endCall = () => {
  endVideoCall(
    props.socket,
    callData.value?.callerId as string,
    callData.value?.peerId as string,
    callData.value?.callId as string,
    props.recieverId as string
  );
};

onMounted(() => {
  peerConnection.value.on("open", (id: string) => {
    peerId.value = id;

    if (props.callStarted == true && props.status === "outgoingCall") {
      let video: any = document.createElement("video");

      video.autoplay = true;
      video.id = "localVid";
      video.muted = true;

      video.classList.add(
        "lg:h-[100vh]",
        "h-screen",
        "lg:w-[100vw]",
        "fixed",
        "object-cover",
        "w-screen"
      );

      // video!.style.width = "100%";
      // video!.style.height = "500px";

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
    .off("private_video_call_inverse_init")
    .on(
      "private_video_call_inverse_init",
      (data: {
        callerId: string;
        name: string;
        peerId: string;
        callId: string;
      }) => {
        console.log("i started a call ooo");
        console.log(data);
        callData.value = { ...data };
        vibrate();
      }
    );
  props.socket
    .off("private_video_call_inverse_authorize")
    .once(
      "private_video_call_inverse_authorize",
      (data: {
        callerId: string;
        name: string;
        peerId: string;
        callId: string;
      }) => {
        console.log("authorize inverse event clicked");
        callData.value = { ...data };
        stop();
      }
    );
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
        stop();
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

            call.off("stream").on("stream", (stream: MediaStream) => {
              console.log("streaming");

              if (!remoteCall.value[0]) {
                let video: any = document.createElement("video");
                video!.srcObject = stream;
                video.autoplay = true;
                video.id = "remoteVideo";

                video.style.position = "relative";

                video.classList.add(
                  "lg:h-[100vh]",
                  "h-screen",
                  "lg:w-[100vw]",
                  "fixed",
                  "object-cover",
                  "w-screen"
                );

                console.log("yesss oooooo", call);
                remoteCall.value.push(call);
                document.getElementById("video_container")?.append(video);

                let myVideo: any = document.createElement("video");
                myVideo.autoplay = true;
                myVideo.id = "localVid";
                myVideo.muted = true;

                myVideo!.style.position = "absolute";
                myVideo!.style.bottom = "0%";
                myVideo!.style.right = "0%";
                // myVideo!.style.width = "300px";
                // myVideo!.style.height = "300px";
                myVideo.classList.add(
                  "lg:h-[300px]",
                  "h-1/3",
                  "lg:w-[300px]",
                  "w-1/3"
                );
                // append video  to dom
                document.getElementById("video_container")?.append(myVideo);
                myVideo!.srcObject = stream;
                localStream.value = stream;
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
        stop();
        call.off("stream").on("stream", (stream: any) => {
          console.log("streaming ooooooo");

          console.log(call);
          if (!remoteCall.value[0]) {
            let video: any = document.createElement("video");
            video.autoplay = true;

            video!.srcObject = stream;
            video!.style.position = "relative";
            video.id = "remoteVideo";
            // video!.style.width = "100%";
            // video!.style.height = "500px";

            video.classList.add(
              "lg:h-[100vh]",
              "h-screen",
              "lg:w-[100vw]",
              "fixed",
              "object-cover",
              "w-screen"
            );
            console.log("yessoooooo", call);
            remoteCall.value.push(call);

            document.getElementById("video_container")?.append(video);

            let myVideo: any = document.getElementById("localVid");
            myVideo!.style.position = "absolute";
            myVideo!.style.bottom = "0%";
            myVideo!.style.right = "0%";
            myVideo.classList.add(
              "lg:h-[300px]",
              "h-1/3",
              "lg:w-[300px]",
              "w-1/3"
            );
            // myVideo!.style.width = "300px";
            // myVideo!.style.height = "300px";
            document.getElementById("video_container")?.append(myVideo);
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
  props.socket
    .off("private_video_call_end_success")
    .on("private_video_call_end_success", (data: { message: string }) => {
      console.log(data.message, "video end ");
      stop();

      const remote: any = document.getElementById("remoteVideo");
      const myVid: any = document.getElementById("localVid");
      if (remote) {
        console.log("remote dey ooo");
        remote!.srcObject = null;
        remoteCall.value.length = 0;
        // const container: any = document.getElementById("video-container");
        // container?.remove(myVid);
        // container?.remove(remote);
        myVid.remove();
        remote.remove();
        emit("endCall");
      } else {
        emit("endCall");
      }
    });
  props.socket
    .off("private_video_call_end_inverse_success")
    .on(
      "private_video_call_end_inverse_success",
      (data: { message: string }) => {
        console.log(data.message, "video end ");
        // stopStreaming();
        stop();
        const remote: any = document.getElementById("remoteVideo");

        if (remote) {
          console.log("remote dey ooo");
          //stopStreaming();
          remote!.srcObject = null;
          remoteCall.value.length = 0;

          remote.remove();
          let myVideo: any = document.getElementById("localVid");
          myVideo!.style.position = "relative";
          myVideo.classList.remove(
            "lg:h-[300px]",
            "h-1/3",
            "lg:w-[300px]",
            "w-1/3"
          );
          myVideo.classList.add(
            "lg:h-[100vh]",
            "h-screen",
            "lg:w-[100vw]",
            "fixed",
            "object-cover",
            "w-screen"
          );
          // myVideo!.style.width = "100%";
          // myVideo!.style.height = "500px";
        } else {
          emit("endCall");
        }
      }
    );
  props.socket
    .off("private_video_call_reciever_rejected")
    .on("private_video_call_reciever_rejected", (data: any) => {
      emit("endCall");
      notify({
        type: "error",
        title: " Call Rejected",
        text: "User busy",
      });
      stop();
    });
  props.socket
    .off("private_video_call_reject_success")
    .on("private_video_call_reject_success", (data: any) => {
      emit("endCall");
      stop();
    });
});

onBeforeUnmount(() => {
  stopStreaming();
});
</script>

<template>
  <div class="">
    <!-- video notify component -->

    <div v-if="showCaller == true" class="text-gray-300 w-full">
      <div class="h-auto w-auto relative" id="video_container">
        <!-- local video -->
        <!-- <video
        autoplay="true"
        id="localVid"
        class="h-[25rem] w-full py-4"
      ></video> -->
      </div>
      <div
        v-if="localStream"
        class="flex justify-center space-x-5 pt-4 fixed bottom-10 lg:left-[40%] left-[30%]"
      >
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
          @click="endCall"
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
      @reject="$emit('endCall'), reject()"
      :is="videoCallNotify"
      class="w-screen lg:px-0 px-4 pt-10"
      v-else
      :caller="callData"
    >
    </component>
  </div>
</template>

<style scoped></style>
