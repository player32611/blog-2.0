<script setup lang="ts">
import gsap from "gsap";

const imageStore = useImageStore();
const cloudRef = ref<HTMLDivElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);
const moveAnim = ref<GSAPTimeline | null>(null);

const easeTime = 0.5;
const moveDuration = 20;

const createMoveAnim = () => {
	if (!cloudRef.value) return;
	moveAnim.value?.kill();
	moveAnim.value = gsap
		.timeline({ repeat: -1 })
		.fromTo(
			cloudRef.value,
			{ x: 0 },
			{
				x: window.innerWidth - cloudRef.value.offsetWidth,
				duration: moveDuration / 2,
				ease: "none",
			},
		)
		.fromTo(
			cloudRef.value,
			{ x: window.innerWidth - cloudRef.value.offsetWidth },
			{ x: 0, duration: moveDuration / 2, ease: "none" },
		);
};

const resize = () => {
	requestAnimationFrame(() => {
		createMoveAnim();
	});
};

const handleMouseEnter = () => {
	if (!imageStore.activeImageData || !containerRef.value) return;
	const rect = containerRef.value.getBoundingClientRect();
	imageStore.setHoverImageData({
		width: rect.width,
		height: rect.height,
		center: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
	});
	moveAnim.value?.pause();
};

const handleMouseLeave = () => {
	imageStore.setHoverImageData(null);
	moveAnim.value?.resume();
};

const handleClick = () => {
	if (!imageStore.activeImageData) return;
	downloadFile(imageStore.activeImageData.path);
};

watch(
	() => imageStore.activeImageData,
	newData => {
		if (newData) gsap.to(cloudRef.value, { opacity: 1, duration: easeTime });
		else gsap.to(cloudRef.value, { opacity: 0, duration: easeTime });
	},
);

onMounted(() => {
	createMoveAnim();
	window.addEventListener("resize", resize);
});

onUnmounted(() => {
	moveAnim.value?.kill();
	window.removeEventListener("resize", resize);
});
</script>

<template>
	<!-- From Uiverse.io by mrhyddenn -->
	<div class="image_download" ref="cloudRef">
		<!-- From Uiverse.io by vinodjangid07 -->
		<div
			class="download_container"
			ref="containerRef"
			@click="handleClick"
			@mouseenter="handleMouseEnter"
			@mouseleave="handleMouseLeave"
		>
			<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" class="svgIcon">
				<path
					d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
				></path>
			</svg>
			<span class="icon2"></span>
			<div class="download_content">download</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
/* From Uiverse.io by mrhyddenn */
.image_download {
	position: absolute;
	top: 100px;
	left: 0;
	width: 110px;
	height: 30px;
	background: #fff;
	border-radius: 100px;
	opacity: 0;

	&:hover {
		.svgIcon {
			fill: rgb(255, 255, 255);
			animation: slide-in-top 1s linear infinite;
		}

		.icon2 {
			border-bottom: 2px solid rgb(235, 235, 235);
			border-left: 2px solid rgb(235, 235, 235);
			border-right: 2px solid rgb(235, 235, 235);
		}
	}

	&::before {
		content: "";
		position: absolute;
		top: -20px;
		left: 10px;
		width: 30px;
		height: 30px;
		background: #fff;
		border-radius: 50%;
		box-shadow: 40px 0 0 20px #fff;
	}

	/* From Uiverse.io by vinodjangid07 */
	.download_container {
		position: relative;
		bottom: 40px;
		display: flex;
		flex-direction: column;
		justify-content: end;
		align-items: center;
		height: calc(100% + 40px);
		width: 100%;
		cursor: pointer;

		&:hover {
			.svgIcon {
				animation: slide-in-top 1s linear infinite;
			}
		}

		.svgIcon {
			fill: rgb(70, 70, 70);
		}

		.icon2 {
			width: 18px;
			height: 5px;
			border-bottom: 2px solid rgb(70, 70, 70);
			border-left: 2px solid rgb(70, 70, 70);
			border-right: 2px solid rgb(70, 70, 70);
		}

		.download_content {
			margin: 5px;
			font-size: 0.8rem;
			font-family: "方正基础像素体";
		}
	}
}

