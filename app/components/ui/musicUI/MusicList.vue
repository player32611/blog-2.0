<script setup lang="ts">
import MusicFolder from "./MusicFolder.vue";
</script>

<template>
	<div class="music_list">
		<MusicFolder v-for="folder in getAllFolder()" :key="folder" :name="folder" />
	</div>
</template>

<style scoped lang="scss">
.music_list {
	position: absolute;
	left: 0;
	height: 100dvh;
	width: 300px;
	background-color: #000000;
	border-right: 5px solid #ffffff;
	overflow-y: scroll;
	scrollbar-width: none;
	opacity: 0.4;
}
</style>
