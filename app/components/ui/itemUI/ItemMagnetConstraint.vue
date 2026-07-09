<script setup lang="ts">
import gsap from "gsap";
import Matter from "matter-js";
import type { Body } from "matter-js";
import type { ItemParams, ItemInstance } from "~/types/components";

const { Bodies } = Matter;

const itemStore = useItemStore();
const { x, y, angle } = defineProps<ItemParams>();
const itemRef = ref<HTMLDivElement | null>(null);
const magnetismRef = ref<HTMLDivElement | null>(null);
const animationRef = ref<GSAPAnimation | null>(null);

const createItem = (x: number, y: number, angle: number): Body | null => {
	if (!itemRef.value) return null;
	return Bodies.rectangle(x, y, itemRef.value.offsetHeight, itemRef.value.offsetWidth, {
		angle,
		restitution: 0.6,
		friction: 0.5,
		render: {
			fillStyle: "rgba(0, 0, 0, 0)",
		},
	});
};

watch(
	() => itemStore.showingCommandBar,
	newValue => {
		if (newValue) {
			if (animationRef.value) animationRef.value.resume();
			else {
				gsap.set(magnetismRef.value, { visibility: "visible" });
				animationRef.value = gsap.to(magnetismRef.value, {
					left: "200%",
					width: "90px",
					opacity: 0,
					duration: 0.5,
					ease: "ease-in-out",
					repeat: -1,
					onStart: () => {
						if (magnetismRef.value) {
							gsap.set(magnetismRef.value, {
								left: "0%",
								width: "30px",
								opacity: 1,
							});
						}
					},
					onRepeat: () => {
						if (magnetismRef.value) {
							gsap.set(magnetismRef.value, {
								left: "0%",
								width: "30px",
								opacity: 1,
							});
						}
					},
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

<!-- From Uiverse.io by Cybercom682 -->
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
		<div class="magnetism" ref="magnetismRef"></div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

/* From Uiverse.io by Cybercom682 */
.item_magnet {
	position: absolute;
	background-color: red;
	height: 40px;
	width: 10px;
	border-radius: 6px 0px 0px 6px;
	transform: rotate(90deg);
	user-select: none;
	pointer-events: none;
	z-index: variables.$float_zIndex;
	filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.137));

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
		width: 30px;
		left: 0%;
		height: 40px;
		border: solid 2px currentColor;
		border-color: currentColor transparent transparent transparent;
		border-radius: 50%;
		visibility: hidden;
		transform: rotate(90deg);
	}
}
</style>
