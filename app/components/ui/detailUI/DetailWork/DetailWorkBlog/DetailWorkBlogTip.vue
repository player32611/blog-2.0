<script setup lang="ts">
import gsap from "gsap";

const containerRef = ref<HTMLDivElement | null>(null);
const iconRef = ref<HTMLSpanElement | null>(null);
const currentAnim = ref<GSAPAnimation | null>(null);

const pointerDuration = 2;
const pointerDistance = 3;
const changeDuration = 2;

const handleClick = () => {
	currentAnim.value?.kill();
	currentAnim.value = gsap
		.timeline()
		.to(iconRef.value, { scale: 0, ease: "power2.out", duration: changeDuration / 3 })
		.set(iconRef.value, {
			y: 0,
			onComplete: () => {
				if (iconRef.value) iconRef.value.innerHTML = "&#xe780;";
			},
		})
		.to(iconRef.value, { scale: 1, ease: "elastic.out", duration: changeDuration / 3 })
		.to(containerRef.value, { scale: 0, ease: "power2.in", duration: changeDuration / 3 });
	window.removeEventListener("click", handleClick);
};

onMounted(() => {
	currentAnim.value = gsap.fromTo(
		iconRef.value,
		{ y: -pointerDistance },
		{ y: pointerDistance, ease: "power1.inOut", duration: pointerDuration, repeat: -1, yoyo: true },
	);
	window.addEventListener("click", handleClick);
});

onUnmounted(() => {
	currentAnim.value?.kill();
	window.removeEventListener("click", handleClick);
});
</script>

<template>
	<div class="work_blog_tip" ref="containerRef">
		<div>点击页面任意位置以切换卡片</div>
		<div class="icon" ref="iconRef">&#xe886;</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.work_blog_tip {
	position: relative;
	display: flex;
	justify-content: center;
	width: 100%;
	color: rgba($color: #ffffff, $alpha: 0.4);
	font-size: 1rem;
	font-family: "方正基础像素体";

	.icon {
		position: relative;
		top: 1px;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.6;

	.work_blog_tip {
		font-size: 1rem * $base-size;

		.icon {
			top: 1px * $base-size;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.7;

	.work_blog_tip {
		font-size: 1rem * $base-size;

		.icon {
			top: 1px * $base-size;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.8;

	.work_blog_tip {
		font-size: 1rem * $base-size;

		.icon {
			top: 1px * $base-size;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.work_blog_tip {
		font-size: 1rem * $base-size;

		.icon {
			top: 1px * $base-size;
		}
	}
}
</style>
