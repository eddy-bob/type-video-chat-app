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
</script>

<template>
  <div class="lg:py-16 py-7 lg:px-0 bg-gray-800 min-h-screen">
    <div class="flex justify-center">
      <div class="w-full sm:px-0 px-8 sm:w-auto">
        <!--form  -->
        <form
          class="lg:min-w-[400px] rounded-lg shadow-lg space-y-3 sm:px-10 mt-6 px-6 py-10 sm:w-auto w-full text-white bg-slate-600"
        >
          <div class="space-y-2">
            <h1 class="text-center logo text-[#000000]">ECHAT</h1>

            <p class="">reset password to your account.</p>
          </div>
          <!--  -->
          <div class="space-y-3">
            <div class="space-y-3">
              <!--  -->
              <div class="space-y-2">
                <p class="">new Password</p>
                <input
                  type="password"
                  value="123456"
                  class="border rounded-md text-sm w-full py-2 px-2 text-black"
                />
              </div>
              <!--  -->
              <div class="space-y-2">
                <p class="">confirm Password</p>
                <input
                  type="password"
                  value="123456"
                  class="border rounded-md w-full py-2 px-2 text-black"
                />
              </div>
              <!-- button -->
              <div class="w-full pb-2">
                <button
                  class="w-full font-extrabold text-sm py-2 rounded-sm bg-blue-800"
                >
                  Change password
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
