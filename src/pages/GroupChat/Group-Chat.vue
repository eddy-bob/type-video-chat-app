<script lang="ts" setup>
import {
  ref,
  watchEffect,
  watch,
  shallowRef,
  onUpdated,
  inject,
  onBeforeUnmount,
  nextTick,
} from "vue";
import { useRoute } from "vue-router";
import { notify } from "@kyvg/vue3-notification";
import UIcomponent from "../../components/UIcomponent/spinner.vue";
import moment from "moment";
import SocketioService from "../../core/utils/socket-connection";
import {
  useGroupStore,
  useGroupChat,
  useAuthStore,
} from "../../core/store/index";
// setup socket connection
SocketioService.setupSocketConnection()
  .then((response) => {
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
// innitialize store
const groupStore = useGroupStore();
const groupChatStore = useGroupChat();
const authStore = useAuthStore();
// variables
const groupId = ref<string>();
const profile = ref();
const socket = shallowRef<any>();
const groupAttatchment = ref<string[]>([]);
const groupChats = ref("");

const loading = ref(false);
const typing = ref(false);
const scrollArea = ref<HTMLElement>();
const groupChatData = ref<any[]>([]);
const groupProfileData = ref<any>();
const prev = ref<any>("");
// inject and provide
const showSide = inject("showSide");
// set groupId on created
groupId.value = route.params.groupId as string;
const scrollToBottom = () => {
  const targetHeight = scrollArea.value!.scrollHeight;
  scrollArea.value!.scrollTop = targetHeight;
};
const scrollToBottomChat = () => {
  
  nextTick(() => {
    const el = document.getElementById("chatScroll") as HTMLElement;
    const targetHeight = el.scrollHeight + 100;
    el.scrollTop = targetHeight;
    console.log("scroll ran");
  });
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
groupProfile(groupId.value);

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
      .getGroupChat(groupId.value as string)
      .then((res) => {
        console.log(res);
        groupChatData.value = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
const typingNotify = () => {
  if (socket!.value) {
    const myEvent: any = event;
    console.log(myEvent?.target!.value);
    if (myEvent!.target.value && myEvent?.target!.value !== "") {
      console.log("typing");
      typing.value = true;
      socket!.value.emit("group-typing", {
        value: true,
        recipient: groupId.value,
      });
    } else {
      console.log(" stop typing");

      socket!.value.emit("group-typing", {
        value: false,
        recipient: groupId.value,
      });
      typing.value = false;
    }
  }
};
// listen for when there is a change in the group id

watch(route, (current, previous) => {
  groupId.value = route.params.groupId as string;
  // fetch auth user profile
  if (typeof route.params.groupId !== "undefined") {
    groupProfile(groupId.value);
    groupChat(groupId.value);
  }
});
groupChat(groupId.value);
watchEffect(() => {
  typingNotify();
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
      notify({
        type: "error",
        title: "Error",
        text: data.message || "Chat send failed",
      });
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
onUpdated(() => {
  if (groupId.value !== "" && scrollArea.value && typing.value == false) {
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
  <div class="w-full bg-slate-800 min-h-screen h-auto relative">
    <!-- nav -->
    <div
      class="flex px-8 py-4 text-gray-300 justify-between bg-slate-700 fixed z-30 lg:relative lg:w-full w-screen top-0"
    >
      <!--  -->
      <div class="flex space-x-4">
        <button @click="showSide = !showSide">
          <i class="fas fa-bars fa-xl lg:hidden"></i>
        </button>
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
          <p class="font-extrabold text-[16px] lg:mt-0 mt-3">
            {{ groupProfileData?.name ? groupProfileData?.name : "" }}
          </p>
        </div>
      </div>
      <!--  -->
      <div class="flex space-x-4">
        <button><i class="fas fa-search"></i></button>
        <button><i class="fas fa-phone-volume"></i></button>
        <button><i class="fas fa-video"></i></button>
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
      class="md:px-10 px-5 lg:py-10 py-16 space-y-5 mt-7 lg:h-[500px] md:h-[900px] sm:h-[800px] h-[550px] overflow-y-scroll myOverflow"
      id="chatScroll"
      style="scroll-behavior: smooth"
      v-scroll-directive
    >
      <!-- chat loop -->
      <div v-if="groupProfileData.name">
        <div class="text-left space-x-2">
          <div class="space-y-2">
            <div
              v-for="chat in groupChatData"
              :key="chat._id"
              class="flex justify-end"
            >
              <div>
                <div class="relative w-full">
                  <p
                    class="bg-slate-500 px-4 py-4 rounded-md w-auto text-sm lg:max-w-[50rem] max-w-[20rem]"
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

      <div v-else class="w-full bg-slate-800 text-gray-300 text-center">
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

    <!--  -->

    <!--  -->
    <!-- input field -->
    <div class="fixed bottom-0 w-full my-2 text-gray-200 lg:px-10 px-5">
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
          name="message"
          @keyup="typingNotify"
          v-model.lazy="groupChats"
          class="focus:outline-none outline-none bg-slate-700 py-2 h-12 px-3 lg:w-[60%] w-screen myOverflow text-sm"
          placeholder="message here . . ."
        />
        <!--  -->
        <button
          :disabled="groupProfileData.name ? false : true"
          type="button"
          @click="addGroupChat"
          class="bg-slate-700 lg:p-2 p-4 rounded-full"
        >
          <img
            src="/images/svg/send.svg"
            alt="send"
            class="lg:w-[30px] w-[25px]"
          />
        </button>
      </div>
    </div>
    <!-- end of input -->
  </div>

  <!--  -->
</template>

<style></style>
