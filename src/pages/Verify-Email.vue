<script setup lang="ts">
import { reactive, ref, watch, computed, onMounted, watchEffect } from "vue";
import { notify } from "@kyvg/vue3-notification";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../core/store/index";
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

            <p class="text-center">
              Email verified successfully. redirecting.......
            </p>
          </div>
          <div class="w-full flex justify-center">
            <img src="/images/svg/check.svg" alt="verified" class="w-[46%]"/>
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
