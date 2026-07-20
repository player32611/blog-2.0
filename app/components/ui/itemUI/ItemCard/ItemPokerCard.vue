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
	<!-- From Uiverse.io by mikedavidsonhub -->
	<div
		class="item_poker"
		:style="{
			left: x - (itemRef ? itemRef.offsetWidth / 2 : 0) + 'px',
			top: y - (itemRef ? itemRef.offsetHeight / 2 : 0) + 'px',
			rotate: angle + 'rad',
			visibility: visible ? 'visible' : 'hidden',
		}"
		ref="itemRef"
	>
		<div class="card">
			<div class="card-face card-front">
				<div class="corner top-left">A<span>♠</span></div>
				<div class="center-suit">♠</div>
				<div class="corner bottom-right">A<span>♠</span></div>
			</div>

			<div class="card-face card-back">
				<div class="pattern"></div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

/* From Uiverse.io by mikedavidsonhub */
.item_poker {
	--black: #000000;
	--white: #ffffff;
	--card-border: #222222;

	position: absolute;
	width: 250px;
	height: 350px;
	perspective: 1200px;
	font-family: sans-serif;
	user-select: none;
	pointer-events: none;
	z-index: variables.$float_zIndex;
	filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.437));

	.card {
		position: relative;
		width: 100%;
		height: 100%;
		cursor: pointer;

		.card-face {
			position: absolute;
			width: 100%;
			height: 100%;
			border-radius: 15px;
			backface-visibility: hidden;
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			border-width: 2px;
			border-style: solid;
			border-color: var(--card-border);
			box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

			&.card-front {
				background-color: var(--white);
				color: var(--black);

				.corner {
					position: absolute;
					font-size: 28px;
					font-weight: bold;
					display: flex;
					flex-direction: column;
					align-items: center;

					&.top-left {
						top: 15px;
						left: 15px;
					}

					&.bottom-right {
						bottom: 15px;
						right: 15px;
						transform: rotate(180deg);
					}
				}

				.center-suit {
					font-size: 120px;
				}
			}

			&.card-back {
				background-color: var(--black);
				transform: rotateY(180deg);
				border-width: 2px;
				border-style: solid;
				border-color: var(--white);
				outline-width: 2px;
				border-style: solid;
				outline-color: var(--black);
				position: relative;
				overflow: hidden;

				.pattern {
					width: 90%;
					height: 94%;
					border-width: 1px;
					border-style: solid;
					border-color: rgba(255, 255, 255, 0.2);
					border-radius: 10px;
					background-image:
						linear-gradient(45deg, rgba(215, 22, 22, 0.389) 25%, transparent 25%),
						linear-gradient(-45deg, rgba(167, 68, 68, 0.3) 25%, transparent 25%),
						linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.3) 75%),
						linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.4) 100%);
					background-size: 20px 20px;
					background-position:
						0 0,
						0 10px,
						10px 10px,
						-10px 0px;
				}
			}
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.3;

	.item_poker {
		width: 250px * $base-size;
		height: 350px * $base-size;
		perspective: 1200px * $base-size;
		filter: drop-shadow(5px * $base-size 5px * $base-size 5px * $base-size rgba(0, 0, 0, 0.437));

		.card {
			.card-face {
				border-radius: 15px * $base-size;
				border-width: 2px * $base-size;
				box-shadow: 0 4px * $base-size 15px * $base-size rgba(0, 0, 0, 0.2);

				&.card-front {
					.corner {
						font-size: 28px * $base-size;

						&.top-left {
							top: 15px * $base-size;
							left: 15px * $base-size;
						}

						&.bottom-right {
							bottom: 15px * $base-size;
							right: 15px * $base-size;
						}
					}

					.center-suit {
						font-size: 120px * $base-size;
					}
				}

				&.card-back {
					border-width: 2px * $base-size;
					outline-width: 2px * $base-size;

					.pattern {
						border-width: 1px * $base-size;
						border-radius: 10px * $base-size;
						background-size: 20px * $base-size 20px * $base-size;
						background-position:
							0 0,
							0 10px * $base-size,
							10px * $base-size 10px * $base-size,
							-10px * $base-size 0px;
					}
				}
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.45;

	.item_poker {
		width: 250px * $base-size;
		height: 350px * $base-size;
		perspective: 1200px * $base-size;
		filter: drop-shadow(5px * $base-size 5px * $base-size 5px * $base-size rgba(0, 0, 0, 0.437));

		.card {
			.card-face {
				border-radius: 15px * $base-size;
				border-width: 2px * $base-size;
				box-shadow: 0 4px * $base-size 15px * $base-size rgba(0, 0, 0, 0.2);

				&.card-front {
					.corner {
						font-size: 28px * $base-size;

						&.top-left {
							top: 15px * $base-size;
							left: 15px * $base-size;
						}

						&.bottom-right {
							bottom: 15px * $base-size;
							right: 15px * $base-size;
						}
					}

					.center-suit {
						font-size: 120px * $base-size;
					}
				}

				&.card-back {
					border-width: 2px * $base-size;
					outline-width: 2px * $base-size;

					.pattern {
						border-width: 1px * $base-size;
						border-radius: 10px * $base-size;
						background-size: 20px * $base-size 20px * $base-size;
						background-position:
							0 0,
							0 10px * $base-size,
							10px * $base-size 10px * $base-size,
							-10px * $base-size 0px;
					}
				}
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.6;

	.item_poker {
		width: 250px * $base-size;
		height: 350px * $base-size;
		perspective: 1200px * $base-size;
		filter: drop-shadow(5px * $base-size 5px * $base-size 5px * $base-size rgba(0, 0, 0, 0.437));

		.card {
			.card-face {
				border-radius: 15px * $base-size;
				border-width: 2px * $base-size;
				box-shadow: 0 4px * $base-size 15px * $base-size rgba(0, 0, 0, 0.2);

				&.card-front {
					.corner {
						font-size: 28px * $base-size;

						&.top-left {
							top: 15px * $base-size;
							left: 15px * $base-size;
						}

						&.bottom-right {
							bottom: 15px * $base-size;
							right: 15px * $base-size;
						}
					}

					.center-suit {
						font-size: 120px * $base-size;
					}
				}

				&.card-back {
					border-width: 2px * $base-size;
					outline-width: 2px * $base-size;

					.pattern {
						border-width: 1px * $base-size;
						border-radius: 10px * $base-size;
						background-size: 20px * $base-size 20px * $base-size;
						background-position:
							0 0,
							0 10px * $base-size,
							10px * $base-size 10px * $base-size,
							-10px * $base-size 0px;
					}
				}
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.8;

	.item_poker {
		width: 250px * $base-size;
		height: 350px * $base-size;
		perspective: 1200px * $base-size;
		filter: drop-shadow(5px * $base-size 5px * $base-size 5px * $base-size rgba(0, 0, 0, 0.437));

		.card {
			.card-face {
				border-radius: 15px * $base-size;
				border-width: 2px * $base-size;
				box-shadow: 0 4px * $base-size 15px * $base-size rgba(0, 0, 0, 0.2);

				&.card-front {
					.corner {
						font-size: 28px * $base-size;

						&.top-left {
							top: 15px * $base-size;
							left: 15px * $base-size;
						}

						&.bottom-right {
							bottom: 15px * $base-size;
							right: 15px * $base-size;
						}
					}

					.center-suit {
						font-size: 120px * $base-size;
					}
				}

				&.card-back {
					border-width: 2px * $base-size;
					outline-width: 2px * $base-size;

					.pattern {
						border-width: 1px * $base-size;
						border-radius: 10px * $base-size;
						background-size: 20px * $base-size 20px * $base-size;
						background-position:
							0 0,
							0 10px * $base-size,
							10px * $base-size 10px * $base-size,
							-10px * $base-size 0px;
					}
				}
			}
		}
	}
}
</style>