@keyframes slide-in-top {
	0% {
		transform: translateY(-10px);
		opacity: 0;
	}

	100% {
		transform: translateY(0px);
		opacity: 1;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.7;

	.image_download {
		top: 100px * $base-size;
		width: 110px * $base-size;
		height: 30px * $base-size;
		border-radius: 100px * $base-size;

		&:hover {
			.icon2 {
				border-bottom: 2px * $base-size solid rgb(235, 235, 235);
				border-left: 2px * $base-size solid rgb(235, 235, 235);
				border-right: 2px * $base-size solid rgb(235, 235, 235);
			}
		}

		&::before {
			top: -20px * $base-size;
			left: 10px * $base-size;
			width: 30px * $base-size;
			height: 30px * $base-size;
			box-shadow: 40px * $base-size 0 0 20px * $base-size #fff;
		}

		.download_container {
			bottom: 40px * $base-size;
			height: calc(100% + 40px * $base-size);

			.icon2 {
				width: 18px * $base-size;
				height: 5px * $base-size;
				border-bottom: 2px * $base-size solid rgb(70, 70, 70);
				border-left: 2px * $base-size solid rgb(70, 70, 70);
				border-right: 2px * $base-size solid rgb(70, 70, 70);
			}

			.download_content {
				margin: 5px * $base-size;
				font-size: 0.8rem * $base-size;
			}
		}
	}

	@keyframes slide-in-top {
		0% {
			transform: translateY(-10px * $base-size);
			opacity: 0;
		}

		100% {
			transform: translateY(0px);
			opacity: 1;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.8;

	.image_download {
		top: 100px * $base-size;
		width: 110px * $base-size;
		height: 30px * $base-size;
		border-radius: 100px * $base-size;

		&:hover {
			.icon2 {
				border-bottom: 2px * $base-size solid rgb(235, 235, 235);
				border-left: 2px * $base-size solid rgb(235, 235, 235);
				border-right: 2px * $base-size solid rgb(235, 235, 235);
			}
		}

		&::before {
			top: -20px * $base-size;
			left: 10px * $base-size;
			width: 30px * $base-size;
			height: 30px * $base-size;
			box-shadow: 40px * $base-size 0 0 20px * $base-size #fff;
		}

		.download_container {
			bottom: 40px * $base-size;
			height: calc(100% + 40px * $base-size);

			.icon2 {
				width: 18px * $base-size;
				height: 5px * $base-size;
				border-bottom: 2px * $base-size solid rgb(70, 70, 70);
				border-left: 2px * $base-size solid rgb(70, 70, 70);
				border-right: 2px * $base-size solid rgb(70, 70, 70);
			}

			.download_content {
				margin: 5px * $base-size;
				font-size: 0.8rem * $base-size;
			}
		}
	}

	@keyframes slide-in-top {
		0% {
			transform: translateY(-10px * $base-size);
			opacity: 0;
		}

		100% {
			transform: translateY(0px);
			opacity: 1;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.9;

	.image_download {
		top: 100px * $base-size;
		width: 110px * $base-size;
		height: 30px * $base-size;
		border-radius: 100px * $base-size;

		&:hover {
			.icon2 {
				border-bottom: 2px * $base-size solid rgb(235, 235, 235);
				border-left: 2px * $base-size solid rgb(235, 235, 235);
				border-right: 2px * $base-size solid rgb(235, 235, 235);
			}
		}

		&::before {
			top: -20px * $base-size;
			left: 10px * $base-size;
			width: 30px * $base-size;
			height: 30px * $base-size;
			box-shadow: 40px * $base-size 0 0 20px * $base-size #fff;
		}

		.download_container {
			bottom: 40px * $base-size;
			height: calc(100% + 40px * $base-size);

			.icon2 {
				width: 18px * $base-size;
				height: 5px * $base-size;
				border-bottom: 2px * $base-size solid rgb(70, 70, 70);
				border-left: 2px * $base-size solid rgb(70, 70, 70);
				border-right: 2px * $base-size solid rgb(70, 70, 70);
			}

			.download_content {
				margin: 5px * $base-size;
				font-size: 0.8rem * $base-size;
			}
		}
	}

	@keyframes slide-in-top {
		0% {
			transform: translateY(-10px * $base-size);
			opacity: 0;
		}

		100% {
			transform: translateY(0px);
			opacity: 1;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 1;

	.image_download {
		top: 100px * $base-size;
		width: 110px * $base-size;
		height: 30px * $base-size;
		border-radius: 100px * $base-size;

		&:hover {
			.icon2 {
				border-bottom: 2px * $base-size solid rgb(235, 235, 235);
				border-left: 2px * $base-size solid rgb(235, 235, 235);
				border-right: 2px * $base-size solid rgb(235, 235, 235);
			}
		}

		&::before {
			top: -20px * $base-size;
			left: 10px * $base-size;
			width: 30px * $base-size;
			height: 30px * $base-size;
			box-shadow: 40px * $base-size 0 0 20px * $base-size #fff;
		}

		.download_container {
			bottom: 40px * $base-size;
			height: calc(100% + 40px * $base-size);

			.icon2 {
				width: 18px * $base-size;
				height: 5px * $base-size;
				border-bottom: 2px * $base-size solid rgb(70, 70, 70);
				border-left: 2px * $base-size solid rgb(70, 70, 70);
				border-right: 2px * $base-size solid rgb(70, 70, 70);
			}

			.download_content {
				margin: 5px * $base-size;
				font-size: 0.8rem * $base-size;
			}
		}
	}

	@keyframes slide-in-top {
		0% {
			transform: translateY(-10px * $base-size);
			opacity: 0;
		}

		100% {
			transform: translateY(0px);
			opacity: 1;
		}
	}
}
</style>
