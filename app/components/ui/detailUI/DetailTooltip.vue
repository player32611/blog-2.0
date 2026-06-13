<script setup lang="ts">
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const containerRef = ref<HTMLDivElement | null>(null);
const appearInterval = ref<number | null>(null);

const appearDelay: number = 5000;
const shakeDuration: number = 1;
const shakeOpacity: number = 0.7;

const handleScrollStart = () => {
	gsap.to(containerRef.value, {
		opacity: 0,
		ease: "power2.out",
		duration: shakeDuration,
	});
};

const handleScrollEnd = () => {
	if (appearInterval.value) clearTimeout(appearInterval.value);
	appearInterval.value = setTimeout(() => {
		gsap.to(containerRef.value, {
			opacity: shakeOpacity,
			ease: "power2.out",
			duration: shakeDuration,
		});
	}, appearDelay);
};

onMounted(() => {
	handleScrollEnd();
	ScrollTrigger.addEventListener("scrollStart", handleScrollStart);
	ScrollTrigger.addEventListener("scrollEnd", handleScrollEnd);
});

onUnmounted(() => {
	ScrollTrigger.removeEventListener("scrollStart", handleScrollStart);
	ScrollTrigger.removeEventListener("scrollEnd", handleScrollEnd);
});
</script>

<template>
	<div class="detail_tooltip" ref="containerRef">
		<!-- From Uiverse.io by mrhyddenn -->
		<div class="scrolldown" style="--color: skyblue">
			<div class="chevrons">
				<div class="chevrondown"></div>
				<div class="chevrondown"></div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.detail_tooltip {
	position: fixed;
	top: 0;
	right: 0;
	display: flex;
	align-items: center;
	padding-right: 1rem;
	height: 100vh;
	opacity: 0;

	/* From Uiverse.io by mrhyddenn */
	.scrolldown {
		--color: white;
		--sizeX: 30px;
		--sizeY: 70px;
		position: relative;
		width: var(--sizeX);
		height: var(--sizeY);
		margin-left: var(sizeX / 2);
		border: calc(var(--sizeX) / 10) solid var(--color);
		border-radius: 50px;
		box-sizing: border-box;
		margin-bottom: 16px;
		cursor: pointer;

		&::before {
			content: "";
			position: absolute;
			bottom: 50px;
			left: 50%;
			width: 6px;
			height: 6px;
			margin-left: -3px;
			background-color: var(--color);
			border-radius: 100%;
			animation: scrolldown-anim 2s infinite;
			box-sizing: border-box;
			box-shadow: 0px -5px 3px 1px #2a547066;
		}

		.chevrons {
			padding: 6px 0 0 0;
			margin-left: -3px;
			margin-top: 48px;
			width: 30px;
			display: flex;
			flex-direction: column;
			align-items: center;

			.chevrondown {
				position: relative;
				border: solid var(--color);
				border-width: 0 3px 3px 0;
				display: inline-block;
				width: 10px;
				height: 10px;
				transform: rotate(45deg);

				&:nth-child(odd) {
					margin-top: 15px;
					animation: pulse54012 500ms ease infinite alternate;
				}

				&:nth-child(even) {
					margin-top: -6px;
					animation: pulse54012 500ms ease infinite alternate 250ms;
				}
			}
		}
	}
}

@keyframes scrolldown-anim {
	0% {
		opacity: 0;
		height: 6px;
	}

	40% {
		opacity: 1;
		height: 10px;
	}

	80% {
		transform: translate(0, 45px);
		height: 10px;
		opacity: 0;
	}

	100% {
		height: 3px;
		opacity: 0;
	}
}

@keyframes pulse54012 {
	from {
		opacity: 0;
	}

	to {
		opacity: 0.5;
	}
}
</style>
