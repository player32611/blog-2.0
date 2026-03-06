<script setup lang='ts'>
import MenuSelecter from './MenuSelecter.vue';
import gsap from 'gsap';

const menuRef = ref<HTMLDivElement | null>(null);
const menuState = ref<"in" | "out">("in");
const time = 0.75;

const menuIn = () => {
  gsap.timeline().to(menuRef.value, {
    "top": "0",
    duration: time,
    ease: "power1.inOut"
  })
}

const menuOut = () => {
  gsap.to(menuRef.value, {
    "top": "-100%",
    duration: time,
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
    <MenuSelecter collections="front_end" />
  </div>
</template>

<style scoped lang='scss'>
.blog_menu {
  position: fixed;
  top: -100%;
  margin: 50px;
  padding: 50px;
  height: 80dvh;
  width: 60%;
  border: 5px solid #FFFFFF;
}
</style>