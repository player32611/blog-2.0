<script setup lang="ts">
import { useSoundEffect } from "@/composables/useSoundEffect";
import { useSoundStore } from "@/stores/soundStore";
import type { ButtonParams } from "@/types/components";

const { effectsVolume } = useSoundStore();
const { text, size, icon, onClick, classList, style } = defineProps<ButtonParams>();

const undertaleSound = useSoundEffect("sounds/effects/undertale-button.wav");

const handleClick = () => {
	if (onClick) {
		onClick();
		if (effectsVolume) undertaleSound.play();
	}
};
</script>

<template>
	<button :class="`${size} ${classList}`" @click="handleClick" :style="style" draggable="false">
		<div class="container">
			<span class="icon">{{ icon }}</span>
			<span v-for="(char, index) in text.toUpperCase().split('')" :key="index">{{ char }}</span>
		</div>
	</button>
</template>

<style scoped lang="scss">
$base-height: 42px;
$base-width: 110px;
$base-size: 1;

/* ========== 默认（> 1199px）========== */
button {
	background: #000000;
	color: #ff7f27;
	text-align: right;
	font-weight: 900;
	font-family: "Mars Needs Cunnilingus";
	border-color: #ff7f27;
	border-style: solid;
	cursor: pointer;
	user-select: none;

	&.small {
		height: $base-height * $base-size;
		width: $base-width * $base-size;
		font-size: 1.3rem * $base-size;
		border-width: 0.25rem * $base-size;
	}

	&.large {
		height: $base-height * $base-size * 2;
		width: $base-width * $base-size * 2;
		font-size: 2.5rem * $base-size;
		border-width: 0.5rem * $base-size;
	}

	&:hover {
		color: #ffff00;
		border-color: #ffff00;
	}

	.container {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.3;

	button {
		&.small {
			height: $base-height * $base-size * 2;
			width: $base-width * $base-size * 2;
			font-size: 2.3rem * $base-size;
			border-width: 0.6rem * $base-size;
		}

		&.large {
			height: $base-height * $base-size * 2;
			width: $base-width * $base-size * 2;
			font-size: 2.5rem * $base-size;
			border-width: 0.6rem * $base-size;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.45;

	button {
		&.small {
			height: $base-height * $base-size * 1.7;
			width: $base-width * $base-size * 1.7;
			font-size: 2rem * $base-size;
			border-width: 0.5rem * $base-size;
		}

		&.large {
			height: $base-height * $base-size * 2;
			width: $base-width * $base-size * 2;
			font-size: 2.5rem * $base-size;
			border-width: 0.6rem * $base-size;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.6;

	button {
		&.small {
			height: $base-height * $base-size * 1.5;
			width: $base-width * $base-size * 1.5;
			font-size: 1.8rem * $base-size;
			border-width: 0.4rem * $base-size;
		}

		&.large {
			height: $base-height * $base-size * 2;
			width: $base-width * $base-size * 2;
			font-size: 2.5rem * $base-size;
			border-width: 0.5rem * $base-size;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.8;

	button {
		&.small {
			height: $base-height * $base-size * 1.3;
			width: $base-width * $base-size * 1.3;
			font-size: 1.6rem * $base-size;
			border-width: 0.35rem * $base-size;
		}

		&.large {
			height: $base-height * $base-size * 2;
			width: $base-width * $base-size * 2;
			font-size: 2.5rem * $base-size;
			border-width: 0.5rem * $base-size;
		}
	}
}
</style>
