<script setup lang="ts">
import DetailDoingCoding from "./DetailDoingCoding.vue";
</script>

<template>
	<div class="detail_doing">
		<DetailDoingCoding />
	</div>
</template>

<style scoped lang="scss">
.detail_doing {
	display: grid;
	grid-template-rows: repeat(3, 1fr);
	justify-items: center;
	align-items: center;
	height: 150vh;
	width: 100%;
}
</style>
