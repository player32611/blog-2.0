<script setup lang="ts">
import type { ItemParams } from "~/types/components";

const { x, y, angle } = defineProps<ItemParams>();
const itemRef = ref<HTMLDivElement | null>(null);
</script>

<template>
	<div
		class="item_switch"
		:style="{
			left: x - (itemRef ? itemRef.offsetWidth / 2 : 0) + 'px',
			top: y - (itemRef ? itemRef.offsetHeight / 2 : 0) + 'px',
			rotate: angle + 'rad',
		}"
		ref="itemRef"
	>
		<div class="joy-con left">
			<div class="minus button"></div>
			<div class="joystick">
				<div class="joystick-inner-border">
					<div class="joystick-inner"></div>
				</div>
				<div class="joystick-edge"></div>
				<div class="joystick-edge"></div>
				<div class="joystick-edge"></div>
				<div class="joystick-edge"></div>
			</div>
			<div class="numpad-container">
				<div class="numpad-part numpad-top">
					<div class="numpad-button">▲</div>
				</div>
				<div class="numpad-part numpad-middle">
					<div class="numpad-button">◀</div>
					<div class="numpad-button">▶</div>
				</div>
				<div class="numpad-part numpad-bottom">
					<div class="numpad-button">▼</div>
				</div>
			</div>
			<div class="record-button">
				<div class="record-button-inner"></div>
			</div>
		</div>
		<div class="screen-outline">
			<div class="screen-border">
				<div class="screen"></div>
			</div>
		</div>

		<div class="joy-con right">
			<div class="plus-symbol">
				<div class="plus-symbol-overlap-fixer"></div>
			</div>

			<div class="joystick">
				<div class="joystick-inner-border">
					<div class="joystick-inner"></div>
				</div>
				<div class="joystick-edge"></div>
				<div class="joystick-edge"></div>
				<div class="joystick-edge"></div>
				<div class="joystick-edge"></div>
			</div>

			<div class="numpad-container">
				<div class="numpad-part numpad-top">
					<div class="numpad-button">X</div>
				</div>
				<div class="numpad-part numpad-middle">
					<div class="numpad-button button">Y</div>
					<div class="numpad-button button">A</div>
				</div>
				<div class="numpad-part numpad-bottom">
					<div class="numpad-button button">B</div>
				</div>
			</div>

			<div class="home-button-border">
				<div class="home-button">⌂</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
$base-size: 1;

