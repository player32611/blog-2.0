<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger, TextPlugin } from "gsap/all";
import Lottie, { type AnimationItem } from "lottie-web";

import animPath from "@/assets/anims/doingCoding.json";

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
	}

	mountAnim.value = gsap.fromTo(
		contentRef.value,
		{ text: "" },
		{
			text: "喜欢做点东西",
			duration: mountDuration,
			scrollTrigger: {
				trigger: contentRef.value,
				start: "bottom 90%",
				toggleActions: "play none none reverse", // 进入时播放，离开时反向播放
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
	<div class="doing_coding">
		<div class="coding_anim" ref="animContainerRef"></div>
		<div class="coding_content_container">
			<div class="coding_content" ref="contentRef"></div>
			<span class="coding_content_handle" ref="handleRef"></span>
		</div>
	</div>
</template>

<style scoped lang="scss">
.doing_coding {
	justify-self: flex-end;
	display: flex;
	align-items: center;
	margin-right: 5%;
	height: 100%;
	width: 50%;
	font-size: 1rem;

	.coding_content_container {
		margin-left: 10%;
		display: flex;
		align-items: center;

		.coding_content {
			color: rgba($color: #ffffff, $alpha: 0.5);
			font-size: 2rem;
			font-family: "方正基础像素体";
			text-align: center;
		}

		.coding_content_handle {
			height: 2rem;
			width: 0.3rem;
			background-color: #ff7f27;
		}
	}

	.coding_anim {
		position: relative;
		padding: 3px 5px 0;
		width: 50%;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		/* From Uiverse.io by omar-alghaish */
		background: linear-gradient(
			45deg,
			#ff7f27 25%,
			#ff7f27 25%,
			#444 25%,
			#444 50%,
			#ff7f27 50%,
			#ff7f27 75%,
			#444 75%,
			#444 100%
		);
		animation: animate_6810 10s linear infinite;
		overflow: hidden;
	}
}

@keyframes animate_6810 {
	0% {
		background-position: 0px;
	}

	100% {
		background-position: 1000px;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	.doing_coding {
		justify-self: center;
		flex-direction: column-reverse;
		justify-content: center;
		margin-right: 0;
		width: 100%;

		.coding_content_container {
			margin-left: 0;

			.coding_content {
				font-size: 1.5rem;
			}

			.coding_content_handle {
				height: 2rem;
				width: 0.3rem;
			}
		}

		.coding_anim {
			margin-top: 20px;
			padding: 0 5px;
			width: 60%;
			border-top-left-radius: 13px;
			border-top-right-radius: 13px;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	.doing_coding {
		justify-self: center;
		flex-direction: column-reverse;
		margin-right: 0;
		width: 100%;

		.coding_content_container {
			margin-left: 0;

			.coding_content {
				font-size: 2rem;
			}

			.coding_content_handle {
				height: 2rem;
				width: 0.3rem;
			}
		}

		.coding_anim {
			margin-top: 20px;
			padding: 0 5px;
			width: 40%;
			border-top-left-radius: 15px;
			border-top-right-radius: 15px;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	.doing_coding {
		justify-self: flex-end;
		width: 60%;

		.coding_content_container {
			margin-left: 10%;

			.coding_content {
				font-size: 2rem;
			}

			.coding_content_handle {
				height: 2rem;
				width: 0.3rem;
			}
		}

		.coding_anim {
			padding: 2px 5px 0;
			width: 45%;
			border-top-left-radius: 15px;
			border-top-right-radius: 15px;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	.doing_coding {
		justify-self: flex-end;
		width: 55%;

		.coding_content_container {
			margin-left: 10%;

			.coding_content {
				font-size: 2rem;
			}

			.coding_content_handle {
				height: 2rem;
				width: 0.3rem;
			}
		}

		.coding_anim {
			padding: 2px 5px 0;
			width: 50%;
			border-top-left-radius: 15px;
			border-top-right-radius: 15px;
		}
	}
}
</style>
