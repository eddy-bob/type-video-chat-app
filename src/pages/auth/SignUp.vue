<script setup lang="ts">
import { reactive, ref, watch, computed, onMounted, watchEffect } from "vue";
import { notify } from "@kyvg/vue3-notification";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../../core/store/index";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  helpers,
  minLength,
  sameAs,
} from "@vuelidate/validators";
// instantiate router

// initialize route
const route = useRoute();
// initialize router
const router = useRouter();
// initialize store
const store = useAuthStore();
// define user info
const showOption = ref(false);
const userInfo = reactive({
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  zipCode: "",
  phone: "",
  valid: false,
  region: "",
  password: "",
  confirmPassword: "",
});
const onInput = (phone: number, phoneObject: any, input: any) => {
  if (phoneObject?.formatted) {
    userInfo.phone = phoneObject.number;
    userInfo.valid = phoneObject.valid;
  }
};
const isLoading = ref(false);
const validateFirstName = () => {
  return /^[a-zA-Z]+$/.test(userInfo.firstName);
};

const validatePhone = () => {
  return userInfo.valid;
};
const validateLastName = () => {
  return /^[a-zA-Z]+$/.test(userInfo.lastName);
};

// validations rule
const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("Email address is required", required),
      email: helpers.withMessage("Must be a valid email", email),
    },
    firstName: {
      required: helpers.withMessage("First Name is required", required),
      validateFirstName: helpers.withMessage(
        "First name can only include alphabets",
        validateFirstName
      ),
      min: helpers.withMessage(
        "First name cannot be less than 2 characters",
        minLength(2)
      ),
    },
    lastName: {
      required: helpers.withMessage("Last Name is required", required),
      min: helpers.withMessage(
        "Last name cannot be less than 2 characters",
        minLength(2)
      ),
      validateLastName: helpers.withMessage(
        "Last name can only include alphabets",
        validateLastName
      ),
    },
    password: {
      required: helpers.withMessage("Password is required", required),
      min: helpers.withMessage(
        "Password cannot be less than 8 characters",
        minLength(8)
      ),
    },
    confirmPassword: {
      required: helpers.withMessage("Confirm Password is required", required),
      sameAs: helpers.withMessage(
        "Passwords do not match",
        sameAs(userInfo.password)
      ),
    },
    phone: {
      required: helpers.withMessage("Phone number is required", required),
      validatePhone: helpers.withMessage("Invalid Phone Number", validatePhone),
    },
  };
});

const v$ = useVuelidate(rules as any, userInfo);
//define register method
const submitForm = async (): Promise<void> => {
  // check if form is formattted correctly
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect == true) {
    isLoading.value = !isLoading.value;

    store
      .userRegister({
        email: <string>v$.value.email.$model,
        mobile: <string>v$.value.phone.$model,
        password: <string>v$.value.password.$model,
        firstName: <string>v$.value.firstName.$model,
        lastName: <string>v$.value.lastName.$model,
        country: userInfo.country,
        zipCode: userInfo.zipCode,
        region: userInfo.region,
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
          text: "SignUp successful. Redirecting...",
        });

        // //   redirect to the signin page
        // setTimeout(() => {
        //   window.location.href = "/auth/login";
        // }, 3000);
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
            text: "opps ... Something went wrong.,please try again later",
          });
        }
      });
  }
};
</script>

<template>
  <div class="lg:py-16 py-7 lg:px-0 bg-gray-800">
    <div class="flex justify-center">
      <div class="w-full sm:px-0 px-8 sm:w-auto">
        <div class="flex justify-center"></div>
        <!--form  -->
        <form
          @submit.prevent="submitForm"
          class="lg:min-w-[400px] rounded-lg shadow-lg space-y-6 sm:px-10 mt-6 px-6 py-10 sm:w-auto w-full text-white bg-slate-600"
        >
          <h1 class="text-center logo text-[#000000]">ECHAT</h1>
          <div class="space-y-2">
            <h1 class="font-extrabold">Sign up</h1>
            <p class="text-evesGrey">Create your Echat account.</p>
          </div>
          <!--  -->
          <div class="space-y-3">
            <div class="space-y-3">
              <!--  -->
              <div class="sm:flex sm:space-x-3">
                <div class="space-y-2 w-full">
                  <p class="">First Name</p>
                  <input
                    type="text"
                    v-model="userInfo.firstName"
                    class="border rounded-md text-sm w-full py-1 px-2 text-black"
                  />
                  <!-- firstname error -->
                  <div v-if="v$.firstName.$error" class="text-red-600 text-xs">
                    {{ "* " + v$.firstName.$errors[0].$message }}
                  </div>
                </div>
                <div class="space-y-2 w-full">
                  <p class="">Last Name</p>
                  <input
                    type="text"
                    v-model="userInfo.lastName"
                    class="border rounded-md text-sm w-full py-1 px-2 text-black"
                  />
                  <div v-if="v$.lastName.$error" class="text-red-600 text-xs">
                    {{ "* " + v$.lastName.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!--  -->
              <div class="sm:flex sm:space-x-3">
                <div class="space-y-2 w-full">
                  <p class="">country</p>

                  <div class="space-y-1 text-xs">
                    <country-select
                      v-model="userInfo.country"
                      :country="userInfo.country"
                      topCountry="NG"
                      class="text-black py-2 w-full text-sm rounded-md bg-white"
                    />
                  </div>
                </div>
                <div class="space-y-2 w-full">
                  <p class="">Region</p>
                  <region-select
                    class="w-full text-black py-2 rounded-md text-sm bg-white"
                    v-model="userInfo.region"
                    :country="userInfo.country"
                    :region="userInfo.region"
                  />
                </div>
              </div>
              <!--  -->
              <div class="space-y-2 w-full">
                <p class="">phone</p>
                <vue-tel-input
                  :value="userInfo.phone"
                  @input="onInput"
                  class="text-black text-sm rounded-md w-full"
                ></vue-tel-input>
                <div v-if="v$.phone.$error" class="text-red-600 text-xs">
                  {{ "* " + v$.phone.$errors[0].$message }}
                </div>
              </div>

              <!--  -->
              <div class="space-y-2">
                <p class="">Email</p>
                <input
                  type="email"
                  v-model="userInfo.email"
                  class="border rounded-md text-sm w-full py-1 px-2 text-black"
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
                  class="border rounded-md w-full py-1 px-2 text-black"
                />
                <div v-if="v$.password.$error" class="text-red-600 text-xs">
                  {{ "* " + v$.password.$errors[0].$message }}
                </div>
              </div>
              <!--  -->
              <div class="space-y-2">
                <p class="">Confirm Password</p>
                <input
                  type="password"
                  v-model="userInfo.confirmPassword"
                  class="border rounded-md w-full py-1 px-2 text-black"
                />
                <div
                  v-if="v$.confirmPassword.$error"
                  class="text-red-600 text-xs"
                >
                  {{ "* " + v$.confirmPassword.$errors[0].$message }}
                </div>
              </div>
              <!-- button -->
              <div class="w-full pb-2">
                <button
                  class="bg-blue-800 w-full font-extrabold text-sm py-2 rounded-sm"
                >
                  {{ isLoading == true ? ". . . Signing Up" : "Register" }}
                </button>
              </div>
            </div>
            <!--  -->
            <div class="space-y-4">
              <p class="">
                Already Have An Account?
                <router-link to="/auth/login" class="">Sign In</router-link>
              </p>
              <router-link to="/" class="underline"
                >Back to homepage</router-link
              >
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
