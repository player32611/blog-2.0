<script setup lang="ts">
import gsap from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

const containerRef = ref<HTMLDivElement | null>(null);
const contentRefs = ref<HTMLParagraphElement[]>([]);
const hoverContentRefs = ref<HTMLParagraphElement[]>([]);
const contentSplit = ref<SplitText | null>(null);
const hoverContentSplit = ref<SplitText | null>(null);

const animDuration = 0.8;

const mouseEnterAnim = () => {
	if (!contentSplit.value || !containerRef.value) return;

	const offset = containerRef.value.offsetTop + containerRef.value.offsetHeight;

	gsap.to(contentRefs.value, {
		y: -2 * offset,
		duration: animDuration,
	});
	gsap.to(hoverContentRefs.value, {
		y: 0,
		duration: animDuration,
	});

	contentSplit.value.chars.forEach(char => {
		gsap.to(char, {
			y: (Math.random() * randomSign() * offset) / 2,
			duration: animDuration,
		});
	});
	hoverContentSplit.value?.chars.forEach(char => {
		gsap.to(char, {
			y: 0,
			duration: animDuration,
		});
	});
};

const mouseLeaveAnim = () => {
	if (!contentSplit.value || !containerRef.value) return;

	const offset = containerRef.value.offsetTop + containerRef.value.offsetHeight;

	gsap.to(contentRefs.value, {
		y: 0,
		duration: animDuration,
	});
	gsap.to(hoverContentRefs.value, {
		y: -2 * offset,
		duration: animDuration,
	});

	contentSplit.value.chars.forEach(char => {
		gsap.to(char, {
			y: 0,
			duration: animDuration,
		});
	});
	hoverContentSplit.value?.chars.forEach(char => {
		gsap.to(char, {
			y: (Math.random() * randomSign() * offset) / 2,
			duration: animDuration,
		});
	});
};

onMounted(() => {
	contentSplit.value = SplitText.create(contentRefs.value, { type: "chars" });
	hoverContentSplit.value = SplitText.create(hoverContentRefs.value, { type: "chars" });

	if (!containerRef.value) return;

	const offset = containerRef.value.offsetTop + containerRef.value.offsetHeight;

	gsap.set(hoverContentRefs.value, { y: -2 * offset });
	hoverContentSplit.value?.chars.forEach(char => {
		gsap.set(char, { y: (Math.random() * randomSign() * offset) / 2 });
	});
});

onUnmounted(() => {
	contentSplit.value?.revert();
});
</script>

<template>
	<div
		class="work_edit_title"
		@mouseenter="mouseEnterAnim"
		@mouseleave="mouseLeaveAnim"
		@mouseout="mouseLeaveAnim"
		ref="containerRef"
	>
		<div>
			<p :ref="el => contentRefs.push(el as HTMLParagraphElement)">AUDIO</p>
			<p :ref="el => contentRefs.push(el as HTMLParagraphElement)">EDITING</p>
		</div>
		<div class="work_edit_title_hover">
			<p :ref="el => hoverContentRefs.push(el as HTMLParagraphElement)">AUDIO</p>
			<p :ref="el => hoverContentRefs.push(el as HTMLParagraphElement)">EDITING</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.work_edit_title {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 5rem;
	width: 100%;
	color: #1677ff;
	font-size: 5rem;
	font-family: "Coustard Black";
	text-align: center;
	z-index: variables.$float_zIndex;

	div {
		display: flex;
		gap: 2rem;
	}

	.work_edit_title_hover {
		position: absolute;
		color: #000000;
	}

	p {
		margin: 0;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.5;

	.work_edit_title {
		flex-direction: column;
		gap: 0;
		font-size: 5rem * $base-size;

		div {
			display: flex;
			gap: 0;
			flex-direction: column;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.65;

	.work_edit_title {
		flex-direction: column;
		gap: 0;
		font-size: 5rem * $base-size;
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.6;

	.work_edit_title {
		gap: 5rem * $base-size;
		margin-bottom: 5rem * $base-size;
		font-size: 5rem * $base-size;
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.8;

	.work_edit_title {
		gap: 5rem * $base-size;
		margin-bottom: 5rem * $base-size;
		font-size: 5rem * $base-size;
	}
}
</style>
