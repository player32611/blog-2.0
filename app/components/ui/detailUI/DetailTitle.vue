<script setup lang="ts">
import gsap from "gsap";
import { SplitText } from "gsap/all";

const split = ref<SplitText | null>(null);

const initDelay: number = 1; // 初始延迟（s）
const singleDuration: number = 1.2; // 单字符动画时长（s）

const firstCharAnim = () => {
	if (!split.value || !split.value.chars[0]) return;
	gsap.fromTo(
		split.value.chars[0],
		{ x: -300 },
		{ x: 0, duration: singleDuration, ease: "power1.out", delay: initDelay },
	);
	gsap.fromTo(
		split.value.chars[0],
		{ y: -600 },
		{ y: 0, duration: singleDuration, ease: "bounce.out", delay: initDelay },
	);
	gsap.fromTo(
		split.value.chars[0],
		{ rotate: 240 },
		{ rotate: 720, duration: singleDuration, ease: "back.out", delay: initDelay },
	);
};

const secondCharAnim = () => {
	if (!split.value || !split.value.chars[1]) return;
	gsap
		.timeline()
		.set(split.value.chars[1], { rotateX: -90 })
		.to(split.value.chars[1], {
			rotateX: -180,
			transformOrigin: "50% 80%",
			duration: singleDuration / 2,
			delay: initDelay + singleDuration / 2,
		})
		.to(split.value.chars[1], { rotateX: 0, duration: singleDuration / 2 });
};

const thirdCharAnim = () => {
	if (!split.value || !split.value.chars[2]) return;
	gsap.from(split.value.chars[2], {
		rotateX: -90,
		transformOrigin: "50% 50% -160px",
		opacity: 0,
		duration: singleDuration,
		ease: "power3",
		delay: initDelay + singleDuration,
	});
};

const fourthCharAnim = () => {
	if (!split.value || !split.value.chars[3]) return;
	gsap.fromTo(
		split.value.chars[3],
		{
			scale: 0,
			rotate: 90,
		},
		{
			scale: 1,
			rotate: 0,
			ease: "elastic.out",
			duration: singleDuration,
			delay: initDelay + (singleDuration / 2) * 3,
		},
	);
};

onMounted(() => {
	split.value = SplitText.create(".details_title", { type: "chars" });
	firstCharAnim();
	secondCharAnim();
	thirdCharAnim();
	fourthCharAnim();
});
</script>

<template>
	<div class="details_title">WALCOME</div>
</template>

<style scoped lang="scss">
.details_title {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100dvh;
	width: 100%;
	font-size: 5rem;
}
</style>
