<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger, TextPlugin } from "gsap/all";
import Lottie from "lottie-web";
import type { AnimationItem } from "lottie-web";

import animPath from "@/assets/anims/doingGaming.json";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const animContainerRef = ref<HTMLDivElement | null>(null);
const contentRef = ref<HTMLDivElement | null>(null);
const handleRef = ref<HTMLDivElement | null>(null);
const lottieAnim = ref<AnimationItem | null>(null);
const mountAnim = ref<GSAPTween | null>(null);
const handleShakeAnim = ref<GSAPTween | null>(null);

const mountDuration = 1;
const handleShakeDuration = 0.5;

onMounted(() => {
	if (animContainerRef.value) {
		lottieAnim.value = Lottie.loadAnimation({
			container: animContainerRef.value,
			renderer: "svg",
			loop: true,
			autoplay: true,
			animationData: animPath,
		});
		lottieAnim.value.pause();
	}

	mountAnim.value = gsap.fromTo(
		contentRef.value,
		{ text: "" },
		{
			text: "偶尔也会做点游戏",
			duration: mountDuration,
			scrollTrigger: {
				trigger: contentRef.value,
				start: "bottom 90%",
				toggleActions: "play none none reverse", // 进入时播放，离开时反向播放
				onEnter: () => {
					lottieAnim.value?.play();
				},
				onEnterBack: () => {
					lottieAnim.value?.play();
				},
				onLeave: () => {
					lottieAnim.value?.pause();
				},
				onLeaveBack: () => {
					lottieAnim.value?.pause();
				},
			},
		},
	);

	handleShakeAnim.value = gsap.fromTo(
		handleRef.value,
		{
			opacity: 0,
		},
		{
			opacity: 1,
			ease: "none",
			duration: handleShakeDuration,
			repeat: -1,
			yoyo: true,
		},
	);
});

onUnmounted(() => {
	lottieAnim.value?.destroy();
	mountAnim.value?.kill();
	handleShakeAnim.value?.kill();
});
</script>

<template>
	<div class="doing_gaming">
		<div class="gaming_content_container">
			<div class="gaming_content" ref="contentRef"></div>
			<span class="gaming_content_handle" ref="handleRef"></span>
		</div>
		<div class="gaming_anim" ref="animContainerRef"></div>
	</div>
</template>

<style scoped lang="scss">
.doing_gaming {
	justify-self: start;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-left: 5%;
	height: 100%;
	width: 50%;
	font-size: 1rem;

	.gaming_content_container {
		display: flex;
		align-items: center;

		.gaming_content {
			color: rgba($color: #ffffff, $alpha: 0.5);
			font-size: 2rem;
			font-family: "方正基础像素体";
			text-align: center;
		}

		.gaming_content_handle {
			height: 2rem;
			width: 0.3rem;
			background-color: #ff7f27;
		}
	}

	.gaming_anim {
		width: 50%;
		background-color: #000000;
		border-radius: 10px;
		border-width: 5px;
		border-style: solid;
		border-color: rgba($color: #ffffff, $alpha: 0.7);
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	.doing_gaming {
		justify-self: center;
		flex-direction: column;
		justify-content: center;
		margin-left: 0;
		width: 100%;

		.gaming_content_container {
			.gaming_content {
				font-size: 1.5rem;
			}
		}

		.gaming_anim {
			margin-top: 20px;
			width: 60%;
			border-width: 3px;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	.doing_gaming {
		justify-self: center;
		flex-direction: column;
		margin-left: 0;
		width: 100%;

		.gaming_anim {
			margin-top: 20px;
			width: 40%;
			border-width: 4px;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	.doing_gaming {
		justify-self: start;
		margin-left: 5%;
		height: 100%;
		width: 70%;
		font-size: 1rem;

		.gaming_anim {
			width: 40%;
			border-width: 3px;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	.doing_gaming {
		justify-self: start;
		margin-left: 5%;
		height: 100%;
		width: 60%;
		font-size: 1rem;

		.gaming_anim {
			width: 45%;
			border-width: 4px;
		}
	}
}
</style>
