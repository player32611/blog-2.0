<script setup lang="ts">
import gsap from "gsap";

const imageStore = useImageStore();
const signRef = ref<HTMLDivElement | null>(null);
const signHeadRef = ref<HTMLDivElement | null>(null);

const easeTime: number = 0.5;

const handleMouseEnter = () => {
	if (!imageStore.activeImageData || !signHeadRef.value) return;
	const rect = signHeadRef.value.getBoundingClientRect();
	imageStore.setHoverImageData({
		width: signHeadRef.value.offsetWidth,
		height: signHeadRef.value.offsetHeight,
		center: {
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2,
		},
	});
};

const handleMouseLeave = () => {
	imageStore.setHoverImageData(null);
};

watch(
	() => imageStore.activeImageData,
	newData => {
		if (newData) {
			gsap.to(signRef.value, {
				rotate: "+=180",
				duration: easeTime,
				ease: "power1.Out",
				onComplete: () => {
					gsap.set(signRef.value, { rotate: 0 });
				},
			});
		} else {
			gsap.to(signRef.value, {
				rotate: "+=180",
				duration: easeTime,
				ease: "power1.in",
				onComplete: () => {
					gsap.set(signRef.value, { rotate: 180 });
				},
			});
		}
	},
);
</script>

<template>
	<div class="sign" ref="signRef">
		<div
			class="sign_head"
			ref="signHeadRef"
			@mouseenter="handleMouseEnter"
			@mouseleave="handleMouseLeave"
		>
			<div class="sign_content">
				<div class="content_line">名称：{{ imageStore.activeImageData?.name }}</div>
				<div class="content_line">作者：{{ imageStore.activeImageData?.author }}</div>
			</div>
		</div>
		<div class="sign_body"></div>
	</div>
</template>

<style scoped lang="scss">
$base-size: 1;

.sign {
	position: fixed;
	bottom: 0;
	left: calc(20% - 150px * $base-size - 5px * $base-size - 20px * $base-size);
	display: flex;
	flex-direction: column;
	align-items: center;
	transform-origin: center bottom;
	rotate: -180deg;

	.sign_head {
		padding: 10px * $base-size;
		height: 150px * $base-size;
		width: 300px * $base-size;
		background-color: #a46952;
		border-width: 5px * $base-size;
		border-style: solid;
		border-color: #000000;

		.sign_content {
			padding: 10px * $base-size;
			height: calc(100% - 10px * 2 * $base-size);
			width: auto;
			background-color: #b596ac;
			color: #71456e;
			font-size: 1rem * $base-size;
			font-weight: 600;
			font-family: "方正基础像素体";

			.content_line {
				white-space: nowrap; /* 不换行 */
				overflow: hidden; /* 隐藏超出内容 */
				text-overflow: ellipsis; /* 显示省略号 */
			}
		}
	}

	.sign_body {
		height: 100px * $base-size;
		width: 20px * $base-size;
		background: linear-gradient(to bottom, #71456e 0%, #71456e 80%, #a46952 80%, #a46952 100%);
		border-width: 0 5px * $base-size 5px * $base-size 5px * $base-size;
		border-style: solid;
		border-color: #000000;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.6;

	.sign {
		left: calc(50% - 150px * $base-size - 5px * $base-size - 20px * $base-size);
		rotate: -180deg;

		.sign_head {
			padding: 10px * $base-size;
			height: 150px * $base-size;
			width: 300px * $base-size;
			border-width: 5px * $base-size;

			.sign_content {
				padding: 10px * $base-size;
				height: calc(100% - 10px * 2 * $base-size);
				font-size: 1rem * $base-size;
			}
		}

		.sign_body {
			height: 100px * $base-size;
			width: 20px * $base-size;
			border-width: 0 5px * $base-size 5px * $base-size 5px * $base-size;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.7;

	.sign {
		left: calc(50% - 150px * $base-size - 5px * $base-size - 20px * $base-size);
		rotate: -180deg;

		.sign_head {
			padding: 10px * $base-size;
			height: 150px * $base-size;
			width: 300px * $base-size;
			border-width: 5px * $base-size;

			.sign_content {
				padding: 10px * $base-size;
				height: calc(100% - 10px * 2 * $base-size);
				font-size: 1rem * $base-size;
			}
		}

		.sign_body {
			height: 100px * $base-size;
			width: 20px * $base-size;
			border-width: 0 5px * $base-size 5px * $base-size 5px * $base-size;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.6;

	.sign {
		left: calc(20% - 150px * $base-size - 5px * $base-size - 20px * $base-size);
		rotate: -180deg;

		.sign_head {
			padding: 10px * $base-size;
			height: 150px * $base-size;
			width: 300px * $base-size;
			border-width: 5px * $base-size;

			.sign_content {
				padding: 10px * $base-size;
				height: calc(100% - 10px * 2 * $base-size);
				font-size: 1rem * $base-size;
			}
		}

		.sign_body {
			height: 100px * $base-size;
			width: 20px * $base-size;
			border-width: 0 5px * $base-size 5px * $base-size 5px * $base-size;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.8;

	.sign {
		left: calc(20% - 150px * $base-size - 5px * $base-size - 20px * $base-size);
		rotate: -180deg;

		.sign_head {
			padding: 10px * $base-size;
			height: 150px * $base-size;
			width: 300px * $base-size;
			border-width: 5px * $base-size;

			.sign_content {
				padding: 10px * $base-size;
				height: calc(100% - 10px * 2 * $base-size);
				font-size: 1rem * $base-size;
			}
		}

		.sign_body {
			height: 100px * $base-size;
			width: 20px * $base-size;
			border-width: 0 5px * $base-size 5px * $base-size 5px * $base-size;
		}
	}
}
</style>
