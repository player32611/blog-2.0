<script setup lang="ts">
import gsap from "gsap";

import Bubble from "~/components/exhibit/Bubble.vue";

const bubbleRefs = ref<HTMLDivElement[] | null>(null);

const bubbleNum = 10;
const moveDuration = 1;

const handleClick = (event: MouseEvent) => {
	bubbleRefs.value?.forEach(el => {
		const rect = el.getBoundingClientRect();
		if (
			rect.x <= event.x &&
			event.x <= rect.x + rect.width &&
			rect.y <= event.y &&
			event.y <= rect.y + rect.height
		) {
			const centerX = rect.x + rect.width / 2;
			const centerY = rect.y + rect.height / 2;
			gsap.to(el, {
				left: `+=${(event.x < centerX ? 1 : -1) * (Math.random() * 150 + 50)}px`,
				top: `+=${(event.y < centerY ? 1 : -1) * (Math.random() * 150 + 50)}px`,
				ease: "power2.out",
				duration: moveDuration,
			});
		}
	});
};

onMounted(() => {
	bubbleRefs.value?.forEach(el => {
		gsap.set(el, {
			left: Math.random() * window.innerWidth,
			top: Math.random() * window.innerHeight,
			zoom: Math.random() * 0.7 + 0.3,
			animationDelay: Math.random() * -6,
		});
	});
	window.addEventListener("click", handleClick);
});

onUnmounted(() => {
	window.removeEventListener("click", handleClick);
});
</script>

<template>
	<div class="work_empty">
		<div class="bubble_container hoverable" v-for="_ in bubbleNum" ref="bubbleRefs">
			<Bubble />
		</div>
		<div class="empty_content_english">waiting</div>
		<div class="empty_content_chinese">敬请期待</div>
	</div>
</template>

<style scoped lang="scss">
// From Uiverse.io by ariba_9087
.work_empty {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%; /* Fill the entire screen */
	overflow: hidden;
	background: radial-gradient(circle, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.1));

	&::before,
	&::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		width: 300%;
		height: 300%;
		background: conic-gradient(
			from 0deg,
			#ff9aa2,
			/* Soft pink */ #ffb7b2,
			/* Light peach */ #ffdac1,
			/* Pastel yellow */ #e2f0cb,
			/* Mint green */ #a2e4ff,
			/* Baby blue */ #c9afff,
			/* Lavender */ #ffb7b2,
			#ff9aa2
		);
		transform: translate(-50%, -50%);
		animation: rotate 8s linear infinite;
		filter: blur(50px); /* Create a soft glowing effect */
		opacity: 0.8;
	}

	&::after {
		animation: rotate-reverse 10s linear infinite;
		opacity: 0.6;
	}

	.bubble_container {
		position: absolute;
		height: 200px;
		width: 200px;
		animation: animate_4010 8s ease-in-out infinite;
	}

	.empty_content_english {
		color: #ffffff;
		font-family: "Coustard Black";
		font-size: 5rem;
		text-shadow: 0px 0px 10px rgba($color: #ff7f27, $alpha: 0.8);
		animation: animate_4010 8s ease-in-out infinite;
	}

	.empty_content_chinese {
		color: #00000000;
		font-family: "方正基础像素体";
		font-size: 4rem;
		-webkit-text-stroke: calc(0.2rem) #ffffff;
		text-shadow: 0px 0px 10px rgba($color: #ff7f27, $alpha: 0.8);
		animation: animate_4010 8s ease-in-out infinite;
	}
}

@keyframes animate_4010 {
	0%,
	100% {
		transform: translateY(-20px);
	}

	50% {
		transform: translateY(20px);
	}
}

@keyframes rotate {
	0% {
		transform: translate(-50%, -50%) rotate(0deg);
	}
	100% {
		transform: translate(-50%, -50%) rotate(360deg);
	}
}

@keyframes rotate-reverse {
	0% {
		transform: translate(-50%, -50%) rotate(0deg);
	}
	100% {
		transform: translate(-50%, -50%) rotate(-360deg);
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.5;

	.work_empty {
		.bubble_container {
			position: absolute;
			height: 200px * $base-size;
			width: 200px * $base-size;
		}

		.empty_content_english {
			font-size: 5rem * $base-size;
			text-shadow: 0px 0px 10px * $base-size rgba($color: #ff7f27, $alpha: 0.8);
		}

		.empty_content_chinese {
			font-size: 4rem * $base-size;
			-webkit-text-stroke: calc(0.2rem * $base-size) #ffffff;
			text-shadow: 0px 0px 10px * $base-size rgba($color: #ff7f27, $alpha: 0.8);
		}
	}

	@keyframes animate_4010 {
		0%,
		100% {
			transform: translateY(-20px * $base-size);
		}

		50% {
			transform: translateY(20px * $base-size);
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.65;

	.work_empty {
		.bubble_container {
			position: absolute;
			height: 200px * $base-size;
			width: 200px * $base-size;
		}

		.empty_content_english {
			font-size: 5rem * $base-size;
			text-shadow: 0px 0px 10px * $base-size rgba($color: #ff7f27, $alpha: 0.8);
		}

		.empty_content_chinese {
			font-size: 4rem * $base-size;
			-webkit-text-stroke: calc(0.2rem * $base-size) #ffffff;
			text-shadow: 0px 0px 10px * $base-size rgba($color: #ff7f27, $alpha: 0.8);
		}
	}

	@keyframes animate_4010 {
		0%,
		100% {
			transform: translateY(-20px * $base-size);
		}

		50% {
			transform: translateY(20px * $base-size);
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.8;

	.work_empty {
		.bubble_container {
			position: absolute;
			height: 200px * $base-size;
			width: 200px * $base-size;
		}

		.empty_content_english {
			font-size: 5rem * $base-size;
			text-shadow: 0px 0px 10px * $base-size rgba($color: #ff7f27, $alpha: 0.8);
		}

		.empty_content_chinese {
			font-size: 4rem * $base-size;
			-webkit-text-stroke: calc(0.2rem * $base-size) #ffffff;
			text-shadow: 0px 0px 10px * $base-size rgba($color: #ff7f27, $alpha: 0.8);
		}
	}

	@keyframes animate_4010 {
		0%,
		100% {
			transform: translateY(-20px * $base-size);
		}

		50% {
			transform: translateY(20px * $base-size);
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.work_empty {
		.bubble_container {
			position: absolute;
			height: 200px * $base-size;
			width: 200px * $base-size;
		}

		.empty_content_english {
			font-size: 5rem * $base-size;
			text-shadow: 0px 0px 10px * $base-size rgba($color: #ff7f27, $alpha: 0.8);
		}

		.empty_content_chinese {
			font-size: 4rem * $base-size;
			-webkit-text-stroke: calc(0.2rem * $base-size) #ffffff;
			text-shadow: 0px 0px 10px * $base-size rgba($color: #ff7f27, $alpha: 0.8);
		}
	}

	@keyframes animate_4010 {
		0%,
		100% {
			transform: translateY(-20px * $base-size);
		}

		50% {
			transform: translateY(20px * $base-size);
		}
	}
}
</style>
