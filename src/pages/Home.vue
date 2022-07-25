<script lang="ts" setup>
import {
  ref,
  provide,
  onBeforeUnmount,
  shallowRef,
  watch,
  reactive,
  watchEffect,
  onUpdated,
} from "vue";
import UIcomponent from "../components/UIcomponent/spinner.vue";
import { useGroupStore, useGroupChat, useAuthStore } from "../core/store/index";
import sideNav from "../components/sideNav.vue";
import appLogout from "../modals/logout.vue";
import createGroup from "../modals/create-group.vue";
import overlay from "../modals/overlay.vue";
import preview from "../modals/preview-image.vue";
import SocketioService from "../core/utils/socket-connection";
import moment from "moment";

// setup socket connection
SocketioService.setupSocketConnection()
  .then((response) => {
    socket.value = response[1];
    console.log(socket.value);
  })
  .catch((err) => {
    console.log(err);
  });
// initialize store
const groupStore = useGroupStore();
const authStore = useAuthStore();
const groupChatStore = useGroupChat();

//variables
const selectedImg = ref<ArrayBuffer>();
const profile = ref();
const prev = ref<any>("");
const groupId = ref<string>("");
const loading = ref(false);
const friendId = ref<string>("");
const socket = shallowRef<any>();
const isShowCreateGroup = ref(false);
const isLogout = ref(false);
const showPreview = ref(false);
const imageType = ref<string | null>();
const isSetImage = ref(false);
const groupProfileData = ref({});
const friendProfileData = ref({});
const groupChatData = ref<any[]>([]);
const friendChatData = ref<any[]>([]);
const groupAttatchment = ref<string[]>([]);
const privateAttatchment = ref<string[]>([]);
const groupChats = ref("");
const typing = ref(false);
const scrollArea = ref<HTMLElement>();
const privateChats = ref("");

// provides
provide("groupId", groupId);
provide("showCreateGroup", isShowCreateGroup);
provide("showLogout", isLogout);
provide("showPreview", showPreview);
provide("selectedImg", selectedImg);
provide("setImage", isSetImage);
provide("imageType", imageType);

// chat always scroll to the bottom
const vScrollDirective = {
  mounted: (el: HTMLElement) => {
    el.scrollTop = el.scrollHeight;
  },
};
onUpdated(() => {
  if (groupId.value !== "" && scrollArea.value && typing.value == false) {
    console.log(scrollArea.value);
    // scroll chat to bottom of the chats div on update
    scrollToBottom();
  }
});
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

const setImage = (value: boolean) => {
  isSetImage.value = value;
};

