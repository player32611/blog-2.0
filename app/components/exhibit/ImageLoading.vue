<script setup lang="ts"></script>

<template>
	<div class="image_loading"></div>
</template>

<style scoped lang="scss">
/* From Uiverse.io by Shoh2008 */
.image_loading {
	width: 64px;
	height: 64px;
	position: relative;
	background: #fff;
	border-radius: 4px;
	overflow: hidden;

	&:before {
		content: "";
		position: absolute;
		left: 0;
		bottom: 0;
		width: 40px;
		height: 40px;
		transform: rotate(45deg) translate(30%, 40%);
		background: #ff9371;
		box-shadow: 32px -34px 0 5px #ff3d00;
		animation: slide 2s infinite ease-in-out alternate;
	}

	&:after {
		content: "";
		position: absolute;
		left: 10px;
		top: 10px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #ff3d00;
		transform: rotate(0deg);
		transform-origin: 35px 145px;
		animation: rotate 2s infinite ease-in-out;
	}
}

@keyframes slide {
	0%,
	100% {
		bottom: -35px;
	}

	25%,
	75% {
		bottom: -2px;
	}

	20%,
	80% {
		bottom: 2px;
	}
}

@keyframes rotate {
	0% {
		transform: rotate(-15deg);
	}

	25%,
	75% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(25deg);
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.4;

	.image_loading {
		width: 64px * $base-size;
		height: 64px * $base-size;
		border-radius: 4px * $base-size;

		&:before {
			width: 40px * $base-size;
			height: 40px * $base-size;
			box-shadow: 32px * $base-size -34px * $base-size 0 5px * $base-size #ff3d00;
		}

		&:after {
			left: 10px * $base-size;
			top: 10px * $base-size;
			width: 16px * $base-size;
			height: 16px * $base-size;
			transform-origin: 35px * $base-size 145px * $base-size;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.6;

	.image_loading {
		width: 64px * $base-size;
		height: 64px * $base-size;
		border-radius: 4px * $base-size;

		&:before {
			width: 40px * $base-size;
			height: 40px * $base-size;
			box-shadow: 32px * $base-size -34px * $base-size 0 5px * $base-size #ff3d00;
		}

		&:after {
			left: 10px * $base-size;
			top: 10px * $base-size;
			width: 16px * $base-size;
			height: 16px * $base-size;
			transform-origin: 35px * $base-size 145px * $base-size;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.8;

	.image_loading {
		width: 64px * $base-size;
		height: 64px * $base-size;
		border-radius: 4px * $base-size;

		&:before {
			width: 40px * $base-size;
			height: 40px * $base-size;
			box-shadow: 32px * $base-size -34px * $base-size 0 5px * $base-size #ff3d00;
		}

		&:after {
			left: 10px * $base-size;
			top: 10px * $base-size;
			width: 16px * $base-size;
			height: 16px * $base-size;
			transform-origin: 35px * $base-size 145px * $base-size;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.image_loading {
		width: 64px * $base-size;
		height: 64px * $base-size;
		border-radius: 4px * $base-size;

		&:before {
			width: 40px * $base-size;
			height: 40px * $base-size;
			box-shadow: 32px * $base-size -34px * $base-size 0 5px * $base-size #ff3d00;
		}

		&:after {
			left: 10px * $base-size;
			top: 10px * $base-size;
			width: 16px * $base-size;
			height: 16px * $base-size;
			transform-origin: 35px * $base-size 145px * $base-size;
		}
	}
}
</style>
