<script setup lang="ts">
import { provide, ref } from "vue";
import sideNav from "../components/sideNav.vue";
import appLogout from "./modals/logout.vue";
import createGroup from "./modals/create-group.vue";
import overlay from "./modals/overlay.vue";
import preview from "./modals/preview-image.vue";

// variables
const isShowCreateGroup = ref(false);
const isLogout = ref(false);
const showPreview = ref(false);
const imageType = ref<string | null>();
const isSetImage = ref(false);
const selectedImg = ref<ArrayBuffer>();
provide("showCreateGroup", isShowCreateGroup);
provide("showLogout", isLogout);
provide("showPreview", showPreview);
provide("selectedImg", selectedImg);
provide("setImage", isSetImage);
provide("imageType", imageType);
const setImage = (value: boolean) => {
  isSetImage.value = value;
};
</script>

<template>
  <div class="flex w-full relative">
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
    <!--  -->
    <notifications class="mt-x" />
    <router-view name="leftNav" class="w-[30rem]"></router-view>
    <router-view class="w-full"></router-view>
    <!-- <router-view name="rightNav"></router-view> -->
  </div>
</template>

<style scoped>
.mt-x {
  margin-top: 7%;
}
.vue-notification-template {
  padding-top: 15px !important;
  padding-bottom: 15px !important;
}
.notification-title {
  font-size: 14px !important;
}
.notification-content {
  font-size: 16px !important;
}
</style>
