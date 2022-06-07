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
  <div>welcome to login page</div>
</template>

<style scoped></style>
