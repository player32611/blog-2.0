<script setup lang="ts">
import DetailDoingCoding from "./DetailDoingCoding.vue";
import DetailDoingGaming from "./DetailDoingGaming.vue";
import DetailDoingOther from "./DetailDoingOther.vue";
</script>

<template>
	<div class="detail_doing">
		<DetailDoingCoding />
		<DetailDoingGaming />
		<DetailDoingOther />
	</div>
</template>

<style scoped lang="scss">
.detail_doing {
	display: grid;
	grid-template-rows: repeat(3, 1fr);
	justify-items: center;
	align-items: center;
	gap: 5vh;
	height: 150vh;
	width: 100%;
}
</style>
