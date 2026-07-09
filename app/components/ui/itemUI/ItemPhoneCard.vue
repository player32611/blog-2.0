<script setup lang="ts">
import Matter from "matter-js";
import type { Body } from "matter-js";
import type { ItemParams, ItemInstance } from "~/types/components";

const { Bodies } = Matter;

const { x, y, angle, visible } = defineProps<ItemParams>();
const itemRef = ref<HTMLDivElement | null>(null);

const createItem = (x: number, y: number, angle: number): Body | null => {
	if (!itemRef.value) return null;

	return Bodies.rectangle(x, y, itemRef.value.offsetWidth, itemRef.value.offsetHeight, {
		angle,
		restitution: 0.6,
		friction: 0.5,
		render: {
			fillStyle: "rgba(0, 0, 0, 0)",
		},
	});
};

defineExpose<ItemInstance>({
	createItem,
});
</script>

<template>
	<!-- From Uiverse.io by imtausef -->
	<div
		class="item_phone"
		:style="{
			left: x - (itemRef ? itemRef.offsetWidth / 2 : 0) + 'px',
			top: y - (itemRef ? itemRef.offsetHeight / 2 : 0) + 'px',
			rotate: angle + 'rad',
			visibility: visible ? 'visible' : 'hidden',
		}"
		ref="itemRef"
	>
		<span class="top-border"></span>
		<p class="time">12:00</p>
		<p class="date">Fri, 20 December</p>
		<svg
			class="fingerprint"
			viewBox="0 0 0.488 0.488"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M0.409 0.114a0.196 0.196 0 0 1 0.027 0.122v0.024c0 0.026 0.007 0.051 0.019 0.073M0.146 0.212c0 -0.026 0.01 -0.051 0.028 -0.069a0.096 0.096 0 0 1 0.068 -0.029c0.026 0 0.05 0.01 0.068 0.029s0.028 0.043 0.028 0.069v0.024c0 0.053 0.017 0.104 0.048 0.146m-0.145 -0.17v0.049A0.343 0.343 0 0 0 0.303 0.455M0.146 0.309A0.442 0.442 0 0 0 0.189 0.455m-0.118 -0.049c-0.016 -0.055 -0.024 -0.113 -0.022 -0.17V0.212a0.195 0.195 0 0 1 0.026 -0.098 0.194 0.194 0 0 1 0.071 -0.072 0.192 0.192 0 0 1 0.194 0"
				stroke="#000000"
				stroke-linecap="square"
				stroke-linejoin="round"
				stroke-width="0.0325"
			></path>
		</svg>
		<svg class="camera" viewBox="0 0 0.72 0.72" version="1.2" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M.57.18H.522L.492.15A.1.1 0 0 0 .42.12H.3a.1.1 0 0 0-.072.03l-.03.03H.15a.09.09 0 0 0-.09.09v.24C.06.56.1.6.15.6h.42C.62.6.66.56.66.51V.27A.09.09 0 0 0 .57.18m-.21.3a.105.105 0 1 1 0-.21.105.105 0 0 1 0 .21M.54.339a.039.039 0 1 1 0-.078.039.039 0 0 1 0 .078"
			></path>
		</svg>
		<svg class="phone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space="preserve">
			<path
				fill="none"
				stroke="#000"
				stroke-width="1.5"
				stroke-miterlimit="10"
				d="m10.2 6.375-3.075-3.15c-.375-.3-.9-.3-1.275 0l-2.325 2.4c-.525.45-.675 1.2-.45 1.8.6 1.725 2.175 5.175 5.25 8.25s6.525 4.575 8.25 5.25c.675.225 1.35.075 1.875-.375l2.325-2.325c.375-.375.375-.9 0-1.275L17.7 13.875c-.375-.375-.9-.375-1.275 0L14.55 15.75s-2.1-.9-3.75-2.475-2.475-3.75-2.475-3.75L10.2 7.65c.375-.375.375-.975 0-1.275z"
			></path>
		</svg>
		<span class="right-border top"></span>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

$base-size: 0.8;

