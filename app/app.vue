<template>
  <Loading ref="loadingRef" :checkLoading="checkLoading" />
  <NuxtPage />
  <NuxtRouteAnnouncer />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router'
import type { LoadingInstance } from "./types/components";
import Loading from "@/components/ui/Loading.vue";

const loadingRef = ref<LoadingInstance | null>(null)
const router = useRouter()

const checkLoading = () => {
  const timer = setInterval(() => {
    if (document.readyState === "complete") {
      clearInterval(timer);
      loadingRef.value?.loadingOut();
    }
  }, 100);
}

onMounted(() => {
  checkLoading();
  router.beforeEach((to, from, next) => {
    loadingRef.value?.loadingIn(next)
  })
})
</script>

<style lang="scss">
@font-face {
  font-family: "iconfont";
  src:
    url("/icons/iconfont.woff2?t=1772024036100") format("woff2"),
    url("/icons/iconfont.woff?t=1772024036100") format("woff"),
    url("/icons/iconfont.ttf?t=1772024036100") format("truetype");
}

.icon {
  font-family: "iconfont" !important;
  font-size: 1em;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html,
body {
  position: relative;
  margin: 0;
  padding: 0;
  height: 100dvh;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>