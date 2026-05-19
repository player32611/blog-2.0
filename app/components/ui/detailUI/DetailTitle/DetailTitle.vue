<script setup lang="ts">
import DetailTitleBackground from "./DetailTitleBackground.vue";
import DetailTitleBottom from "./DetailTitleBottom.vue";
import DetailTitleContent from "./DetailTitleContent.vue";
</script>

<template>
	<div class="details_title">
		<!-- <DetailTitleBackground /> -->
		<DetailTitleContent />
		<DetailTitleBottom />
	</div>
</template>

<style scoped lang="scss">
.details_title {
	display: flex;
	flex-direction: column;
	justify-content: end;
	align-items: center;
	height: 100dvh;
	width: 100%;
	font-size: 1rem;
	overflow: hidden;
}
</style>
