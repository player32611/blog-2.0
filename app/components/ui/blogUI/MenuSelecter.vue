<script setup lang='ts'>
import { gsap } from 'gsap';
import type { BlogMenuSelecterParams } from '~/types/components';

import MenuSelection from './MenuSelection.vue';

const isactive = ref<boolean>(false);
const selecterRef = ref<HTMLElement | null>(null);
const { collections } = defineProps<BlogMenuSelecterParams>();
const { data: contents } = await useAsyncData(
  `menu-${collections}`,
  () => queryCollection(collections).all()
);

const getContentPath = (file: any): string => {
  if (!file.path) return '';
  const parts = file.path.split('/');
  return parts[parts.length - 1];
};

const handleMouseEnter = () => {
  gsap.to(selecterRef.value, {
    duration: 0.5,
    opacity: 1,
    color: "#000000",
    backgroundColor: "#FFFFFF",
    ease: 'power2.out',
  });
};

const handleMouseOut = () => {
  gsap.to(selecterRef.value, {
    duration: 0.5,
    opacity: 0.5,
    color: "#FFFFFF",
    backgroundColor: "#000000",
    ease: 'power2.out',
  });
};

const handleClick = () => {
  isactive.value = !isactive.value;
}

</script>

<template>
  <div class="menu_selecter" ref="selecterRef">
    <div class="selecter_title" @mouseenter="handleMouseEnter" @mouseout="handleMouseOut" @click="handleClick">{{
      collections }}</div>
    <div class="selecter_container">
      <MenuSelection v-for="content in contents" :key="content.path" :collections="collections"
        :content-path="getContentPath(content)" />
    </div>
  </div>
</template>

<style scoped lang='scss'>
.menu_selecter {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  color: #FFFFFF;
  font-family: "方正基础像素体";

  .selecter_title {
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 0 20px;
    height: 50px;
    width: 100%;
    text-align: right;
    cursor: pointer;
  }

  .selecter_container {
    display: none;
  }
}
</style>