<script setup lang='ts'>
import { useSoundEffect } from '@/composables/useSoundEffect';
import { useThemeStore } from '@/stores/themeStore';
import { useSoundStore } from '@/stores/soundStore';
import type { ButtonParams } from '@/types/components';
import { ref } from 'vue';

const hasInteracted = ref(false);
const { theme } = useThemeStore();
const { effectsVolume } = useSoundStore();
const { text, size, icon, onClick, style } = defineProps<ButtonParams>();

const undertaleSound = useSoundEffect('/sounds/effects/undertale-button.wav');
// const touhouSound = useSoundEffect('/sounds/touhou-button.mp3')
const handleMouseEnter = () => {
  if (hasInteracted) {
    if (effectsVolume) {
      if (theme === 'undertale') undertaleSound.play();
      // else
      //   touhouSound.play()
    }
  }
};

const handleClick = () => {
  // 标记用户已交互
  if (!hasInteracted.value) {
    hasInteracted.value = true;
  }
  // 执行原始点击处理
  if (onClick) onClick();
};
</script>

<template>
  <button :class="`${theme} ${size}`" @click="handleClick" @mouseenter="handleMouseEnter" :style="style">
    <div class="container">
      <span class="icon">{{ icon }}</span>
      <span v-for="(char, index) in text.toUpperCase().split('')" :key="index">{{ char }}</span>
    </div>
  </button>
</template>

<style scoped lang='scss'>
$base-height: 42px;
$base-width: 110px;

button {
  font-size: 1em;
  user-select: none;

  &.small {
    height: $base-height;
    width: $base-width;
    font-size: 1.3em;
  }

  &.large {
    height: $base-height * 2;
    width: $base-width * 2;
    font-size: 2.5em;
  }

  &.undertale {
    background: #000000;
    color: #ff7f27;
    text-align: right;
    font-weight: 900;
    font-family: "Mars Needs Cunnilingus";
    border: 0.2em solid #ff7f27;
    cursor: pointer;
  }

  &.undertale:hover {
    color: #ffff00;
    border: 0.2em solid #ffff00;
  }

  .container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>