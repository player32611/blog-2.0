<script setup lang="ts"></script>

<template>
	<div class="loader">
		<div class="loader__inner"></div>
		<div class="loader__orbit">
			<div class="loader__dot"></div>
			<div class="loader__dot"></div>
			<div class="loader__dot"></div>
			<div class="loader__dot"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
$base-size: 1;

.loader {
	position: relative;
	width: 200px * $base-size;
	height: 200px * $base-size;
	border-radius: 50%;
	background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 30%, transparent 70%);
	overflow: hidden;

	&::before {
		content: "";
		position: absolute;
		inset: 0;
		border-radius: 50%;
		border: 4px solid transparent;
		border-top-color: rgba(255, 255, 255, 0.6);
		animation: loader-spin 2s linear infinite;
	}

	&::after {
		content: "";
		position: absolute;
		inset: 10%;
		border-radius: 50%;
		background: conic-gradient(from 90deg, rgba(255, 255, 255, 0.2), transparent);
		filter: blur(2px);
		animation: loader-spin-reverse 1.5s linear infinite;
	}

	.loader__inner {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 30px;
		height: 30px;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
		animation: loader-pulse 1s ease-in-out infinite;
	}

	.loader__orbit {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		animation: orbit-rotate 3s linear infinite;

		.loader__dot {
			position: absolute;
			left: 50%;
			top: 50%;
			width: 8px;
			height: 8px;
			background: rgba(255, 255, 255, 0.8);
			border-radius: 50%;

			&:nth-child(1) {
				transform: rotate(0deg) translate(60px);
			}

			&:nth-child(2) {
				transform: rotate(90deg) translate(60px);
			}

			&:nth-child(3) {
				transform: rotate(180deg) translate(60px);
			}

			&:nth-child(4) {
				transform: rotate(270deg) translate(60px);
			}
		}
	}
}

@keyframes loader-spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

@keyframes loader-spin-reverse {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(-360deg);
	}
}

@keyframes loader-pulse {
	0%,
	100% {
		transform: translate(-50%, -50%) scale(1);
	}
	50% {
		transform: translate(-50%, -50%) scale(1.2);
	}
}

@keyframes orbit-rotate {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.7;

	.loader {
		width: 200px * $base-size;
		height: 200px * $base-size;

		&::before {
			border: 4px * $base-size solid transparent;
		}

		&::after {
			filter: blur(2px * $base-size);
		}

		.loader__inner {
			width: 30px * $base-size;
			height: 30px * $base-size;
			box-shadow: 0 0 15px * $base-size rgba(255, 255, 255, 0.6);
		}

		.loader__orbit {
			.loader__dot {
				width: 8px * $base-size;
				height: 8px * $base-size;

				&:nth-child(1) {
					transform: rotate(0deg) translate(60px * $base-size);
				}

				&:nth-child(2) {
					transform: rotate(90deg) translate(60px * $base-size);
				}

				&:nth-child(3) {
					transform: rotate(180deg) translate(60px * $base-size);
				}

				&:nth-child(4) {
					transform: rotate(270deg) translate(60px * $base-size);
				}
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.8;

	.loader {
		width: 200px * $base-size;
		height: 200px * $base-size;

		&::before {
			border: 4px * $base-size solid transparent;
		}

		&::after {
			filter: blur(2px * $base-size);
		}

		.loader__inner {
			width: 30px * $base-size;
			height: 30px * $base-size;
			box-shadow: 0 0 15px * $base-size rgba(255, 255, 255, 0.6);
		}

		.loader__orbit {
			.loader__dot {
				width: 8px * $base-size;
				height: 8px * $base-size;

				&:nth-child(1) {
					transform: rotate(0deg) translate(60px * $base-size);
				}

				&:nth-child(2) {
					transform: rotate(90deg) translate(60px * $base-size);
				}

				&:nth-child(3) {
					transform: rotate(180deg) translate(60px * $base-size);
				}

				&:nth-child(4) {
					transform: rotate(270deg) translate(60px * $base-size);
				}
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.9;

	.loader {
		width: 200px * $base-size;
		height: 200px * $base-size;

		&::before {
			border: 4px * $base-size solid transparent;
		}

		&::after {
			filter: blur(2px * $base-size);
		}

		.loader__inner {
			width: 30px * $base-size;
			height: 30px * $base-size;
			box-shadow: 0 0 15px * $base-size rgba(255, 255, 255, 0.6);
		}

		.loader__orbit {
			.loader__dot {
				width: 8px * $base-size;
				height: 8px * $base-size;

				&:nth-child(1) {
					transform: rotate(0deg) translate(60px * $base-size);
				}

				&:nth-child(2) {
					transform: rotate(90deg) translate(60px * $base-size);
				}

				&:nth-child(3) {
					transform: rotate(180deg) translate(60px * $base-size);
				}

				&:nth-child(4) {
					transform: rotate(270deg) translate(60px * $base-size);
				}
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 1;

	.loader {
		width: 200px * $base-size;
		height: 200px * $base-size;

		&::before {
			border: 4px * $base-size solid transparent;
		}

		&::after {
			filter: blur(2px * $base-size);
		}

		.loader__inner {
			width: 30px * $base-size;
			height: 30px * $base-size;
			box-shadow: 0 0 15px * $base-size rgba(255, 255, 255, 0.6);
		}

		.loader__orbit {
			.loader__dot {
				width: 8px * $base-size;
				height: 8px * $base-size;

				&:nth-child(1) {
					transform: rotate(0deg) translate(60px * $base-size);
				}

				&:nth-child(2) {
					transform: rotate(90deg) translate(60px * $base-size);
				}

				&:nth-child(3) {
					transform: rotate(180deg) translate(60px * $base-size);
				}

				&:nth-child(4) {
					transform: rotate(270deg) translate(60px * $base-size);
				}
			}
		}
	}
}
</style>
