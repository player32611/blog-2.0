<script setup lang="ts">
import DetailDoingCoding from "./DetailDoingCoding.vue";
import DetailDoingGaming from "./DetailDoingGaming.vue";
import DetailDoingOther from "./DetailDoingOther.vue";
</script>

<template>
	<div class="detail_doing">
		<DetailDoingCoding />
		<DetailDoingGaming />
		<!-- <DetailDoingOther /> -->
	</div>
</template>

<style scoped lang="scss">
.detail_doing {
	display: grid;
	grid-template-rows: repeat(2, 1fr);
	justify-items: center;
	align-items: center;
	margin-top: 10dvh;
	gap: 5dvh;
	height: 100dvh;
	width: 100%;
}
</style>
