<script setup lang="ts">
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const containerRef = ref<HTMLDivElement | null>(null);
const appearInterval = ref<number | null>(null);
const currentAnim = ref<GSAPTween | null>(null);
const tooltipDirection = ref<"top" | "bottom">("bottom");

const appearDelay = 5000;
const shakeDuration = 1;
const shakeOpacity = 0.7;

const handleScrollStart = () => {
	currentAnim.value?.kill();
	currentAnim.value = gsap.to(containerRef.value, {
		opacity: 0,
		ease: "power2.out",
		duration: shakeDuration,
	});
};

const handleScrollEnd = () => {
	if (appearInterval.value) clearTimeout(appearInterval.value);
	appearInterval.value = setTimeout(() => {
		currentAnim.value = gsap.to(containerRef.value, {
			opacity: shakeOpacity,
			ease: "power2.out",
			duration: shakeDuration,
			onStart: () => {
				const smoother = ScrollSmoother.get();
				if (smoother) {
					const maxScroll = ScrollTrigger.maxScroll(window);
					const currentScroll = smoother.scrollTop();
					if (currentScroll + 1 >= maxScroll) tooltipDirection.value = "top";
					else tooltipDirection.value = "bottom";
				}
			},
		});
	}, appearDelay);
};

onMounted(() => {
	handleScrollEnd();
	ScrollTrigger.addEventListener("scrollStart", handleScrollStart);
	ScrollTrigger.addEventListener("scrollEnd", handleScrollEnd);
});

onUnmounted(() => {
	currentAnim.value?.kill();
	if (appearInterval.value) clearTimeout(appearInterval.value);
	ScrollTrigger.removeEventListener("scrollStart", handleScrollStart);
	ScrollTrigger.removeEventListener("scrollEnd", handleScrollEnd);
});
</script>

