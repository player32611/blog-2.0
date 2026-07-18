<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const infoRef = ref<HTMLDivElement | null>(null);
const contentRef = ref<HTMLDivElement | null>(null);
const contentSplit = ref<SplitText | null>(null);
const contentAnim = ref<GSAPAnimation | null>(null);
const mountAnim = ref<GSAPTween | null>(null);

const easeDuration = 0.125;
const maxDeg = 10;

const handleMouseMove = (e: MouseEvent) => {
	const rect = infoRef.value?.getBoundingClientRect();
	if (!rect) return;
	const rotateX = gsap.utils.mapRange(rect.top, rect.top + rect.height, -maxDeg, maxDeg, e.clientY);
	const rotateY = gsap.utils.mapRange(
		rect.left,
		rect.left + rect.width,
		-maxDeg / 2,
		maxDeg / 2,
		e.clientX,
	);

	gsap.to(infoRef.value, {
		transform: `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) perspective(800px)`,
		duration: easeDuration,
	});
};

const handleMouseLeave = () => {
	gsap.to(infoRef.value, {
		transform: "rotateX(0) rotateY(0) perspective(800px)",
		duration: easeDuration,
	});
};

onMounted(() => {
	contentSplit.value = SplitText.create(contentRef.value, { type: "chars" });
	contentAnim.value = gsap
		.fromTo(
			contentSplit.value.chars,
			{
				visibility: "hidden",
				background: "rgba(255, 127, 39, 0.5)",
				textShadow: `0 0 60px rgba(255, 127, 39, 0.3)`,
			},
			{
				visibility: "visible",
				background: "rgba(255, 127, 39, 0)",
				textShadow: `0 0 0 rgba(255, 127, 39, 0.8)`,
				duration: 1,
				stagger: 0.05,
			},
		)
		.pause();
	mountAnim.value = gsap.fromTo(
		infoRef.value,
		{ scale: 0, opacity: 0 },
		{
			scale: 1,
			opacity: 1,
			ease: "power2.out",
			duration: 1,
			scrollTrigger: {
				trigger: infoRef.value,
				start: "top 80%", // 当元素顶部到达视口 80% 位置时触发
				toggleActions: "play none none reverse", // 进入时播放，离开时反向播放
			},
			onComplete: () => {
				contentAnim.value?.play();
			},
			onReverseComplete: () => {
				contentAnim.value?.progress(0).pause();
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
	<div
		class="introduce_info"
		ref="infoRef"
		@mousemove="handleMouseMove"
		@mouseleave="handleMouseLeave"
	>
		<div class="info_corner tr1"></div>
		<div class="info_corner tr2"></div>
		<div class="info_corner tr3"></div>
		<div class="info_corner tr4"></div>
		<div class="info_content">
			<div ref="contentRef">
				<p class="content_introduce">INTRODUCE</p>
				<p>NAME: {{ DETAIL_NAME }}</p>
				<p>JOP: {{ DETAIL_JOB }}</p>
				<p>HOBBY: {{ DETAIL_HOBBY }}</p>
				<p>STATE: {{ DETAIL_STATE }}</p>
				<p>TARGET: {{ DETAIL_TARGET }}</p>
			</div>
		</div>
		<div class="scan_line"></div>
	</div>
</template>

<style scoped lang="scss">
.introduce_info {
	position: relative;
	padding: 20px;
	display: grid;
	grid-template-columns: 20px auto 20px;
	grid-template-rows: 20px auto 20px;
	color: rgba($color: #ffffff, $alpha: 0.5);
	font-size: 1rem;
	font-family: "方正基础像素体";
	border-width: 2px;
	border-style: solid;
	border-color: rgba(255, 255, 255, 0.1);
	border-radius: 5px;
	background: linear-gradient(45deg, #1a1a1a, #262626);
	overflow: hidden;
	transition: border-color 0.5s ease;

	&:hover {
		border-color: rgba(255, 255, 255, 0.5);

		.info_corner {
			border-color: rgba($color: #ff7f27, $alpha: 0.7);
		}
	}

	.info_corner {
		height: 100%;
		width: 100%;
		border-color: rgba($color: #ff7f27, $alpha: 0.3);
		border-style: solid;
		border-width: 0;
		transition: border-color 0.5s ease;

		&.tr1 {
			grid-area: 1/1/2/2;
			border-top-width: 2px;
			border-left-width: 2px;
		}

		&.tr2 {
			grid-area: 1/3/2/4;
			border-top-width: 2px;
			border-right-width: 2px;
		}

		&.tr3 {
			grid-area: 3/1/4/2;
			border-bottom-width: 2px;
			border-left-width: 2px;
		}

		&.tr4 {
			grid-area: 3/3/4/4;
			border-bottom-width: 2px;
			border-right-width: 2px;
		}
	}

	.info_content {
		grid-area: 2/2/3/3;

		.content_introduce {
			margin-top: 0;
			font-size: 2rem;
			font-weight: 600;
			text-align: center;
		}
	}

	.scan_line {
		position: absolute;
		inset: 0;
		background: linear-gradient(to bottom, transparent, rgba(#ff7f27, 0.1), transparent);
		transform: translateY(-100%);
		animation: scanMove 3s linear infinite;
	}
}

@keyframes scanMove {
	0% {
		transform: translateY(-100%);
	}
	100% {
		transform: translateY(100%);
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.5;

	.introduce_info {
		padding: 20px * $base-size;
		grid-template-columns: 20px * $base-size auto 20px * $base-size;
		grid-template-rows: 20px * $base-size auto 20px * $base-size;
		border-width: 2px * $base-size;
		border-radius: 5px * $base-size;

		.info_corner {
			&.tr1 {
				border-top-width: 2px * $base-size;
				border-left-width: 2px * $base-size;
			}

			&.tr2 {
				border-top-width: 2px * $base-size;
				border-right-width: 2px * $base-size;
			}

			&.tr3 {
				border-bottom-width: 2px * $base-size;
				border-left-width: 2px * $base-size;
			}

			&.tr4 {
				border-bottom-width: 2px * $base-size;
				border-right-width: 2px * $base-size;
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.7;

	.introduce_info {
		padding: 20px * $base-size;
		grid-template-columns: 20px * $base-size auto 20px * $base-size;
		grid-template-rows: 20px * $base-size auto 20px * $base-size;
		border-width: 2px * $base-size;
		border-radius: 5px * $base-size;

		.info_corner {
			&.tr1 {
				border-top-width: 2px * $base-size;
				border-left-width: 2px * $base-size;
			}

			&.tr2 {
				border-top-width: 2px * $base-size;
				border-right-width: 2px * $base-size;
			}

			&.tr3 {
				border-bottom-width: 2px * $base-size;
				border-left-width: 2px * $base-size;
			}

			&.tr4 {
				border-bottom-width: 2px * $base-size;
				border-right-width: 2px * $base-size;
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.7;

	.introduce_info {
		padding: 20px * $base-size;
		grid-template-columns: 20px * $base-size auto 20px * $base-size;
		grid-template-rows: 20px * $base-size auto 20px * $base-size;
		border-width: 2px * $base-size;
		border-radius: 5px * $base-size;

		.info_corner {
			&.tr1 {
				border-top-width: 2px * $base-size;
				border-left-width: 2px * $base-size;
			}

			&.tr2 {
				border-top-width: 2px * $base-size;
				border-right-width: 2px * $base-size;
			}

			&.tr3 {
				border-bottom-width: 2px * $base-size;
				border-left-width: 2px * $base-size;
			}

			&.tr4 {
				border-bottom-width: 2px * $base-size;
				border-right-width: 2px * $base-size;
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.85;

	.introduce_info {
		padding: 20px * $base-size;
		grid-template-columns: 20px * $base-size auto 20px * $base-size;
		grid-template-rows: 20px * $base-size auto 20px * $base-size;
		border-width: 2px * $base-size;
		border-radius: 5px * $base-size;

		.info_corner {
			&.tr1 {
				border-top-width: 2px * $base-size;
				border-left-width: 2px * $base-size;
			}

			&.tr2 {
				border-top-width: 2px * $base-size;
				border-right-width: 2px * $base-size;
			}

			&.tr3 {
				border-bottom-width: 2px * $base-size;
				border-left-width: 2px * $base-size;
			}

			&.tr4 {
				border-bottom-width: 2px * $base-size;
				border-right-width: 2px * $base-size;
			}
		}
	}
}
</style>
