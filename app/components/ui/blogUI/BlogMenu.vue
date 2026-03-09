<script setup lang='ts'>
import gsap from 'gsap';
import type { BlogCollections } from '~/types/store';

import MenuSelecter from './MenuSelecter.vue';

const menuRef = ref<HTMLDivElement | null>(null);
const menuState = ref<"in" | "out">("in");
const time = ref<number>(0.75);
const blogCollections: BlogCollections[] = ["front_end", "back_end", "gms2", "algorithm", "deep_learning"];

const menuIn = () => {
  gsap.timeline().to(menuRef.value, {
    "top": "0",
    duration: time.value,
    ease: "power1.inOut"
  })
}

const menuOut = () => {
  gsap.to(menuRef.value, {
    "top": "-100%",
    duration: time.value,
    ease: "power1.inOut"
  })
}

const changeMenu = () => {
  switch (menuState.value) {
    case "in":
      menuIn();
      break;
    case "out":
      menuOut();
      break;
  }
  menuState.value = menuState.value === "in" ? "out" : "in";
}

defineExpose({
  changeMenu
})

</script>

<template>
  <div class="blog_menu" ref="menuRef">
    <div class="menu_card">11</div>
    <div class="menu_selecter_box">
      <MenuSelecter v-for="collection in blogCollections" :key="collection" :collections="collection" />
    </div>
  </div>
</template>

<style scoped lang='scss'>
.blog_menu {
  position: fixed;
  top: -100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  width: 100%;
  background-color: #FFFFFF;

  .menu_card {
    height: 100%;
    width: 40%;
    overflow-y: hidden;
  }

  .menu_selecter_box {
    max-height: 80dvh;
    width: 40%;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>