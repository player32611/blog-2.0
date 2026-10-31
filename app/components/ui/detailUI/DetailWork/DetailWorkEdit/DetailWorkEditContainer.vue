<script setup lang="ts">
import gsap from "gsap";

const currentImage = ref<number>(0);

const onClick = () => {};

const onLoad = () => {};

onMounted(() => {});

onUnmounted(() => {});
</script>

<template>
	<div class="work_edit_container" @click="onClick">
		<!-- From Uiverse.io by dhrux_8871 -->
		<div class="card one"></div>
		<div class="card two"></div>
		<img class="" :src="DETAIL_WORK_EDIT_DATA[currentImage]" alt="" draggable="false" />
		<img class="" :src="DETAIL_WORK_EDIT_DATA[currentImage]" alt="" draggable="false" />
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

$base-size: 0.9;

.work_edit_container {
	position: relative;
	background-color: #fff;
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

		img {
			transform: translateY(-10px);
		}
	}

	&:active {
		img {
			scale: 0.98;
		}
	}

	.card {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 12px;
		box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
		transition: 0.4s ease;

		&.one {
			background: linear-gradient(135deg, #7f6cff, #b39cff);
			transform: rotate(-8deg);
		}

		&.two {
			background: linear-gradient(135deg, #ff6f91, #ff9671);
			transform: rotate(8deg);
		}
	}

	img {
		aspect-ratio: 90 / 76;
		max-width: 760px * $base-size;
		transition:
			transform 0.4s ease,
			scale 0.4s ease;

		&:not(:first-of-type) {
			position: absolute;
			top: 0;
			left: 0;
		}
	}
}
</style>
