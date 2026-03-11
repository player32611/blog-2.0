<script setup lang='ts'>

import ImageBackground from '~/components/ui/imageUI/ImageBackground.vue';
import ImageContainer from '~/components/ui/imageUI/ImageContainer.vue';
import Button from '~/components/ui/Button.vue';

</script>

<template>
  <div class="images">
    <ImageBackground />
    <ImageContainer />
    <Button :text="'back'" :icon="'&#xeaf1;'" :size="'small'" @click="navigateTo('/')" :style="{
      position: 'fixed',
      left: '20px', top: '20px',
    }"></Button>
  </div>
</template>

<style scoped lang='scss'>
.images {
  position: relative;
  width: 100%;
  height: 100dvh;
  user-select: none;
}
</style>