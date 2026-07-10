<script setup lang="ts">
import gsap from "gsap";
import type { DetailBottomMoreInstance } from "~/types/components.js";

import Button from "../../common/Button.vue";

const loadingStore = useLoadingStore();
const buttonRef = ref<HTMLDivElement | null>(null);
const placeHolderRef = ref<HTMLDivElement | null>(null);
const anim = ref<gsap.core.Timeline | null>(null);

const animDuration: number = 1;

const triggerAnim = () => {
	anim.value = gsap.timeline().fromTo(
		buttonRef.value,
		{ rotate: -45 },
		{
			y: 0,
			rotate: 0,
			ease: "bounce.out",
			duration: animDuration,
		},
	);
};

const resize = () => {
	if (placeHolderRef.value)
		gsap.set(placeHolderRef.value, {
			width: buttonRef.value?.offsetWidth,
			height: buttonRef.value?.offsetHeight,
		});
};

onMounted(() => {
	gsap.set(buttonRef.value, { y: -400 });
	resize();
	window.addEventListener("resize", resize);
});

onUnmounted(() => {
	anim.value?.kill();
	window.removeEventListener("resize", resize);
});

defineExpose<DetailBottomMoreInstance>({
	triggerAnim,
});
</script>

<template>
	<div class="bottom_more" ref="containerRef">
		<div class="button_container">
			<div class="button_wrapper hoverable" ref="buttonRef">
				<Button
					text="more"
					size="large"
					icon="&#xeaf1;"
					@click="loadingStore.loadingNavigate('/')"
					style="cursor: none"
				></Button>
			</div>
			<div class="button_placeholder" ref="placeHolderRef">?</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.bottom_more {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: end;
	height: 6rem;
	pointer-events: none;

	.button_container {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: end;
		height: 23rem;
		width: 20rem;
		overflow: hidden;

		.button_wrapper {
			margin-bottom: 0.25rem;
			z-index: variables.$float_zIndex;
			pointer-events: all;
		}

		.button_placeholder {
			position: absolute;
			bottom: -0.25rem;
			margin-bottom: 0.25rem;
			display: flex;
			justify-content: center;
			align-items: center;
			color: variables.$theme_color;
			font-size: 4rem;
			font-family: "方正基础像素体";
			border-color: variables.$theme_color;
			border-style: dashed;
			border-width: 0.25rem;
			z-index: variables.$float_zIndex - 1;
			user-select: none;
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.5;

	.bottom_more {
		height: 6rem * $base-size;

		.button_container {
			height: 27rem * $base-size;
			width: 20rem * $base-size;

			.button_wrapper {
				margin-bottom: 0.25rem * $base-size;
			}

			.button_placeholder {
				bottom: -0.25rem * $base-size;
				margin-bottom: 0.25rem * $base-size;
				font-size: 4rem * $base-size;
				border-width: 0.25rem * $base-size;
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.7;

	.bottom_more {
		height: 6rem * $base-size;

		.button_container {
			height: 24rem * $base-size;
			width: 20rem * $base-size;

			.button_wrapper {
				margin-bottom: 0.25rem * $base-size;
			}

			.button_placeholder {
				bottom: -0.25rem * $base-size;
				margin-bottom: 0.25rem * $base-size;
				font-size: 4rem * $base-size;
				border-width: 0.25rem * $base-size;
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.8;

	.bottom_more {
		height: 6rem * $base-size;

		.button_container {
			height: 22.5rem * $base-size;
			width: 20rem * $base-size;

			.button_wrapper {
				margin-bottom: 0.25rem * $base-size;
			}

			.button_placeholder {
				bottom: -0.25rem * $base-size;
				margin-bottom: 0.25rem * $base-size;
				font-size: 4rem * $base-size;
				border-width: 0.25rem * $base-size;
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.bottom_more {
		height: 6rem * $base-size;

		.button_container {
			height: 22rem * $base-size;
			width: 20rem * $base-size;

			.button_wrapper {
				margin-bottom: 0.25rem * $base-size;
			}

			.button_placeholder {
				bottom: -0.25rem * $base-size;
				margin-bottom: 0.25rem * $base-size;
				font-size: 4rem * $base-size;
				border-width: 0.25rem * $base-size;
			}
		}
	}
}
</style>
