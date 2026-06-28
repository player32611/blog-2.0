<script setup lang="ts"></script>

<template>
	<!-- From Uiverse.io by necatimertmetin -->
	<div class="walking">
		<div class="lamp lamp-left">
			<div class="head">
				<div class="head-top"></div>
				<div class="light-source"></div>
				<div class="head-body">
					<div class="head-body-rod"></div>
					<div class="head-body-glass"></div>
					<div class="head-body-rod"></div>
					<div class="head-body-glass"></div>
					<div class="head-body-rod"></div>
					<div class="head-bottom"></div>
				</div>
			</div>
			<div class="rod"></div>
			<div class="bottom">
				<div class="bottom-top"></div>
				<div class="bottom-body"></div>
				<div class="bottom-bottom"></div>
			</div>
			<div class="lamp-shadow"></div>
		</div>
		<div class="lamp lamp-right">
			<div class="head">
				<div class="head-top"></div>
				<div class="light-source"></div>
				<div class="head-body">
					<div class="head-body-rod"></div>
					<div class="head-body-glass"></div>
					<div class="head-body-rod"></div>
					<div class="head-body-glass"></div>
					<div class="head-body-rod"></div>
					<div class="head-bottom"></div>
				</div>
			</div>
			<div class="rod"></div>
			<div class="bottom">
				<div class="bottom-top"></div>
				<div class="bottom-body"></div>
				<div class="bottom-bottom"></div>
			</div>
			<div class="lamp-shadow"></div>
		</div>
		<div class="masonry-perspective">
			<div class="masonry-container">
				<div class="masonry">
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
				</div>
				<div class="masonry">
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
				</div>
				<div class="masonry">
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
				</div>
				<div class="masonry">
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
				</div>
				<div class="masonry">
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
				</div>
				<div class="masonry">
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
				</div>
				<div class="masonry">
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
				</div>
				<div class="masonry">
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
				</div>
				<div class="masonry">
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
				</div>
				<div class="masonry">
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
					<div class="masonry-item"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
