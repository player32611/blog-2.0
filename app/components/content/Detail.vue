<script setup lang='ts'>

</script>

<template>
  <details class="details custom-block">
    <summary>
      <slot name="title" mdc-unwrap="p" />
    </summary>
    <p class="custom-block-title" v-if="$slots.title">

    </p>
    <slot />
  </details>
</template>

<style scoped lang='scss'>
.details.custom-block {
  summary {
    cursor: pointer;
  }
}
</style>