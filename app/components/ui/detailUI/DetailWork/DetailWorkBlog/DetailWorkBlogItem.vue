<script setup lang="ts">
import gsap from "gsap";
import type { DetailWorkBlogItemParams } from "~/types/components";

const { image } = defineProps<DetailWorkBlogItemParams>();
const containerRef = ref<HTMLDivElement | null>(null);
const previewRef = ref<HTMLDivElement | null>(null);
const fadeAnim = ref<GSAPTween | null>(null);
const isFirstEnter = ref<boolean>(true);

const move = (e: MouseEvent) => {
	const setX = gsap.quickTo(previewRef.value, "x", { duration: 0.4, ease: "power3" });
	const setY = gsap.quickTo(previewRef.value, "y", { duration: 0.4, ease: "power3" });

	if (isFirstEnter.value) {
		setX(e.clientX, e.clientX);
		setY(e.clientY, e.clientY);
	} else {
		setX(e.clientX);
		setY(e.clientY);
		isFirstEnter.value = false;
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
	fadeAnim.value = gsap.to(previewRef.value, {
		autoAlpha: 1,
		ease: "none",
		paused: true,
		duration: 0.1,
	});
	window.addEventListener("mousemove", move);
});

onUnmounted(() => {
	window.removeEventListener("mousemove", move);
});
</script>

<template>
	<div
		class="work_blog_container"
		ref="containerRef"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
	>
		<img :src="image" alt="" />
		<!-- From Uiverse.io by Tiagoadag -->
		<div class="work_blog_preview" ref="previewRef">
			<div class="preview_inner"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.work_blog_container {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	overflow: hidden;

	&:hover {
		/* From Uiverse.io by ElSombrero2 */
		&::before {
			position: absolute;
			content: " ";
			display: block;
			width: 160px;
			height: 300%;
			background: linear-gradient(
				90deg,
				transparent,
				#ff9966,
				#ff9966,
				#ff9966,
				#ff9966,
				transparent
			);
			animation: rotation_481 5000ms infinite linear;
		}
	}

	img {
		position: absolute;
		height: 99%;
		width: 99%;
		user-select: none;
		object-fit: contain;
	}

	/* From Uiverse.io by Tiagoadag */
	.work_blog_preview {
		position: fixed;
		top: -25px;
		left: -25px;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;
		width: 50px;
		background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
		border-radius: 20px;
		box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.3);
		z-index: variables.$float_zIndex;
		visibility: hidden;
		pointer-events: none;

		.preview_inner {
			width: 98%;
			height: 98%;
			background-color: #1a1a1a;
			border-radius: 20px;
			transition: all 0.2s;
		}
	}
}

@keyframes rotation_481 {
	0% {
		transform: rotateZ(0deg);
	}

	0% {
		transform: rotateZ(360deg);
	}
}
</style>
