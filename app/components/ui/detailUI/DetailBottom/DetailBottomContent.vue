<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const contentSplit = ref<SplitText | null>(null);
const contentRef = ref<HTMLDivElement | null>(null);
const mountAnim = ref<gsap.core.Tween | null>(null);
const clickAnim = ref<gsap.core.Timeline | null>(null);
const markAnim = ref<gsap.core.Tween | null>(null);
const clickNums = ref<number>(0);

const clickAnimDuration: number = 0.2;
const markAnimDuration: number = 0.5;

const handleClick = () => {
	if (!contentSplit.value || mountAnim.value?.isActive() || clickAnim.value || clickNums.value >= 5)
		return;
	clickNums.value++;
	if (clickNums.value === 5) {
		markAnim.value = gsap.fromTo(
			contentSplit.value.chars.at(-1) || null,
			{
				x: "-2rem",
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
				x: "4rem",
				ease: "power1.inOut",
				duration: clickAnimDuration / 2,
			})
			.to(contentSplit.value.chars.slice(0, -1), {
				x: "2rem",
				ease: "power1.in",
				duration: clickAnimDuration / 4,
			});
	}
};

onMounted(() => {
	contentSplit.value = SplitText.create(contentRef.value, { type: "chars" });
	gsap.set(contentSplit.value.chars, { opacity: 0 });
	mountAnim.value = gsap.fromTo(
		contentSplit.value.chars.slice(0, -1),
		{
			x: "3rem",
			yPercent: -50,
			opacity: 0,
		},
		{
			x: "2rem",
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
	<div class="bottom_content" ref="contentRef" @click="handleClick">The End?</div>
</template>

<style scoped lang="scss">
.bottom_content {
	color: #ff7f27;
	font-size: 8rem;
	font-family: "Coustard Black";
	text-align: center;
	user-select: none;
	cursor: pointer;
}
</style>
