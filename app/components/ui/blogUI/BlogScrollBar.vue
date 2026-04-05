<script setup lang="ts">
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const scrollProgress = ref<number>(0);
const scrollTriggerInstance = ref<globalThis.ScrollTrigger | null>(null);
const smoother = ref<globalThis.ScrollSmoother | undefined>(undefined);

const updateScrollProgress = () => {
	if (smoother.value) {
		const scrollTop = smoother.value.scrollTop();
		console.log(scrollTop);
		const contentHeight = smoother.value.content().offsetHeight;
		const viewportHeight = window.innerHeight;

		const progress =
			contentHeight > viewportHeight ? scrollTop / (contentHeight - viewportHeight) : 0;

		scrollProgress.value = Math.min(Math.max(progress, 0), 1);
	}
};

const initScrollListener = () => {
	if (scrollTriggerInstance.value) {
		scrollTriggerInstance.value.kill();
		scrollTriggerInstance.value = null;
	}

	smoother.value = ScrollSmoother.get();
	if (smoother.value) {
		updateScrollProgress();
		scrollTriggerInstance.value = ScrollTrigger.create({
			trigger: ".blog_content_container",
			start: "top top",
			end: "bottom bottom",
			onUpdate: self => {
				scrollProgress.value = self.progress;
			},
		});
	}
};

const resize = () => {
	setTimeout(updateScrollProgress, 100);
};

watch([smoother.value?.scrollTop()], () => {
	updateScrollProgress();
});

onMounted(() => {
	const initTimer = setTimeout(initScrollListener, 100);

	const observer = new MutationObserver(() => {
		setTimeout(() => {
			initScrollListener();
		}, 100);
	});

	const contentContainer = document.querySelector(".blog_content_container");
	if (contentContainer) {
		observer.observe(contentContainer, {
			childList: true,
			subtree: true,
			characterData: true,
		});
	}

	window.addEventListener("resize", resize);

	onUnmounted(() => {
		clearTimeout(initTimer);
		observer.disconnect();
		window.removeEventListener("resize", resize);
		if (scrollTriggerInstance.value) {
			scrollTriggerInstance.value.kill();
		}
	});
});
</script>

<template>
	<div class="blog_scrollbar">
		<div class="scroll-progress" :style="{ height: scrollProgress * 100 + '%' }"></div>
	</div>
</template>

<style scoped lang="scss">
.blog_scrollbar {
	position: fixed;
	left: 0;
	height: 100dvh;
	width: 5px;
	background-color: rgba(255, 255, 255, 0.2);

	.scroll-progress {
		width: 100%;
		background-color: #ffffff;
		border-radius: 0 0 2.5px 2.5px;
		transition: height 0.1s ease-out;
	}
}
</style>
