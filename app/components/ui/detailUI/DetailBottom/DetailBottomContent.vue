<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const detailStore = useDetailStore();
const contentSplit = ref<SplitText | null>(null);
const contentRef = ref<HTMLDivElement | null>(null);
const mountAnim = ref<GSAPTween | null>(null);
const clickAnim = ref<GSAPTimeline | null>(null);
const markAnim = ref<GSAPTween | null>(null);
const clickNums = ref<number>(0);

const clickAnimDuration = 0.2;
const markAnimDuration = 0.5;

const handleClick = () => {
	if (!contentSplit.value || mountAnim.value?.isActive() || clickAnim.value || clickNums.value >= 5)
		return;
	clickNums.value++;
	if (clickNums.value === 5) {
		markAnim.value = gsap.fromTo(
			contentSplit.value.chars.at(-1) || null,
			{
				x: "-0.25em",
				opacity: 0,
			},
			{
				x: 0,
				opacity: 1,
				ease: "power1.out",
				duration: markAnimDuration,
			},
		);
		clickAnim.value = gsap.timeline().to(contentSplit.value.chars.slice(0, -1), {
			x: 0,
			ease: "power1.out",
			duration: markAnimDuration,
		});
		detailStore.bottomMoreInstance?.triggerAnim();
		mountAnim.value?.kill();
	} else {
		clickAnim.value = gsap
			.timeline({
				onComplete: () => {
					clickAnim.value?.kill();
					clickAnim.value = null;
				},
			})
			.to(contentSplit.value.chars.slice(0, -1), {
				x: 0,
				ease: "power1.out",
				duration: clickAnimDuration / 4,
			})
			.to(contentSplit.value.chars.slice(0, -1), {
				x: "1em",
				ease: "power1.inOut",
				duration: clickAnimDuration / 2,
			})
			.to(contentSplit.value.chars.slice(0, -1), {
				x: "0.5em",
				ease: "power1.in",
				duration: clickAnimDuration / 4,
			});
	}
};

onMounted(() => {
	contentSplit.value = SplitText.create(contentRef.value, {
		type: "chars",
		charsClass: "hoverable",
	});
	gsap.set(contentSplit.value.chars, { opacity: 0 });
	mountAnim.value = gsap.fromTo(
		contentSplit.value.chars.slice(0, -1),
		{
			x: "1em",
			yPercent: -50,
			opacity: 0,
		},
		{
			x: "0.5em",
			yPercent: 0,
			opacity: 1,
			stagger: 0.05,
			scrollTrigger: {
				trigger: contentRef.value,
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		},
	);
});

onUnmounted(() => {
	contentSplit.value?.revert();
	mountAnim.value?.kill();
	clickAnim.value?.kill();
	markAnim.value?.kill();
});
</script>

<template>
	<div class="bottom_content">
		<div class="content_inner" ref="contentRef" @click="handleClick">The End?</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.bottom_content {
	flex-grow: 2;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: end;
	width: 100%;
	background-color: transparent;
	color: #ff7f27;
	font-size: 8rem;
	font-family: "Coustard Black";
	text-align: center;
	user-select: none;
	overflow: hidden;
	pointer-events: none;
	z-index: variables.$float_zIndex;

	.content_inner {
		width: max-content;
		pointer-events: all;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.4;

	.bottom_content {
		font-size: 8rem * $base-size;
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.5;

	.bottom_content {
		font-size: 8rem * $base-size;
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.6;

	.bottom_content {
		font-size: 8rem * $base-size;
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.8;

	.bottom_content {
		font-size: 8rem * $base-size;
	}
}
</style>
