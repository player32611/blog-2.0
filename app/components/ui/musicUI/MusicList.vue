<script setup lang="ts">
import MusicFolder from "./MusicFolder.vue";
</script>

<template>
	<div class="music_list">
		<MusicFolder v-for="folder in getAllFolder()" :key="folder" :name="folder" />
	</div>
</template>

<style scoped lang="scss">
$base-size: 1;

.music_list {
	height: 100%;
	width: 100%;
	background-color: #000000;
	border-right: 5px * $base-size solid #ffffff;
	overflow-y: scroll;
	scrollbar-width: none;
	opacity: 0.4;
	user-select: none;
	-webkit-tap-highlight-color: transparent;
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.5;

	.music_list {
		width: 100%;
		border-right: none;
		border-bottom: 5px * $base-size solid #ffffff;
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.7;

	.music_list {
		width: 100%;
		border-right: none;
		border-bottom: 5px * $base-size solid #ffffff;
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.7;

	.music_list {
		width: calc(100% - 5px * $base-size);
		border-right: 5px * $base-size solid #ffffff;
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.8;

	.music_list {
		width: calc(100% - 5px * $base-size);
		border-right: 5px * $base-size solid #ffffff;
	}
}
</style>