/* From Uiverse.io by imtausef */
.item_phone {
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 30rem * $base-size; /* Fixed height */
	width: 16rem * $base-size; /* Fixed width */
	border-width: 0.4rem * $base-size;
	border-style: solid;
	border-color: black;
	border-radius: 1rem * $base-size; /* Rounded corners */
	background-color: #f9fafb; /* Light gray background */
	user-select: none;
	pointer-events: none;
	z-index: variables.$float_zIndex;

	/* Top border styles */
	.top-border {
		border-width: 0.1rem * $base-size;
		border-style: solid;
		border-color: black;
		background-color: black; /* Black background */
		width: 8rem * $base-size; /* Width of the top border */
		height: 0.8rem * $base-size; /* Height of the top border */
		border-bottom-left-radius: 1rem * $base-size; /* Rounded bottom corners */
		border-bottom-right-radius: 1rem * $base-size; /* Rounded bottom corners */
	}

	.time {
		font-size: 2.5rem * $base-size;
		margin: 1.5rem * $base-size 0 -1.2rem * $base-size;
	}

	.date {
		font-size: 0.7rem * $base-size;
	}

	.fingerprint {
		position: absolute;
		bottom: 5rem * $base-size;
		height: 2.6rem * $base-size;
		width: 2.6rem * $base-size;
	}

	.camera {
		position: absolute;
		bottom: 1rem * $base-size;
		right: 1rem * $base-size;
		padding: 0.4rem * $base-size;
		height: 2rem * $base-size;
		width: 2rem * $base-size;
		background-color: rgb(209, 218, 218);
		border-radius: 0.6rem * $base-size;
	}

	.phone {
		position: absolute;
		bottom: 1rem * $base-size;
		left: 1rem * $base-size;
		padding: 0.4rem * $base-size;
		height: 2rem * $base-size;
		width: 2rem * $base-size;
		background-color: rgb(209, 218, 218);
		border-radius: 0.6rem * $base-size;
	}

	/* Right border styles */
	.right-border {
		position: absolute;
		border-width: 0.4rem * $base-size;
		border-style: solid;
		border-color: black;
		right: -0.8rem * $base-size; /* Positioning */
		border-radius: 0.375rem * $base-size; /* Rounded corners */

		&.top {
			top: 5.6rem * $base-size; /* Positioning */
			height: 2.8rem * $base-size; /* Height of the top right border */
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.3;

	.item_phone {
		height: 30rem * $base-size;
		width: 16rem * $base-size;
		border-width: 0.4rem * $base-size;
		border-radius: 1rem * $base-size;

		.top-border {
			border-width: 0.1rem * $base-size;
			width: 8rem * $base-size;
			height: 0.8rem * $base-size;
			border-bottom-left-radius: 1rem * $base-size;
			border-bottom-right-radius: 1rem * $base-size;
		}

		.time {
			font-size: 2.5rem * $base-size;
			margin: 1.5rem * $base-size 0 -1.2rem * $base-size;
		}

		.date {
			font-size: 0.7rem * $base-size;
		}

		.fingerprint {
			bottom: 3rem * $base-size;
			height: 2.6rem * $base-size;
			width: 2.6rem * $base-size;
		}

		.camera {
			bottom: 1rem * $base-size;
			right: 1rem * $base-size;
			padding: 0.4rem * $base-size;
			height: 2rem * $base-size;
			width: 2rem * $base-size;
			border-radius: 0.6rem * $base-size;
		}

		.phone {
			bottom: 1rem * $base-size;
			left: 1rem * $base-size;
			padding: 0.4rem * $base-size;
			height: 2rem * $base-size;
			width: 2rem * $base-size;
			border-radius: 0.6rem * $base-size;
		}

		.right-border {
			border-width: 0.4rem * $base-size;
			right: -0.8rem * $base-size;
			border-radius: 0.375rem * $base-size;

			&.top {
				top: 5.6rem * $base-size;
				height: 2.8rem * $base-size;
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.4;

	.item_phone {
		height: 30rem * $base-size;
		width: 16rem * $base-size;
		border-width: 0.4rem * $base-size;
		border-radius: 1rem * $base-size;

		.top-border {
			border-width: 0.1rem * $base-size;
			width: 8rem * $base-size;
			height: 0.8rem * $base-size;
			border-bottom-left-radius: 1rem * $base-size;
			border-bottom-right-radius: 1rem * $base-size;
		}

		.time {
			font-size: 2.5rem * $base-size;
			margin: 1.5rem * $base-size 0 -1.2rem * $base-size;
		}

		.date {
			font-size: 0.7rem * $base-size;
		}

		.fingerprint {
			bottom: 3rem * $base-size;
			height: 2.6rem * $base-size;
			width: 2.6rem * $base-size;
		}

		.camera {
			bottom: 1rem * $base-size;
			right: 1rem * $base-size;
			padding: 0.4rem * $base-size;
			height: 2rem * $base-size;
			width: 2rem * $base-size;
			border-radius: 0.6rem * $base-size;
		}

		.phone {
			bottom: 1rem * $base-size;
			left: 1rem * $base-size;
			padding: 0.4rem * $base-size;
			height: 2rem * $base-size;
			width: 2rem * $base-size;
			border-radius: 0.6rem * $base-size;
		}

		.right-border {
			border-width: 0.4rem * $base-size;
			right: -0.8rem * $base-size;
			border-radius: 0.375rem * $base-size;

			&.top {
				top: 5.6rem * $base-size;
				height: 2.8rem * $base-size;
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.5;

	.item_phone {
		height: 30rem * $base-size;
		width: 16rem * $base-size;
		border-width: 0.4rem * $base-size;
		border-radius: 1rem * $base-size;

		.top-border {
			border-width: 0.1rem * $base-size;
			width: 8rem * $base-size;
			height: 0.8rem * $base-size;
			border-bottom-left-radius: 1rem * $base-size;
			border-bottom-right-radius: 1rem * $base-size;
		}

		.time {
			font-size: 2.5rem * $base-size;
			margin: 1.5rem * $base-size 0 -1.2rem * $base-size;
		}

		.date {
			font-size: 0.7rem * $base-size;
		}

		.fingerprint {
			bottom: 3rem * $base-size;
			height: 2.6rem * $base-size;
			width: 2.6rem * $base-size;
		}

		.camera {
			bottom: 1rem * $base-size;
			right: 1rem * $base-size;
			padding: 0.4rem * $base-size;
			height: 2rem * $base-size;
			width: 2rem * $base-size;
			border-radius: 0.6rem * $base-size;
		}

		.phone {
			bottom: 1rem * $base-size;
			left: 1rem * $base-size;
			padding: 0.4rem * $base-size;
			height: 2rem * $base-size;
			width: 2rem * $base-size;
			border-radius: 0.6rem * $base-size;
		}

		.right-border {
			border-width: 0.4rem * $base-size;
			right: -0.8rem * $base-size;
			border-radius: 0.375rem * $base-size;

			&.top {
				top: 5.6rem * $base-size;
				height: 2.8rem * $base-size;
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.6;

	.item_phone {
		height: 30rem * $base-size;
		width: 16rem * $base-size;
		border-width: 0.4rem * $base-size;
		border-radius: 1rem * $base-size;

		.top-border {
			border-width: 0.1rem * $base-size;
			width: 8rem * $base-size;
			height: 0.8rem * $base-size;
			border-bottom-left-radius: 1rem * $base-size;
			border-bottom-right-radius: 1rem * $base-size;
		}

		.time {
			font-size: 2.5rem * $base-size;
			margin: 1.5rem * $base-size 0 -1.2rem * $base-size;
		}

		.date {
			font-size: 0.7rem * $base-size;
		}

		.fingerprint {
			bottom: 3rem * $base-size;
			height: 2.6rem * $base-size;
			width: 2.6rem * $base-size;
		}

		.camera {
			bottom: 1rem * $base-size;
			right: 1rem * $base-size;
			padding: 0.4rem * $base-size;
			height: 2rem * $base-size;
			width: 2rem * $base-size;
			border-radius: 0.6rem * $base-size;
		}

		.phone {
			bottom: 1rem * $base-size;
			left: 1rem * $base-size;
			padding: 0.4rem * $base-size;
			height: 2rem * $base-size;
			width: 2rem * $base-size;
			border-radius: 0.6rem * $base-size;
		}

		.right-border {
			border-width: 0.4rem * $base-size;
			right: -0.8rem * $base-size;
			border-radius: 0.375rem * $base-size;

			&.top {
				top: 5.6rem * $base-size;
				height: 2.8rem * $base-size;
			}
		}
	}
}
</style>
