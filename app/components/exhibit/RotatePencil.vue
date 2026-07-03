<script setup lang="ts"></script>

<template>
	<!-- From Uiverse.io by JaydipPrajapati1910 -->
	<div class="rotate_pencil">
		<div class="pencil">
			<p>pencil</p>
			<div class="top"></div>
		</div>
		<div class="stroke"></div>
	</div>
</template>

<style scoped lang="scss">
/* From Uiverse.io by JaydipPrajapati1910 */
.rotate_pencil {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	animation: animate 8s linear infinite;

	.pencil {
		width: 150px;
		background: #ffc334;
		border-top: 10px solid #ffd268;
		border-bottom: 10px solid #e3af38;
		overflow: hidden;
		transform-origin: top;

		&::before {
			content: "";
			position: absolute;
			left: -80px;
			top: 0;
			border-style: solid;
			border-color: transparent #e29663 transparent transparent;
			border-width: 17px 40px 18px;
		}

		&::after {
			content: "";
			position: absolute;
			left: -80px;
			top: 0;
			border-style: solid;
			border-color: transparent #262626 transparent transparent;
			border-width: 17px 40px 18px;
			transform: scale(0.3);
		}

		p {
			margin: 0;
			padding: 0;
			text-align: center;
			font-size: 12px;
			line-height: 15px;
			text-transform: uppercase;
			font-weight: bold;
			color: #d09200;
		}

		.top {
			position: absolute;
			top: 0;
			right: 0;
			height: 15px;
			width: 35px;
			background: #ccc;
			border-top: 10px solid #dedede;
			border-bottom: 10px solid #b9bfbf;

			&::before {
				content: "";
				position: absolute;
				top: -10px;
				right: -100%;
				width: 150%;
				height: 100%;
				background: #d76f6e;
				border-top: 10px solid #da8e8d;
				border-bottom: 10px solid #c85957;
				border-top-right-radius: 5px;
				border-bottom-right-radius: 5px;
				z-index: 2;
			}
		}
	}

	.stroke {
		position: absolute;
		top: 50%;
		left: calc(100% - 80px);
		transform: translate(-50%, -50%) rotate(45deg);
		border: 5px solid transparent;
		border-left-color: #000;
		border-top-color: #000;
		width: 220px;
		height: 220px;
		border-radius: 50%;
		z-index: 1;
	}
}

@keyframes animate {
	0% {
		transform: translate(-50%, -50%) rotate(360deg);
	}

	100% {
		transform: translate(-50%, -50%) rotate(0deg);
	}
}
</style>
