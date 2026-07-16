<script setup lang="ts">
import gsap from "gsap";
import type { DetailWorkBlogCardParams } from "~/types/components";

const { title, subtitle, icon, content, previewImage } = defineProps<DetailWorkBlogCardParams>();
const detailStore = useDetailStore();
const cardRef = ref<HTMLDivElement | null>(null);
const previewRef = ref<HTMLDivElement | null>(null);
const fadeAnim = ref<GSAPTween | null>(null);
const fadeTimeout = ref<number | null>(null);

let setX: gsap.QuickToFunc;
let setY: gsap.QuickToFunc;

const cardColor: { backgroundColor: string; color: string }[] = [
	{ backgroundColor: "linear-gradient(-45deg, #ff0000 0%, #ffff00 100%)", color: "#ff0000" },
	{ backgroundColor: "linear-gradient(-45deg, #e81cff 0%, #40c9ff 100%)", color: "#e81cff" },
	{ backgroundColor: "linear-gradient(-45deg, #74ebd5 0%, #acb6e5 100%)", color: "#74ebd5" },
];
const fadeTiggerTime = 500;

const handleMouseMove = (e: MouseEvent) => {
	setX(e.clientX);
	setY(e.clientY);
};

const handleMouseEnter = (e: MouseEvent) => {
	fadeAnim.value?.play();
	handleMouseMove(e);
};

const handleMouseLeave = () => {
	fadeAnim.value?.reverse();
};

const handleTouchStart = (e: TouchEvent) => {
	e.preventDefault();
	fadeTimeout.value = setTimeout(() => {
		if (!e.touches[0]) return;
		detailStore.setIsLongPressing(true);
		setX(e.touches[0].clientX, e.touches[0].clientX);
		setY(e.touches[0].clientY, e.touches[0].clientY);
		fadeAnim.value?.play();
	}, fadeTiggerTime);
};

const handleTouchEnd = () => {
	if (fadeTimeout.value) {
		clearTimeout(fadeTimeout.value);
		fadeTimeout.value = null;
	}
};

onMounted(() => {
	setX = gsap.quickTo(previewRef.value, "x", { duration: 0.4, ease: "power3" });
	setY = gsap.quickTo(previewRef.value, "y", { duration: 0.4, ease: "power3" });
	fadeAnim.value = gsap.to(previewRef.value, {
		autoAlpha: 1,
		rotate: -10,
		ease: "none",
		paused: true,
		duration: 0.1,
	});
	const theme = randomChoose(...cardColor);
	gsap.set(cardRef.value, { "--backgroundColor": theme?.backgroundColor });
	gsap.set(cardRef.value, { "--color": theme?.color });
	window.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
	window.removeEventListener("mousemove", handleMouseMove);
});
</script>

<template>
	<!-- From Uiverse.io by gharsh11032000 -->
	<div
		class="work_blog_card hoverable"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
		@touchstart="handleTouchStart"
		@touchend="handleTouchEnd"
		ref="cardRef"
	>
		<p class="top">{{ title }}</p>
		<p class="left">{{ subtitle }}</p>
		<p class="center">
			<span class="icon" v-html="icon"></span>
			{{ content }}
			<span class="icon" v-html="icon"></span>
		</p>
		<p class="right">{{ subtitle }}</p>
		<p class="bottom">{{ title }}</p>
	</div>
	<Teleport to="body">
		<div class="work_blog_preview" ref="previewRef">
			<div class="preview_inner">
				<img class="preview_image" :src="previewImage" alt="111" />
			</div>
		</div>
	</Teleport>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

