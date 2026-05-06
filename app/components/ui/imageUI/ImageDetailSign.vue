<script setup lang="ts">
import gsap from "gsap";

const imageStore = useImageStore();
const signRef = ref<HTMLDivElement | null>(null);
const signHeadRef = ref<HTMLDivElement | null>(null);
const easeTime = 0.5;

const handleMouseEnter = () => {
	if (!imageStore.activeImageData || !signHeadRef.value) return;
	const rect = signHeadRef.value.getBoundingClientRect();
	imageStore.setHoverImage({
		width: signHeadRef.value.offsetWidth,
		height: signHeadRef.value.offsetHeight,
		center: {
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2,
		},
	});
};

const handleMouseLeave = () => {
	imageStore.setHoverImage(null);
};

watch(
	() => imageStore.activeImageData,
	newData => {
		if (newData) {
			gsap.to(signRef.value, {
				rotate: "+=180",
				duration: easeTime,
				ease: "power1.Out",
				onComplete: () => {
					gsap.set(signRef.value, { rotate: 0 });
				},
			});
		} else {
			gsap.to(signRef.value, {
				rotate: "+=180",
				duration: easeTime,
				ease: "power1.in",
				onComplete: () => {
					gsap.set(signRef.value, { rotate: 180 });
				},
			});
		}
	},
);
</script>

<template>
	<div class="sign" ref="signRef">
		<div
			class="sign_head"
			ref="signHeadRef"
			@mouseenter="handleMouseEnter"
			@mouseleave="handleMouseLeave"
		>
			<div class="sign_content">点击输入文本</div>
		</div>
		<div class="sign_body"></div>
	</div>
</template>

<style scoped lang="scss">
.sign {
	position: fixed;
	bottom: 0;
	left: calc(20% - 150px - 5px - 20px);
	display: flex;
	flex-direction: column;
	align-items: center;
	transform-origin: center bottom;
	rotate: -180deg;

	.sign_head {
		padding: 10px;
		height: 150px;
		width: 300px;
		background-color: #a46952;
		border-width: 5px;
		border-style: solid;
		border-color: #000000;

		.sign_content {
			padding: 10px;
			height: calc(100% - 10px * 2);
			width: auto;
			background-color: #b596ac;
			color: #71456e;
			font-weight: 600;
			font-family: "方正基础像素体";
		}
	}

	.sign_body {
		height: 100px;
		width: 20px;
		background: linear-gradient(to bottom, #71456e 0%, #71456e 80%, #a46952 80%, #a46952 100%);
		border-width: 0 5px 5px 5px;
		border-style: solid;
		border-color: #000000;
	}
}
</style>
