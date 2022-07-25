<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import preview from "../../modals/preview-image.vue";
import overlay from "../../modals/overlay.vue";
import { user } from "../../core/store/index";
import { notify } from "@kyvg/vue3-notification";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../../core/store/index";
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, maxLength } from "@vuelidate/validators";
import chooseImage from "../../mixins/choose-file";
// instantiate store
const userStore = user();

// initialize route
const route = useRoute();
// initialize router
const router = useRouter();
// initialize store
const store = useAuthStore();
// define user info

const userInfo = reactive<{
  profilePicture?: ArrayBuffer | string;
  coverPhoto?: ArrayBuffer | string;
  about?: string;
}>({});
const selectedImg = ref<ArrayBuffer>();
const isLoading = ref(false);
const showPreview = ref(false);
const imageType = ref<string | null>();
type FileType = {
  showpreview: boolean;
  selectedimg: ArrayBuffer;
  imagetype: string;
};
const setProfilePic = () => {
  userInfo.profilePicture = selectedImg!.value as ArrayBuffer;

  userStore
    .updateProfilePic(userInfo.profilePicture)
    .then((res) => {
      notify({
        type: "success",
        title: "Success",
        text: res.message || "Profile picture update successful",
      });
    })
    .catch((err) => {
      notify({
        type: "error",
        title: "Error",
        text: err.data.Error || "Profile picture update failed",
      });
    });
};
const setCoverPhoto = () => {
  userInfo.coverPhoto = selectedImg!.value as ArrayBuffer;
  userStore
    .updateCoverPhoto(userInfo.coverPhoto)
    .then((res) => {
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
        text: err.data.Error || "Cover photo update failed",
      });
    });

  //define update profile method
  const submitForm = async (): Promise<void> => {
    // check if form is formattted correctly
    const isFormCorrect = await v$.value.$validate();
    if (isFormCorrect == true) {
      isLoading.value = !isLoading.value;

      userStore
        .updateProfile({
          about: <string>v$.value.about.$model,
        })
        .then((res: Response | any) => {
          // set the loading notice to false
          setTimeout(() => {
            isLoading.value = !isLoading.value;
          }, 1000);
          //   send out notification to tell that the signup was successful
          notify({
            type: "success",
            title: "Success",
            text: "Profile updated successful. Redirecting...",
          });

          //   redirect to the signin page
          setTimeout(() => {
            window.location.href = "/auth/login";
          }, 3000);
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
};

const selectImg = async (type: string) => {
  const dat = (await chooseImage(event, type, notify)) as FileType;
  showPreview.value = dat.showpreview as boolean;
  selectedImg.value = dat.selectedimg;
  imageType.value = dat.imagetype;
};
const setImage = (type: string) => {
  if (imageType.value === "profilePicture") {
    setProfilePic();
  } else {
    setCoverPhoto();
  }
};

// validations rule
const rules = computed(() => {
  return {
    about: {
      min: helpers.withMessage(
        "about cannot be less than 10 characters",
        minLength(10)
      ),
      max: helpers.withMessage(
        "about cannot be more than 32 characters",
        maxLength(32)
      ),
    },
  };
});

const v$ = useVuelidate(rules as any, userInfo);
</script>

<template>
  <div class="bg-gray-800 min-h-screen relative">
    <!-- image preview component -->
    <div v-if="showPreview == true">
      <component :is="overlay" class="" />
      <component
        :is="preview"
        class="z-50 absolute"
        :image="selectedImg"
        @close-preview="showPreview = false"
        @choose-image="setImage"
      />
    </div>
    <div class="flex justify-center">
      <div class="w-full sm:px-0 px-8 sm:w-auto">
        <div class="flex justify-center"></div>
        <!--form  -->
        <form
          @submit.prevent="submitForm"
          class="lg:min-w-[700px] rounded-lg shadow-lg space-y-6 sm:px-10 mt-6 px-6 py-10 sm:w-auto w-full text-white bg-slate-600"
        >
          <h1 class="text-center logo text-[#000000]">ECHAT</h1>
          <div class="space-y-2">
            <h1 class="font-extrabold">Sign up continue</h1>
            <p class="">Update your Echat Profile.</p>
          </div>
          <!--  -->
          <div class="space-y-3">
            <div class="space-y-3">
              <!--  -->
              <div class="border-b border-slate-600 pb-4">
                <div class="relative space-y-5">
                  <img
                    :src="
                      userInfo.coverPhoto
                        ? userInfo.coverPhoto
                        : '/images/png/cover.png'
                    "
                    alt=""
                    class="h-48 w-full"
                  />
                  <label for="coverphoto">
                    <i
                      class="fas fa-camera absolute bottom-1 right-1 cursor-pointer"
                    ></i>
                    <input
                      @change="selectImg('coverPhoto')"
                      type="file"
                      name=""
                      id="coverphoto"
                      class="hidden"
                    />
                  </label>
                  <div class="absolute bottom-[-17%] left-[45%]">
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
                        class="fas fa-camera absolute bottom-1 right-1 cursor-pointer"
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
              </div>
              <!--  -->
              <div class="space-y-2">
                <p class="">About you</p>
                <div v-if="v$.about.$error" class="text-red-600 text-xs">
                  {{ "* " + v$.about.$errors[0].$message }}
                </div>
                <textarea
                  v-model="userInfo.about"
                  class="border rounded-md text-sm w-full py-1 px-2 bg-gray-100 text-black focus:outline-none outline-none"
                ></textarea>
              </div>

              <!-- button -->
              <div class="w-full pb-2">
                <button
                  class="bg-blue-800 w-full font-extrabold text-sm py-2 rounded-sm"
                >
                  {{ isLoading == true ? ". . . Signing Up" : "Update" }}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  font-family: "Times New Roman", Times, serif;
  font-style: normal;
  font-weight: 400;
}
h1 {
  font-family: "Poppins";
  font-size: 20px;
}
input {
  font-family: "Segoe UI";
}
</style>
