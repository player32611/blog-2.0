<script setup lang="ts">
import gsap from "gsap";
import type { FaultTextParams } from "~/types/components";

const { text, style } = defineProps<FaultTextParams>();
const textRefs = ref<HTMLParagraphElement[]>([]);
const intervalRef = ref<number | null>(null);
const faultDuration: number = 0.05;
const faultTime: number = 1000;
const faultTextNumber: number = 3;
const faultTranslate: number = 60;

onMounted(() => {
	intervalRef.value = setInterval(() => {
		textRefs.value.forEach(el => {
			const x = Math.random() * 100;
			const y = Math.random() * 100;
			const h = Math.random() * 50 + 50;
			const w = Math.random() * 40 + 10;
			gsap
				.timeline({
					onStart: () => {
						el.classList.add("faulting");
					},
					onComplete: () => {
						el.classList.remove("faulting");
					},
				})
				.to(el, {
					duration: faultDuration,
					translateX: `${Math.random() * faultTranslate - faultTranslate / 2}%`,
					translateY: `${Math.random() * faultTranslate - faultTranslate / 2}%`,
					clipPath: `polygon(${x}% ${y}%, ${x + w}% ${y}%, ${x + w}% ${y + h}%, ${x}% ${y + h}%)`,
					ease: "power1.inOut",
				})
				.to(el, {
					duration: faultDuration,
					translateX: "0",
					translateY: "0",
					clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
					ease: "power1.inOut",
				});
		});
	}, faultTime);
});

onUnmounted(() => {
	if (intervalRef.value) clearInterval(intervalRef.value);
});
</script>

<template>
	<div class="fault_text_container">
		{{ text }}
		<p
			class="fault_text"
			v-for="(_, index) in faultTextNumber"
			:style="style"
			:key="index"
			:data-text="text"
			:ref="
				el => {
					if (el) textRefs[index] = el as HTMLParagraphElement;
				}
			"
		>
			{{ text }}
		</p>
	</div>
</template>

<style scoped lang="scss">
.fault_text_container {
	position: relative;
	width: fit-content;
	color: rgb(0, 0, 0, 0);
	font-size: 3rem;

	.fault_text {
		position: absolute;
		left: 0;
		top: 0;
		margin: 0;
		padding: 0;
		color: #fff;

		&.faulting {
			&::after,
			&::before {
				content: attr(data-text);
				position: absolute;
				left: 0;
				top: 0;
				mix-blend-mode: screen;
			}

			&::after {
				color: #ff0000;
				transform: translateX(2%);
			}

			&::before {
				color: #0000ff;
				transform: translateX(-2%);
			}
		}
	}
}
</style>