<template>
	<div class="detail_tooltip" ref="containerRef">
		<!-- From Uiverse.io by mrhyddenn -->
		<div
			class="scrolldown"
			:style="{ '--color': 'skyblue', rotate: tooltipDirection === 'top' ? '180deg' : '0deg' }"
		>
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

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.7;

	.detail_tooltip {
		padding-right: 1rem * $base-size;

		.scrolldown {
			width: calc(var(--sizeX) * $base-size);
			height: calc(var(--sizeY) * $base-size);
			margin-left: calc(var(sizeX / 2) * $base-size);
			border: calc(var(--sizeX) / 10 * $base-size) solid var(--color);
			border-radius: 50px * $base-size;
			margin-bottom: 16px * $base-size;

			&::before {
				bottom: 50px * $base-size;
				width: 6px * $base-size;
				height: 6px * $base-size;
				margin-left: -3px * $base-size;
				box-shadow: 0px -5px * $base-size 3px * $base-size 1px * $base-size #2a547066;
			}

			.chevrons {
				padding: 6px * $base-size 0 0 0;
				margin-left: -3px * $base-size;
				margin-top: 48px * $base-size;
				width: 30px * $base-size;

				.chevrondown {
					border-width: 0 3px * $base-size 3px * $base-size 0;
					width: 10px * $base-size;
					height: 10px * $base-size;

					&:nth-child(odd) {
						margin-top: 15px * $base-size;
					}

					&:nth-child(even) {
						margin-top: -6px * $base-size;
					}
				}
			}
		}
	}

	@keyframes scrolldown-anim {
		0% {
			opacity: 0;
			height: 6px * $base-size;
		}

		40% {
			opacity: 1;
			height: 10px * $base-size;
		}

		80% {
			transform: translate(0, 45px * $base-size);
			height: 10px * $base-size;
			opacity: 0;
		}

		100% {
			height: 3px * $base-size;
			opacity: 0;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.8;

	.detail_tooltip {
		padding-right: 1rem * $base-size;

		.scrolldown {
			width: calc(var(--sizeX) * $base-size);
			height: calc(var(--sizeY) * $base-size);
			margin-left: calc(var(sizeX / 2) * $base-size);
			border: calc(var(--sizeX) / 10 * $base-size) solid var(--color);
			border-radius: 50px * $base-size;
			margin-bottom: 16px * $base-size;

			&::before {
				bottom: 50px * $base-size;
				width: 6px * $base-size;
				height: 6px * $base-size;
				margin-left: -3px * $base-size;
				box-shadow: 0px -5px * $base-size 3px * $base-size 1px * $base-size #2a547066;
			}

			.chevrons {
				padding: 6px * $base-size 0 0 0;
				margin-left: -3px * $base-size;
				margin-top: 48px * $base-size;
				width: 30px * $base-size;

				.chevrondown {
					border-width: 0 3px * $base-size 3px * $base-size 0;
					width: 10px * $base-size;
					height: 10px * $base-size;

					&:nth-child(odd) {
						margin-top: 15px * $base-size;
					}

					&:nth-child(even) {
						margin-top: -6px * $base-size;
					}
				}
			}
		}
	}

	@keyframes scrolldown-anim {
		0% {
			opacity: 0;
			height: 6px * $base-size;
		}

		40% {
			opacity: 1;
			height: 10px * $base-size;
		}

		80% {
			transform: translate(0, 45px * $base-size);
			height: 10px * $base-size;
			opacity: 0;
		}

		100% {
			height: 3px * $base-size;
			opacity: 0;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.85;

	.detail_tooltip {
		padding-right: 1rem * $base-size;

		.scrolldown {
			width: calc(var(--sizeX) * $base-size);
			height: calc(var(--sizeY) * $base-size);
			margin-left: calc(var(sizeX / 2) * $base-size);
			border: calc(var(--sizeX) / 10 * $base-size) solid var(--color);
			border-radius: 50px * $base-size;
			margin-bottom: 16px * $base-size;

			&::before {
				bottom: 50px * $base-size;
				width: 6px * $base-size;
				height: 6px * $base-size;
				margin-left: -3px * $base-size;
				box-shadow: 0px -5px * $base-size 3px * $base-size 1px * $base-size #2a547066;
			}

			.chevrons {
				padding: 6px * $base-size 0 0 0;
				margin-left: -3px * $base-size;
				margin-top: 48px * $base-size;
				width: 30px * $base-size;

				.chevrondown {
					border-width: 0 3px * $base-size 3px * $base-size 0;
					width: 10px * $base-size;
					height: 10px * $base-size;

					&:nth-child(odd) {
						margin-top: 15px * $base-size;
					}

					&:nth-child(even) {
						margin-top: -6px * $base-size;
					}
				}
			}
		}
	}

	@keyframes scrolldown-anim {
		0% {
			opacity: 0;
			height: 6px * $base-size;
		}

		40% {
			opacity: 1;
			height: 10px * $base-size;
		}

		80% {
			transform: translate(0, 45px * $base-size);
			height: 10px * $base-size;
			opacity: 0;
		}

		100% {
			height: 3px * $base-size;
			opacity: 0;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.detail_tooltip {
		padding-right: 1rem * $base-size;

		.scrolldown {
			width: calc(var(--sizeX) * $base-size);
			height: calc(var(--sizeY) * $base-size);
			margin-left: calc(var(sizeX / 2) * $base-size);
			border: calc(var(--sizeX) / 10 * $base-size) solid var(--color);
			border-radius: 50px * $base-size;
			margin-bottom: 16px * $base-size;

			&::before {
				bottom: 50px * $base-size;
				width: 6px * $base-size;
				height: 6px * $base-size;
				margin-left: -3px * $base-size;
				box-shadow: 0px -5px * $base-size 3px * $base-size 1px * $base-size #2a547066;
			}

			.chevrons {
				padding: 6px * $base-size 0 0 0;
				margin-left: -3px * $base-size;
				margin-top: 48px * $base-size;
				width: 30px * $base-size;

				.chevrondown {
					border-width: 0 3px * $base-size 3px * $base-size 0;
					width: 10px * $base-size;
					height: 10px * $base-size;

					&:nth-child(odd) {
						margin-top: 15px * $base-size;
					}

					&:nth-child(even) {
						margin-top: -6px * $base-size;
					}
				}
			}
		}
	}

	@keyframes scrolldown-anim {
		0% {
			opacity: 0;
			height: 6px * $base-size;
		}

		40% {
			opacity: 1;
			height: 10px * $base-size;
		}

		80% {
			transform: translate(0, 45px * $base-size);
			height: 10px * $base-size;
			opacity: 0;
		}

		100% {
			height: 3px * $base-size;
			opacity: 0;
		}
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
