<script setup lang="ts">
import gsap from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

const contentRef = ref<HTMLParagraphElement | null>(null);
const hoverContentRef = ref<HTMLParagraphElement | null>(null);
const contentSplit = ref<SplitText | null>(null);
const hoverContentSplit = ref<SplitText | null>(null);

const containerMaxOffset = 300;
const textMaxOffset = 150;
const animDuration = 0.8;

const mouseEnterAnim = () => {
	if (!contentSplit.value) return;

	gsap.to(contentRef.value, {
		y: -containerMaxOffset,
		duration: animDuration,
	});
	gsap.to(hoverContentRef.value, {
		y: 0,
		duration: animDuration,
	});

	contentSplit.value.chars.forEach(char => {
		gsap.to(char, {
			y: Math.random() * randomSign() * textMaxOffset,
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
	if (!contentSplit.value) return;

	gsap.to(contentRef.value, {
		y: 0,
		duration: animDuration,
	});
	gsap.to(hoverContentRef.value, {
		y: -containerMaxOffset,
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
			y: Math.random() * randomSign() * textMaxOffset,
			duration: animDuration,
		});
	});
};

onMounted(() => {
	contentSplit.value = SplitText.create(contentRef.value, { type: "chars" });
	hoverContentSplit.value = SplitText.create(hoverContentRef.value, { type: "chars" });

	gsap.set(hoverContentRef.value, { y: -containerMaxOffset });
	hoverContentSplit.value?.chars.forEach(char => {
		gsap.set(char, { y: Math.random() * randomSign() * textMaxOffset });
	});
});

onUnmounted(() => {
	contentSplit.value?.revert();
});
</script>

<template>
	<div class="work_edit_title" @mouseenter="mouseEnterAnim" @mouseleave="mouseLeaveAnim">
		<p ref="contentRef">AUDIO EDITING</p>
		<p class="work_edit_title_hover" ref="hoverContentRef">AUDIO EDITING</p>
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

	p {
		margin: 0;

		&.work_edit_title_hover {
			position: absolute;
			color: #000000;
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.5;

	.work_edit_title {
		flex-direction: column;
		gap: 0;
		font-size: 5rem * $base-size;
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
