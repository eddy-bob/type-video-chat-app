<script setup lang="ts">
import { ref, reactive, inject, watchEffect, computed } from "vue";

import preview from "../../modals/preview-image.vue";
import overlay from "../../modals/overlay.vue";
import chooseImage from "../mixins/choose-file";
import { notify } from "@kyvg/vue3-notification";
import { helpers, minLength, maxLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { user, useAuthStore } from "../core/store/index";
const userStore = user();
const authStore = useAuthStore();
// pass required image data from the parent
let showPreview = inject<{ value: boolean }>("showPreview");
let selectedImg = inject<{ value: any }>("selectedImg");
let imageType = inject<{ value: string }>("imageType");
let setImage = inject<{ value: boolean }>("setImage");
let profile = ref<any>({});
let editAbout = ref(false);
const userInfo = reactive<{
  profilePicture?: any;
  coverPhoto?: any;
  about?: string;
}>({});

const isLoading = ref(false);

type FileType = {
  showpreview: boolean;
  selectedimg: any;
  imagetype: string;
};
const getProfile = () => {
  authStore
    .getAuthUser()
    .then((res) => {
      console.log(res.data.data);
      profile.value = res.data.data;
      userInfo.profilePicture = profile.value.photo?.url;
      userInfo.coverPhoto = profile.value.coverPhoto?.url;
      console.log(profile);
    })
    .catch((err) => {
      console.log(err);
    });
};
getProfile();
// validation rules
const rules = computed(() => {
  return {
    about: {
      min: helpers.withMessage(
        "about cannot be less than 10 characters",
        minLength(10)
      ),
      max: helpers.withMessage(
        "about cannot be more than 300 characters",
        maxLength(300)
      ),
    },
  };
});

const v$ = useVuelidate(rules as any, userInfo);
const setProfilePic = () => {
  userStore
    .updateProfilePic(selectedImg!.value as any)
    .then((res) => {
      userInfo.profilePicture = selectedImg!.value;
      notify({
        type: "success",
        title: "Success",
        text: res.message || "Profile picture update successful",
      });
    })
    .catch((err) => {
      console.log(err);
      notify({
        type: "error",
        title: "Error",
        text:
          err.data && err.data.Error
            ? err.data.Error
            : "Profile picture update failed",
      });
    });
};
const setCoverPhoto = () => {
  userStore
    .updateCoverPhoto(selectedImg!.value as any)
    .then((res) => {
      userInfo.coverPhoto = selectedImg!.value;
      notify({
        type: "success",
        title: "Success",
        text: "Cover photo updated successfully",
      });
    })
    .catch((err) => {
      notify({
        type: "error",
        title: "Error",
        text:
          err.data && err.data.Error
            ? err.data.Error
            : "Cover photo update failed",
      });
    });
};

//define update profile method
const updateAbout = async (): Promise<void> => {
  // check if form is formattted correctly
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect == true) {
    isLoading.value = !isLoading.value;

    userStore
      .updateProfile({
        about: <any>v$.value.about.$model,
      })
      .then((res: Response | any) => {
        editAbout.value = false;
        profile.value.about = res.data.data.about;
        // set the loading notice to false
        setTimeout(() => {
          isLoading.value = !isLoading.value;
        }, 1000);
        //   send out notification to tell that the signup was successful
        notify({
          type: "success",
          title: "Success",
          text: "About updated successfully",
        });
      })
      .catch((err: any) => {
        setTimeout(() => {
          isLoading.value = !isLoading.value;
        }, 1000);

        if (err.data && err.data.Error) {
          notify({
            type: "error",
            title: "Error",
            text: err.data.Error,
          });
        } else {
          notify({
            type: "error",
            title: "Error",
            text: err,
          });
        }
      });
  }
};
const selectImg = async (type: string) => {
  const dat = (await chooseImage(event, type, notify)) as FileType;
  showPreview!.value = dat.showpreview as boolean;
  selectedImg!.value = dat.selectedimg;
  imageType!.value = dat.imagetype;
  setImage!.value = false;
};

const insetImage = (type: any) => {
  if (type!.value === "profilePicture") {
    setProfilePic();
  } else {
    setCoverPhoto();
  }
};
watchEffect(() => {
  if (setImage!.value == true) {
    insetImage(imageType);
  }
});
</script>

<template>
  <div
    class="bg-slate-800 border-r border-r-slate-600 text-gray-300 overflow-y-scroll myOverflow lg:max-h-screen"
  >
    <div class="border-b border-slate-600 pb-4">
      <div class="relative space-y-5">
        <img
          :src="
            profile?.coverPhoto
              ? userInfo.coverPhoto
              : '/images/jpeg/noImg.jpeg'
          "
          alt=""
          class="h-48 lg:w-[25rem] w-screen"
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
        <div
          class="absolute bottom-[-17%] lg:left-[35%] md:left-[45%] left-[40%]"
        >
          <img
            :src="
              profile?.photo
                ? userInfo.profilePicture
                : '/images/jpeg/noImg.jpeg'
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
          <p class="font-extrabold">
            {{
              profile._id
                ? profile.firstName + " " + profile.lastName
                : "...Loading"
            }}
          </p>
          <p class="text-sm">{{ profile.phone }}</p>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="border-b border-slate-600 py-6 px-6 text-xs space-y-4">
      <div class="flex w-full justify-between">
        <p class="">
          {{ profile.about ? profile.about : "Hey there, i am amazing" }}
        </p>

        <i
          class="fas fa-pencil-alt cursor-pointer"
          @click="(editAbout = !editAbout), (userInfo.about = profile.about)"
        ></i>
      </div>
      <!-- edit about -->
      <div v-if="editAbout == true" class="space-y-4">
        <div v-if="v$.about.$error" class="text-red-600 text-xs">
          {{ "* " + v$.about.$errors[0].$message }}
        </div>
        <textarea
          v-model="userInfo.about"
          class="p-2 w-full bg-transparent border"
          name=""
          id=""
          rows="5"
        ></textarea>
        <div class="w-full flex justify-end">
          <button
            @click="updateAbout"
            type="button"
            class="appBgGreen px-4 py-2 outline-none focus:outline-none"
          >
            Update
          </button>
        </div>
      </div>
      <div class="flex font-extrabold space-x-3">
        <i class="fas fa-mail-bulk"></i>
        <p>{{ profile.email ? profile.email : "...Loading" }}</p>
      </div>
      <div class="flex font-extrabold space-x-3">
        <img src="/images/svg/location.svg" alt="location" />
        <p>{{ profile.region }} {{ profile.country }}</p>
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
