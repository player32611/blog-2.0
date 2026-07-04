<script setup lang="ts">
import Matter from "matter-js";
import type { Body } from "matter-js";
import type { DetailIntroduceSkillItemParams, ItemInstance } from "~/types/components";

const { Bodies } = Matter;

const { x, y, angle, skill } = defineProps<DetailIntroduceSkillItemParams>();
const itemRef = ref<HTMLDivElement | null>(null);

const createItem = (x: number, y: number, angle: number): Body | null => {
	if (!itemRef.value) return null;
	return Bodies.circle(x, y, itemRef.value.offsetWidth / 2, {
		angle,
		restitution: 0.6,
		friction: 0.5,
		render: {
			fillStyle: "rgba(0, 0, 0)",
		},
	});
};

defineExpose<ItemInstance>({
	createItem,
});
</script>

<template>
	<div
		class="introduce_skill hoverable"
		:style="{
			left: x - (itemRef ? itemRef.offsetWidth / 2 : 0) + 'px',
			top: y - (itemRef ? itemRef.offsetHeight / 2 : 0) + 'px',
			rotate: angle + 'rad',
		}"
		ref="itemRef"
	>
		<span
			class="icon"
			v-html="getLangIcon(skill)"
			:style="{ color: getLangIconColor(skill) }"
		></span>
	</div>
</template>

<style scoped lang="scss">
.introduce_skill {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;
	width: 50px;
	font-size: 1.5rem;
	background-color: #000000;
	border-radius: 50%;
	border-color: #000000;
	border-style: solid;
	border-width: 2px;
	overflow: hidden;
	user-select: none;
	pointer-events: none;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		display: block;
		height: 70%;
		width: 100%;
		background-color: rgba($color: #ffffff, $alpha: 0.5);
		z-index: 0;
	}

	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		display: block;
		height: 30%;
		width: 100%;
		background-color: red;
		z-index: 0;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.7;

	.introduce_skill {
		height: 50px * $base-size;
		width: 50px * $base-size;
		font-size: 1.5rem * $base-size;
		border-width: 2px * $base-size;
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.9;

	.introduce_skill {
		height: 50px * $base-size;
		width: 50px * $base-size;
		font-size: 1.5rem * $base-size;
		border-width: 2px * $base-size;
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.8;

	.introduce_skill {
		height: 50px * $base-size;
		width: 50px * $base-size;
		font-size: 1.5rem * $base-size;
		border-width: 2px * $base-size;
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.introduce_skill {
		height: 50px * $base-size;
		width: 50px * $base-size;
		font-size: 1.5rem * $base-size;
		border-width: 2px * $base-size;
	}
}
</style>
