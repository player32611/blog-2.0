<script setup lang='ts'>
import MusicController from '~/components/ui/musicUI/MusicController.vue';
import MusicWave from '~/components/ui/musicUI/MusicWave.vue';
import Button from '~/components/ui/Button.vue';

</script>

<template>
  <div class="musics">
    <MusicWave />
    <MusicController />
    <Button :text="'back'" :icon="'&#xeaf1;'" :size="'small'" @click="navigateTo('/')" :style="{
      position: 'fixed',
      left: '20px', top: '20px',
    }"></Button>
  </div>
</template>

<style scoped lang='scss'></style>