.item_switch {
	position: absolute;
	display: flex;
	align-items: stretch;
	width: 470px * $base-size;
	height: 196.5px * $base-size; /* 104px * 3 */
	user-select: none;
	pointer-events: none;

	.screen-outline {
		display: flex;
		align-items: stretch;
		padding: 10px * $base-size 14px * $base-size;
		justify-content: center;
		border-radius: 2px * $base-size;
		background: rgb(71, 77, 79);
		background: linear-gradient(
			180deg,
			rgba(71, 77, 79, 1) 0%,
			rgba(90, 97, 100, 1) 3%,
			rgba(46, 50, 51, 1) 5%,
			rgba(46, 50, 51, 1) 100%
		);

		.screen-border {
			border-style: solid;
			border-color: black;
			border-top-width: 17px * $base-size;
			border-bottom-width: 17px * $base-size;
			border-left-width: 25px * $base-size;
			border-right-width: 25px * $base-size;
			border-radius: 6px * $base-size;
			flex: 1;
			background-color: black;
			width: 263px * $base-size;
			display: flex;

			.screen {
				border-radius: 2px * $base-size;
				background: rgb(38, 39, 43);
				background: linear-gradient(
					135deg,
					rgba(38, 39, 43, 1) 0%,
					rgba(49, 52, 62, 1) 49%,
					rgba(38, 39, 43, 1) 100%
				);
				flex: 1;
				overflow: hidden;
				cursor: pointer;

				img {
					height: 100%;
					width: 100%;
					object-fit: cover;
				}
			}
		}
	}

	.joy-con {
		background-color: pink;
		width: 65px * $base-size;
		height: 196.5px * $base-size;
		position: relative;

		&.left {
			border-top-left-radius: 40px * $base-size;
			border-bottom-left-radius: 40px * $base-size;
			background: rgb(0, 186, 219);
			background: linear-gradient(148deg, rgba(0, 186, 219, 1) 0%, rgba(0, 185, 220, 1) 100%);
			box-shadow:
				inset 3px * $base-size -4px * $base-size 10px * $base-size #058ca5,
				inset 0px 5px * $base-size 3px * $base-size #6ad9ed;
			border-top-right-radius: 4px * $base-size;
			border-bottom-right-radius: 4px * $base-size;

			.minus {
				position: absolute;
				top: 18px * $base-size;
				width: 10px * $base-size;
				height: 2px * $base-size;
				border-width: 0.8px * $base-size;
				border-style: solid;
				border-color: #222;
				border-radius: 1px * $base-size;
				right: 5px * $base-size;
				background-color: #3c3d41;
			}

			.joystick {
				left: 50%;
				transform: translate(-50%);
				top: 35px * $base-size;
			}

			.numpad-container {
				top: 82px * $base-size;
				left: 12px * $base-size;
				color: #1b1b1c;
				font-size: 8px * $base-size;
			}
		}

		&.right {
			border-top-right-radius: 40px * $base-size;
			border-bottom-right-radius: 40px * $base-size;
			border-top-left-radius: 4px * $base-size;
			border-bottom-left-radius: 4px * $base-size;
			background: rgb(250, 97, 93);
			background: linear-gradient(148deg, rgba(250, 97, 93, 1) 0%, rgba(239, 79, 77, 1) 100%);
			box-shadow:
				inset -3px * $base-size -4px * $base-size 10px * $base-size #d12621,
				inset 0px 5px * $base-size 3px * $base-size #fd877c;

			.joystick {
				top: 87.5px * $base-size;
				left: 14px * $base-size;
				filter: contrast(130%) drop-shadow(0px 1px * $base-size 2px * $base-size #00000088);
			}

			.numpad-container {
				top: 28.5px * $base-size;
				left: 8px * $base-size;
				color: #d7d7d7;
				font-size: 7px * $base-size;
			}

			.plus-symbol {
				width: 10px * $base-size;
				height: 10px * $base-size;
				position: absolute;
				display: inline-block;
				top: 14.5px * $base-size;
				left: 5px * $base-size;
				cursor: pointer;

				.plus-symbol-overlap-fixer {
					position: absolute;
					background-color: #333;
					width: 2px * $base-size;
					height: calc(100% - 2px * $base-size);
					border-radius: 1px * $base-size;
					top: 50%;
					left: 50%;
					z-index: 3;
					transform: translate(-50%, -50%);
				}

				&::before,
				&::after {
					content: "";
					position: absolute;
					background-color: #333;
					border-width: 0.8px * $base-size;
					border-style: solid;
					border-color: #222;
					border-radius: 1px * $base-size;
				}

				&::before {
					width: 2px * $base-size;
					height: 86.5%;
					left: 50%;
					transform: translateX(-50%);
				}

				&::after {
					width: 86.5%;
					height: 2px * $base-size;
					top: 50%;
					transform: translateY(-50%);
				}
			}

			.home-button-border {
				position: absolute;
				cursor: pointer;
				top: 132.5px * $base-size;
				left: 12px * $base-size;
				border: 1px solid #1b1b1c;
				background: linear-gradient(135deg, #a0a0a0 0%, #303030 100%);
				height: 14px * $base-size;
				width: 14px * $base-size;
				padding: 1px * $base-size;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;

				.home-button {
					width: 12px * $base-size;
					height: 12px * $base-size;
					border-width: 0.9px * $base-size;
					border-style: solid;
					border-color: #1b1b1c;
					background: linear-gradient(180deg, #6b6b6b 0%, #303030 100%);
					border-radius: 50%;
					display: flex;
					color: black;
					align-items: center;
					justify-content: center;
					font-size: 9px * $base-size;
				}
			}
		}

		.joystick {
			background-color: #2d2e33;
			border-radius: 100%;
			height: 28px * $base-size;
			width: 28px * $base-size;
			position: relative;
			border-width: 1px * $base-size;
			border-style: solid;
			border-color: #2d2e33;
			overflow: hidden;
			cursor: pointer;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(2, 1fr);
			grid-column-gap: 1px * $base-size;
			grid-row-gap: 1px * $base-size;
			filter: drop-shadow(0px 1px * $base-size 2px * $base-size #00000088);

			.joystick-edge {
				background-color: #444;
			}

			.joystick-inner-border {
				position: absolute;
				top: 50%;
				left: 50%;
				background-color: #2d2e33;
				padding: 1px * $base-size;
				z-index: 2;
				border-radius: 100%;
				transform: translate(-50%, -50%);
				display: flex;
				align-items: center;
				justify-content: center;

				.joystick-inner {
					width: 22px * $base-size;
					height: 22px * $base-size;
					border-radius: 50%;
					background-color: #282c2f;
					box-shadow:
						inset 0px -4px * $base-size 4px * $base-size rgb(49, 49, 49),
						inset 0px 4px * $base-size 12px * $base-size rgb(124, 124, 124),
						inset 0px 4px * $base-size 6px * $base-size rgb(0, 0, 0);
					z-index: 3;
					position: relative;
				}
			}
		}

		.numpad-container {
			position: absolute;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 44px * $base-size;
			height: 44px * $base-size;

			.numpad-part {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;

				&.numpad-middle {
					display: flex;
					align-items: center;
					gap: 16px * $base-size;
				}

				.numpad-button {
					width: 12px * $base-size;
					height: 12px * $base-size;
					background-color: #505050;
					cursor: pointer;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 50%;
					border-width: 1px * $base-size;
					border-style: solid;
					border-color: #2d2e33;
					box-shadow:
						inset -0.5px * $base-size -0.5px * $base-size 1.5px * $base-size rgba(92, 92, 92, 0.5),
						inset 0.2px * $base-size 1px * $base-size 0.8px * $base-size rgba(143, 143, 143, 0.658),
						inset -1px * $base-size -1px * $base-size 2px * $base-size rgba(31, 31, 31, 0.76),
						0px 0px 3px * $base-size #00000055;

					&.button {
						cursor: pointer;
					}
				}
			}
		}

		.record-button {
			width: 10px * $base-size;
			height: 10px * $base-size;
			cursor: pointer;
			border-width: 1px * $base-size;
			border-style: solid;
			border-color: #2d2e33;
			border-radius: 1px * $base-size;
			position: absolute;
			top: 134px * $base-size;
			left: 39px * $base-size;
			background: rgb(96, 95, 101);
			background: linear-gradient(135deg, #605f65 0%, rgba(60, 61, 66, 1) 100%);
			display: flex;
			align-items: center;
			justify-content: center;

			.record-button-inner {
				width: 4px * $base-size;
				height: 4px * $base-size;
				background: rgb(96, 95, 101);
				background: linear-gradient(135deg, #605f65 0%, rgba(60, 61, 66, 1) 100%);
				border-width: 1px * $base-size;
				border-style: solid;
				border-color: #2d2e33;
				border-radius: 50%;
			}
		}

		.button {
			cursor: pointer;
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.4;

	.item_switch {
		width: 470px * $base-size;
		height: 196.5px * $base-size;

		.screen-outline {
			padding: 10px * $base-size 14px * $base-size;
			border-radius: 2px * $base-size;

			.screen-border {
				border-top-width: 17px * $base-size;
				border-bottom-width: 17px * $base-size;
				border-left-width: 25px * $base-size;
				border-right-width: 25px * $base-size;
				border-radius: 6px * $base-size;
				width: 263px * $base-size;

				.screen {
					border-radius: 2px * $base-size;
				}
			}
		}

		.joy-con {
			width: 65px * $base-size;
			height: 196.5px * $base-size;

			&.left {
				border-top-left-radius: 40px * $base-size;
				border-bottom-left-radius: 40px * $base-size;
				box-shadow:
					inset 3px * $base-size -4px * $base-size 10px * $base-size #058ca5,
					inset 0px 5px * $base-size 3px * $base-size #6ad9ed;
				border-top-right-radius: 4px * $base-size;
				border-bottom-right-radius: 4px * $base-size;

				.minus {
					top: 18px * $base-size;
					width: 10px * $base-size;
					height: 2px * $base-size;
					border-width: 0.8px * $base-size;
					border-radius: 1px * $base-size;
					right: 5px * $base-size;
				}

				.joystick {
					top: 35px * $base-size;
				}

				.numpad-container {
					top: 82px * $base-size;
					left: 12px * $base-size;
					font-size: 8px * $base-size;
				}
			}

			&.right {
				border-top-right-radius: 40px * $base-size;
				border-bottom-right-radius: 40px * $base-size;
				border-top-left-radius: 4px * $base-size;
				border-bottom-left-radius: 4px * $base-size;
				box-shadow:
					inset -3px * $base-size -4px * $base-size 10px * $base-size #d12621,
					inset 0px 5px * $base-size 3px * $base-size #fd877c;

				.joystick {
					top: 87.5px * $base-size;
					left: 14px * $base-size;
					filter: contrast(130%) drop-shadow(0px 1px * $base-size 2px * $base-size #00000088);
				}

				.numpad-container {
					top: 28.5px * $base-size;
					left: 8px * $base-size;
					font-size: 7px * $base-size;
				}

				.plus-symbol {
					width: 10px * $base-size;
					height: 10px * $base-size;
					top: 14.5px * $base-size;
					left: 5px * $base-size;

					.plus-symbol-overlap-fixer {
						width: 2px * $base-size;
						height: calc(100% - 2px * $base-size);
						border-radius: 1px * $base-size;
					}

					&::before,
					&::after {
						border-width: 0.8px * $base-size;
						border-radius: 1px * $base-size;
					}

					&::before {
						width: 2px * $base-size;
					}

					&::after {
						height: 2px * $base-size;
					}
				}

				.home-button-border {
					top: 132.5px * $base-size;
					left: 12px * $base-size;
					height: 14px * $base-size;
					width: 14px * $base-size;
					padding: 1px * $base-size;

					.home-button {
						width: 12px * $base-size;
						height: 12px * $base-size;
						border-width: 0.9px * $base-size;
						font-size: 9px * $base-size;
					}
				}
			}

			.joystick {
				height: 28px * $base-size;
				width: 28px * $base-size;
				border-width: 1px * $base-size;
				grid-column-gap: 1px * $base-size;
				grid-row-gap: 1px * $base-size;
				filter: drop-shadow(0px 1px * $base-size 2px * $base-size #00000088);

				.joystick-inner-border {
					padding: 1px * $base-size;

					.joystick-inner {
						width: 22px * $base-size;
						height: 22px * $base-size;
						box-shadow:
							inset 0px -4px * $base-size 4px * $base-size rgb(49, 49, 49),
							inset 0px 4px * $base-size 12px * $base-size rgb(124, 124, 124),
							inset 0px 4px * $base-size 6px * $base-size rgb(0, 0, 0);
					}
				}
			}

			.numpad-container {
				width: 44px * $base-size;
				height: 44px * $base-size;

				.numpad-part {
					&.numpad-middle {
						gap: 16px * $base-size;
					}

					.numpad-button {
						width: 12px * $base-size;
						height: 12px * $base-size;
						border-width: 1px * $base-size;
						box-shadow:
							inset -0.5px * $base-size -0.5px * $base-size 1.5px * $base-size rgba(92, 92, 92, 0.5),
							inset 0.2px * $base-size 1px * $base-size 0.8px * $base-size
								rgba(143, 143, 143, 0.658),
							inset -1px * $base-size -1px * $base-size 2px * $base-size rgba(31, 31, 31, 0.76),
							0px 0px 3px * $base-size #00000055;
					}
				}
			}

			.record-button {
				width: 10px * $base-size;
				height: 10px * $base-size;
				border-width: 1px * $base-size;
				border-radius: 1px * $base-size;
				top: 134px * $base-size;
				left: 39px * $base-size;

				.record-button-inner {
					width: 4px * $base-size;
					height: 4px * $base-size;
					border-width: 1px * $base-size;
				}
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.5;

	.item_switch {
		width: 470px * $base-size;
		height: 196.5px * $base-size;

		.screen-outline {
			padding: 10px * $base-size 14px * $base-size;
			border-radius: 2px * $base-size;

			.screen-border {
				border-top-width: 17px * $base-size;
				border-bottom-width: 17px * $base-size;
				border-left-width: 25px * $base-size;
				border-right-width: 25px * $base-size;
				border-radius: 6px * $base-size;
				width: 263px * $base-size;

				.screen {
					border-radius: 2px * $base-size;
				}
			}
		}

		.joy-con {
			width: 65px * $base-size;
			height: 196.5px * $base-size;

			&.left {
				border-top-left-radius: 40px * $base-size;
				border-bottom-left-radius: 40px * $base-size;
				box-shadow:
					inset 3px * $base-size -4px * $base-size 10px * $base-size #058ca5,
					inset 0px 5px * $base-size 3px * $base-size #6ad9ed;
				border-top-right-radius: 4px * $base-size;
				border-bottom-right-radius: 4px * $base-size;

				.minus {
					top: 18px * $base-size;
					width: 10px * $base-size;
					height: 2px * $base-size;
					border-width: 0.8px * $base-size;
					border-radius: 1px * $base-size;
					right: 5px * $base-size;
				}

				.joystick {
					top: 35px * $base-size;
				}

				.numpad-container {
					top: 82px * $base-size;
					left: 12px * $base-size;
					font-size: 8px * $base-size;
				}
			}

			&.right {
				border-top-right-radius: 40px * $base-size;
				border-bottom-right-radius: 40px * $base-size;
				border-top-left-radius: 4px * $base-size;
				border-bottom-left-radius: 4px * $base-size;
				box-shadow:
					inset -3px * $base-size -4px * $base-size 10px * $base-size #d12621,
					inset 0px 5px * $base-size 3px * $base-size #fd877c;

				.joystick {
					top: 87.5px * $base-size;
					left: 14px * $base-size;
					filter: contrast(130%) drop-shadow(0px 1px * $base-size 2px * $base-size #00000088);
				}

				.numpad-container {
					top: 28.5px * $base-size;
					left: 8px * $base-size;
					font-size: 7px * $base-size;
				}

				.plus-symbol {
					width: 10px * $base-size;
					height: 10px * $base-size;
					top: 14.5px * $base-size;
					left: 5px * $base-size;

					.plus-symbol-overlap-fixer {
						width: 2px * $base-size;
						height: calc(100% - 2px * $base-size);
						border-radius: 1px * $base-size;
					}

					&::before,
					&::after {
						border-width: 0.8px * $base-size;
						border-radius: 1px * $base-size;
					}

					&::before {
						width: 2px * $base-size;
					}

					&::after {
						height: 2px * $base-size;
					}
				}

				.home-button-border {
					top: 132.5px * $base-size;
					left: 12px * $base-size;
					height: 14px * $base-size;
					width: 14px * $base-size;
					padding: 1px * $base-size;

					.home-button {
						width: 12px * $base-size;
						height: 12px * $base-size;
						border-width: 0.9px * $base-size;
						font-size: 9px * $base-size;
					}
				}
			}

			.joystick {
				height: 28px * $base-size;
				width: 28px * $base-size;
				border-width: 1px * $base-size;
				grid-column-gap: 1px * $base-size;
				grid-row-gap: 1px * $base-size;
				filter: drop-shadow(0px 1px * $base-size 2px * $base-size #00000088);

				.joystick-inner-border {
					padding: 1px * $base-size;

					.joystick-inner {
						width: 22px * $base-size;
						height: 22px * $base-size;
						box-shadow:
							inset 0px -4px * $base-size 4px * $base-size rgb(49, 49, 49),
							inset 0px 4px * $base-size 12px * $base-size rgb(124, 124, 124),
							inset 0px 4px * $base-size 6px * $base-size rgb(0, 0, 0);
					}
				}
			}

			.numpad-container {
				width: 44px * $base-size;
				height: 44px * $base-size;

				.numpad-part {
					&.numpad-middle {
						gap: 16px * $base-size;
					}

					.numpad-button {
						width: 12px * $base-size;
						height: 12px * $base-size;
						border-width: 1px * $base-size;
						box-shadow:
							inset -0.5px * $base-size -0.5px * $base-size 1.5px * $base-size rgba(92, 92, 92, 0.5),
							inset 0.2px * $base-size 1px * $base-size 0.8px * $base-size
								rgba(143, 143, 143, 0.658),
							inset -1px * $base-size -1px * $base-size 2px * $base-size rgba(31, 31, 31, 0.76),
							0px 0px 3px * $base-size #00000055;
					}
				}
			}

			.record-button {
				width: 10px * $base-size;
				height: 10px * $base-size;
				border-width: 1px * $base-size;
				border-radius: 1px * $base-size;
				top: 134px * $base-size;
				left: 39px * $base-size;

				.record-button-inner {
					width: 4px * $base-size;
					height: 4px * $base-size;
					border-width: 1px * $base-size;
				}
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.7;

	.item_switch {
		width: 470px * $base-size;
		height: 196.5px * $base-size;

		.screen-outline {
			padding: 10px * $base-size 14px * $base-size;
			border-radius: 2px * $base-size;

			.screen-border {
				border-top-width: 17px * $base-size;
				border-bottom-width: 17px * $base-size;
				border-left-width: 25px * $base-size;
				border-right-width: 25px * $base-size;
				border-radius: 6px * $base-size;
				width: 263px * $base-size;

				.screen {
					border-radius: 2px * $base-size;
				}
			}
		}

		.joy-con {
			width: 65px * $base-size;
			height: 196.5px * $base-size;

			&.left {
				border-top-left-radius: 40px * $base-size;
				border-bottom-left-radius: 40px * $base-size;
				box-shadow:
					inset 3px * $base-size -4px * $base-size 10px * $base-size #058ca5,
					inset 0px 5px * $base-size 3px * $base-size #6ad9ed;
				border-top-right-radius: 4px * $base-size;
				border-bottom-right-radius: 4px * $base-size;

				.minus {
					top: 18px * $base-size;
					width: 10px * $base-size;
					height: 2px * $base-size;
					border-width: 0.8px * $base-size;
					border-radius: 1px * $base-size;
					right: 5px * $base-size;
				}

				.joystick {
					top: 35px * $base-size;
				}

				.numpad-container {
					top: 82px * $base-size;
					left: 12px * $base-size;
					font-size: 8px * $base-size;
				}
			}

			&.right {
				border-top-right-radius: 40px * $base-size;
				border-bottom-right-radius: 40px * $base-size;
				border-top-left-radius: 4px * $base-size;
				border-bottom-left-radius: 4px * $base-size;
				box-shadow:
					inset -3px * $base-size -4px * $base-size 10px * $base-size #d12621,
					inset 0px 5px * $base-size 3px * $base-size #fd877c;

				.joystick {
					top: 87.5px * $base-size;
					left: 14px * $base-size;
					filter: contrast(130%) drop-shadow(0px 1px * $base-size 2px * $base-size #00000088);
				}

				.numpad-container {
					top: 28.5px * $base-size;
					left: 8px * $base-size;
					font-size: 7px * $base-size;
				}

				.plus-symbol {
					width: 10px * $base-size;
					height: 10px * $base-size;
					top: 14.5px * $base-size;
					left: 5px * $base-size;

					.plus-symbol-overlap-fixer {
						width: 2px * $base-size;
						height: calc(100% - 2px * $base-size);
						border-radius: 1px * $base-size;
					}

					&::before,
					&::after {
						border-width: 0.8px * $base-size;
						border-radius: 1px * $base-size;
					}

					&::before {
						width: 2px * $base-size;
					}

					&::after {
						height: 2px * $base-size;
					}
				}

				.home-button-border {
					top: 132.5px * $base-size;
					left: 12px * $base-size;
					height: 14px * $base-size;
					width: 14px * $base-size;
					padding: 1px * $base-size;

					.home-button {
						width: 12px * $base-size;
						height: 12px * $base-size;
						border-width: 0.9px * $base-size;
						font-size: 9px * $base-size;
					}
				}
			}

			.joystick {
				height: 28px * $base-size;
				width: 28px * $base-size;
				border-width: 1px * $base-size;
				grid-column-gap: 1px * $base-size;
				grid-row-gap: 1px * $base-size;
				filter: drop-shadow(0px 1px * $base-size 2px * $base-size #00000088);

				.joystick-inner-border {
					padding: 1px * $base-size;

					.joystick-inner {
						width: 22px * $base-size;
						height: 22px * $base-size;
						box-shadow:
							inset 0px -4px * $base-size 4px * $base-size rgb(49, 49, 49),
							inset 0px 4px * $base-size 12px * $base-size rgb(124, 124, 124),
							inset 0px 4px * $base-size 6px * $base-size rgb(0, 0, 0);
					}
				}
			}

			.numpad-container {
				width: 44px * $base-size;
				height: 44px * $base-size;

				.numpad-part {
					&.numpad-middle {
						gap: 16px * $base-size;
					}

					.numpad-button {
						width: 12px * $base-size;
						height: 12px * $base-size;
						border-width: 1px * $base-size;
						box-shadow:
							inset -0.5px * $base-size -0.5px * $base-size 1.5px * $base-size rgba(92, 92, 92, 0.5),
							inset 0.2px * $base-size 1px * $base-size 0.8px * $base-size
								rgba(143, 143, 143, 0.658),
							inset -1px * $base-size -1px * $base-size 2px * $base-size rgba(31, 31, 31, 0.76),
							0px 0px 3px * $base-size #00000055;
					}
				}
			}

			.record-button {
				width: 10px * $base-size;
				height: 10px * $base-size;
				border-width: 1px * $base-size;
				border-radius: 1px * $base-size;
				top: 134px * $base-size;
				left: 39px * $base-size;

				.record-button-inner {
					width: 4px * $base-size;
					height: 4px * $base-size;
					border-width: 1px * $base-size;
				}
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.8;

	.item_switch {
		width: 470px * $base-size;
		height: 196.5px * $base-size;

		.screen-outline {
			padding: 10px * $base-size 14px * $base-size;
			border-radius: 2px * $base-size;

			.screen-border {
				border-top-width: 17px * $base-size;
				border-bottom-width: 17px * $base-size;
				border-left-width: 25px * $base-size;
				border-right-width: 25px * $base-size;
				border-radius: 6px * $base-size;
				width: 263px * $base-size;

				.screen {
					border-radius: 2px * $base-size;
				}
			}
		}

		.joy-con {
			width: 65px * $base-size;
			height: 196.5px * $base-size;

			&.left {
				border-top-left-radius: 40px * $base-size;
				border-bottom-left-radius: 40px * $base-size;
				box-shadow:
					inset 3px * $base-size -4px * $base-size 10px * $base-size #058ca5,
					inset 0px 5px * $base-size 3px * $base-size #6ad9ed;
				border-top-right-radius: 4px * $base-size;
				border-bottom-right-radius: 4px * $base-size;

				.minus {
					top: 18px * $base-size;
					width: 10px * $base-size;
					height: 2px * $base-size;
					border-width: 0.8px * $base-size;
					border-radius: 1px * $base-size;
					right: 5px * $base-size;
				}

				.joystick {
					top: 35px * $base-size;
				}

				.numpad-container {
					top: 82px * $base-size;
					left: 12px * $base-size;
					font-size: 8px * $base-size;
				}
			}

			&.right {
				border-top-right-radius: 40px * $base-size;
				border-bottom-right-radius: 40px * $base-size;
				border-top-left-radius: 4px * $base-size;
				border-bottom-left-radius: 4px * $base-size;
				box-shadow:
					inset -3px * $base-size -4px * $base-size 10px * $base-size #d12621,
					inset 0px 5px * $base-size 3px * $base-size #fd877c;

				.joystick {
					top: 87.5px * $base-size;
					left: 14px * $base-size;
					filter: contrast(130%) drop-shadow(0px 1px * $base-size 2px * $base-size #00000088);
				}

				.numpad-container {
					top: 28.5px * $base-size;
					left: 8px * $base-size;
					font-size: 7px * $base-size;
				}

				.plus-symbol {
					width: 10px * $base-size;
					height: 10px * $base-size;
					top: 14.5px * $base-size;
					left: 5px * $base-size;

					.plus-symbol-overlap-fixer {
						width: 2px * $base-size;
						height: calc(100% - 2px * $base-size);
						border-radius: 1px * $base-size;
					}

					&::before,
					&::after {
						border-width: 0.8px * $base-size;
						border-radius: 1px * $base-size;
					}

					&::before {
						width: 2px * $base-size;
					}

					&::after {
						height: 2px * $base-size;
					}
				}

				.home-button-border {
					top: 132.5px * $base-size;
					left: 12px * $base-size;
					height: 14px * $base-size;
					width: 14px * $base-size;
					padding: 1px * $base-size;

					.home-button {
						width: 12px * $base-size;
						height: 12px * $base-size;
						border-width: 0.9px * $base-size;
						font-size: 9px * $base-size;
					}
				}
			}

			.joystick {
				height: 28px * $base-size;
				width: 28px * $base-size;
				border-width: 1px * $base-size;
				grid-column-gap: 1px * $base-size;
				grid-row-gap: 1px * $base-size;
				filter: drop-shadow(0px 1px * $base-size 2px * $base-size #00000088);

				.joystick-inner-border {
					padding: 1px * $base-size;

					.joystick-inner {
						width: 22px * $base-size;
						height: 22px * $base-size;
						box-shadow:
							inset 0px -4px * $base-size 4px * $base-size rgb(49, 49, 49),
							inset 0px 4px * $base-size 12px * $base-size rgb(124, 124, 124),
							inset 0px 4px * $base-size 6px * $base-size rgb(0, 0, 0);
					}
				}
			}

			.numpad-container {
				width: 44px * $base-size;
				height: 44px * $base-size;

				.numpad-part {
					&.numpad-middle {
						gap: 16px * $base-size;
					}

					.numpad-button {
						width: 12px * $base-size;
						height: 12px * $base-size;
						border-width: 1px * $base-size;
						box-shadow:
							inset -0.5px * $base-size -0.5px * $base-size 1.5px * $base-size rgba(92, 92, 92, 0.5),
							inset 0.2px * $base-size 1px * $base-size 0.8px * $base-size
								rgba(143, 143, 143, 0.658),
							inset -1px * $base-size -1px * $base-size 2px * $base-size rgba(31, 31, 31, 0.76),
							0px 0px 3px * $base-size #00000055;
					}
				}
			}

			.record-button {
				width: 10px * $base-size;
				height: 10px * $base-size;
				border-width: 1px * $base-size;
				border-radius: 1px * $base-size;
				top: 134px * $base-size;
				left: 39px * $base-size;

				.record-button-inner {
					width: 4px * $base-size;
					height: 4px * $base-size;
					border-width: 1px * $base-size;
				}
			}
		}
	}
}
</style>
