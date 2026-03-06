<script setup lang='ts'>
import type { BlogMenuSelecterParams } from '~/types/components';

import MenuSelection from './MenuSelection.vue';

const { collections } = defineProps<BlogMenuSelecterParams>();

</script>

<template>
  <div class="menu_selecter">
    <MenuSelection :collections="collections" content-path="html" />
    <MenuSelection :collections="collections" content-path="css" />
    <MenuSelection :collections="collections" content-path="javascript" />
    <MenuSelection :collections="collections" content-path="dom" />
    <MenuSelection :collections="collections" content-path="npm_and_others" />
    <MenuSelection :collections="collections" content-path="network_requests" />
    <MenuSelection :collections="collections" content-path="webpack" />
    <MenuSelection :collections="collections" content-path="react" />
    <MenuSelection :collections="collections" content-path="vue" />
    <MenuSelection :collections="collections" content-path="wechat_miniprogram" />
  </div>
</template>

<style scoped lang='scss'></style>