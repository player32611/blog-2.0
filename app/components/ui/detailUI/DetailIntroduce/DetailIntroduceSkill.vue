<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import type { DetailIntroduceSkillContainerInstance } from "~/types/components";

import DetailIntroduceSkillContainer from "./DetailIntroduceSkillContainer.vue";

gsap.registerPlugin(ScrollTrigger);

const skillRef = ref<HTMLDivElement | null>(null);
const containerRef = ref<DetailIntroduceSkillContainerInstance | null>(null);
const mountAnim = ref<gsap.core.Tween | null>(null);

onMounted(() => {
	mountAnim.value = gsap.fromTo(
		skillRef.value,
		{ clipPath: "inset(100% 0% 0% 0%)" },
		{
			clipPath: "inset(0% 0% 0% 0%)",
			ease: "line",
			duration: 1,
			scrollTrigger: {
				trigger: skillRef.value,
				start: "bottom 90%",
				toggleActions: "play none none reverse", // 进入时播放，离开时反向播放
				// markers: true,
				onEnter: () => {
					containerRef.value?.resume();
				},
				onEnterBack: () => {
					containerRef.value?.resume();
				},
				onLeave: () => {
					containerRef.value?.pause();
				},
				onLeaveBack: () => {
					containerRef.value?.pause();
				},
			},
		},
	);
});

onUnmounted(() => {
	mountAnim.value?.scrollTrigger?.kill();
	mountAnim.value?.kill();
});
</script>

<template>
	<div class="introduce_skill" ref="skillRef">
		<svg
			class="vending_machine"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 72 101.5"
		>
			<defs>
				<linearGradient
					id="_gradient"
					data-name="gradient"
					x1="36"
					y1="96.5"
					x2="36"
					y2="75.5"
					gradientTransform="translate(122 50) rotate(90)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" stop-color="red" />
					<stop offset="1" stop-color="#000" />
				</linearGradient>
			</defs>
			<g>
				<path
					d="M36,4c19.29907,0,35,15.70093,35,35s-15.70093,35-35,35S1,58.29907,1,39,16.70093,4,36,4M36,3C16.11774,3,0,19.11774,0,39s16.11774,36,36,36,36-16.11774,36-36S55.88226,3,36,3h0Z"
				/>
				<polygon
					points="13.18054 66 5 101 67 101 58.79199 66 13.18054 66"
					style="fill: red; stroke: #000; stroke-miterlimit: 10"
				/>
				<polygon
					points="22 6 22.82441 .5 48.9257 .5 50 6 22 6"
					style="fill: red; stroke: #000; stroke-miterlimit: 10"
				/>
				<rect
					x="25.5"
					y="81.5"
					width="21"
					height="9"
					rx="4.5"
					ry="4.5"
					transform="translate(-50 122) rotate(-90)"
					style="fill: url(#_gradient); stroke: #000; stroke-miterlimit: 10"
				/>
				<circle cx="36" cy="80" r="6.5" style="fill: #333; stroke: #000; stroke-miterlimit: 10" />
				<line
					x1="29.5"
					y1="80"
					x2="42.5"
					y2="80"
					style="fill: #333; stroke: #000; stroke-miterlimit: 10"
				/>
			</g>
		</svg>
		<div class="skill_wrapper">
			<DetailIntroduceSkillContainer ref="containerRef" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.introduce_skill {
	position: absolute;
	right: 10%;
	bottom: 50%;
	display: flex;
	justify-content: center;
	width: 72px * 4;

	.skill_wrapper {
		position: absolute;
		top: 6%;
		right: 0;
		height: 59%;
		width: 100%;
		border-radius: 100px;
		overflow: hidden;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.5;

	.introduce_skill {
		right: 25%;
		bottom: 40%;
		width: 50%;

		.skill_wrapper {
			border-radius: 100px * $base-size;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.7;

	.introduce_skill {
		right: 25%;
		bottom: 30%;
		width: 50%;

		.skill_wrapper {
			border-radius: 100px * $base-size;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.7;

	.introduce_skill {
		right: 5%;
		bottom: 50%;
		width: 72px * 5 * $base-size;

		.skill_wrapper {
			border-radius: 100px * $base-size;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.8;

	.introduce_skill {
		right: 5%;
		bottom: 50%;
		width: 72px * 5 * $base-size;

		.skill_wrapper {
			border-radius: 100px * $base-size;
		}
	}
}
</style>
