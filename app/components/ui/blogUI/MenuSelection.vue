<script setup lang='ts'>
import type { BlogMenuSelectionParams } from '~/types/components';

const { collections, contentPath } = defineProps<BlogMenuSelectionParams>()
const { setActiveBlogCollection, setActiveBlogContent } = useBlogStore()

const handleClick = () => {
  setActiveBlogCollection(collections)
  setActiveBlogContent(contentPath)
}

</script>

<template>
  <button class="menu_selection" @click="handleClick">
    {{ contentPath }}
  </button>
</template>

<style scoped lang='scss'>
.menu_selection {
  height: 50px;
  width: 100px;
  background: red;
}
</style>