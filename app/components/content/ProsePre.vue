<script setup lang="ts">
defineProps({
	code: {
		type: String,
		default: "",
	},
	language: {
		type: String,
		default: null,
	},
	filename: {
		type: String,
		default: null,
	},
	highlights: {
		type: Array as () => number[],
		default: () => [],
	},
	meta: {
		type: String,
		default: null,
	},
	class: {
		type: String,
		default: null,
	},
});
</script>

<template>
	<pre :class="$props.class">
    <slot />
  </pre>
</template>

<style scoped lang="scss">
pre code .line {
	display: block;
}
</style>
