<script setup lang="ts">
import type { MusicFolderParams } from "~/types/components";
import { gsap } from "gsap";

import MusicItem from "./MusicItem.vue";

const isactive = ref<boolean>(false);
const folderRef = ref<HTMLDivElement | null>();
const { name } = defineProps<MusicFolderParams>();

const handelClick = () => {
	if (!folderRef.value) return;
	if (isactive.value) {
		isactive.value = false;
		gsap.to(folderRef.value, { duration: 0.5, height: "3em", ease: "power2.out" });
	} else {
		isactive.value = true;
		gsap.to(folderRef.value, { duration: 0.5, height: "auto", ease: "power2.out" });
	}
};
</script>

<template>
	<div class="music_folder" ref="folderRef">
		<div class="folder_name" @click="handelClick">{{ name }}</div>
		<MusicItem v-for="music in getMusicsByFolder(name)" :key="music.name" :info="music" />
	</div>
</template>

<style scoped lang="scss">
.music_folder {
	display: flex;
	flex-direction: column;
	align-items: end;
	width: 100%;
	height: 3em;
	border-bottom: 2.5px solid #ffffff;
	font-size: 1em;
	overflow: hidden;
	cursor: pointer;

	.folder_name {
		display: flex;
		align-items: center;
		width: 100%;
		min-height: 3em;
		color: #ffffff;
		border-right: 2.5px solid #ffffff;
		border-bottom: 2.5px dashed #ffffff;
		font-family: "方正基础像素体";
		text-align: center;
		text-indent: 1em;
		user-select: none;
	}
}
</style>
