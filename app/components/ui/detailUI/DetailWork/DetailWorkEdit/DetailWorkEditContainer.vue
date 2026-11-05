<script setup lang="ts">
import gsap from "gsap";
import ImageLoading from "~/components/exhibit/ImageLoading.vue";
import type { Point } from "~/types/common";

const imageNums = 4;
const animDuration = 1;
const clipPathOptions = [
	"polygon(0 0, 40% 0, 50% 50%, 0 60%)",
	"polygon(0 60%, 50% 50%, 60% 100%, 0 100%)",
	"polygon(50% 50%, 100% 40%, 100% 100%, 60% 100%)",
	"polygon(40% 0, 100% 0, 100% 40%, 50% 50%)",
] as const;
const distanceOptions: Point[] = [
	{ x: -100, y: -100 },
	{ x: -100, y: 100 },
	{ x: 100, y: 100 },
	{ x: 100, y: -100 },
] as const;

const imgContainerRefs = ref<HTMLDivElement[]>([]);
const imgRefs = ref<HTMLImageElement[]>([]);
const currentImage = ref<number>(0);
const isAniming = ref<boolean>(false);

const onClick = () => {
	if (isAniming.value) return;

	isAniming.value = true;
	imgContainerRefs.value.forEach((img, idx) => {
		gsap.set(img, { clipPath: clipPathOptions[idx] });
		gsap.to(img, {
			x: distanceOptions[idx]?.x,
			y: distanceOptions[idx]?.y,
			"--opacity": 1,
			duration: animDuration,
			ease: "power2.out",
			onComplete: onLoad,
		});
	});
};

const onLoad = () => {
	currentImage.value = (currentImage.value + 1) % DETAIL_WORK_EDIT_DATA.length;

	nextTick().then(() => {
		if (!imgRefs.value[0]) return;

		onImageLoading(imgRefs.value[0]).then(() => {
			imgContainerRefs.value.forEach((img, idx) => {
				gsap.to(img, {
					x: 0,
					y: 0,
					"--opacity": 0,
					duration: animDuration,
					ease: "power2.in",
					onComplete: () => {
						isAniming.value = false;
						gsap.set(img, { clipPath: "none" });
					},
				});
			});
		});
	});
};
</script>

<template>
	<div class="work_edit_container" @click="onClick">
		<!-- From Uiverse.io by dhrux_8871 -->
		<div class="card one"></div>
		<div class="card two"></div>
		<div class="card loading">
			<ImageLoading />
		</div>
		<div
			:class="'edit_img_container ' + (index === 0 ? 'first' : '')"
			v-for="(_, index) in imageNums"
			:ref="el => (imgContainerRefs[index] = el as HTMLDivElement)"
		>
			<img
				draggable="false"
				:src="DETAIL_WORK_EDIT_DATA[currentImage]"
				:ref="el => (imgRefs[index] = el as HTMLImageElement)"
			/>
			<div class="img_mask"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

$base-size: 0.9;

.work_edit_container {
	position: relative;
	background-color: #ffffff;
	z-index: variables.$float_zIndex;

	/* From Uiverse.io by dhrux_8871 */
	&:hover {
		.card {
			&.one {
				transform: translateX(-35px) rotate(-15deg);
			}

			&.two {
				transform: translateX(35px) rotate(15deg);
			}
		}
	}

	.card {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 12px * $base-size;
		box-shadow: 0 12px * $base-size 25px * $base-size rgba(0, 0, 0, 0.15);
		transition: 0.4s ease;

		&.one {
			background: linear-gradient(135deg, #7f6cff, #b39cff);
			transform: rotate(-8deg);
		}

		&.two {
			background: linear-gradient(135deg, #ff6f91, #ff9671);
			transform: rotate(8deg);
		}

		&.loading {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #1677ff;
		}
	}

	.edit_img_container {
		position: absolute;
		top: 0;
		left: 0;
		border-width: 5px * $base-size;
		border-style: solid;
		border-color: #1677ff;
		border-radius: 12px * $base-size;

		--opacity: 0;

		&.first {
			position: relative;
		}

		img {
			display: block;
			max-width: 760px * $base-size;
			border-radius: 12px * $base-size;
			aspect-ratio: 90 / 76;
			clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
		}

		.img_mask {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			background-color: #ffffff;
			opacity: var(--opacity);
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.4;

	.work_edit_container {
		.card {
			border-radius: 12px * $base-size;
			box-shadow: 0 12px * $base-size 25px * $base-size rgba(0, 0, 0, 0.15);
		}

		.edit_img_container {
			border-width: 5px * $base-size;
			border-radius: 12px * $base-size;

			img {
				max-width: 760px * $base-size;
				border-radius: 12px * $base-size;
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.5;

	.work_edit_container {
		.card {
			border-radius: 12px * $base-size;
			box-shadow: 0 12px * $base-size 25px * $base-size rgba(0, 0, 0, 0.15);
		}

		.edit_img_container {
			border-width: 5px * $base-size;
			border-radius: 12px * $base-size;

			img {
				max-width: 760px * $base-size;
				border-radius: 12px * $base-size;
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.7;

	.work_edit_container {
		.card {
			border-radius: 12px * $base-size;
			box-shadow: 0 12px * $base-size 25px * $base-size rgba(0, 0, 0, 0.15);
		}

		.edit_img_container {
			border-width: 5px * $base-size;
			border-radius: 12px * $base-size;

			img {
				max-width: 760px * $base-size;
				border-radius: 12px * $base-size;
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.75;

	.work_edit_container {
		.card {
			border-radius: 12px * $base-size;
			box-shadow: 0 12px * $base-size 25px * $base-size rgba(0, 0, 0, 0.15);
		}

		.edit_img_container {
			border-width: 5px * $base-size;
			border-radius: 12px * $base-size;

			img {
				max-width: 760px * $base-size;
				border-radius: 12px * $base-size;
			}
		}
	}
}
</style>
