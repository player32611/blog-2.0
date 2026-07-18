<script setup lang="ts">
import gsap from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

const contentRefs = ref<HTMLParagraphElement[]>([]);
const contentSplit = ref<SplitText | null>(null);
const mountAnim = ref<GSAPTween | null>(null);

const animDelay = 1;

onMounted(() => {
	contentSplit.value = SplitText.create(contentRefs.value, { type: "chars" });
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
	<div class="work_blog_title">
		<p :ref="el => contentRefs.push(el as HTMLParagraphElement)">PERSONAL</p>
		<p :ref="el => contentRefs.push(el as HTMLParagraphElement)">WEBSITE</p>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.work_blog_title {
	position: relative;
	display: flex;
	justify-content: center;
	gap: 5rem;
	width: 100%;
	color: #ff7f27;
	font-size: 5rem;
	font-family: "Coustard Black";
	text-align: center;
	z-index: variables.$float_zIndex;

	p {
		margin: 0;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.5;

	.work_blog_title {
		flex-direction: column;
		gap: 0;
		font-size: 5rem * $base-size;
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.65;

	.work_blog_title {
		flex-direction: column;
		gap: 0;
		font-size: 5rem * $base-size;
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.6;

	.work_blog_title {
		gap: 5rem * $base-size;
		margin-bottom: 5rem * $base-size;
		font-size: 5rem * $base-size;
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.8;

	.work_blog_title {
		gap: 5rem * $base-size;
		margin-bottom: 5rem * $base-size;
		font-size: 5rem * $base-size;
	}
}
</style>
