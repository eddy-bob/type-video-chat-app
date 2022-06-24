<script setup lang="ts">
import { ref, reactive, inject } from "vue";
import preview from "../../modals/preview-image.vue";
import overlay from "../../modals/overlay.vue";
import chooseImage from "../mixins/choose-file";
import { notify } from "@kyvg/vue3-notification";
import { user, useAuthStore } from "../core/store/index";
const userStore = user();
const authStore = useAuthStore();
let showPreview = inject<{ value: boolean }>("showPreview");
let selectedImg = inject<{ value: ArrayBuffer }>("selectedImg");
let imageType = inject<{ value: string }>("imageType");
const userInfo = reactive<{
  profilePicture?: ArrayBuffer;
  coverPhoto?: ArrayBuffer;
  about?: string;
}>({});

const isLoading = ref(false);

type FileType = {
  showpreview: boolean;
  selectedimg: ArrayBuffer;
  imagetype: string;
};
const setProfilePic = () => {
  userInfo.profilePicture = selectedImg!.value as ArrayBuffer;
};
const setCoverPhoto = () => {
  userInfo.coverPhoto = selectedImg!.value as ArrayBuffer;
};
const selectImg = async (type: string) => {
  const dat = (await chooseImage(event, type, notify)) as FileType;
  console.log(dat);
  showPreview!.value = dat.showpreview as boolean;
  selectedImg!.value = dat.selectedimg;
  imageType!.value = dat.imagetype;
};
const setImage = (type: string) => {
  if (imageType.value === "profilePicture") {
    setProfilePic();
  } else {
    setCoverPhoto();
  }
};
</script>

<template>
  <div class="bg-slate-800 border-r border-r-slate-600 text-gray-300">
    <div class="border-b border-slate-600 pb-4">
      <div class="relative space-y-5">
        <img
          :src="
            userInfo.coverPhoto ? userInfo.coverPhoto : '/images/png/cover.png'
          "
          alt=""
          class="h-48 w-[25rem]"
          id="coverphoto"
        />
        <label for="coverPhoto">
          <i class="fas fa-camera absolute bottom-1 right-1 cursor-pointer"></i>
          <input
            @change="selectImg('coverPhoto')"
            type="file"
            name=""
            id="coverPhoto"
            class="hidden"
          />
        </label>
        <div class="absolute bottom-[-17%] left-[35%]">
          <img
            :src="
              userInfo.profilePicture
                ? userInfo.profilePicture
                : '/images/jpg/icon.jpg'
            "
            alt=""
            class="rounded-full border-4 border-slate-800 w-20 h-20"
          />
          <label for="profilePicture">
            <i
              class="fas fa-camera absolute bottom-1 right-2 cursor-pointer"
            ></i>
            <input
              @change="selectImg('profilePicture')"
              type="file"
              name=""
              id="profilePicture"
              class="hidden"
            />
          </label>
        </div>
      </div>
      <!--  -->
      <div class="flex justify-center mt-10">
        <div class="text-center">
          <p class="font-extrabold">Destiny Junior</p>
          <p class="text-sm">+2349075219854</p>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="border-b border-slate-600 py-6 px-6 text-xs space-y-4">
      <p class="">
        I am a fullstack Engineer with expertise in node.js/typescript and
        vue.js. Coding to me is as vital as living.
      </p>
      <div class="flex font-extrabold space-x-3">
        <i class="fas fa-mail-bulk"></i>
        <p>DestinyJunior@gmail.com</p>
      </div>
      <div class="flex font-extrabold space-x-3">
        <img src="/images/svg/location.svg" alt="location" />
        <p>California, USA</p>
      </div>
    </div>
    <!--  -->
    <div class="space-y-4 py-3 px-6">
      <div class="flex justify-between text-xs">
        <p class="font-extrabold">Media</p>
        <p class="text-green-700">Show all</p>
      </div>
      <div class="grid grid-cols-4 gap-1">
        <div>
          <img src="/images/jpg/icon.jpg" class="rounded-lg" alt="" />
        </div>
        <div>
          <img src="/images/jpg/icon.jpg" alt="" class="rounded-lg" />
        </div>
        <div>
          <img src="/images/jpg/icon.jpg" alt="" class="rounded-lg" />
        </div>
        <div class="relative">
          <p class="w-full absolute bg-gray-500 bg-opacity-[0.6] h-full"></p>
          <img src="/images/jpg/icon.jpg" alt="" class="rounded-lg" />
          <p class="absolute top-[35%] left-[35%]">+2</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
