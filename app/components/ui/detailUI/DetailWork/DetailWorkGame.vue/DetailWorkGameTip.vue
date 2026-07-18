<script setup lang="ts">
import gsap from "gsap";
import type { DetailWorkGameTipParams } from "~/types/components";

const { isMoved } = defineProps<DetailWorkGameTipParams>();
const containerRef = ref<HTMLDivElement | null>(null);
const iconRef = ref<HTMLSpanElement | null>(null);
const currentAnim = ref<GSAPAnimation | null>(null);

const pointerDuration = 2;
const pointerDistance = 3;
const changeDuration = 2;

watch(
	() => isMoved,
	newState => {
		if (!newState) return;
		currentAnim.value?.kill();
		currentAnim.value = gsap
			.timeline({
				onComplete: () => {
					currentAnim.value?.kill();
				},
			})
			.to(iconRef.value, { scale: 0, ease: "power2.out", duration: changeDuration / 3 })
			.set(iconRef.value, {
				y: 0,
				onComplete: () => {
					if (iconRef.value) iconRef.value.innerHTML = "&#xe780;";
				},
			})
			.to(iconRef.value, { scale: 1, ease: "elastic.out", duration: changeDuration / 3 })
			.to(containerRef.value, { scale: 0, ease: "power2.in", duration: changeDuration / 3 });
	},
);

onMounted(() => {
	currentAnim.value = gsap.fromTo(
		iconRef.value,
		{ y: -pointerDistance },
		{ y: pointerDistance, ease: "power1.inOut", duration: pointerDuration, repeat: -1, yoyo: true },
	);
});

onUnmounted(() => {
	currentAnim.value?.kill();
});
</script>

<template>
	<div class="work_game_tip" ref="containerRef">
		使用键盘或触摸操控
		<span class="icon" ref="iconRef">&#xe886;</span>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.work_game_tip {
	position: relative;
	display: flex;
	justify-content: center;
	width: 100%;
	color: rgba($color: #ffffff, $alpha: 0.4);
	font-size: 2vmin;
	font-family: "方正基础像素体";
	white-space: nowrap;
	z-index: variables.$float_zIndex;
	user-select: none;
	pointer-events: none;
}
</style>
