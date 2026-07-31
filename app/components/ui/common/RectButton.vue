<script setup lang="ts">
import { useSoundEffect } from "@/composables/useSoundEffect";
import type { ButtonParams } from "@/types/components";

const { text, size, icon, onClick, classList, style, iconStyle } = defineProps<ButtonParams>();

const buttonSound = useSoundEffect("/blog-2.0/sounds/effects/button.wav");

const handleClick = () => {
	if (onClick) {
		onClick();
		buttonSound.play();
	}
};
</script>

<template>
	<button
		:class="`${size} ${classList ? classList : ''}`"
		@click="handleClick"
		:style="style"
		draggable="false"
	>
		<div class="container">
			<span class="icon" :style="iconStyle">{{ icon }}</span>
			<span v-for="(char, index) in text.toUpperCase().split('')" :key="index">{{ char }}</span>
		</div>
	</button>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

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
	z-index: variables.$float_zIndex;
	user-select: none;
	cursor: pointer;

	&.small {
		height: $base-height * $base-size;
		width: $base-width * $base-size;
		font-size: 1.3rem * $base-size;
		border-width: 0.25rem * $base-size;
	}

	&.medium {
		height: $base-height * $base-size * 1.5;
		width: $base-width * $base-size * 1.5;
		font-size: 2rem * $base-size;
		border-width: 0.35rem * $base-size;
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

		.icon {
			transform: translateY(-1px);
		}
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
