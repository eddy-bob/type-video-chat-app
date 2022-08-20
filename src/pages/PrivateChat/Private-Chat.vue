<script lang="ts" setup>
import {
  ref,
  watchEffect,
  watch,
  shallowRef,
  onUpdated,
  onBeforeUnmount,
} from "vue";
import { useRoute } from "vue-router";
import videoCall from "../../modals/video-call.vue";
import voiceCall from "../../modals/voice-call.vue";
import { notify } from "@kyvg/vue3-notification";
import UIcomponent from "../../components/UIcomponent/spinner.vue";
import moment from "moment";

import SocketioService from "../../core/utils/socket-connection";
import {
  usePrivateChat,
  user,
  useAuthStore,
  useRecentPrivateChatStore,
} from "../../core/store/index";

// setup socket connection
SocketioService.setupSocketConnection()
  .then((response) => {
    console.log("socket connected");
    socket.value = response[1];
    console.log(socket.value);
  })
  .catch((err) => {
    console.log(err);
  });
const vScrollDirective = {
  mounted: (el: HTMLElement) => {
    el.scrollTop = el.scrollHeight;
  },
};

// initialize route
const route = useRoute();
// initialize friend request store
const recentPrivateChatStore = useRecentPrivateChatStore();
const userStore = user();
const privateChatStore = usePrivateChat();
const authStore = useAuthStore();
// variables
const userId = ref<string>();
const friendId = ref("");
const showVoice=ref(false)
const showVideo = ref(false);
const profile = ref({});
const socket = shallowRef<any>();
const privateAttatchment = ref<string[]>([]);
const privateChats = ref("");

