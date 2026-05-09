<script setup lang="ts">
import type { ItemParams } from "~/types/components";

const { x, y, angle } = defineProps<ItemParams>();
const itemRef = ref<HTMLDivElement | null>(null);
</script>

<template>
	<div
		class="item_magnet"
		:style="{
			left: x - (itemRef ? itemRef.offsetWidth / 2 : 0) + 'px',
			top: y - (itemRef ? itemRef.offsetHeight / 2 : 0) + 'px',
			rotate: angle + 'rad',
		}"
		ref="itemRef"
	>
		<div class="magnetism"></div>
	</div>
</template>

<style scoped lang="scss">
.item_magnet {
	position: absolute;
	background-color: red;
	height: 40px;
	width: 10px;
	border-radius: 6px 0px 0px 6px;
	transform: rotate(90deg);
	user-select: none;
	pointer-events: none;

	&::before {
		content: "";
		left: 10px;
		position: absolute;
		background: rgb(255, 0, 0);
		background: linear-gradient(
			90deg,
			rgba(255, 0, 0, 1) 0%,
			rgba(255, 0, 0, 1) 50%,
			rgba(158, 158, 158, 1) 50%,
			rgba(184, 184, 184, 1) 100%
		);
		height: 10px;
		width: 20px;
	}

	&::after {
		content: "";
		left: 10px;
		position: absolute;
		bottom: 0;
		background: rgb(255, 0, 0);
		background: linear-gradient(
			90deg,
			rgba(255, 0, 0, 1) 0%,
			rgba(255, 0, 0, 1) 50%,
			rgba(158, 158, 158, 1) 50%,
			rgba(184, 184, 184, 1) 100%
		);
		height: 10px;
		width: 20px;
	}

	.magnetism {
		position: absolute;
		color: rgb(0, 151, 252);
		bottom: 0;
		width: 80px;
		left: 0%;
		height: 40px;
		border: solid 2px currentColor;
		border-color: currentColor transparent transparent transparent;
		border-radius: 50%;
		transform: rotate(90deg);
		animation: go 0.5s ease-in-out infinite;
	}
}

@keyframes rotate {
	0% {
		transform: rotate(-30deg);
	}
	50% {
		transform: rotate(30deg);
	}
	100% {
		transform: rotate(-30deg);
	}
}

@keyframes go {
	0% {
		left: 0%;
		width: 30px;
		opacity: 1;
	}
	50% {
		left: 100%;
		width: 60px;
		opacity: 0.5;
	}
	100% {
		width: 90px;
		left: 200%;
		opacity: 0;
	}
}
</style>
