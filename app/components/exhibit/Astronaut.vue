<script setup lang="ts"></script>

<template>
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
.astronaut {
	width: 250px;
	height: 300px;
	position: absolute;
	z-index: 11;
	top: calc(50% - 150px);
	left: calc(50% - 125px);
	animation: astronaut 5s linear infinite;

	.head {
		width: 97px;
		height: 80px;
		position: absolute;
		z-index: 3;
		background: -webkit-linear-gradient(left, #e3e8eb 0%, #e3e8eb 50%, #fbfdfa 50%, #fbfdfa 100%);
		border-radius: 50%;
		top: 34px;
		left: calc(50% - 47.5px);

		&:after {
			content: "";
			width: 60px;
			height: 50px;
			position: absolute;
			top: calc(50% - 25px);
			left: calc(50% - 30px);
			background: -webkit-linear-gradient(top, #15aece 0%, #15aece 50%, #0391bf 50%, #0391bf 100%);
			border-radius: 15px;
		}

		&:before {
			content: "";
			width: 12px;
			height: 25px;
			position: absolute;
			top: calc(50% - 12.5px);
			left: -4px;
			background-color: #618095;
			border-radius: 5px;
			box-shadow: 92px 0px 0px #618095;
		}
	}

	.arm {
		width: 80px;
		height: 30px;
		position: absolute;
		top: 121px;
		z-index: 2;

		&.arm-left {
			left: 30px;
			background-color: #e3e8eb;
			border-radius: 0 0 0 39px;

			&:before {
				border-radius: 50px 50px 0px 120px / 50px 50px 0 110px;
				left: 0;
				background-color: #e3e8eb;
			}

			&:after {
				background-color: #6e91a4;
				left: 0;
			}
		}

		&.arm-right {
			right: 30px;
			background-color: #fbfdfa;
			border-radius: 0 0 39px 0;

			&:before {
				border-radius: 50px 50px 120px 0 / 50px 50px 110px 0;
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
			width: 30px;
			height: 70px;
			position: absolute;
			top: -40px;
		}

		&.arm-left:after,
		&.arm-right:after {
			content: "";
			width: 30px;
			height: 10px;
			position: absolute;
			top: -24px;
		}
	}

	.body {
		width: 85px;
		height: 100px;
		position: absolute;
		z-index: 2;
		background-color: #fffbff;
		border-radius: 40px / 20px;
		top: 105px;
		left: calc(50% - 41px);
		background: -webkit-linear-gradient(left, #e3e8eb 0%, #e3e8eb 50%, #fbfdfa 50%, #fbfdfa 100%);

		.panel {
			width: 60px;
			height: 40px;
			position: absolute;
			top: 20px;
			left: calc(50% - 30px);
			background-color: #b7cceb;

			&:before {
				content: "";
				width: 30px;
				height: 5px;
				position: absolute;
				top: 9px;
				left: 7px;
				background-color: #fbfdfa;
				box-shadow:
					0px 9px 0px #fbfdfa,
					0px 18px 0px #fbfdfa;
			}

			&:after {
				content: "";
				width: 8px;
				height: 8px;
				position: absolute;
				top: 9px;
				right: 7px;
				background-color: #fbfdfa;
				border-radius: 50%;
				box-shadow: 0px 14px 0px 2px #fbfdfa;
			}
		}
	}

	.leg {
		width: 30px;
		height: 40px;
		position: absolute;
		z-index: 2;
		bottom: 70px;

		&.leg-left {
			left: 76px;
			background-color: #e3e8eb;
			transform: rotate(20deg);

			&:before {
				left: -20px;
				background-color: #e3e8eb;
				border-radius: 30px 0 0 0;
				border-bottom: 10px solid #6d96ac;
			}
		}

		&.leg-right {
			right: 73px;
			background-color: #fbfdfa;
			transform: rotate(-20deg);

			&:before {
				right: -20px;
				background-color: #fbfdfa;
				border-radius: 0 30px 0 0;
				border-bottom: 10px solid #b0cfe4;
			}
		}

		&.leg-left:before,
		&.leg-right:before {
			content: "";
			width: 50px;
			height: 25px;
			position: absolute;
			bottom: -26px;
		}
	}

	.schoolbag {
		width: 100px;
		height: 150px;
		position: absolute;
		z-index: 1;
		top: calc(50% - 75px);
		left: calc(50% - 50px);
		background-color: #94b7ca;
		border-radius: 50px 50px 0 0 / 30px 30px 0 0;
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
