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
$base-size: 1;

.menu_selection {
	margin: 0.2rem * $base-size 0;
	min-height: 50px;
	width: 100%;
	color: rgba($color: #ffffff, $alpha: 0.5);
	font-family: "方正基础像素体";
	text-align: left;
	background-color: rgba(#000000, 0.5);
	border-width: 0.3rem * $base-size;
	border-style: solid;
	border-color: #000000;
	transition: background-color 0.2s ease-in-out;
	cursor: pointer;

	&:hover {
		background-color: rgb(255, 255, 255, 0.5);
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.7;

	.menu_selection {
		margin: 0.2rem * $base-size 0;
		border-width: 0.3rem * $base-size;
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.9;

	.menu_selection {
		margin: 0.2rem * $base-size 0;
		border-width: 0.3rem * $base-size;
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.7;

	.menu_selection {
		margin: 0.2rem * $base-size 0;
		border-width: 0.3rem * $base-size;
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.menu_selection {
		margin: 0.2rem * $base-size 0;
		border-width: 0.3rem * $base-size;
	}
}
</style>
