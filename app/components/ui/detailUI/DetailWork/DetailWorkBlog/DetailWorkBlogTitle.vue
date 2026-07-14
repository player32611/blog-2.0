<script setup lang="ts">
import gsap from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

const contentRef = ref<HTMLDivElement | null>(null);
const contentSplit = ref<SplitText | null>(null);
const mountAnim = ref<GSAPTween | null>(null);

const animDelay = 1;

onMounted(() => {
	contentSplit.value = SplitText.create(contentRef.value, { type: "chars" });
	mountAnim.value = gsap.from(contentSplit.value.chars, {
		duration: 1,
		opacity: 0,
		scale: 0,
		y: 80,
		rotationX: 180,
		transformOrigin: "0% 50% -50",
		ease: "back",
		delay: animDelay,
		stagger: 0.05,
	});
});

onUnmounted(() => {
	contentSplit.value?.revert();
	mountAnim.value?.kill();
});
</script>

<template>
	<div class="work_blog_title" ref="contentRef">PERSONAL WEBSITE</div>
</template>

<style scoped lang="scss">
.work_blog_title {
	position: relative;
	width: 100%;
	color: #ff7f27;
	font-size: 5rem;
	font-family: "Coustard Black";
	text-align: center;
}
</style>
