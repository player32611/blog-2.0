<script setup lang="ts">
import type { Arrow1Params } from "~/types/components";
const { direction } = defineProps<Arrow1Params>();

const getDirectionStyle = (direction: string | null) => {
	switch (direction) {
		case "left":
			return "transform: rotate(0deg);";
		case "right":
			return "transform: rotate(180deg);";
		case "up":
			return "transform: rotate(90deg);";
		case "down":
			return "transform: rotate(270deg);";
		default:
			return "";
	}
};
</script>

<template>
	<button class="arrow1" :style="getDirectionStyle(direction)">
		<div class="button-box">
			<span class="button-elem">
				<svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
					></path>
				</svg>
			</span>
			<span class="button-elem">
				<svg viewBox="0 0 46 40">
					<path
						d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
					></path>
				</svg>
			</span>
		</div>
	</button>
</template>

<style scoped lang="scss">
$base-size: 0.5;

.arrow1 {
	display: block;
	position: relative;
	width: 56px * $base-size;
	height: 56px * $base-size;
	margin: 0;
	font-size: 15px * $base-size;
	overflow: hidden;
	outline: none;
	background-color: transparent;
	cursor: pointer;
	border: 0;

	&::before,
	&::after {
		content: "";
		position: absolute;
		border-radius: 50%;
		inset: 7px * $base-size;
	}

	&::before {
		border-width: 4px * $base-size;
		border-style: solid;
		border-color: #f0eeef;
		transition:
			opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
			transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
	}

	&::after {
		border-width: 4px * $base-size;
		border-style: solid;
		border-color: #96daf0;
		transform: scale(1.3);
		transition:
			opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
			transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		opacity: 0;
	}

	&:hover {
		&::before {
			opacity: 0;
			transform: scale(0.7);
			transition:
				opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
				transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		}

		&::after {
			opacity: 1;
			transform: scale(1);
			transition:
				opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
				transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
		}

		.button-box {
			transition: 0.4s;
			transform: translateX(-56px * $base-size);
		}
	}

	.button-box {
		display: flex;
		position: absolute;
		top: 0;
		left: 0;

		.button-elem {
			display: block;
			width: 20px * $base-size;
			height: 20px * $base-size;
			margin: 17px * $base-size 18px * $base-size 0 18px * $base-size;
			transform: rotate(180deg);
			fill: #f0eeef;
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.4;

	.arrow1 {
		width: 56px * $base-size;
		height: 56px * $base-size;
		font-size: 15px * $base-size;

		&::before,
		&::after {
			inset: 7px * $base-size;
		}

		&::before {
			border-width: 4px * $base-size;
		}

		&::after {
			border-width: 4px * $base-size;
		}

		&:hover {
			.button-box {
				transform: translateX(-56px * $base-size);
			}
		}

		.button-box {
			.button-elem {
				width: 20px * $base-size;
				height: 20px * $base-size;
				margin: 17px * $base-size 18px * $base-size 0 18px * $base-size;
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.45;

	.arrow1 {
		width: 56px * $base-size;
		height: 56px * $base-size;
		font-size: 15px * $base-size;

		&::before,
		&::after {
			inset: 7px * $base-size;
		}

		&::before {
			border-width: 4px * $base-size;
		}

		&::after {
			border-width: 4px * $base-size;
		}

		&:hover {
			.button-box {
				transform: translateX(-56px * $base-size);
			}
		}

		.button-box {
			.button-elem {
				width: 20px * $base-size;
				height: 20px * $base-size;
				margin: 17px * $base-size 18px * $base-size 0 18px * $base-size;
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.5;

	.arrow1 {
		width: 56px * $base-size;
		height: 56px * $base-size;
		font-size: 15px * $base-size;

		&::before,
		&::after {
			inset: 7px * $base-size;
		}

		&::before {
			border-width: 4px * $base-size;
		}

		&::after {
			border-width: 4px * $base-size;
		}

		&:hover {
			.button-box {
				transform: translateX(-56px * $base-size);
			}
		}

		.button-box {
			.button-elem {
				width: 20px * $base-size;
				height: 20px * $base-size;
				margin: 17px * $base-size 18px * $base-size 0 18px * $base-size;
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.5;

	.arrow1 {
		width: 56px * $base-size;
		height: 56px * $base-size;
		font-size: 15px * $base-size;

		&::before,
		&::after {
			inset: 7px * $base-size;
		}

		&::before {
			border-width: 4px * $base-size;
		}

		&::after {
			border-width: 4px * $base-size;
		}

		&:hover {
			.button-box {
				transform: translateX(-56px * $base-size);
			}
		}

		.button-box {
			.button-elem {
				width: 20px * $base-size;
				height: 20px * $base-size;
				margin: 17px * $base-size 18px * $base-size 0 18px * $base-size;
			}
		}
	}
}
</style>
