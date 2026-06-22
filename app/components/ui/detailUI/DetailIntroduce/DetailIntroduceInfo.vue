<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const infoRef = ref<HTMLDivElement | null>(null);
const mountAnim = ref<gsap.core.Tween | null>(null);

onMounted(() => {
	mountAnim.value = gsap.fromTo(
		infoRef.value,
		{ paddingTop: 0, height: 0, opacity: 0 },
		{
			paddingTop: "1.5rem",
			height: "auto",
			opacity: 1,
			ease: "power2.out",
			duration: 1,
			scrollTrigger: {
				trigger: infoRef.value,
				start: "top 80%", // 当元素顶部到达视口 80% 位置时触发
				toggleActions: "play none none reverse", // 进入时播放，离开时反向播放
			},
		},
	);
});

onUnmounted(() => {
	mountAnim.value?.scrollTrigger?.kill();
	mountAnim.value?.kill();
});
</script>

<template>
	<div class="introduce_info" ref="infoRef">
		<!-- From Uiverse.io by Nykolas94 -->
		<label class="folder hoverable">
			<input type="checkbox" class="folder__toggle" aria-label="Open folder" />
			<span class="folder__shape">
				<span class="folder__back"></span>
				<span class="folder__papers">
					<span class="paper paper--1">
						<div>姓名：{{ getDetailEmpty() }}</div>
						<div>性别：{{ getDetailEmpty() }}</div>
						<div>年龄：{{ getDetailEmpty() }}</div>
					</span>
					<span class="paper paper--2">
						<div>状态：{{ getDetailState() }}</div>
					</span>
					<span class="paper paper--3">
						<div>昵称：{{ getDetailName() }}</div>
						<div>爱好：{{ getDetailHobby() }}</div>
					</span>
				</span>
				<span class="folder__front">
					<span class="folder__title">个人简介</span>
				</span>
			</span>
		</label>
	</div>
</template>

