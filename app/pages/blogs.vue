<script setup lang='ts'>
import type { BlogMaskInstance, BlogMenuInstance } from "~/types/components";

import BlogBackGround from "~/components/ui/blogUI/BlogBackGround.vue";
import BlogMask from "~/components/ui/blogUI/BlogMask.vue";
import BlogMenu from "~/components/ui/blogUI/BlogMenu.vue";
import Button from "~/components/ui/Button.vue";

const { useBlogContent } = useBlogStore();
const maskRef = ref<BlogMaskInstance | null>(null);
const menuRef = ref<BlogMenuInstance | null>(null);
const page = useBlogContent();

// onMounted(() => {

// });

</script>

<template>
  <div class="blogs">
    <div class="blog_content">
      <ContentRenderer v-if="page" :value="page" />
    </div>
    <BlogBackGround></BlogBackGround>
    <BlogMenu ref="menuRef"></BlogMenu>
    <BlogMask ref="maskRef"></BlogMask>
    <Button :text="'back'" :icon="'&#xeaf1;'" :size="'small'" @click="navigateTo('/')" :style="{
      position: 'fixed',
      left: '20px', top: '20px',
    }"></Button>
    <Button :text="'menu'" :icon="'&#xeaf1;'" :size="'small'" @click="() => {
      maskRef?.changeMask()
      menuRef?.changeMenu()
    }" :style="{
      position: 'fixed', right: '20px',
      top: '20px',
    }"></Button>
  </div>
</template>

<style lang='scss'>
// @import "~/styles/blogs.scss";

.blogs {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100%;

  .blog_content {
    margin: 50px;
    padding: 50px;
    height: auto;
    width: 60%;
    color: #FFFFFF;
    border: 5px solid #FFFFFF;
    font-family: "方正基础像素体";
  }
}
</style>