const loading = ref(false);
const typing = ref(false);
const friendTyping = ref(false);
const scrollArea = ref<HTMLElement>();
const privateChatData = ref<any[]>([]);
const privateUserProfileData = ref<any>({});
const prev = ref<any>("");
// set groupId on created
userId.value = route.query.userId as string;
friendId.value = route.query.id as string;
const scrollToBottom = () => {
  const targetHeight = scrollArea.value!.scrollHeight;
  scrollArea.value!.scrollTop = targetHeight;
};
const scrollToBottomChat = () => {
  scrollArea.value = document.getElementById("chatScroll") as HTMLElement;

  const targetHeight = scrollArea.value!.scrollHeight;
  scrollArea.value!.scrollTop = targetHeight;
};
const getProfile = () => {
  authStore
    .getAuthUser()
    .then((res) => {
      profile.value = res.data.data;
      console.log(profile);
    })
    .catch((err) => {
      console.log(err);
    });
};
getProfile();
const addRecentChat = (data: { relationship: string; friend: string }) => {
  recentPrivateChatStore
    .addRecentPrivateChat(data)
    .then((res) => {
      console.log(res.data.data);
      recentPrivateChatStore.recentChats = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
const showChatOption = (id: string) => {
  const el = document.getElementById(id);

  const style = window.getComputedStyle(el!, null).getPropertyValue("display");
  console.log(style);

  if (prev.value !== "") {
    prev.value!.style.display = "none";
    prev.value = "";
  }

  if (style === "none") {
    el!.style.display = "block";
    prev.value = el;
  } else {
    el!.style.display = "none";
    prev.value = "";
  }
};
// fetch group details
const privateUserProfile = (id: string) => {
  userStore
    .getUserProfile(id)
    .then((res) => {
      console.log(res.data.data);
      privateUserProfileData.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
privateUserProfile(userId.value);

// fetch groupChat
const privateChat = (id: string) => {
  loading.value = true;
  privateChatStore
    .getChat(id)
    .then((res) => {
      console.log(res);

      privateChatData.value = res.data.data;
      loading.value = false;
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
    });
};
const startVideoCall = () => {
  showVideo.value = true;
  const id = route.query.userId as string;
};
const addPrivateChat = () => {
  // emit add chat
  if (socket.value && privateChats.value !== "") {
    socket.value.emit("privateMessage", {
      userId: privateUserProfileData.value._id,
      message: privateChats.value,
      attatchment: privateAttatchment.value,
      friendId: friendId.value,
    });
    socket.value.once("chatError", (data: any) => {
      console.log(data);
      notify({
        type: "error",
        title: "Error",
        text: data.message || "Chat send failed",
      });
    });
    socket.value.once("message", (data: any) => {
      console.log(data);
      console.log("na me send am");
      privateChatData.value.push({
        sender: data.name.sender,
        senderName: data.name.senderName,
        id: data.name.id,
        time: data.time,
        message: data.message,
        attatchment: data.name.attatchment,
      });
    });
    socket.value.once("newMessage", (data: any) => {
      privateChatData.value.push({
        sender: data.name.sender,
        senderName: data.name.senderName,
        id: data.name.id,
        time: data.time,
        message: data.message,
        attatchment: data.name.atatchment,
      });
      recentPrivateChatStore
        .getRecentPrivateChats()
        .then((res) => {
          loading.value = false;
          recentPrivateChatStore.recentChats = res.data.data;
        })
        .catch((err) => {
          console.log(err);

          loading.value = false;
        });
    });
    privateChats.value = "";
    // set scroll div id to ref
    scrollArea.value = document.getElementById("chatScroll") as HTMLElement;
  }
  addRecentChat({
    friend: userId.value as string,
    relationship: route.query.id as string,
  });
};
// listen for when there is a change in the group id

watch(route, (current, previous) => {
  userId.value = route.query.userId as string;
  // fetch auth user profile
  if (typeof route.query.userId !== "undefined") {
    privateUserProfile(userId.value);
    privateChat(userId.value);
  }
});
privateChat(userId.value);
watchEffect(() => {
  if (socket.value) {
    if (privateChats.value !== "") {
      typing.value = true;
      socket.value.emit("typing", {
        value: true,
        recipient: privateUserProfileData.value._id,
      });
    } else {
      typing.value = false;
      socket.value.emit("typing", {
        value: false,
        recipient: privateUserProfileData.value._id,
      });
    }
    console.log(socket.value);
    // socket.value.once("newMessage", (data: any) => {
    //   privateChatData.value.push({
    //     sender: data.name.sender,
    //     senderName: data.name.senderName,
    //     id: data.name.id,
    //     time: data.time,
    //     message: data.message,
    //     attatchment: data.name.atatchment,
    //   });
    // });

    socket.value.on("typing", (data: { value: boolean }) => {
      friendTyping.value = data.value;
    });
    // socket.value.on("message", (data: any) => {
    //   console.log(data);
    //   console.log("na me send am");
    //   privateChatData.value.push({
    //     sender: data.name.sender,
    //     senderName: data.name.senderName,
    //     id: data.name.id,
    //     time: data.time,
    //     message: data.message,
    //     attatchment: data.name.attatchment,
    //   });
    // });
    socket.value.on("privateForward", (data: any) => {
      console.log(data);
    });
    socket.value.on("forwardFail", (data: any) => {
      console.log(data);
    });
    // socket.value.once("chatError", (data: any) => {
    //   console.log(data);
    //   notify({
    //     type: "error",
    //     title: "Error",
    //     text: data.message || "Chat send failed",
    //   });
    // });
  }
});
onUpdated(() => {
  if (userId.value !== "" && scrollArea.value && typing.value == false) {
    console.log(scrollArea.value);
    // scroll chat to bottom of the chats div on update
    scrollToBottom();
  }
});
//disconnect socket connection and update active status
onBeforeUnmount(() => {
  SocketioService.disconnect()
    .then((response) => {
      console.log("this is appearing before onmount", socket.value);
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<template>
  <div class="w-full bg-slate-800 relative">
    <component
      class="absolute top-[15%] left-[8%] z-50 w-[55rem] p-5"
      v-if="showVideo == true"
      :callStarted="showVideo"
      :is="videoCall"
      @endCall="showVideo = false"
    />
    <component class="absolute" v-if="showVoice == true" :is="voiceCall" />

    <!-- nav -->
    <div class="text-gray-300 bg-slate-700 fixed w-[74%] top-0">
      <div v-if="route.query.userId" class="flex px-8 justify-between py-4">
        <!--  -->
        <div class="flex space-x-4">
          <div class="relative">
            <img
              :src="
                privateUserProfileData && privateUserProfileData?.photo
                  ? privateUserProfileData.photo.url
                  : '/images/jpeg/noImg.jpeg'
              "
              alt="profile picture"
              class="rounded-full w-12 h-12"
            />
            <p
              v-if="privateUserProfileData.isLoggedIn == true"
              class="absolute w-2 h-2 rounded-full bg-green-700 bottom-0 right-1"
            ></p>
            <p
              v-else
              class="absolute w-2 h-2 rounded-full bg-red-700 bottom-0 right-1"
            ></p>
          </div>
          <div>
            <p class="font-extrabold text-[16px]">
              {{
                privateUserProfileData?.firstName
                  ? privateUserProfileData?.firstName +
                    " " +
                    privateUserProfileData?.lastName
                  : ""
              }}
            </p>
          </div>
        </div>
        <!--  -->
        <div class="flex space-x-4">
          <i class="fas fa-search cursor-pointer"></i>
          <i class="fas fa-phone-volume cursor-pointer"></i>
          <i class="fas fa-video cursor-pointer" @click="startVideoCall"></i>
        </div>
      </div>
    </div>
    <!--  -->
    <!-- chats -->
    <!-- chat heads -->
    <div
      v-if="loading == true"
      class="flex flex-col items-center justify-center h-[300px]"
    >
      <component :is="UIcomponent" />
    </div>
    <div
      v-else
      style="scroll-behavior: smooth"
      class="px-10 py-10 space-y-5 mt-20 h-[500px] overflow-y-scroll myOverflow"
      id="chatScroll"
      v-scroll-directive
    >
      <div v-if="privateUserProfileData.firstName">
        <!-- chat loop -->

        <div class="text-left space-x-2">
          <div class="space-y-2">
            <div
              v-for="chat in privateChatData"
              :key="chat._id"
              class="flex"
              :class="
                profile._id === chat.sender ? 'justify-end' : 'justify-start'
              "
            >
              <div>
                <div class="relative w-full">
                  <p
                    class="bg-slate-500 px-4 py-4 rounded-md w-auto text-sm max-w-[50rem]"
                    style="overflow-wrap: break-word"
                  >
                    {{ chat.message }}
                  </p>
                  <img
                    src="/images/svg/option.svg"
                    @click="showChatOption(chat._id)"
                    alt=""
                    class="w-2 absolute top-0 cursor-pointer"
                    :class="
                      profile._id === chat.sender
                        ? 'left-[-9px]'
                        : 'right-[-9px]'
                    "
                  />

                  <!-- chat options -->
                  <div
                    class="bg-slate-500 p-3 space-y-5 absolute right-0 mt-1 border border-gray-700 text-sm rounded-lg z-50 hidden"
                    :id="chat._id"
                  >
                    <div class="flex justify-between">
                      <p>Forward</p>
                      <img src="" alt="" />
                    </div>
                    <div class="flex justify-between">
                      <p>Copy</p>
                      <img src="" alt="" />
                    </div>
                    <div class="flex justify-between">
                      <p>Delete</p>
                      <img src="" alt="" />
                    </div>
                  </div>
                  <!-- chat options  end-->
                </div>
                <div
                  class="flex justify-end space-x-3"
                  :class="
                    profile._id === chat.sender
                      ? 'flex-row'
                      : 'flex-row-reverse space-x-reverse'
                  "
                >
                  <div>
                    <img src="/images/svg/check.svg" alt="check" class="w-2" />
                    <img src="/images/svg/check.svg" alt="check" class="w-2" />
                  </div>
                  <p class="text-sm">
                    {{
                      chat.time
                        ? chat.time
                        : moment(chat.createdAt).format("hh:mm:ss A")
                    }}
                  </p>
                  <p class="font-extrabold text-sm">
                    {{ profile._id === chat.sender ? "You" : chat.senderName }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- floating button -->
        <div @click="scrollToBottomChat">
          <i
            class="fas fa-chevron-circle-down fa-2xl fixed right-8 bottom-24 cursor-pointer"
          ></i>
        </div>
        <!-- typing notification -->
        <p
          class="font-extrabold text-gray-300 flex justify-end mt-4 text-sm"
          v-if="friendTyping == true"
        >
          Typing. . .
        </p>
      </div>
      <div v-else class="w-full bg-slate-800 text-gray-300 text-center">
        <div v-if="!route.query.userId" class="font-extrabold pt-20">
          <p>Welcome to ECHAT.</p>

          <p>We how you have a wondeful experience</p>
          <p>Get started by adding a friend or joining a channel</p>
        </div>
        <div v-else>
          <div class="flex w-full justify-center">
            <img src="/images/svg/sadface.svg" alt="" class="w-20" />
          </div>
          <p>
            Ooops we could'nt find the group you <br />are looking for.URL might
            be broken<br />
            or group has been deleted/disabled
          </p>
        </div>
      </div>
    </div>
    <!--  -->
    <!-- input field -->
    <div class="fixed bottom-0 w-full my-2 text-gray-200 px-10">
      <div class="flex space-x-3">
        <div class="flex space-x-5">
          <img src="/images/svg/option.svg" alt="" class="w-2" />
          <img
            src="/images/svg/smileyl.svg"
            alt="emoji"
            class="w-6 h-6 mt-2 bg-slate-900 rounded-full"
          />
        </div>

        <textarea
          type="text"
          :disabled="privateUserProfileData.firstName ? false : true"
          name="message"
          v-model.lazy="privateChats"
          class="focus:outline-none outline-none bg-slate-700 py-2 h-12 px-3 w-[60%] myOverflow text-sm"
          placeholder="message here . . ."
        />
        <!--  -->
        <button
          type="button"
          @click="addPrivateChat"
          class="bg-slate-700 p-2 rounded-full"
        >
          <img src="/images/svg/send.svg" alt="send" class="w-[30px]" />
        </button>
      </div>
    </div>
    <!-- end of input -->
  </div>
  <!-- <div
    v-else
    class="w-full bg-slate-800 text-gray-300 h-screen pt-20 text-center"
  >
    <div class="flex w-full justify-center">
      <img src="/images/svg/sadface.svg" alt="" class="w-20" />
    </div>
    <p>
      Ooops we could'nt find the group you <br />are looking for.URL might be
      broken<br />
      or group has been deleted/disabled
    </p>
  </div> -->
  <!--  -->
</template>

<style></style>