// fetch group details
const groupProfile = (id: string) => {
  groupStore
    .getGroup(id)
    .then((res) => {
      groupProfileData.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
// fetch groupChat
const groupChat = (id: string) => {
  loading.value = true;
  groupChatStore
    .getGroupChat(id)
    .then((res) => {
      console.log(res);

      groupChatData.value = res.data.data;
      loading.value = false;
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
    });
};
// listen for when there is a change in the group id
watch(groupId, (current, previous) => {
  if (current !== previous) {
    console.log(previous, current);
    // fetch auth user profile
    getProfile();
    groupProfile(current);
    groupChat(current);
  }
});

const scrollToBottom = () => {
  const targetHeight = scrollArea.value!.scrollHeight;
  scrollArea.value!.scrollTop = targetHeight;
};
// add groupchat
const addGroupChat = () => {
  // emit add chat
  if (socket.value && groupChats.value !== "") {
    socket.value.emit("groupMessage", {
      groupId: groupId.value,
      message: groupChats.value,
      attatchment: groupAttatchment.value,
    });
    groupChats.value = "";
    // set scroll div id to ref
    scrollArea.value = document.getElementById("chatScroll") as HTMLElement;
    // fetch chats
    groupChatStore
      .getGroupChat(groupId.value)
      .then((res) => {
        console.log(res);
        groupChatData.value = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
// add groupchat
const addPrivateChat = () => {
  console.log(privateChats.value);
  // emit add chat
  if (socket.value) {
    socket.value.emit("privateMessage", {
      userId: friendId.value,
      message: privateChats.value,
      attatchment: privateAttatchment.value,
    });
  }
};
watchEffect(() => {
  if (groupChats.value !== "") {
    typing.value = true;
  } else {
    typing.value = false;
  }
  // listen for new group message
  if (socket.value) {
    console.log(socket.value);
    socket.value.on("newGroupMessage", (data: any) => {
      console.log(data);
      groupChatData.value.push(data);
      groupChats.value = "";
    });

    socket.value.on("joinGroupSuccess", (data: any) => {
      console.log(data);
    });

    socket.value.on("groupJoin", (data: any) => {
      console.log(data);
    });

    socket.value.on("groupError", (data: any) => {
      console.log(data);
    });
    socket.value.on("groupChatError", (data: any) => {
      console.log(data);
    });

    socket.value.on("groupJoin", (data: any) => {
      console.log("group", data);
    });
    socket.value.on("leaveGroupSuccess", (data: any) => {
      console.log("group", data);
    });

    socket.value.on("groupLeave", (data: any) => {
      console.log("group Leave", data);
    });
    socket.value.on("newMessage", (data: any) => {
      console.log(data);
    });
  }
});

// disconnect socket connection and update active status
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
  <div class="flex relative">
    <!-- logout -->
    <div v-if="isLogout == true">
      <component :is="overlay" />
      <component
        :is="appLogout"
        class="absolute top-[30%] left-[50%] z-50 w-auto p-5"
        @close-logout="isLogout = false"
      />
    </div>
    <!-- image preview component -->
    <div v-if="showPreview == true">
      <component :is="overlay" class="" />
      <component
        :is="preview"
        class="z-50 absolute"
        :image="selectedImg"
        @close-preview="showPreview = false"
        @choose-image="setImage(true)"
      />
    </div>
    <!-- group create modal -->
    <div v-if="isShowCreateGroup == true">
      <component :is="overlay" />
      <component
        :is="createGroup"
        class="absolute top-[5%] left-[40%] z-50 w-auto p-5"
      />
    </div>

    <!-- side nav -->
    <component :is="sideNav" class="w-[30rem]" />
    <!-- groupChat -->
    <!-- chat -->
    <div class="w-full bg-slate-800" v-if="groupId">
      <!-- nav -->
      <div
        class="flex px-8 py-4 text-gray-300 justify-between bg-slate-700 fixed w-[74%] top-0"
      >
        <!--  -->
        <div class="flex space-x-4">
          <div class="relative">
            <img
              :src="
                groupProfileData && groupProfileData?.photo
                  ? groupProfileData.photo.url
                  : '/images/jpeg/noImg.jpeg'
              "
              alt="profile picture"
              class="rounded-full w-12 h-12"
            />
          </div>
          <div>
            <p class="font-extrabold text-[16px]">
              {{ groupProfileData?.name ? groupProfileData?.name : "" }}
            </p>
          </div>
        </div>
        <!--  -->
        <div class="flex space-x-4">
          <i class="fas fa-search"></i>
          <i class="fas fa-phone-volume"></i>
          <i class="fas fa-video"></i>
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
        class="px-10 py-10 space-y-5 mt-20 h-[500px] flex justify-center overflow-y-scroll myOverflow"
        id="chatScroll"
        v-scroll-directive
      >
        <!-- chat loop -->

        <div class="text-right flex space-x-2">
          <div class="space-y-2">
            <div
              v-for="chat in groupChatData"
              :key="chat._id"
              class="flex justify-end"
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
                    class="w-2 absolute left-[-9px] top-0 cursor-pointer"
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
                <div class="flex justify-end space-x-3">
                  <div>
                    <img src="/images/svg/check.svg" alt="check" class="w-2" />
                    <img src="/images/svg/check.svg" alt="check" class="w-2" />
                  </div>
                  <p>{{ moment(chat.createdAt).format("hh:mm:ss A") }}</p>
                  <p class="font-extrabold">
                    {{ profile._id === chat.sender ? "You" : chat.senderName }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
      <!--  -->

      <!-- <div
          class="flex justify-start space-x-1 text-gray-300 text-sm w-auto max-w-[50rem]"
        >
          <div class="text-left flex space-x-2">
            <div class="space-y-2">
              <p
                class="bg-slate-500 px-4 py-4 rounded-md w-auto max-w-[50rem]"
                style="overflow-wrap: break-word"
              >
                hello eddy
              </p>
              <div class="flex justify-end space-x-3">
                <div class="">
                  <img
                    src="/images/jpg/icon.jpg"
                    alt="img"
                    class="rounded-full w-10 h-10"
                  />
                </div>
                <p class="font-extrabold">Sam</p>
                <p>12:36pm</p>
                <div>
                  <img src="/images/svg/check.svg" alt="check" class="w-2" />
                  <img src="/images/svg/check.svg" alt="check" class="w-2" />
                </div>
              </div>
            </div>
          </div>
          <img src="/images/svg/option.svg" alt="" class="w-2 mb-20" /> -->
      <!--chat options -->
      <!-- <div
            class="bg-slate-700 p-3 space-y-5 absolute left-[47%] top-[35%] text-sm rounded-lg hidden"
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
        </div> -->
      <!--  -->
      <!--  -->

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

          <input
            type="text"
            name="message"
            v-model.lazy="groupChats"
            class="focus:outline-none outline-none bg-slate-700 py-2 px-3 w-[60%] text-sm"
            placeholder="message here . . ."
          />
          <!--  -->
          <button
            type="button"
            @click="addGroupChat"
            class="bg-slate-700 p-2 rounded-full"
          >
            <img src="/images/svg/send.svg" alt="send" class="w-[30px]" />
          </button>
        </div>
      </div>
      <!-- end of input -->
    </div>
    <!-- private chat -->
    <!-- chat -->
    <div v-else class="w-full bg-slate-800">
      <!-- nav -->
      <div
        class="flex px-8 py-4 text-gray-300 justify-between bg-slate-700 fixed w-[74%] top-0"
      >
        <!--  -->
        <div class="flex space-x-4">
          <div class="relative">
            <img
              :src="
                friendProfileData && friendProfileData?.photo
                  ? friendProfileData?.photo.url
                  : '/images/jpeg/noImg.jpeg'
              "
              alt="profile picture"
              class="rounded-full w-12 h-12"
            />

            <p
              v-if="
                friendProfileData?.isLoggedIn &&
                friendProfileData?.isLoggedIn == true
              "
              class="absolute w-2 h-2 rounded-full bg-green-700 bottom-0 right-2"
            ></p>
          </div>
          <div>
            <p class="font-extrabold text-[16px]">
              {{
                friendProfileData?.name ? friendProfileData?.name : "Eddy Madu"
              }}
            </p>

            <p
              class="text-xs"
              v-if="
                friendProfileData?.isLoggedIn &&
                friendProfileData?.isLoggedIn == true
              "
            >
              Online
            </p>
            <p class="text-xs" v-else>Offline</p>
          </div>
        </div>
        <!--  -->
        <div class="flex space-x-4">
          <i class="fas fa-search"></i>
          <i class="fas fa-phone-volume"></i>
          <i class="fas fa-video"></i>
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
        class="px-10 py-10 space-y-5 mt-20 h-[500px] overflow-y-scroll myOverflow"
        v-scroll-directive
      >
        <div v-for="chat in friendChatData" :key="chat._id">
          {{ chat }}
        </div>

        <!--  -->
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

          <input
            type="text"
            name="message"
            v-model="privateChats"
            class="focus:outline-none outline-none bg-slate-700 py-2 px-3 w-[60%] text-sm"
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
  </div>
</template>

<style scoped></style>
