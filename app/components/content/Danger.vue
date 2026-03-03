<script setup lang='ts'>

</script>

<template>
  <div class="danger custom-block">
    <p class="custom-block-title" v-if="$slots.title">
      <slot name="title" />
    </p>
    <slot />
  </div>
</template>

<style scoped lang='scss'></style>