<script setup lang="ts">
import gsap from "gsap";
import type { Point } from "~/types/common";

const borderRef = ref<HTMLDivElement | null>(null);
const soulPos = ref<Point>({ x: 0, y: 0 });
const soulRef = ref<HTMLDivElement | null>(null);
const pressKeys = ref<Set<string>>(new Set());
const animationId = ref<number | null>(null);

const easeDuration: number = 0.3;
const easeDistance: number = 1.5;

const handleKeyPress = (e: KeyboardEvent) => {
	e.preventDefault();
	if (!pressKeys.value.has(e.key)) pressKeys.value.add(e.key);
};

const handleKeyUp = (e: KeyboardEvent) => {
	e.preventDefault();
	if (pressKeys.value.has(e.key)) pressKeys.value.delete(e.key);
};

const frame = () => {
	const soul = soulRef.value?.getBoundingClientRect();
	const border = borderRef.value?.getBoundingClientRect();
	if (!border || !soul) return;
	if (pressKeys.value.has("ArrowLeft"))
		soulPos.value.x = Math.max(0, soulPos.value.x - easeDistance);
	if (pressKeys.value.has("ArrowRight"))
		soulPos.value.x = Math.min(border.width - soul.width, soulPos.value.x + easeDistance);
	if (pressKeys.value.has("ArrowUp")) soulPos.value.y = Math.max(0, soulPos.value.y - easeDistance);
	if (pressKeys.value.has("ArrowDown"))
		soulPos.value.y = Math.min(border.height - soul.height, soulPos.value.y + easeDistance);
	gsap.to(soulRef.value, { ...soulPos.value, duration: easeDuration });
	animationId.value = requestAnimationFrame(frame);
};

onMounted(() => {
	window.addEventListener("keydown", handleKeyPress);
	window.addEventListener("keyup", handleKeyUp);
	animationId.value = requestAnimationFrame(frame);
});

onUnmounted(() => {
	window.removeEventListener("keydown", handleKeyPress);
	window.removeEventListener("keyup", handleKeyUp);
	if (animationId.value) cancelAnimationFrame(animationId.value);
});
</script>

<template>
	<div class="game_battle">
		<div class="battle_border" ref="borderRef">
			<span class="icon battle_soul" ref="soulRef">&#xe82b;</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.game_battle {
	position: relative;
	margin-top: 30vh;
	background-color: rgba($color: #000000, $alpha: 0.5);
	border-color: #ffffff;
	border-style: solid;
	border-width: 5px;
	z-index: variables.$float_zIndex;

	.battle_border {
		position: relative;
		width: 30vh;
		height: 30vh;
	}

	.battle_soul {
		position: absolute;
		color: red;
		font-size: 25px;
	}
}
</style>
