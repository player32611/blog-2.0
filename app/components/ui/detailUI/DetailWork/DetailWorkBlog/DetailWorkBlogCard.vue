<script setup lang="ts">
import gsap from "gsap";
import type { DetailWorkBlogCardParams } from "~/types/components";

const { title, subtitle, content, image } = defineProps<DetailWorkBlogCardParams>();
const cardRef = ref<HTMLDivElement | null>(null);
const previewRef = ref<HTMLDivElement | null>(null);
const fadeAnim = ref<GSAPTween | null>(null);
const isFirstEnter = ref<boolean>(true);

let setX: gsap.QuickToFunc;
let setY: gsap.QuickToFunc;
const cardColor: { backgroundColor: string; color: string }[] = [
	{ backgroundColor: "linear-gradient(-45deg, #ff0000 0%, #ffff00 100%)", color: "#ff0000" },
	{ backgroundColor: "linear-gradient(-45deg, #e81cff 0%, #40c9ff 100%)", color: "#e81cff" },
	{ backgroundColor: "linear-gradient(-45deg, #74ebd5 0%, #acb6e5 100%)", color: "#74ebd5" },
];

const move = (e: MouseEvent) => {
	if (isFirstEnter.value) {
		setX(e.clientX, e.clientX);
		setY(e.clientY, e.clientY);
		isFirstEnter.value = false;
	} else {
		setX(e.clientX);
		setY(e.clientY);
	}
};

const handleMouseEnter = (e: MouseEvent) => {
	isFirstEnter.value = true;
	fadeAnim.value?.play();
	move(e);
};

const handleMouseLeave = () => {
	fadeAnim.value?.reverse();
};

onMounted(() => {
	setX = gsap.quickTo(previewRef.value, "x", { duration: 0.4, ease: "power3" });
	setY = gsap.quickTo(previewRef.value, "y", { duration: 0.4, ease: "power3" });
	fadeAnim.value = gsap.to(previewRef.value, {
		autoAlpha: 1,
		rotate: -10,
		ease: "none",
		paused: true,
		duration: 0.1,
	});
	const theme = randomChoose(...cardColor);
	gsap.set(cardRef.value, { "--backgroundColor": theme?.backgroundColor });
	gsap.set(cardRef.value, { "--color": theme?.color });
	window.addEventListener("mousemove", move);
});

onUnmounted(() => {
	window.removeEventListener("mousemove", move);
});
</script>

<template>
	<!-- From Uiverse.io by gharsh11032000 -->
	<div
		class="work_blog_card"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
		ref="cardRef"
	>
		<p class="heading">{{ title }}</p>
		<p>{{ content }}</p>
		<p>{{ subtitle }}</p>
	</div>
	<Teleport to="body">
		<div class="work_blog_preview" ref="previewRef">
			<div class="preview_inner">
				<img class="preview_image" :src="image" alt="111" />
			</div>
		</div>
	</Teleport>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

/* From Uiverse.io by gharsh11032000 */
.work_blog_card {
	--backgroundColor: none;
	--color: none;
	position: relative;
	padding: 12px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 12px;
	width: calc(100% - 12px * 2);
	height: calc(100% - 12px * 2);
	font-family: "方正基础像素体";
	background-color: #000000;
	border-radius: 8px;

	&:hover {
		&::before {
			transform: rotate(-90deg) scaleX(1.65) scaleY(0.61);
		}
	}

	&::before {
		content: "";
		position: absolute;
		inset: 0;
		left: -5px;
		margin: auto;
		width: calc(100% + 10px);
		height: calc(100% + 10px);
		border-radius: 10px;
		background: var(--backgroundColor);
		z-index: -10;
		pointer-events: none;
		transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	p {
		margin: 0;
		color: var(--color);
		text-align: center;

		&:not(.heading) {
			font-size: 14px;
		}

		& .heading {
			font-size: 20px;
			text-transform: capitalize;
			font-weight: 700;
		}

		&:last-child {
			font-weight: 600;
		}
	}
}

/* From Uiverse.io by Tiagoadag */
.work_blog_preview {
	position: fixed;
	left: -25px;
	top: -25px;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
	background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
	border-radius: 20px;
	box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.3);
	z-index: variables.$float_zIndex;
	visibility: hidden;
	pointer-events: none;
	transform: none;

	.preview_inner {
		width: 98%;
		height: 98%;
		background-color: #1a1a1a;
		border-radius: 20px;
		transition: all 0.2s;
		overflow: hidden;

		.preview_image {
			height: 100%;
			width: 100%;
			object-fit: contain;
		}
	}
}
</style>
