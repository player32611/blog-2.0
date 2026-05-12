<script setup lang="ts"></script>

<template>
	<!-- From Uiverse.io by JkHuger -->
	<div data-js="astro" class="astronaut">
		<div class="head"></div>
		<div class="arm arm-left"></div>
		<div class="arm arm-right"></div>
		<div class="body">
			<div class="panel"></div>
		</div>
		<div class="leg leg-left"></div>
		<div class="leg leg-right"></div>
		<div class="schoolbag"></div>
	</div>
</template>

<style scoped lang="scss">
$base-size: 1;

/* From Uiverse.io by JkHuger */
.astronaut {
	width: 250px * $base-size;
	height: 300px * $base-size;
	position: absolute;
	z-index: 11;
	top: calc(50% - 150px * $base-size);
	left: calc(50% - 125px * $base-size);
	animation: astronaut 5s linear infinite;

	.head {
		width: 97px * $base-size;
		height: 80px * $base-size;
		position: absolute;
		z-index: 3;
		background: -webkit-linear-gradient(left, #e3e8eb 0%, #e3e8eb 50%, #fbfdfa 50%, #fbfdfa 100%);
		border-radius: 50%;
		top: 34px * $base-size;
		left: calc(50% - 47.5px * $base-size);

		&:after {
			content: "";
			width: 60px * $base-size;
			height: 50px * $base-size;
			position: absolute;
			top: calc(50% - 25px * $base-size);
			left: calc(50% - 30px * $base-size);
			background: -webkit-linear-gradient(top, #15aece 0%, #15aece 50%, #0391bf 50%, #0391bf 100%);
			border-radius: 15px * $base-size;
		}

		&:before {
			content: "";
			width: 12px * $base-size;
			height: 25px * $base-size;
			position: absolute;
			top: calc(50% - 12.5px * $base-size);
			left: -4px * $base-size;
			background-color: #618095;
			border-radius: 5px * $base-size;
			box-shadow: 92px * $base-size 0px 0px #618095;
		}
	}

	.arm {
		width: 80px * $base-size;
		height: 30px * $base-size;
		position: absolute;
		top: 121px * $base-size;
		z-index: 2;

		&.arm-left {
			left: 30px * $base-size;
			background-color: #e3e8eb;
			border-radius: 0 0 0 39px * $base-size;

			&:before {
				border-radius: #{50px * $base-size 50px * $base-size 0px 120px * $base-size} / #{50px *
					$base-size 50px * $base-size 0 110px * $base-size};
				left: 0;
				background-color: #e3e8eb;
			}

			&:after {
				background-color: #6e91a4;
				left: 0;
			}
		}

		&.arm-right {
			right: 30px * $base-size;
			background-color: #fbfdfa;
			border-radius: 0 0 39px * $base-size 0;

			&:before {
				border-radius: #{50px * $base-size 50px * $base-size 120px * $base-size 0} / #{50px *
					$base-size 50px * $base-size 110px * $base-size 0};
				right: 0;
				background-color: #fbfdfa;
			}

			&:after {
				right: 0;
				background-color: #b6d2e0;
			}
		}

		&.arm-left:before,
		&.arm-right:before {
			content: "";
			width: 30px * $base-size;
			height: 70px * $base-size;
			position: absolute;
			top: -40px * $base-size;
		}

		&.arm-left:after,
		&.arm-right:after {
			content: "";
			width: 30px * $base-size;
			height: 10px * $base-size;
			position: absolute;
			top: -24px * $base-size;
		}
	}

	.body {
		width: 85px * $base-size;
		height: 100px * $base-size;
		position: absolute;
		z-index: 2;
		background-color: #fffbff;
		border-radius: #{40px * $base-size} / #{20px * $base-size};
		top: 105px * $base-size;
		left: calc(50% - 41px * $base-size);
		background: -webkit-linear-gradient(left, #e3e8eb 0%, #e3e8eb 50%, #fbfdfa 50%, #fbfdfa 100%);

		.panel {
			width: 60px * $base-size;
			height: 40px * $base-size;
			position: absolute;
			top: 20px * $base-size;
			left: calc(50% - 30px * $base-size);
			background-color: #b7cceb;

			&:before {
				content: "";
				width: 30px * $base-size;
				height: 5px * $base-size;
				position: absolute;
				top: 9px * $base-size;
				left: 7px * $base-size;
				background-color: #fbfdfa;
				box-shadow:
					0px 9px * $base-size 0px #fbfdfa,
					0px 18px * $base-size 0px #fbfdfa;
			}

			&:after {
				content: "";
				width: 8px * $base-size;
				height: 8px * $base-size;
				position: absolute;
				top: 9px * $base-size;
				right: 7px * $base-size;
				background-color: #fbfdfa;
				border-radius: 50%;
				box-shadow: 0px 14px * $base-size 0px 2px * $base-size #fbfdfa;
			}
		}
	}

	.leg {
		width: 30px * $base-size;
		height: 40px * $base-size;
		position: absolute;
		z-index: 2;
		bottom: 70px * $base-size;

		&.leg-left {
			left: 76px * $base-size;
			background-color: #e3e8eb;
			transform: rotate(20deg);

			&:before {
				left: -20px * $base-size;
				background-color: #e3e8eb;
				border-radius: 30px * $base-size 0 0 0;
				border-bottom-width: 10px * $base-size;
				border-bottom-style: solid;
				border-bottom-color: #6d96ac;
			}
		}

		&.leg-right {
			right: 73px * $base-size;
			background-color: #fbfdfa;
			transform: rotate(-20deg);

			&:before {
				right: -20px * $base-size;
				background-color: #fbfdfa;
				border-radius: 0 30px * $base-size 0 0;
				border-bottom-width: 10px * $base-size;
				border-bottom-style: solid;
				border-bottom-color: #b0cfe4;
			}
		}

		&.leg-left:before,
		&.leg-right:before {
			content: "";
			width: 50px * $base-size;
			height: 25px * $base-size;
			position: absolute;
			bottom: -26px * $base-size;
		}
	}

	.schoolbag {
		width: 100px * $base-size;
		height: 150px * $base-size;
		position: absolute;
		z-index: 1;
		top: calc(50% - 75px * $base-size);
		left: calc(50% - 50px * $base-size);
		background-color: #94b7ca;
		border-radius: 50px 50px 0 0 / 30px 30px 0 0;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.5;

	.astronaut {
		width: 250px * $base-size;
		height: 300px * $base-size;
		top: calc(50% - 150px * $base-size);
		left: calc(50% - 125px * $base-size);

		.head {
			width: 97px * $base-size;
			height: 80px * $base-size;
			top: 34px * $base-size;
			left: calc(50% - 47.5px * $base-size);

			&:after {
				width: 60px * $base-size;
				height: 50px * $base-size;
				top: calc(50% - 25px * $base-size);
				left: calc(50% - 30px * $base-size);
				border-radius: 15px * $base-size;
			}

			&:before {
				width: 12px * $base-size;
				height: 25px * $base-size;
				top: calc(50% - 12.5px * $base-size);
				left: -4px * $base-size;
				border-radius: 5px * $base-size;
				box-shadow: 92px * $base-size 0px 0px #618095;
			}
		}

		.arm {
			width: 80px * $base-size;
			height: 30px * $base-size;
			top: 121px * $base-size;

			&.arm-left {
				left: 30px * $base-size;
				border-radius: 0 0 0 39px * $base-size;

				&:before {
					border-radius: #{50px * $base-size 50px * $base-size 0px 120px * $base-size} / #{50px *
						$base-size 50px * $base-size 0 110px * $base-size};
				}
			}

			&.arm-right {
				right: 30px * $base-size;
				border-radius: 0 0 39px * $base-size 0;

				&:before {
					border-radius: #{50px * $base-size 50px * $base-size 120px * $base-size 0} / #{50px *
						$base-size 50px * $base-size 110px * $base-size 0};
				}
			}

			&.arm-left:before,
			&.arm-right:before {
				width: 30px * $base-size;
				height: 70px * $base-size;
				top: -40px * $base-size;
			}

			&.arm-left:after,
			&.arm-right:after {
				width: 30px * $base-size;
				height: 10px * $base-size;
				top: -24px * $base-size;
			}
		}

		.body {
			width: 85px * $base-size;
			height: 100px * $base-size;
			border-radius: #{40px * $base-size} / #{20px * $base-size};
			top: 105px * $base-size;
			left: calc(50% - 41px * $base-size);

			.panel {
				width: 60px * $base-size;
				height: 40px * $base-size;
				top: 20px * $base-size;
				left: calc(50% - 30px * $base-size);

				&:before {
					width: 30px * $base-size;
					height: 5px * $base-size;
					top: 9px * $base-size;
					left: 7px * $base-size;
					box-shadow:
						0px 9px * $base-size 0px #fbfdfa,
						0px 18px * $base-size 0px #fbfdfa;
				}

				&:after {
					width: 8px * $base-size;
					height: 8px * $base-size;
					top: 9px * $base-size;
					right: 7px * $base-size;
					box-shadow: 0px 14px * $base-size 0px 2px * $base-size #fbfdfa;
				}
			}
		}

		.leg {
			width: 30px * $base-size;
			height: 40px * $base-size;
			bottom: 70px * $base-size;

			&.leg-left {
				left: 76px * $base-size;

				&:before {
					left: -20px * $base-size;
					border-radius: 30px * $base-size 0 0 0;
					border-bottom-width: 10px * $base-size;
				}
			}

			&.leg-right {
				right: 73px * $base-size;
				&:before {
					right: -20px * $base-size;
					border-radius: 0 30px * $base-size 0 0;
					border-bottom-width: 10px * $base-size;
				}
			}

			&.leg-left:before,
			&.leg-right:before {
				width: 50px * $base-size;
				height: 25px * $base-size;
				bottom: -26px * $base-size;
			}
		}

		.schoolbag {
			width: 100px * $base-size;
			height: 150px * $base-size;
			top: calc(50% - 75px * $base-size);
			left: calc(50% - 50px * $base-size);
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.7;

	.astronaut {
		width: 250px * $base-size;
		height: 300px * $base-size;
		top: calc(50% - 150px * $base-size);
		left: calc(50% - 125px * $base-size);

		.head {
			width: 97px * $base-size;
			height: 80px * $base-size;
			top: 34px * $base-size;
			left: calc(50% - 47.5px * $base-size);

			&:after {
				width: 60px * $base-size;
				height: 50px * $base-size;
				top: calc(50% - 25px * $base-size);
				left: calc(50% - 30px * $base-size);
				border-radius: 15px * $base-size;
			}

			&:before {
				width: 12px * $base-size;
				height: 25px * $base-size;
				top: calc(50% - 12.5px * $base-size);
				left: -4px * $base-size;
				border-radius: 5px * $base-size;
				box-shadow: 92px * $base-size 0px 0px #618095;
			}
		}

		.arm {
			width: 80px * $base-size;
			height: 30px * $base-size;
			top: 121px * $base-size;

			&.arm-left {
				left: 30px * $base-size;
				border-radius: 0 0 0 39px * $base-size;

				&:before {
					border-radius: #{50px * $base-size 50px * $base-size 0px 120px * $base-size} / #{50px *
						$base-size 50px * $base-size 0 110px * $base-size};
				}
			}

			&.arm-right {
				right: 30px * $base-size;
				border-radius: 0 0 39px * $base-size 0;

				&:before {
					border-radius: #{50px * $base-size 50px * $base-size 120px * $base-size 0} / #{50px *
						$base-size 50px * $base-size 110px * $base-size 0};
				}
			}

			&.arm-left:before,
			&.arm-right:before {
				width: 30px * $base-size;
				height: 70px * $base-size;
				top: -40px * $base-size;
			}

			&.arm-left:after,
			&.arm-right:after {
				width: 30px * $base-size;
				height: 10px * $base-size;
				top: -24px * $base-size;
			}
		}

		.body {
			width: 85px * $base-size;
			height: 100px * $base-size;
			border-radius: #{40px * $base-size} / #{20px * $base-size};
			top: 105px * $base-size;
			left: calc(50% - 41px * $base-size);

			.panel {
				width: 60px * $base-size;
				height: 40px * $base-size;
				top: 20px * $base-size;
				left: calc(50% - 30px * $base-size);

				&:before {
					width: 30px * $base-size;
					height: 5px * $base-size;
					top: 9px * $base-size;
					left: 7px * $base-size;
					box-shadow:
						0px 9px * $base-size 0px #fbfdfa,
						0px 18px * $base-size 0px #fbfdfa;
				}

				&:after {
					width: 8px * $base-size;
					height: 8px * $base-size;
					top: 9px * $base-size;
					right: 7px * $base-size;
					box-shadow: 0px 14px * $base-size 0px 2px * $base-size #fbfdfa;
				}
			}
		}

		.leg {
			width: 30px * $base-size;
			height: 40px * $base-size;
			bottom: 70px * $base-size;

			&.leg-left {
				left: 76px * $base-size;

				&:before {
					left: -20px * $base-size;
					border-radius: 30px * $base-size 0 0 0;
					border-bottom-width: 10px * $base-size;
				}
			}

			&.leg-right {
				right: 73px * $base-size;
				&:before {
					right: -20px * $base-size;
					border-radius: 0 30px * $base-size 0 0;
					border-bottom-width: 10px * $base-size;
				}
			}

			&.leg-left:before,
			&.leg-right:before {
				width: 50px * $base-size;
				height: 25px * $base-size;
				bottom: -26px * $base-size;
			}
		}

		.schoolbag {
			width: 100px * $base-size;
			height: 150px * $base-size;
			top: calc(50% - 75px * $base-size);
			left: calc(50% - 50px * $base-size);
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.7;

	.astronaut {
		width: 250px * $base-size;
		height: 300px * $base-size;
		top: calc(50% - 150px * $base-size);
		left: calc(50% - 125px * $base-size);

		.head {
			width: 97px * $base-size;
			height: 80px * $base-size;
			top: 34px * $base-size;
			left: calc(50% - 47.5px * $base-size);

			&:after {
				width: 60px * $base-size;
				height: 50px * $base-size;
				top: calc(50% - 25px * $base-size);
				left: calc(50% - 30px * $base-size);
				border-radius: 15px * $base-size;
			}

			&:before {
				width: 12px * $base-size;
				height: 25px * $base-size;
				top: calc(50% - 12.5px * $base-size);
				left: -4px * $base-size;
				border-radius: 5px * $base-size;
				box-shadow: 92px * $base-size 0px 0px #618095;
			}
		}

		.arm {
			width: 80px * $base-size;
			height: 30px * $base-size;
			top: 121px * $base-size;

			&.arm-left {
				left: 30px * $base-size;
				border-radius: 0 0 0 39px * $base-size;

				&:before {
					border-radius: #{50px * $base-size 50px * $base-size 0px 120px * $base-size} / #{50px *
						$base-size 50px * $base-size 0 110px * $base-size};
				}
			}

			&.arm-right {
				right: 30px * $base-size;
				border-radius: 0 0 39px * $base-size 0;

				&:before {
					border-radius: #{50px * $base-size 50px * $base-size 120px * $base-size 0} / #{50px *
						$base-size 50px * $base-size 110px * $base-size 0};
				}
			}

			&.arm-left:before,
			&.arm-right:before {
				width: 30px * $base-size;
				height: 70px * $base-size;
				top: -40px * $base-size;
			}

			&.arm-left:after,
			&.arm-right:after {
				width: 30px * $base-size;
				height: 10px * $base-size;
				top: -24px * $base-size;
			}
		}

		.body {
			width: 85px * $base-size;
			height: 100px * $base-size;
			border-radius: #{40px * $base-size} / #{20px * $base-size};
			top: 105px * $base-size;
			left: calc(50% - 41px * $base-size);

			.panel {
				width: 60px * $base-size;
				height: 40px * $base-size;
				top: 20px * $base-size;
				left: calc(50% - 30px * $base-size);

				&:before {
					width: 30px * $base-size;
					height: 5px * $base-size;
					top: 9px * $base-size;
					left: 7px * $base-size;
					box-shadow:
						0px 9px * $base-size 0px #fbfdfa,
						0px 18px * $base-size 0px #fbfdfa;
				}

				&:after {
					width: 8px * $base-size;
					height: 8px * $base-size;
					top: 9px * $base-size;
					right: 7px * $base-size;
					box-shadow: 0px 14px * $base-size 0px 2px * $base-size #fbfdfa;
				}
			}
		}

		.leg {
			width: 30px * $base-size;
			height: 40px * $base-size;
			bottom: 70px * $base-size;

			&.leg-left {
				left: 76px * $base-size;

				&:before {
					left: -20px * $base-size;
					border-radius: 30px * $base-size 0 0 0;
					border-bottom-width: 10px * $base-size;
				}
			}

			&.leg-right {
				right: 73px * $base-size;
				&:before {
					right: -20px * $base-size;
					border-radius: 0 30px * $base-size 0 0;
					border-bottom-width: 10px * $base-size;
				}
			}

			&.leg-left:before,
			&.leg-right:before {
				width: 50px * $base-size;
				height: 25px * $base-size;
				bottom: -26px * $base-size;
			}
		}

		.schoolbag {
			width: 100px * $base-size;
			height: 150px * $base-size;
			top: calc(50% - 75px * $base-size);
			left: calc(50% - 50px * $base-size);
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.8;

	.astronaut {
		width: 250px * $base-size;
		height: 300px * $base-size;
		top: calc(50% - 150px * $base-size);
		left: calc(50% - 125px * $base-size);

		.head {
			width: 97px * $base-size;
			height: 80px * $base-size;
			top: 34px * $base-size;
			left: calc(50% - 47.5px * $base-size);

			&:after {
				width: 60px * $base-size;
				height: 50px * $base-size;
				top: calc(50% - 25px * $base-size);
				left: calc(50% - 30px * $base-size);
				border-radius: 15px * $base-size;
			}

			&:before {
				width: 12px * $base-size;
				height: 25px * $base-size;
				top: calc(50% - 12.5px * $base-size);
				left: -4px * $base-size;
				border-radius: 5px * $base-size;
				box-shadow: 92px * $base-size 0px 0px #618095;
			}
		}

		.arm {
			width: 80px * $base-size;
			height: 30px * $base-size;
			top: 121px * $base-size;

			&.arm-left {
				left: 30px * $base-size;
				border-radius: 0 0 0 39px * $base-size;

				&:before {
					border-radius: #{50px * $base-size 50px * $base-size 0px 120px * $base-size} / #{50px *
						$base-size 50px * $base-size 0 110px * $base-size};
				}
			}

			&.arm-right {
				right: 30px * $base-size;
				border-radius: 0 0 39px * $base-size 0;

				&:before {
					border-radius: #{50px * $base-size 50px * $base-size 120px * $base-size 0} / #{50px *
						$base-size 50px * $base-size 110px * $base-size 0};
				}
			}

			&.arm-left:before,
			&.arm-right:before {
				width: 30px * $base-size;
				height: 70px * $base-size;
				top: -40px * $base-size;
			}

			&.arm-left:after,
			&.arm-right:after {
				width: 30px * $base-size;
				height: 10px * $base-size;
				top: -24px * $base-size;
			}
		}

		.body {
			width: 85px * $base-size;
			height: 100px * $base-size;
			border-radius: #{40px * $base-size} / #{20px * $base-size};
			top: 105px * $base-size;
			left: calc(50% - 41px * $base-size);

			.panel {
				width: 60px * $base-size;
				height: 40px * $base-size;
				top: 20px * $base-size;
				left: calc(50% - 30px * $base-size);

				&:before {
					width: 30px * $base-size;
					height: 5px * $base-size;
					top: 9px * $base-size;
					left: 7px * $base-size;
					box-shadow:
						0px 9px * $base-size 0px #fbfdfa,
						0px 18px * $base-size 0px #fbfdfa;
				}

				&:after {
					width: 8px * $base-size;
					height: 8px * $base-size;
					top: 9px * $base-size;
					right: 7px * $base-size;
					box-shadow: 0px 14px * $base-size 0px 2px * $base-size #fbfdfa;
				}
			}
		}

		.leg {
			width: 30px * $base-size;
			height: 40px * $base-size;
			bottom: 70px * $base-size;

			&.leg-left {
				left: 76px * $base-size;

				&:before {
					left: -20px * $base-size;
					border-radius: 30px * $base-size 0 0 0;
					border-bottom-width: 10px * $base-size;
				}
			}

			&.leg-right {
				right: 73px * $base-size;
				&:before {
					right: -20px * $base-size;
					border-radius: 0 30px * $base-size 0 0;
					border-bottom-width: 10px * $base-size;
				}
			}

			&.leg-left:before,
			&.leg-right:before {
				width: 50px * $base-size;
				height: 25px * $base-size;
				bottom: -26px * $base-size;
			}
		}

		.schoolbag {
			width: 100px * $base-size;
			height: 150px * $base-size;
			top: calc(50% - 75px * $base-size);
			left: calc(50% - 50px * $base-size);
		}
	}
}

@keyframes astronaut {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>
