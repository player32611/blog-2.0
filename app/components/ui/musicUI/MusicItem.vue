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
.music_item {
	min-height: 6em;
	width: 80%;
	color: #ffffff;
	font-size: 0.5em;
	font-family: "方正基础像素体";
	text-align: left;
	background-color: rgb(0, 0, 0, 0);
	border: 2.5px solid #ffffff;
	outline: none;
	cursor: pointer;

	&:hover {
		background-color: rgb(255, 255, 255, 0.5);
	}
}
</style>