/* From Uiverse.io by necatimertmetin */
.walking {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color: #0b1026;

	.lamp {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 400px;
		opacity: 0;
		z-index: 300;

		.head {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;

			.head-top {
				height: 15px;
				width: 10px;
				background-color: #000;
				border-top-left-radius: 100%;
				border-top-right-radius: 100%;
			}

			.light-source {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				box-shadow: 0px 0px 200px 50px #dfd89c;
				z-index: 3;
			}

			.head-body {
				height: 80px;
				width: 70px;
				clip-path: polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%);
				border-top-left-radius: 20%;
				border-top-right-radius: 20%;
				border-top: 15px solid black;
				border-bottom: 15px solid black;
				overflow: hidden;
				display: flex;
				background-color: #dfd89c;
				flex-direction: row;
				align-items: stretch;

				.head-body-rod {
					width: 8px;
					background-color: black;

					&:nth-child(1) {
						transform: skewX(7deg);
						width: 15px;
					}

					&:nth-child(5) {
						transform: skewX(-7deg);
						width: 15px;
					}
				}

				.head-body-glass {
					flex: 1;
				}
			}
		}

		.rod {
			flex: 1;
			background-color: black;
			width: 16px;
		}

		.bottom {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 80px;
			border-top-left-radius: 30%;
			border-top-right-radius: 30%;
			border-bottom-left-radius: 20%;
			border-bottom-right-radius: 20%;
			box-shadow: inset 0px 2px 3px #5d5f3f;
			background: linear-gradient(0deg, #000 50%, #373829);

			.bottom-top {
				margin-top: 20px;
				width: 50px;
				height: 10px;
				box-shadow: inset 0px 2px 3px #5d5f3f;
				background: linear-gradient(0deg, #000 70%, #5d5f3f);
				border-radius: 30%;
			}

			.bottom-body {
				flex: 1;
			}

			.bottom-bottom {
				width: 50px;
				height: 30px;
				background: linear-gradient(0deg, #000 50%, #373829);
				border-top-left-radius: 100%;
				border-top-right-radius: 100%;
			}
		}

		.lamp-shadow {
			position: absolute;
			bottom: -10px;
			left: 50%;
			transform: translateX(-50%);
			width: 150px;
			height: 16px;
			border-top-left-radius: 100%;
			border-top-right-radius: 100%;
			border-bottom-left-radius: 90%;
			border-bottom-right-radius: 90%;
			background: radial-gradient(circle, #000 0%, transparent 100%);
		}
	}

	.lamp-left {
		animation: lamp-pass-left 2s ease-in 1s infinite;
	}

	.lamp-right {
		animation: lamp-pass-right 2s ease-in 2s infinite;
	}

	.masonry-perspective {
		perspective: 150px;
		width: 90px;
		height: 150px;
		position: absolute;
		bottom: 0;
		left: 50%;
		margin-bottom: -60px;
		transform: translateX(-50%);

		.masonry-container {
			transform: rotateX(50deg) !important;
			transform-style: preserve-3d;
			width: 100%;

			.masonry {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(15px, 1fr));
				gap: 1px;
				width: 100%;
				height: 10px;
				position: absolute;
				padding-bottom: 15px;
				opacity: 0;
				background-color: #222;

				&:nth-child(1) {
					animation: walk 2s linear infinite;
				}

				&:nth-child(2) {
					animation: walk 2s linear 0.2s infinite;
				}

				&:nth-child(3) {
					animation: walk 2s linear 0.4s infinite;
				}

				&:nth-child(4) {
					animation: walk 2s linear 0.6s infinite;
				}

				&:nth-child(5) {
					animation: walk 2s linear 0.8s infinite;
				}

				&:nth-child(6) {
					animation: walk 2s linear 1s infinite;
				}

				&:nth-child(7) {
					animation: walk 2s linear 1.2s infinite;
				}

				&:nth-child(8) {
					animation: walk 2s linear 1.4s infinite;
				}

				&:nth-child(9) {
					animation: walk 2s linear 1.6s infinite;
				}

				&:nth-child(10) {
					animation: walk 2s linear 1.8s infinite;
				}

				/* Farklı boyutlarda öğeler eklemek için */
				&:nth-child(even) {
					.masonry-item {
						&:nth-child(odd) {
							height: 20px;
						}
					}
				}

				&:nth-child(odd) {
					.masonry-item {
						&:nth-child(even) {
							height: 24px;
						}

						&:nth-child(odd) {
							height: 24px;
						}

						&:nth-child(even) {
							height: 20px;
						}
					}
				}

				.masonry-item {
					background-color: #fff;
					border-radius: 3px;
					padding: 1px;
					box-shadow:
						inset 1px 1px 3px #5d5f3f,
						inset -1px -1px 6px #222;
					font-size: 24px;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #444;
				}
			}
		}
	}
}

@keyframes walk {
	0% {
		opacity: 0;
		transform: translateY(-900%);
	}
	20% {
		opacity: 0;
	}
	50% {
		opacity: 1;
		transform: translateY(0%);
	}
	80% {
		opacity: 1;
	}
	90% {
		opacity: 1;
	}
	100% {
		opacity: 0;
		transform: translateY(900%);
	}
}

@keyframes lamp-pass-right {
	0% {
		opacity: 0;
		transform: translateX(-10%) translateY(-50%) scale(0.2);
	}
	20% {
		opacity: 1;
	}
	100% {
		opacity: 1;
		transform: translateX(250%) translateY(-40%) scale(1.2);
	}
}

@keyframes lamp-pass-left {
	0% {
		opacity: 0;
		transform: translateX(-90%) translateY(-50%) scale(0.2);
	}
	20% {
		opacity: 1;
	}
	100% {
		opacity: 1;
		transform: translateX(-350%) translateY(-40%) scale(1.2);
	}
}
</style>
