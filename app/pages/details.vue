<script setup lang="ts">
usePageReady();

onMounted(() => {
	document.title = "个人介绍";
});
</script>

<template>
	<div class="details"></div>
</template>

<style scoped lang="scss">
.details {
	height: 100dvh;
	width: 100%;
	background-color: red;
}
</style>
