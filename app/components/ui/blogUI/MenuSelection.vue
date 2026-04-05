<script setup lang="ts">
import type { BlogMenuSelectionParams } from "~/types/components";

const { collections, contentPath, contentTitle } = defineProps<BlogMenuSelectionParams>();
const { setActiveBlogCollection, setActiveBlogContent, changeBlogMenuState } = useBlogStore();

const handleClick = () => {
	setActiveBlogCollection(collections);
	setActiveBlogContent(contentPath);
	changeBlogMenuState();
};
</script>

<template>
	<button class="menu_selection" @click="handleClick">
		{{ contentTitle || contentPath }}
	</button>
</template>

<style scoped lang="scss">
.menu_selection {
	margin: 5px 0;
	min-height: 50px;
	width: 100%;
	color: #000000;
	font-family: "方正基础像素体";
	text-align: left;
	background-color: rgb(0, 0, 0, 0);
	border: 5px solid #000000;
	transition: background-color 0.2s ease-in-out;
	cursor: pointer;

	&:hover {
		background-color: rgb(255, 255, 255, 0.5);
	}
}
</style>
