<script setup lang='ts'>
import BlogBackGround from "~/components/ui/blogUI/BlogBackGround.vue";
import Button from "~/components/ui/Button.vue";

const { page } = await useBlogPage("/front-end/html");

</script>

<template>
  <BlogBackGround></BlogBackGround>
  <div class="blogs">
    <Button :text="'back'" :icon="'&#xeaf1;'" :size="'small'" @click="navigateTo('/')" :style="{
      position: 'fixed',
      left: '20px', top: '20px',
    }"></Button>
    <Button :text="'menu'" :icon="'&#xeaf1;'" :size="'small'" @click="" :style="{
      position: 'fixed', right: '20px',
      top: '20px',
    }"></Button>
    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>

<style lang='scss'>
@import "~/styles/blogs.scss"
</style>