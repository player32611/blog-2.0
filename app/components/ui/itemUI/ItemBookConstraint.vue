<script setup lang="ts">
import gsap from "gsap";
import Matter from "matter-js";
import type { Body } from "matter-js";
import type { ItemParams, ItemInstance } from "~/types/components";

const { Bodies } = Matter;

const itemStore = useItemStore();
const { x, y, angle } = defineProps<ItemParams>();
const itemRef = ref<HTMLDivElement | null>(null);
const pageRef = ref<SVGAElement | null>(null);
const animationRef = ref<GSAPAnimation | null>();
const animationDuration: number = 0.15;

const createItem = (x: number, y: number, angle: number): Body | null => {
	if (!itemRef.value) return null;
	return Bodies.rectangle(x, y, itemRef.value.offsetWidth, itemRef.value.offsetHeight, {
		angle,
		restitution: 0.6,
		friction: 0.5,
		render: {
			fillStyle: "rgba(0, 0, 0, 0)",
		},
	});
};

watch(
	() => itemStore.showingGuide,
	newValue => {
		if (newValue) {
			if (animationRef.value) animationRef.value.resume();
			else {
				animationRef.value = gsap
					.timeline({
						repeat: -1,
						onStart: () => {
							if (pageRef.value) {
								gsap.set(pageRef.value, {
									rotate: "0deg",
									skewY: "0deg",
								});
							}
						},
					})
					.to(pageRef.value, {
						rotateY: "90deg",
						skewY: "-20deg",
						duration: animationDuration / 2,
					})
					.to(pageRef.value, {
						rotateY: "180deg",
						skewY: "0deg",
						duration: animationDuration / 2,
					});
			}
		} else animationRef.value?.progress(1).pause();
	},
);

onUnmounted(() => {
	if (animationRef.value) animationRef.value.kill();
});

defineExpose<ItemInstance>({
	createItem,
});
</script>

<!-- From Uiverse.io by vinodjangid07 -->
<template>
	<div
		class="item_book"
		:style="{
			left: x - (itemRef ? itemRef.offsetWidth / 2 : 0) + 'px',
			top: y - (itemRef ? itemRef.offsetHeight / 2 : 0) + 'px',
			rotate: angle + 'rad',
		}"
		ref="itemRef"
	>
		<div class="book-wrapper">
			<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 126 75" class="book">
				<rect
					stroke-width="5"
					stroke="#e05452"
					rx="7.5"
					height="70"
					width="121"
					y="2.5"
					x="2.5"
				></rect>
				<line stroke-width="5" stroke="#e05452" y2="75" x2="63.5" x1="63.5"></line>
				<path stroke-linecap="round" stroke-width="4" stroke="#c18949" d="M25 20H50"></path>
				<path stroke-linecap="round" stroke-width="4" stroke="#c18949" d="M101 20H76"></path>
				<path stroke-linecap="round" stroke-width="4" stroke="#c18949" d="M16 30L50 30"></path>
				<path stroke-linecap="round" stroke-width="4" stroke="#c18949" d="M110 30L76 30"></path>
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="#ffffff74"
				viewBox="0 0 65 75"
				class="book-page"
				ref="pageRef"
			>
				<path stroke-linecap="round" stroke-width="4" stroke="#c18949" d="M40 20H15"></path>
				<path stroke-linecap="round" stroke-width="4" stroke="#c18949" d="M49 30L15 30"></path>
				<path
					stroke-width="5"
					stroke="#e05452"
					d="M2.5 2.5H55C59.1421 2.5 62.5 5.85786 62.5 10V65C62.5 69.1421 59.1421 72.5 55 72.5H2.5V2.5Z"
				></path>
			</svg>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

$base-size: 0.5;

/* From Uiverse.io by vinodjangid07 */
.item_book {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	user-select: none;
	pointer-events: none;
	z-index: variables.$float_zIndex;

	.book-wrapper {
		width: 150px * $base-size;
		height: fit-content;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		position: relative;

		.book {
			width: 100%;
			height: auto;
			filter: drop-shadow(
				10px * $base-size 10px * $base-size 5px * $base-size rgba(0, 0, 0, 0.137)
			);
		}

		.book-page {
			width: 50%;
			height: auto;
			position: absolute;
			transform-origin: left;
		}
	}
}
</style>
