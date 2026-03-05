<script setup lang='ts'>

</script>

<template>
  <code>
    <slot></slot>
  </code>
</template>

<style lang='scss'>
$code-bg: rgba(142, 150, 170, .14);

code {
  padding: 3px 6px;
  border-radius: 4px;
  background-color: $code-bg;
}
</style>