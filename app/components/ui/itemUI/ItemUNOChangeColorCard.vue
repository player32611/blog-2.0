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
			fillStyle: "rgba(0, 0, 0)",
		},
	});
};

defineExpose<ItemInstance>({
	createItem,
});
</script>

<template>
	<!-- From Uiverse.io by nanda248 -->
	<div
		class="item_UNO_changeColor_card"
		:style="{
			left: x - (itemRef ? itemRef.offsetWidth / 2 : 0) + 'px',
			top: y - (itemRef ? itemRef.offsetHeight / 2 : 0) + 'px',
			rotate: angle + 'rad',
			visibility: visible ? 'visible' : 'hidden',
		}"
		ref="itemRef"
	>
		<div class="circle small top-left">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
		<div class="circle">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
		<div class="circle small bottom-right">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

/* From Uiverse.io by nanda248 */
.item_UNO_changeColor_card {
	position: absolute;
	width: 11em;
	height: 14.8em;
	font-size: 1rem;
	background: #28282b;
	display: flex;
	justify-content: center;
	align-items: center;
	border-width: 6px;
	border-style: solid;
	border-color: #f5f5dc;
	border-radius: 5px;
	transition: transform 0.5s;
	overflow: hidden;
	user-select: none;
	pointer-events: none;
	z-index: variables.$float_zIndex;
	filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.337));

	&::before {
		content: "";
		position: absolute;
		height: 130%;
		width: 1em;
		background-color: aliceblue;
		opacity: 0.14;
		animation: glider 1.8s infinite linear;
		animation-delay: 0.05s;
	}

	&::after {
		content: "";
		position: absolute;
		height: 120%;
		width: 0.8em;
		background-color: aliceblue;
		opacity: 0.1;
		animation: glider 1.8s infinite linear;
	}

	.circle {
		width: 8em;
		height: 14em;
		border-radius: 50%;
		transform: skew(-25deg);
		border-width: 4px;
		border-style: solid;
		border-color: white;
		display: grid;
		grid-template-columns: 1fr 1fr;

		&.small {
			position: absolute;
			width: 1.5em;
			height: 3em;
			border-width: 1px;
			border-style: solid;
			border-color: white;
		}

		&.top-left {
			top: 0.3em;
			left: 0.6em;
		}

		&.bottom-right {
			bottom: 0.3em;
			right: 0.6em;
		}

		span {
			&:nth-child(1) {
				background-color: #ff2400;
				border-top-left-radius: 100%;
			}

			&:nth-child(2) {
				background-color: #1f51ff;
				border-top-right-radius: 100%;
			}

			&:nth-child(3) {
				background-color: #ffea00;
				border-bottom-left-radius: 100%;
			}

			&:nth-child(4) {
				background-color: #50c878;
				border-bottom-right-radius: 100%;
			}
		}
	}
}

@keyframes glider {
	0% {
		transform: rotate(45deg) translate(-12em, 1.2em);
	}

	100% {
		transform: rotate(45deg) translate(18em, -2.8em);
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.3;

	.item_UNO_changeColor_card {
		font-size: 1rem * $base-size;
		border-width: 6px * $base-size;
		border-radius: 5px * $base-size;
		filter: drop-shadow(5px * $base-size 5px * $base-size 5px * $base-size rgba(0, 0, 0, 0.337));

		.circle {
			border-width: 4px * $base-size;

			&.small {
				border-width: 1px * $base-size;
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.45;

	.item_UNO_changeColor_card {
		font-size: 1rem * $base-size;
		border-width: 6px * $base-size;
		border-radius: 5px * $base-size;
		filter: drop-shadow(5px * $base-size 5px * $base-size 5px * $base-size rgba(0, 0, 0, 0.337));

		.circle {
			border-width: 4px * $base-size;

			&.small {
				border-width: 1px * $base-size;
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.6;

	.item_UNO_changeColor_card {
		font-size: 1rem * $base-size;
		border-width: 6px * $base-size;
		border-radius: 5px * $base-size;
		filter: drop-shadow(5px * $base-size 5px * $base-size 5px * $base-size rgba(0, 0, 0, 0.337));

		.circle {
			border-width: 4px * $base-size;

			&.small {
				border-width: 1px * $base-size;
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.8;

	.item_UNO_changeColor_card {
		font-size: 1rem * $base-size;
		border-width: 6px * $base-size;
		border-radius: 5px * $base-size;
		filter: drop-shadow(5px * $base-size 5px * $base-size 5px * $base-size rgba(0, 0, 0, 0.337));

		.circle {
			border-width: 4px * $base-size;

			&.small {
				border-width: 1px * $base-size;
			}
		}
	}
}
</style>
