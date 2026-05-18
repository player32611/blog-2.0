<script setup lang="ts">
import DetailTitleBottom from "./DetailTitleBottom.vue";
import DetailTitleContent from "./DetailTitleContent.vue";
import DetailTitleHead from "./DetailTitleHead.vue";
</script>

<template>
	<div class="details_title">
		<DetailTitleHead />
		<DetailTitleContent />
		<DetailTitleBottom />
	</div>
</template>

<style scoped lang="scss">
.details_title {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	height: 100dvh;
	width: 100%;
	font-size: 5rem;
	font-family: "Coustard Black";
	overflow: hidden;
}
</style>
