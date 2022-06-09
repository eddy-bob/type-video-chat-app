<script setup lang="ts"></script>

<template>
  <notifications class="mt-x" />
  <router-view></router-view>
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
