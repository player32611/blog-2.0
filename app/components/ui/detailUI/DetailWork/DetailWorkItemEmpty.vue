<script setup lang="ts"></script>

<template>
	<div class="work_empty">
		<div class="empty_content_english">waiting</div>
		<div class="empty_content_chinese">敬请期待</div>
	</div>
</template>

<style scoped lang="scss">
// From Uiverse.io by ariba_9087
.work_empty {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%; /* Fill the entire screen */
	overflow: hidden;
	background: radial-gradient(circle, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.1));

	.empty_content_english {
		color: #ffffff;
		font-family: "Coustard Black";
		font-size: 5rem;
		text-shadow: 0px 0px 10px rgba($color: #ff7f27, $alpha: 0.8);
		animation: animate_4010 8s ease-in-out infinite;
	}

	.empty_content_chinese {
		color: #00000000;
		font-family: "方正基础像素体";
		font-size: 4rem;
		-webkit-text-stroke: calc(0.2rem) #ffffff;
		text-shadow: 0px 0px 10px rgba($color: #ff7f27, $alpha: 0.8);
		animation: animate_4010 8s ease-in-out infinite;
	}
}

@keyframes animate_4010 {
	0%,
	100% {
		transform: translateY(-20px);
	}

	50% {
		transform: translateY(20px);
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.5;

	.work_empty {
		.empty_content_english {
			font-size: 5rem * $base-size;
			text-shadow: 0px 0px 10px * $base-size rgba($color: #ff7f27, $alpha: 0.8);
		}

		.empty_content_chinese {
			font-size: 4rem * $base-size;
			-webkit-text-stroke: calc(0.2rem * $base-size) #ffffff;
			text-shadow: 0px 0px 10px * $base-size rgba($color: #ff7f27, $alpha: 0.8);
		}
	}

	@keyframes animate_4010 {
		0%,
		100% {
			transform: translateY(-20px * $base-size);
		}

		50% {
			transform: translateY(20px * $base-size);
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.65;

	.work_empty {
		.empty_content_english {
			font-size: 5rem * $base-size;
			text-shadow: 0px 0px 10px * $base-size rgba($color: #ff7f27, $alpha: 0.8);
		}

		.empty_content_chinese {
			font-size: 4rem * $base-size;
			-webkit-text-stroke: calc(0.2rem * $base-size) #ffffff;
			text-shadow: 0px 0px 10px * $base-size rgba($color: #ff7f27, $alpha: 0.8);
		}
	}

	@keyframes animate_4010 {
		0%,
		100% {
			transform: translateY(-20px * $base-size);
		}

		50% {
			transform: translateY(20px * $base-size);
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.8;

	.work_empty {
		.empty_content_english {
			font-size: 5rem * $base-size;
			text-shadow: 0px 0px 10px * $base-size rgba($color: #ff7f27, $alpha: 0.8);
		}

		.empty_content_chinese {
			font-size: 4rem * $base-size;
			-webkit-text-stroke: calc(0.2rem * $base-size) #ffffff;
			text-shadow: 0px 0px 10px * $base-size rgba($color: #ff7f27, $alpha: 0.8);
		}
	}

	@keyframes animate_4010 {
		0%,
		100% {
			transform: translateY(-20px * $base-size);
		}

		50% {
			transform: translateY(20px * $base-size);
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.work_empty {
		.empty_content_english {
			font-size: 5rem * $base-size;
			text-shadow: 0px 0px 10px * $base-size rgba($color: #ff7f27, $alpha: 0.8);
		}

		.empty_content_chinese {
			font-size: 4rem * $base-size;
			-webkit-text-stroke: calc(0.2rem * $base-size) #ffffff;
			text-shadow: 0px 0px 10px * $base-size rgba($color: #ff7f27, $alpha: 0.8);
		}
	}

	@keyframes animate_4010 {
		0%,
		100% {
			transform: translateY(-20px * $base-size);
		}

		50% {
			transform: translateY(20px * $base-size);
		}
	}
}
</style>