<style scoped lang="scss">
.introduce_info {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-left: 50px;
	padding-right: 50px;
	color: rgba($color: #ffffff, $alpha: 0.5);
	border-color: rgba($color: #ffffff, $alpha: 0.5);
	border-width: 5px;
	border-style: solid;
	overflow: hidden;

	/* From Uiverse.io by Nykolas94 */
	.folder {
		--folder-back-1: #f7c14b;
		--folder-back-2: #e9a52f;
		--folder-front-1: #ffd970;
		--folder-front-2: #fbc548;
		--folder-edge: #d68f23;
		--paper: #fdfdfb;
		--paper-2: #f1f0ea;
		--ink: #2a2520;
		--ink-soft: #7c736a;
		--ring: #1d6cf5;
		--radius: 0.875em;
		--ease: cubic-bezier(0.22, 0.61, 0.36, 1);

		position: relative;
		display: inline-block;
		width: 350px;
		font-size: 1rem;
		font-family: "方正基础像素体";
		color: var(--ink);
		cursor: none;
		user-select: none;

		&:active {
			.folder__shape {
				transform: translateY(-0.125em) scale(0.99);
			}
		}

		.folder__toggle {
			position: absolute;
			width: 1px;
			height: 1px;
			opacity: 0;
			pointer-events: none;

			&:checked ~ .folder__shape {
				transform: translateY(-0.375em);

				.paper {
					transform: translateY(-26%);
				}

				.paper--1 {
					transform: translate(-26%, -18%) rotate(-7deg);
				}

				.paper--2 {
					transform: translate(22%, -22%) rotate(6deg);
				}

				.folder__front {
					transform: rotateX(-32deg);
				}
			}

			&:focus-visible ~ .folder__shape {
				.folder__back {
					outline: 3px solid var(--ring);
					outline-offset: 4px;
					border-radius: var(--radius);
				}
			}
		}

		.folder__shape {
			position: relative;
			display: block;
			width: 100%;
			aspect-ratio: 5 / 4;
			transition: transform 0.45s var(--ease);

			.folder__back {
				position: absolute;
				inset: 14% 0 0 0;
				background: linear-gradient(135deg, var(--folder-back-1), var(--folder-back-2));
				border-radius: 0.25em var(--radius) var(--radius) var(--radius);
				box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.25);

				&::before {
					content: "";
					position: absolute;
					top: -13%;
					left: 0;
					width: 46%;
					height: 16%;
					background: linear-gradient(135deg, var(--folder-back-1), var(--folder-back-2));
					border-radius: 0.375em 0.375em 0 0;
					clip-path: polygon(0 0, 82% 0, 100% 100%, 0 100%);
				}
			}

			.folder__papers {
				position: absolute;
				inset: 6% 8% 12% 8%;
				z-index: 2;
				display: block;

				.paper {
					position: absolute;
					left: 50%;
					bottom: 0;
					padding: 1rem;
					width: calc(86% - 2rem);
					height: calc(78% - 2rem);
					color: var(--ink);
					translate: -50% 0;
					background: var(--paper);
					border-radius: 0.375em;
					box-shadow: 0 0.25em 0.875em rgba(60, 40, 10, 0.12);
					transition:
						transform 0.45s var(--ease),
						bottom 0.45s var(--ease);
					overflow: hidden;

					&::after {
						content: "";
						position: absolute;
						left: 1rem;
						right: 24%;
						height: 6%;
						border-radius: 0.2em;
						background: var(--paper-2);
					}

					div {
						margin-bottom: 1rem;
						overflow: hidden;
						white-space: nowrap; /* 禁止换行 */
						text-overflow: ellipsis; /* 显示省略号 */
					}
				}

				.paper--1 {
					width: 78%;
					height: 70%;
					background: #f6f4ee;
				}
				.paper--2 {
					width: 82%;
					height: 74%;
					background: #fbfaf6;
				}
				.paper--3 {
					width: 86%;
				}
			}

			.folder__front {
				position: absolute;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				inset: 38% 0 0 0;
				z-index: 3;
				background: linear-gradient(150deg, var(--folder-front-1), var(--folder-front-2));
				border-radius: var(--radius);
				box-shadow:
					inset 0 1px 0 rgba(255, 255, 255, 0.55),
					0 -1px 0 var(--folder-edge),
					0 0.875em 1.375em -0.75em rgba(120, 80, 10, 0.35);
				transform-origin: bottom center;
				transition: transform 0.45s var(--ease);

				&::after {
					content: "";
					position: absolute;
					inset: 0;
					border-radius: var(--radius);
					background: linear-gradient(120deg, rgba(255, 255, 255, 0.35) 0%, transparent 45%);
					pointer-events: none;
				}

				.folder__title {
					display: block;
					font-weight: 700;
					font-size: 1.05em;
					letter-spacing: -0.01em;
					color: var(--ink-soft);
				}
			}
		}
	}
}

@media (hover: hover) {
	.folder {
		&:hover {
			.folder__shape {
				transform: translateY(-0.375em);

				.paper {
					transform: translateY(-26%);
				}

				.paper--1 {
					transform: translate(-26%, -18%) rotate(-7deg);
				}

				.paper--2 {
					transform: translate(22%, -22%) rotate(6deg);
				}

				.folder__front {
					transform: rotateX(-32deg);
				}
			}
		}
	}
}

@media (prefers-reduced-motion: reduce) {
	.folder__shape,
	.folder__front,
	.paper {
		transition: none;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.5;

	.introduce_info {
		border-width: 5px * $base-size;

		.folder {
			width: 250px;
			font-size: 1.7rem * $base-size;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.7;

	.introduce_info {
		border-width: 5px * $base-size;

		.folder {
			width: 280px;
			font-size: 1.3rem * $base-size;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.5;

	.introduce_info {
		border-width: 5px * $base-size;

		.folder {
			width: 250px;
			font-size: 1.5rem * $base-size;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.7;

	.introduce_info {
		border-width: 5px * $base-size;

		.folder {
			width: 300px;
			font-size: 1.3rem * $base-size;
		}
	}
}
</style>
