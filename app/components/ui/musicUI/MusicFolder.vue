<script setup lang="ts">
import { gsap } from "gsap";
import type { MusicFolderParams } from "~/types/components";

import MusicItem from "./MusicItem.vue";

const isactive = ref<boolean>(false);
const folderRef = ref<HTMLDivElement | null>();
const { name } = defineProps<MusicFolderParams>();

const handelClick = () => {
	if (!folderRef.value) return;
	if (isactive.value) {
		isactive.value = false;
		gsap
			.timeline()
			.set(folderRef.value, { height: "auto" })
			.to(folderRef.value, { duration: 0.5, height: 50, ease: "power2.out" });
	} else {
		isactive.value = true;
		gsap
			.timeline()
			.set(folderRef.value, { height: 50 })
			.to(folderRef.value, { duration: 0.5, height: "auto", ease: "power2.out" });
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
$base-size: 1;

.music_folder {
	display: flex;
	flex-direction: column;
	align-items: end;
	height: 50px;
	width: 100%;
	border-bottom: 2.5px * $base-size solid #ffffff;
	font-size: 1rem * $base-size;
	overflow: hidden;
	cursor: pointer;

	.folder_name {
		display: flex;
		align-items: center;
		width: 100%;
		min-height: 50px * $base-size;
		color: #ffffff;
		border-right: none;
		border-bottom: 2.5px * $base-size dashed #ffffff;
		font-family: "方正基础像素体";
		text-align: center;
		text-indent: 1rem;
		user-select: none;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 1;

	.music_folder {
		border-bottom: 2.5px * $base-size solid #ffffff;
		font-size: 1rem * $base-size;

		.folder_name {
			min-height: 50px * $base-size;
			border-right: none;
			border-bottom: 2.5px * $base-size dashed #ffffff;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 1;

	.music_folder {
		border-bottom: 2.5px * $base-size solid #ffffff;
		font-size: 1rem * $base-size;

		.folder_name {
			min-height: 50px * $base-size;
			border-right: none;
			border-bottom: 2.5px * $base-size dashed #ffffff;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 1;

	.music_folder {
		border-bottom: 2.5px * $base-size solid #ffffff;
		font-size: 1rem * $base-size;

		.folder_name {
			min-height: 50px * $base-size;
			border-right: none;
			border-bottom: 2.5px * $base-size dashed #ffffff;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 1;

	.music_folder {
		border-bottom: 2.5px * $base-size solid #ffffff;
		font-size: 1rem * $base-size;

		.folder_name {
			min-height: 50px * $base-size;
			border-right: none;
			border-bottom: 2.5px * $base-size dashed #ffffff;
		}
	}
}
</style>
