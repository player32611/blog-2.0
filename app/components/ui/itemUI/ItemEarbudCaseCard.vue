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
	<!-- From Uiverse.io by Spacious74 -->
	<div
		class="item_earbud_case"
		:style="{
			left: x - (itemRef ? itemRef.offsetWidth / 2 : 0) + 'px',
			top: y - (itemRef ? itemRef.offsetHeight / 2 : 0) + 'px',
			rotate: angle + 'rad',
			visibility: visible ? 'visible' : 'hidden',
		}"
		ref="itemRef"
	>
		<div class="lc cavity"></div>
		<div class="lc line"></div>
		<div class="led"></div>
		<div class="text"></div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

/* From Uiverse.io by Spacious74 */
.item_earbud_case {
	position: absolute;
	width: 270px;
	height: 220px;
	background-color: #e8e9eb;
	border-radius: 70px;
	box-shadow:
		inset 0px 35px 25px #ffffffe0,
		inset 10px 0px 25px #0000004b,
		inset 40px 0px 20px #ffffff,
		inset -10px 0px 25px #0000004b,
		inset -40px 0px 20px #fff,
		inset 0px 10px 10px #000000e0,
		inset 0px -15px 25px #00000036,
		10px 25px 40px -10px #00000060;
	user-select: none;
	pointer-events: none;
	z-index: variables.$float_zIndex;
	filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.337));

	.cavity {
		width: 150px;
		height: 20px;
		background: linear-gradient(180deg, #d6d6d6, #fff);
		border-radius: 200px;
		margin: auto;
		position: absolute;
		top: 30%;
		left: 50%;
		transform: translate(-50%, 30%);
	}

	.line {
		width: 100%;
		height: 2px;
		background-color: #b4b2b2;
		margin-top: 30%;
		position: relative;

		&::after,
		&::before {
			content: "";
			position: absolute;
			width: 5%;
			height: 2px;
			background-color: #fff;
		}

		&::before {
			right: 0;
		}
	}

	.led {
		width: 7px;
		aspect-ratio: 1;
		background-color: #66f66f;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, 30%);
		border-radius: 100px;
		box-shadow: 0 0 6px #3eff4b;
	}

	.text {
		text-align: center;
		margin-top: 70px;
		color: #00000036;
		font-weight: bolder;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.3;

	.item_earbud_case {
		width: 270px * $base-size;
		height: 220px * $base-size;
		border-radius: 70px * $base-size;
		box-shadow:
			inset 0px * $base-size 35px * $base-size 25px * $base-size #ffffffe0,
			inset 10px * $base-size 0px * $base-size 25px * $base-size #0000004b,
			inset 40px * $base-size 0px * $base-size 20px * $base-size #ffffff,
			inset -10px * $base-size 0px * $base-size 25px * $base-size #0000004b,
			inset -40px * $base-size 0px * $base-size 20px * $base-size #fff,
			inset 0px * $base-size 10px * $base-size 10px * $base-size #000000e0,
			inset 0px * $base-size -15px * $base-size 25px * $base-size #00000036,
			10px * $base-size 25px * $base-size 40px * $base-size -10px * $base-size #00000060;
		filter: drop-shadow(5px * $base-size 5px * $base-size 5px * $base-size rgba(0, 0, 0, 0.337));

		.cavity {
			width: 150px * $base-size;
			height: 20px * $base-size;
			border-radius: 200px * $base-size;
		}

		.line {
			height: 2px * $base-size;

			&::after,
			&::before {
				height: 2px * $base-size;
			}
		}

		.led {
			width: 7px * $base-size;
			border-radius: 100px * $base-size;
			box-shadow: 0 0 6px * $base-size #3eff4b;
		}

		.text {
			margin-top: 70px * $base-size;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.45;

	.item_earbud_case {
		width: 270px * $base-size;
		height: 220px * $base-size;
		border-radius: 70px * $base-size;
		box-shadow:
			inset 0px * $base-size 35px * $base-size 25px * $base-size #ffffffe0,
			inset 10px * $base-size 0px * $base-size 25px * $base-size #0000004b,
			inset 40px * $base-size 0px * $base-size 20px * $base-size #ffffff,
			inset -10px * $base-size 0px * $base-size 25px * $base-size #0000004b,
			inset -40px * $base-size 0px * $base-size 20px * $base-size #fff,
			inset 0px * $base-size 10px * $base-size 10px * $base-size #000000e0,
			inset 0px * $base-size -15px * $base-size 25px * $base-size #00000036,
			10px * $base-size 25px * $base-size 40px * $base-size -10px * $base-size #00000060;
		filter: drop-shadow(5px * $base-size 5px * $base-size 5px * $base-size rgba(0, 0, 0, 0.337));

		.cavity {
			width: 150px * $base-size;
			height: 20px * $base-size;
			border-radius: 200px * $base-size;
		}

		.line {
			height: 2px * $base-size;

			&::after,
			&::before {
				height: 2px * $base-size;
			}
		}

		.led {
			width: 7px * $base-size;
			border-radius: 100px * $base-size;
			box-shadow: 0 0 6px * $base-size #3eff4b;
		}

		.text {
			margin-top: 70px * $base-size;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.6;

	.item_earbud_case {
		width: 270px * $base-size;
		height: 220px * $base-size;
		border-radius: 70px * $base-size;
		box-shadow:
			inset 0px * $base-size 35px * $base-size 25px * $base-size #ffffffe0,
			inset 10px * $base-size 0px * $base-size 25px * $base-size #0000004b,
			inset 40px * $base-size 0px * $base-size 20px * $base-size #ffffff,
			inset -10px * $base-size 0px * $base-size 25px * $base-size #0000004b,
			inset -40px * $base-size 0px * $base-size 20px * $base-size #fff,
			inset 0px * $base-size 10px * $base-size 10px * $base-size #000000e0,
			inset 0px * $base-size -15px * $base-size 25px * $base-size #00000036,
			10px * $base-size 25px * $base-size 40px * $base-size -10px * $base-size #00000060;
		filter: drop-shadow(5px * $base-size 5px * $base-size 5px * $base-size rgba(0, 0, 0, 0.337));

		.cavity {
			width: 150px * $base-size;
			height: 20px * $base-size;
			border-radius: 200px * $base-size;
		}

		.line {
			height: 2px * $base-size;

			&::after,
			&::before {
				height: 2px * $base-size;
			}
		}

		.led {
			width: 7px * $base-size;
			border-radius: 100px * $base-size;
			box-shadow: 0 0 6px * $base-size #3eff4b;
		}

		.text {
			margin-top: 70px * $base-size;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.75;

	.item_earbud_case {
		width: 270px * $base-size;
		height: 220px * $base-size;
		border-radius: 70px * $base-size;
		box-shadow:
			inset 0px * $base-size 35px * $base-size 25px * $base-size #ffffffe0,
			inset 10px * $base-size 0px * $base-size 25px * $base-size #0000004b,
			inset 40px * $base-size 0px * $base-size 20px * $base-size #ffffff,
			inset -10px * $base-size 0px * $base-size 25px * $base-size #0000004b,
			inset -40px * $base-size 0px * $base-size 20px * $base-size #fff,
			inset 0px * $base-size 10px * $base-size 10px * $base-size #000000e0,
			inset 0px * $base-size -15px * $base-size 25px * $base-size #00000036,
			10px * $base-size 25px * $base-size 40px * $base-size -10px * $base-size #00000060;
		filter: drop-shadow(5px * $base-size 5px * $base-size 5px * $base-size rgba(0, 0, 0, 0.337));

		.cavity {
			width: 150px * $base-size;
			height: 20px * $base-size;
			border-radius: 200px * $base-size;
		}

		.line {
			height: 2px * $base-size;

			&::after,
			&::before {
				height: 2px * $base-size;
			}
		}

		.led {
			width: 7px * $base-size;
			border-radius: 100px * $base-size;
			box-shadow: 0 0 6px * $base-size #3eff4b;
		}

		.text {
			margin-top: 70px * $base-size;
		}
	}
}
</style>
