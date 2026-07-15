<script setup lang="ts">
import gsap from "gsap";
import { CustomEase, CustomWiggle } from "gsap/all";

gsap.registerPlugin(CustomEase, CustomWiggle);

const containerRef = ref<HTMLDivElement | null>(null);
const buttonRef = ref<HTMLDivElement | null>(null);
const contentRef = ref<HTMLParagraphElement | null>(null);
const waitAnim = ref<GSAPTween | null>(null);

const moveStrength = 0.4;
const contentStrength = 0.1;

const handleMouseMove = (e: MouseEvent) => {
	if (!containerRef.value) return;
	const rect = containerRef.value.getBoundingClientRect();
	const x = gsap.utils.mapRange(rect.left, rect.right, -rect.width / 2, rect.width / 2, e.clientX);
	const y = gsap.utils.mapRange(
		rect.top,
		rect.bottom,
		-rect.height / 2,
		rect.height / 2,
		e.clientY,
	);

	gsap.to(buttonRef.value, {
		x: x * moveStrength,
		y: y * moveStrength,
		duration: 0.4,
		ease: "power2.out",
		overwrite: "auto",
	});
	gsap.to(contentRef.value, {
		x: x * contentStrength,
		y: y * contentStrength,
		duration: 0.4,
		ease: "power2.out",
		overwrite: "auto",
	});
};

const handleMouseLeave = () => {
	gsap.to(buttonRef.value, {
		x: 0,
		y: 0,
		duration: 0.7,
		ease: "elastic.out(1, 0.4)",
		overwrite: "auto",
	});
	gsap.to(contentRef.value, {
		x: 0,
		y: 0,
		duration: 0.7,
		ease: "elastic.out(1, 0.4)",
		overwrite: "auto",
	});
};

onMounted(() => {
	waitAnim.value = gsap.to(buttonRef.value, {
		rotation: 12,
		duration: 1.5,
		repeat: -1,
		ease: "wiggle({wiggles:8,type:easeOut})",
	});
});

onUnmounted(() => {
	waitAnim.value?.kill();
});
</script>

<template>
	<div
		class="work_blog_link"
		ref="containerRef"
		@mousemove="handleMouseMove"
		@mouseleave="handleMouseLeave"
	>
		<!-- From Uiverse.io by gharsh11032000 -->
		<button class="link_button hoverable" ref="buttonRef">
			<div ref="contentRef">立即前往</div>
		</button>
	</div>
</template>

<style scoped lang="scss">
.work_blog_link {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
	width: 400px;

	/* From Uiverse.io by gharsh11032000 */
	.link_button {
		position: relative;
		padding: 10px 24px;
		font-size: 18px;
		color: #ff7f27;
		border-width: 2px;
		border-style: solid;
		border-color: #ff7f27;
		border-radius: 34px;
		background-color: transparent;
		font-family: "方正基础像素体";
		font-weight: 600;
		transition:
			color 0.3s cubic-bezier(0.23, 1, 0.32, 1),
			scale 0.3s cubic-bezier(0.23, 1, 0.32, 1),
			box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1);
		overflow: hidden;
		cursor: none;

		&:hover {
			color: #212121;
			scale: 1.1;
			box-shadow: 0 0px 20px rgba($color: #ff7f27, $alpha: 0.4);

			&::before {
				scale: 3;
			}
		}

		&:active {
			scale: 1;
		}

		&::before {
			content: "";
			position: absolute;
			inset: 0;
			margin: auto;
			width: 50px;
			height: 50px;
			border-radius: inherit;
			scale: 0;
			z-index: -1;
			background-color: #ff7f27;
			transition: scale 0.6s cubic-bezier(0.23, 1, 0.32, 1);
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.8;

	.work_blog_link {
		height: 200px * $base-size;
		width: 400px * $base-size;

		.link_button {
			padding: 10px * $base-size 24px * $base-size;
			font-size: 18px * $base-size;
			border-width: 2px * $base-size;
			border-radius: 34px * $base-size;

			&:hover {
				box-shadow: 0 0px 20px * $base-size rgba(193, 163, 98, 0.4);
			}

			&::before {
				width: 50px * $base-size;
				height: 50px * $base-size;
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.85;

	.work_blog_link {
		height: 200px * $base-size;
		width: 400px * $base-size;

		.link_button {
			padding: 10px * $base-size 24px * $base-size;
			font-size: 18px * $base-size;
			border-width: 2px * $base-size;
			border-radius: 34px * $base-size;

			&:hover {
				box-shadow: 0 0px 20px * $base-size rgba(193, 163, 98, 0.4);
			}

			&::before {
				width: 50px * $base-size;
				height: 50px * $base-size;
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.9;

	.work_blog_link {
		height: 200px * $base-size;
		width: 400px * $base-size;

		.link_button {
			padding: 10px * $base-size 24px * $base-size;
			font-size: 18px * $base-size;
			border-width: 2px * $base-size;
			border-radius: 34px * $base-size;

			&:hover {
				box-shadow: 0 0px 20px * $base-size rgba(193, 163, 98, 0.4);
			}

			&::before {
				width: 50px * $base-size;
				height: 50px * $base-size;
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.95;

	.work_blog_link {
		height: 200px * $base-size;
		width: 400px * $base-size;

		.link_button {
			padding: 10px * $base-size 24px * $base-size;
			font-size: 18px * $base-size;
			border-width: 2px * $base-size;
			border-radius: 34px * $base-size;

			&:hover {
				box-shadow: 0 0px 20px * $base-size rgba(193, 163, 98, 0.4);
			}

			&::before {
				width: 50px * $base-size;
				height: 50px * $base-size;
			}
		}
	}
}
</style>
