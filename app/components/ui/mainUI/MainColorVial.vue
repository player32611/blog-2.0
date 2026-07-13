<script setup lang="ts">
import Matter from "matter-js";
import type { Body } from "matter-js";
import type { ItemInstance, MainColorVialParams } from "~/types/components";

const { Bodies } = Matter;

const { x, y, angle, color } = defineProps<MainColorVialParams>();
const vialRef = ref<HTMLDivElement | null>(null);

const createItem = (x: number, y: number, angle: number): Body | null => {
	if (!vialRef.value) return null;

	return Bodies.rectangle(x, y, vialRef.value.offsetWidth, vialRef.value.offsetHeight, {
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
	<div
		class="main_vial"
		:style="{
			left: x - (vialRef ? vialRef.offsetWidth / 2 : 0) + 'px',
			top: y - (vialRef ? vialRef.offsetHeight / 2 : 0) + 'px',
			rotate: angle + 'rad',
			'--vial-color': color,
		}"
		ref="vialRef"
	>
		<!-- From Uiverse.io by pedertanberg -->
		<div class="vial_head"><div></div></div>

		<div class="vial_body">
			<div class="body_rope"></div>
			<div class="body_bottle"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
$base-size: 0.6;

.main_vial {
	position: absolute;
	width: 50px * $base-size;
	height: 120px * $base-size;
	filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.537));
	user-select: none;
	pointer-events: none;

	/* From Uiverse.io by pedertanberg */
	.vial_head {
		display: inline-block;
		position: relative;
		width: 100%;
		height: 22px * $base-size;
		transform: rotate(45deg);
		transform-origin: 30px * $base-size 24px * $base-size;

		div {
			top: 16px * $base-size;
			left: 16px * $base-size;
			position: absolute;
			width: 20px * $base-size;
			height: 20px * $base-size;
			background: var(--vial-color);
			border-width: 0 4px * $base-size 4px * $base-size 0;
			border-color: #000000;
			border-style: solid;

			&:after,
			&::before {
				content: " ";
				position: absolute;
				display: block;
				width: 16px * $base-size;
				height: 16px * $base-size;
				background: var(--vial-color);
				border-color: #000000;
				border-style: solid;
			}

			&:before {
				left: -16px * $base-size;
				border-radius: 12px * $base-size 0 0 12px * $base-size;
				border-width: 4px * $base-size 0 4px * $base-size 4px * $base-size;
			}

			&:after {
				top: -16px * $base-size;
				border-radius: 12px * $base-size 12px * $base-size 0 0;
				border-width: 4px * $base-size 4px * $base-size 0 4px * $base-size;
			}
		}
	}

	.vial_body {
		position: absolute;
		width: 100%;

		.body_rope {
			margin: 0 auto;
			width: 45%;
			height: 4px * $base-size;
			border-color: #000000;
			border-style: solid;
			border-width: 4px * $base-size;
			border-radius: 8px * $base-size;
			background-color: var(--vial-color);
		}

		.body_bottle {
			margin: 0 auto;
			width: 50%;
			height: 60px * $base-size;
			border-color: #000000;
			border-style: solid;
			border-width: 4px * $base-size;
			border-radius: 8px * $base-size;
			transform: translateY(-4px * $base-size);
			background-color: var(--vial-color);
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.4;

	.main_vial {
		width: 50px * $base-size;
		height: 120px * $base-size;

		.vial_head {
			height: 22px * $base-size;
			transform-origin: 30px * $base-size 24px * $base-size;

			div {
				top: 16px * $base-size;
				left: 16px * $base-size;
				width: 20px * $base-size;
				height: 20px * $base-size;
				border-width: 0 4px * $base-size 4px * $base-size 0;

				&:after,
				&::before {
					width: 16px * $base-size;
					height: 16px * $base-size;
				}

				&:before {
					top: 0.5px;
					left: -16px * $base-size;
					border-radius: 12px * $base-size 0 0 12px * $base-size;
					border-width: 4px * $base-size 0 4px * $base-size 4px * $base-size;
				}

				&:after {
					top: -16px * $base-size;
					left: 0.5px;
					border-radius: 12px * $base-size 12px * $base-size 0 0;
					border-width: 4px * $base-size 4px * $base-size 0 4px * $base-size;
				}
			}
		}

		.vial_body {
			.body_rope {
				height: 4px * $base-size;
				border-width: 4px * $base-size;
				border-radius: 8px * $base-size;
			}

			.body_bottle {
				height: 60px * $base-size;
				border-width: 4px * $base-size;
				border-radius: 8px * $base-size;
				transform: translateY(-4px * $base-size);
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.5;

	.main_vial {
		width: 50px * $base-size;
		height: 120px * $base-size;

		.vial_head {
			height: 22px * $base-size;
			transform-origin: 30px * $base-size 24px * $base-size;

			div {
				top: 16px * $base-size;
				left: 16px * $base-size;
				width: 20px * $base-size;
				height: 20px * $base-size;
				border-width: 0 4px * $base-size 4px * $base-size 0;

				&:after,
				&::before {
					width: 16px * $base-size;
					height: 16px * $base-size;
				}

				&:before {
					left: -16px * $base-size;
					border-radius: 12px * $base-size 0 0 12px * $base-size;
					border-width: 4px * $base-size 0 4px * $base-size 4px * $base-size;
				}

				&:after {
					top: -16px * $base-size;
					border-radius: 12px * $base-size 12px * $base-size 0 0;
					border-width: 4px * $base-size 4px * $base-size 0 4px * $base-size;
				}
			}
		}

		.vial_body {
			.body_rope {
				height: 4px * $base-size;
				border-width: 4px * $base-size;
				border-radius: 8px * $base-size;
			}

			.body_bottle {
				height: 60px * $base-size;
				border-width: 4px * $base-size;
				border-radius: 8px * $base-size;
				transform: translateY(-4px * $base-size);
			}
		}
	}
}
</style>
