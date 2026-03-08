<script setup lang='ts'>
import { gsap } from 'gsap';
import type { BlogMenuSelecterParams } from '~/types/components';

import MenuSelection from './MenuSelection.vue';

const isactive = ref<boolean>(false);
const selecterRef = ref<HTMLElement | null>(null);
const arrowRef = ref<SVGAElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);
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

const getContentTitle = (file: any, path: string): string => {
  return file.title || path;
};

// const handleMouseEnter = () => {
//   gsap.to(selecterRef.value, {
//     duration: 0.5,
//     color: "#000000",
//     backgroundColor: "#FFFFFF",
//     ease: 'power2.out',
//   });
// };

// const handleMouseLeave = () => {
//   gsap.to(selecterRef.value, {
//     duration: 0.5,
//     color: "#FFFFFF",
//     backgroundColor: "rgba(#000000, 0.5)",
//     ease: 'power2.out',
//   });
// };

const handleClick = () => {
  isactive.value = isactive.value === true ? false : true
  if (isactive.value) {
    gsap.to(arrowRef.value, {
      duration: 0.5,
      rotate: 90,
      ease: 'power2.out',
    });
    gsap.to(containerRef.value, {
      duration: 0.5,
      height: "auto",
      ease: 'power2.out',
    });
  } else {
    gsap.to(arrowRef.value, {
      duration: 0.5,
      rotate: 0,
      ease: 'power2.out',
    });
    gsap.to(containerRef.value, {
      duration: 0.5,
      height: "0px",
      ease: 'power2.out',
    });
  }
}

</script>

<template>
  <div class="menu_selecter" ref="selecterRef">
    <div role="button" class="selecter_title" @click="handleClick">{{
      getCollectionTitle(collections) }}
      <svg class="selecter_arrow" width="20" height="20" viewBox="0 0 100 100" ref="arrowRef">
        <polygon points="20,20 80,50 20,80" fill="#000000" />
      </svg>
    </div>
    <div class="selecter_container" ref="containerRef">
      <MenuSelection v-for="content in contents" :key="content.path" :collections="collections"
        :content-path="getContentPath(content)" :content-title="getContentTitle(content, getContentPath(content))" />
    </div>
  </div>
</template>

<style scoped lang='scss'>
.menu_selecter {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 5px 0;
  height: auto;
  width: 100%;
  color: #FFFFFF;
  font-family: "方正基础像素体";
  transition: all ease-in-out 0.3s;

  .selecter_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    width: calc(100% - 40px - 10px);
    min-height: 50px;
    color: rgba($color: #FFFFFF, $alpha: 0.5);
    font-family: "方正基础像素体";
    background-color: rgba(#000000, 0.5);
    border: 5px solid #000000;
    outline: none;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    user-select: none;

    &:hover {
      color: #FFFFFF;
    }
  }

  .selecter_container {
    display: flex;
    flex-direction: column;
    height: 0px;
    width: 80%;
    overflow: hidden;
  }
}
</style>