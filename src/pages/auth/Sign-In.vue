<script setup lang="ts">
import { reactive, ref, watch, computed, onMounted, watchEffect } from "vue";
import { notify } from "@kyvg/vue3-notification";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../../core/store/index";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers, minLength } from "@vuelidate/validators";
// instantiate router

// insitialize route
const route = useRoute();
// initialize router
const router = useRouter();
// initialize store
const store = useAuthStore();
const userInfo = reactive({
  email: "",
  password: "",
});
const isLoading = ref(false);
// validations rule
const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("Email address is required", required),
      email: helpers.withMessage("Must be a valid email", email),
    },

    password: {
      required: helpers.withMessage("Password is required", required),
      min: helpers.withMessage(
        "Password cannot be less than 8 characters",
        minLength(8)
      ),
    },
  };
});

const v$ = useVuelidate(rules as any, userInfo);
const submitForm = async (): Promise<void> => {
  // check if form is formattted correctly
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect == true) {
    isLoading.value = !isLoading.value;

    store
      .userLogin({
        email: <string>v$.value.email.$model,
        password: <string>v$.value.password.$model,
      })
      .then((res: Response | any) => {
        // set the loading notice to false
        setTimeout(() => {
          isLoading.value = !isLoading.value;
        }, 1000);
        //   send out notification to tell that the signin was successful
        notify({
          type: "success",
          title: "Success",
          text: "SignIn successful. Redirecting...",
        });

        setTimeout(() => {
          window.location.href = "/chat-home";
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
</script>

<template>
  <div class="lg:py-16 py-7 lg:px-0 bg-gray-800 min-h-screen">
    <div class="flex justify-center">
      <div class="w-full sm:px-0 px-8 sm:w-auto">
        <!--form  -->
        <form
          @submit.prevent="submitForm"
          class="lg:min-w-[400px] rounded-lg shadow-lg space-y-6 sm:px-10 mt-6 px-6 py-10 sm:w-auto w-full text-white bg-slate-600"
        >
          <div class="space-y-2">
            <h1 class="text-center logo text-[#000000]">ECHAT</h1>
            <h1 class="font-extrabold">Welcome</h1>
            <p class="">Login in back to you account.</p>
          </div>
          <!--  -->
          <div class="space-y-3">
            <div class="space-y-3">
              <!--  -->
              <div class="space-y-2">
                <p class="">Email</p>
                <input
                  v-model="userInfo.email"
                  type="email"
                  class="border rounded-md text-sm w-full py-2 px-2 text-black"
                />
                <div v-if="v$.email.$error" class="text-red-600 text-xs">
                  {{ "* " + v$.email.$errors[0].$message }}
                </div>
              </div>
              <!--  -->
              <div class="space-y-2">
                <p class="">Password</p>
                <input
                  type="password"
                  v-model="userInfo.password"
                  class="border rounded-md w-full py-2 px-2 text-black"
                />
                <div v-if="v$.password.$error" class="text-red-600 text-xs">
                  {{ "* " + v$.password.$errors[0].$message }}
                </div>
                <router-link to="/auth/forgot-password" class="">
                  <p class="text-xs underline pt-2">
                    Forgot Password?
                  </p></router-link
                >
              </div>
              <!-- button -->
              <div class="w-full pb-2">
                <button
                  class="w-full font-extrabold text-sm py-2 rounded-sm bg-blue-800"
                >
                  {{ isLoading == true ? ". . . Signing in" : "login" }}
                </button>
              </div>
            </div>
            <!--  -->
            <div class="space-y-4">
              <p class="">
                Don’t Have An Account?
                <router-link to="/auth/sign-up" class="">Sign Up</router-link>
              </p>
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
