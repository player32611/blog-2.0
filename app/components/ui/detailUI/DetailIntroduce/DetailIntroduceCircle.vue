<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const splitContent = ref<SplitText | null>(null);
const contentRef = ref<HTMLDivElement | null>(null);
const leftCircleRef = ref<HTMLDivElement | null>(null);
const rightCircleRef = ref<HTMLDivElement | null>(null);
const mountAnim = ref<gsap.core.Tween | null>(null);

const getContentPrecent = () => {
	if (!contentRef.value || !rightCircleRef.value) return "0%";
	const circleRect = rightCircleRef.value.getBoundingClientRect();
	const contentRect = contentRef.value.getBoundingClientRect();
	const circleCenter = circleRect.left + circleRect.width / 2;
	const precent = (circleCenter - contentRect.left) / contentRect.width;
	if (precent < 0) return "100%";
	else if (precent > 1) return "0%";
	else return `${100 - precent * 100}%`;
};

const compareCircle = () => {
	if (!leftCircleRef.value || !rightCircleRef.value) return false;
	const leftRect = leftCircleRef.value.getBoundingClientRect();
	const rightRect = rightCircleRef.value.getBoundingClientRect();
	if (leftRect.left + leftRect.width / 2 <= rightRect.left + rightRect.width / 2) return true;
	else return false;
};

onMounted(() => {
	splitContent.value = SplitText.create(contentRef.value, { type: "chars" });
	mountAnim.value = gsap.fromTo(
		rightCircleRef.value,
		{ x: -1000, rotate: -1080 },
		{
			x: 0,
			rotate: 0,
			ease: "power1.out",
			duration: 2,
			scrollTrigger: {
				trigger: rightCircleRef.value,
				start: "top 80%", // 当元素顶部到达视口 80% 位置时触发
				toggleActions: "play none none reverse", // 进入时播放，离开时反向播放
			},
			onUpdate: () => {
				if (compareCircle()) gsap.set(leftCircleRef.value, { opacity: 1 });
				else gsap.set(leftCircleRef.value, { opacity: 0 });
				gsap.set(contentRef.value, {
					clipPath: `inset(0% ${getContentPrecent()} 0% 0%)`,
				});
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
	<div class="introduce_circle_container">
		<div class="introduce_circle_left" ref="leftCircleRef">
			<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
				<circle cx="50" cy="50" r="50" fill="white" stroke="black" stroke-width="1" />
				<path d="M 50,0 A 50,50 0 0 1 50,100 A 25,25 0 0 0 50,50 A 25,25 0 0 1 50,0 Z" fill="red" />
				<circle cx="50" cy="25" r="8" fill="white" />
				<circle cx="50" cy="75" r="8" fill="red" />
			</svg>
		</div>
		<div class="introduce_circle_content" ref="contentRef">技术栈</div>
		<div class="introduce_circle_right" ref="rightCircleRef">
			<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
				<circle cx="50" cy="50" r="50" fill="white" stroke="black" stroke-width="1" />
				<path d="M 50,0 A 50,50 0 0 1 50,100 A 25,25 0 0 0 50,50 A 25,25 0 0 1 50,0 Z" fill="red" />
				<circle cx="50" cy="25" r="8" fill="white" />
				<circle cx="50" cy="75" r="8" fill="red" />
			</svg>
		</div>
	</div>
</template>

<style scoped lang="scss">
$base-size: 0.8;

.introduce_circle_container {
	position: absolute;
	left: 0;
	bottom: 52.6%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	width: 55%;

	.introduce_circle_content {
		color: rgba($color: #ffffff, $alpha: 0.5);
		font-size: 5rem * $base-size;
		font-family: "方正基础像素体";
		text-align: center;
	}

	.introduce_circle_left,
	.introduce_circle_right {
		position: relative;
		height: 100px * $base-size;
		width: 100px * $base-size;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.5;

	.introduce_circle_container {
		bottom: 68%;
		width: 100%;

		.introduce_circle_content {
			font-size: 5rem * $base-size;
		}

		.introduce_circle_left,
		.introduce_circle_right {
			height: 100px * $base-size;
			width: 100px * $base-size;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.6;

	.introduce_circle_container {
		bottom: 68%;
		width: 100%;

		.introduce_circle_content {
			font-size: 5rem * $base-size;
		}

		.introduce_circle_left,
		.introduce_circle_right {
			height: 100px * $base-size;
			width: 100px * $base-size;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.6;

	.introduce_circle_container {
		width: 50%;

		.introduce_circle_content {
			font-size: 5rem * $base-size;
		}

		.introduce_circle_left,
		.introduce_circle_right {
			height: 100px * $base-size;
			width: 100px * $base-size;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.7;

	.introduce_circle_container {
		width: 50%;

		.introduce_circle_content {
			font-size: 5rem * $base-size;
		}

		.introduce_circle_left,
		.introduce_circle_right {
			height: 100px * $base-size;
			width: 100px * $base-size;
		}
	}
}
</style>
