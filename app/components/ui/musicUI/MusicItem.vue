<script setup lang="ts">
import type { MusicItemParams } from "~/types/components";

const { play } = useSoundStore();
const { info } = defineProps<MusicItemParams>();
</script>

<template>
	<button class="music_item" @click="play(info)">
		{{ info.name }}
	</button>
</template>

<style scoped lang="scss">
$base-size: 1;

.music_item {
	min-height: 50px * $base-size;
	width: 80%;
	color: #ffffff;
	font-size: 0.8rem * $base-size;
	font-family: "方正基础像素体";
	text-align: left;
	background-color: rgb(0, 0, 0, 0);
	border: 2.5px * $base-size solid #ffffff;
	border-top: none;
	border-right: none;
	outline: none;
	cursor: pointer;

	&:hover {
		background-color: rgb(255, 255, 255, 0.5);
	}

	&:last-child {
		border-bottom: none;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 1;

	.music_item {
		min-height: 50px * $base-size;
		font-size: 0.8rem * $base-size;
		border-left: 2.5px * $base-size solid #ffffff;
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 1;

	.music_item {
		min-height: 50px * $base-size;
		font-size: 0.8rem * $base-size;
		border-left: 2.5px * $base-size solid #ffffff;
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 1;

	.music_item {
		min-height: 50px * $base-size;
		font-size: 0.8rem * $base-size;
		border-left: 2.5px * $base-size solid #ffffff;
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 1;

	.music_item {
		min-height: 50px * $base-size;
		font-size: 0.8rem * $base-size;
		border-left: 2.5px * $base-size solid #ffffff;
	}
}
</style>
