<script setup lang="ts">
import { gsap } from "gsap";
import type { BlogMenuSelecterParams } from "~/types/components";

import MenuSelection from "./MenuSelection.vue";

const isActive = ref<boolean>(false);
const arrowRef = ref<SVGAElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);
const { collections } = defineProps<BlogMenuSelecterParams>();
const { data: contents } = await useAsyncData(`menu-${collections}`, () =>
	queryCollection(collections).all(),
);

const getContentPath = (file: any): string => {
	if (!file.path) return "";
	const parts = file.path.split("/");
	return parts[parts.length - 1];
};

const getContentTitle = (file: any, path: string): string => {
	return file.title || path;
};

const handleClick = () => {
	isActive.value = isActive.value === true ? false : true;
	if (isActive.value) {
		gsap.to(arrowRef.value, { duration: 0.5, rotate: 90, ease: "power2.out" });
		gsap.to(containerRef.value, { duration: 0.5, height: "auto", ease: "power2.out" });
	} else {
		gsap.to(arrowRef.value, { duration: 0.5, rotate: 0, ease: "power2.out" });
		gsap.to(containerRef.value, { duration: 0.5, height: "0px", ease: "power2.out" });
	}
};
</script>

<template>
	<div class="menu_selecter">
		<div role="button" class="selecter_title" @click="handleClick">
			{{ getCollectionTitle(collections) }}
			<svg class="selecter_arrow" width="20" height="20" viewBox="0 0 100 100" ref="arrowRef">
				<polygon points="20,20 80,50 20,80" fill="#FFFFFF80" />
			</svg>
		</div>
		<div class="selecter_container" ref="containerRef">
			<MenuSelection
				v-for="content in contents"
				:key="content.path"
				:collections="collections"
				:content-path="getContentPath(content)"
				:content-title="getContentTitle(content, getContentPath(content))"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
$base-size: 1;

.menu_selecter {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	margin: 0.5rem * $base-size 0;
	height: auto;
	width: 100%;
	color: #ffffff;
	font-family: "方正基础像素体";
	transition: all ease-in-out 0.3s;

	.selecter_title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem * $base-size;
		width: calc(100% - 2rem * $base-size - 0.3rem * $base-size * 2);
		min-height: 50px;
		color: rgba($color: #ffffff, $alpha: 0.5);
		font-size: 1rem * $base-size;
		font-family: "方正基础像素体";
		background-color: rgba(#000000, 0.5);
		border-width: 0.3rem * $base-size;
		border-style: solid;
		border-color: #000000;
		outline: none;
		cursor: pointer;
		transition: all ease-in-out 0.3s;
		user-select: none;

		&:hover {
			color: #ffffff;
		}
	}

	.selecter_container {
		display: flex;
		flex-direction: column;
		height: 0px;
		width: 80%;
		overflow: hidden;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.7;

	.menu_selecter {
		margin: 0.5rem * $base-size 0;

		.selecter_title {
			padding: 0 1rem * $base-size;
			width: calc(100% - 2rem * $base-size - 0.3rem * $base-size * 2);
			font-size: 1rem * $base-size;
			border-width: 0.3rem * $base-size;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.9;

	.menu_selecter {
		margin: 0.5rem * $base-size 0;

		.selecter_title {
			padding: 0 1rem * $base-size;
			width: calc(100% - 2rem * $base-size - 0.3rem * $base-size * 2);
			font-size: 1rem * $base-size;
			border-width: 0.3rem * $base-size;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.8;

	.menu_selecter {
		margin: 0.5rem * $base-size 0;

		.selecter_title {
			padding: 0 1rem * $base-size;
			width: calc(100% - 2rem * $base-size - 0.3rem * $base-size * 2);
			font-size: 1rem * $base-size;
			border-width: 0.3rem * $base-size;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.menu_selecter {
		margin: 0.5rem * $base-size 0;

		.selecter_title {
			padding: 0 1rem * $base-size;
			width: calc(100% - 2rem * $base-size - 0.3rem * $base-size * 2);
			font-size: 1rem * $base-size;
			border-width: 0.3rem * $base-size;
		}
	}
}
</style>
