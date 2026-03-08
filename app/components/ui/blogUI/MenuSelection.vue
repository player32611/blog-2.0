<script setup lang='ts'>
import type { BlogMenuSelectionParams } from '~/types/components';

const { collections, contentPath, contentTitle } = defineProps<BlogMenuSelectionParams>()
const { setActiveBlogCollection, setActiveBlogContent } = useBlogStore()

const handleClick = () => {
  setActiveBlogCollection(collections)
  setActiveBlogContent(contentPath)
}

</script>

<template>
  <button class="menu_selection" @click="handleClick">
    {{ contentTitle || contentPath }}
  </button>
</template>

<style scoped lang='scss'>
.menu_selection {
  margin: 5px 0;
  min-height: 50px;
  width: 100%;
  color: #000000;
  font-family: "方正基础像素体";
  text-align: left;
  background-color: rgb(0, 0, 0, 0);
  border: 5px solid #000000;
  cursor: pointer;
}
</style>