/* From Uiverse.io by gharsh11032000 */
.work_blog_card {
	position: relative;
	padding: 12px;
	display: grid;
	grid-template-columns: auto 1fr auto;
	grid-template-rows: auto 1fr auto;
	justify-items: center;
	align-items: center;
	width: calc(100% - 12px * 2);
	height: calc(100% - 12px * 2);
	font-family: "方正基础像素体";
	background-color: #000000;
	border-radius: 8px;
	user-select: none;

	&:hover {
		&::before {
			transform: rotate(-90deg) scaleX(1.65) scaleY(0.61);
		}
	}

	&::before {
		content: "";
		position: absolute;
		inset: 0;
		left: -5px;
		margin: auto;
		width: calc(100% + 10px);
		height: calc(100% + 10px);
		border-radius: 10px;
		background: var(--backgroundColor);
		z-index: -10;
		pointer-events: none;
		transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	p {
		margin: 0;
		color: var(--color);
		text-align: center;

		&.top {
			grid-area: 1 / 1 / 2 / 4;
			font-size: 1.2rem;
			text-transform: capitalize;
			font-weight: 700;
		}

		&.left {
			grid-area: 2 / 1 / 3 / 2;
			font-size: 0.8rem;
			text-transform: capitalize;
			transform: rotate(-90deg);
		}

		&.center {
			display: flex;
			flex-direction: column;
			gap: 50px;
			font-size: 1rem;

			.icon {
				color: var(--color);
				font-size: 5rem;
			}
		}

		&.right {
			grid-area: 2 / 3 / 3 / 4;
			font-size: 0.8rem;
			text-transform: capitalize;
			transform: rotate(90deg);
		}

		&.bottom {
			grid-area: 3 / 1 / 4 / 4;
			font-size: 1.2rem;
			text-transform: capitalize;
			font-weight: 700;
		}
	}
}

/* From Uiverse.io by Tiagoadag */
.work_blog_preview {
	position: fixed;
	top: -25px;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
	background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
	border-radius: 20px;
	box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.3);
	z-index: variables.$float_zIndex;
	visibility: hidden;
	pointer-events: none;
	transform: none;

	.preview_inner {
		width: 98%;
		height: 98%;
		background-color: #1a1a1a;
		border-radius: 20px;
		overflow: hidden;

		.preview_image {
			height: 100%;
			width: 100%;
			object-fit: contain;
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.6;

	.work_blog_card {
		padding: 12px * $base-size;
		width: calc(100% - 12px * 2 * $base-size);
		height: calc(100% - 12px * 2 * $base-size);
		border-radius: 8px * $base-size;

		&::before {
			left: -5px * $base-size;
			width: calc(100% + 10px * $base-size);
			height: calc(100% + 10px * $base-size);
			border-radius: 10px * $base-size;
		}

		p {
			&.top {
				font-size: 1.2rem * $base-size;
			}

			&.left {
				font-size: 0.8rem * $base-size;
			}

			&.center {
				gap: 50px * $base-size;
				font-size: 1rem * $base-size;

				.icon {
					font-size: 5rem * $base-size;
				}
			}

			&.right {
				font-size: 0.8rem * $base-size;
			}

			&.bottom {
				font-size: 1.2rem * $base-size;
			}
		}
	}

	.work_blog_preview {
		left: -25px * $base-size;
		top: -25px * $base-size;
		height: 200px * $base-size;
		border-radius: 20px * $base-size;
		box-shadow: 0px 0px 30px * $base-size 1px * $base-size rgba(0, 255, 117, 0.3);

		.preview_inner {
			border-radius: 20px * $base-size;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.7;

	.work_blog_card {
		padding: 12px * $base-size;
		width: calc(100% - 12px * 2 * $base-size);
		height: calc(100% - 12px * 2 * $base-size);
		border-radius: 8px * $base-size;

		&::before {
			left: -5px * $base-size;
			width: calc(100% + 10px * $base-size);
			height: calc(100% + 10px * $base-size);
			border-radius: 10px * $base-size;
		}

		p {
			&.top {
				font-size: 1.2rem * $base-size;
			}

			&.left {
				font-size: 0.8rem * $base-size;
			}

			&.center {
				gap: 50px * $base-size;
				font-size: 1rem * $base-size;

				.icon {
					font-size: 5rem * $base-size;
				}
			}

			&.right {
				font-size: 0.8rem * $base-size;
			}

			&.bottom {
				font-size: 1.2rem * $base-size;
			}
		}
	}

	.work_blog_preview {
		left: -25px * $base-size;
		top: -25px * $base-size;
		height: 200px * $base-size;
		border-radius: 20px * $base-size;
		box-shadow: 0px 0px 30px * $base-size 1px * $base-size rgba(0, 255, 117, 0.3);

		.preview_inner {
			border-radius: 20px * $base-size;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.8;

	.work_blog_card {
		padding: 12px * $base-size;
		width: calc(100% - 12px * 2 * $base-size);
		height: calc(100% - 12px * 2 * $base-size);
		border-radius: 8px * $base-size;

		&::before {
			left: -5px * $base-size;
			width: calc(100% + 10px * $base-size);
			height: calc(100% + 10px * $base-size);
			border-radius: 10px * $base-size;
		}

		p {
			&.top {
				font-size: 1.2rem * $base-size;
			}

			&.left {
				font-size: 0.8rem * $base-size;
			}

			&.center {
				gap: 50px * $base-size;
				font-size: 1rem * $base-size;

				.icon {
					font-size: 5rem * $base-size;
				}
			}

			&.right {
				font-size: 0.8rem * $base-size;
			}

			&.bottom {
				font-size: 1.2rem * $base-size;
			}
		}
	}

	.work_blog_preview {
		left: -25px * $base-size;
		top: -25px * $base-size;
		height: 200px * $base-size;
		border-radius: 20px * $base-size;
		box-shadow: 0px 0px 30px * $base-size 1px * $base-size rgba(0, 255, 117, 0.3);

		.preview_inner {
			border-radius: 20px * $base-size;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.work_blog_card {
		padding: 12px * $base-size;
		width: calc(100% - 12px * 2 * $base-size);
		height: calc(100% - 12px * 2 * $base-size);
		border-radius: 8px * $base-size;

		&::before {
			left: -5px * $base-size;
			width: calc(100% + 10px * $base-size);
			height: calc(100% + 10px * $base-size);
			border-radius: 10px * $base-size;
		}

		p {
			&.top {
				font-size: 1.2rem * $base-size;
			}

			&.left {
				font-size: 0.8rem * $base-size;
			}

			&.center {
				gap: 50px * $base-size;
				font-size: 1rem * $base-size;

				.icon {
					font-size: 5rem * $base-size;
				}
			}

			&.right {
				font-size: 0.8rem * $base-size;
			}

			&.bottom {
				font-size: 1.2rem * $base-size;
			}
		}
	}

	.work_blog_preview {
		left: -25px * $base-size;
		top: -25px * $base-size;
		height: 200px * $base-size;
		border-radius: 20px * $base-size;
		box-shadow: 0px 0px 30px * $base-size 1px * $base-size rgba(0, 255, 117, 0.3);

		.preview_inner {
			border-radius: 20px * $base-size;
		}
	}
}
</style>
