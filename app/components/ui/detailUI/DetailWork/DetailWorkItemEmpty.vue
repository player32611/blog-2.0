<script setup lang="ts">
import gsap from "gsap";

import Bubble from "~/components/exhibit/Bubble.vue";

const bubbleRefs = ref<HTMLDivElement[] | null>(null);

const bubbleNum: number = 10;
const moveDuration: number = 1;

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
.work_empty {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
	/* From Uiverse.io by csemszepp */
	background: linear-gradient(
		45deg,
		#343702 0%,
		#184500 20%,
		#187546 30%,
		#006782 40%,
		#0b1284 50%,
		#760ea1 60%,
		#83096e 70%,
		#840b2a 80%,
		#b13e12 90%,
		#e27412 100%
	);
	background-size: 100% 100%;
	background-color: #840b2a;

	.bubble_container {
		position: absolute;
		height: 200px;
		width: 200px;
		animation: animate_4010 8s ease-in-out infinite;
	}

	.empty_content_english {
		color: rgba($color: #ff7f27, $alpha: 0.6);
		font-family: "Coustard Black";
		font-size: 5rem;
		text-shadow: 0px 0px 10px rgba($color: #ff7f27, $alpha: 0.8);
		animation: animate_4010 8s ease-in-out infinite;
	}

	.empty_content_chinese {
		color: #00000000;
		font-family: "方正基础像素体";
		font-size: 4rem;
		-webkit-text-stroke: calc(0.2rem) rgba($color: #ff7f27, $alpha: 0.6);
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
</style>
