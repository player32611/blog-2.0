<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger, TextPlugin } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const contentRef = ref<HTMLDivElement | null>(null);
const handleRef = ref<HTMLDivElement | null>(null);
const mountAnim = ref<GSAPTween | null>(null);
const handleShakeAnim = ref<GSAPTween | null>(null);

const mountDuration = 1;
const handleShakeDuration = 0.5;

onMounted(() => {
	mountAnim.value = gsap.fromTo(
		contentRef.value,
		{ text: "" },
		{
			text: "也会干些别的",
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
	handleShakeAnim.value?.kill();
	mountAnim.value?.kill();
});
</script>

<template>
	<div class="doing_other">
		<div class="other_anim"></div>
		<div class="other_content_container">
			<div class="other_content" ref="contentRef"></div>
			<span class="other_content_handle" ref="handleRef"></span>
		</div>
	</div>
</template>

<style scoped lang="scss">
.doing_other {
	justify-self: flex-end;
	display: flex;
	align-items: center;
	margin-right: 5%;
	height: 100%;
	width: 50%;
	font-size: 1rem;

	.other_content_container {
		margin-left: 10%;
		display: flex;
		align-items: center;

		.other_content {
			color: rgba($color: #ffffff, $alpha: 0.5);
			font-size: 2rem;
			font-family: "方正基础像素体";
			text-align: center;
		}

		.other_content_handle {
			height: 2rem;
			width: 0.3rem;
			background-color: #ff7f27;
		}
	}

	.other_anim {
		height: 100%;
		width: 50%;
		background-color: green;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	.doing_other {
		justify-self: center;
		flex-direction: column-reverse;
		margin-right: 0;
		width: 80%;

		.other_content_container {
			margin-left: 0;
			margin-bottom: 10%;
		}

		.other_anim {
			width: 100%;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	.doing_other {
		justify-self: center;
		flex-direction: column-reverse;
		margin-right: 0;
		width: 80%;

		.other_content_container {
			margin-left: 0;
			margin-bottom: 10%;
		}

		.other_anim {
			width: 100%;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	.doing_other {
		justify-self: flex-end;
		width: 70%;

		.other_content_container {
			margin-left: 10%;
		}

		.other_anim {
			width: 50%;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	.doing_other {
		justify-self: flex-end;
		width: 55%;

		.other_content_container {
			margin-left: 10%;
		}

		.other_anim {
			width: 50%;
		}
	}
}
</style>
