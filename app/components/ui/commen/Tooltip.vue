<script setup lang="ts">
import type { TooltipParams, TooltipInstance } from "~/types/components";

const { style, text, visable, onClick } = defineProps<TooltipParams>();
const tooltipRef = ref<HTMLDivElement>();
const width = computed(() => {
	if (tooltipRef.value) return tooltipRef.value?.offsetWidth;
	return 0;
});
const height = computed(() => {
	if (tooltipRef.value) return tooltipRef.value?.offsetHeight;
	return 0;
});

defineExpose<TooltipInstance>({
	width,
	height,
});
</script>

<template>
	<div
		class="cyber-tooltip"
		:style="{ ...style, opacity: visable ? 1 : 0, pointerEvents: visable ? 'auto' : 'none' }"
		ref="tooltipRef"
		@click="onClick"
	>
		<div class="corner-tl"></div>
		<div class="corner-tr"></div>
		<div class="corner-bl"></div>
		<div class="corner-br"></div>
		<strong>{{ text }}</strong>
		<slot></slot>
	</div>
</template>

<style scoped lang="scss">
$base-size: 1;

.cyber-tooltip {
	position: fixed;
	top: 0;
	left: 0;
	padding: 10px * $base-size;
	background: rgba(15, 15, 35, 0.95);
	border-width: 1px * $base-size;
	border-style: solid;
	border-color: rgba(0, 231, 255, 0.5);
	color: #00e7ff;
	font-size: 1rem * $base-size;
	line-height: 1.5;
	box-shadow: 0 0 30px * $base-size rgba(0, 231, 255, 0.2);
	text-shadow: 0 0 8px * $base-size rgba(0, 231, 255, 0.5);
	z-index: 10;
	clip-path: polygon(0% 20%, 10% 0%, 90% 0%, 100% 20%, 100% 80%, 90% 100%, 10% 100%, 0% 80%);
	background-image:
		linear-gradient(rgba(0, 231, 255, 0.1) 1px * $base-size, transparent 1px * $base-size),
		linear-gradient(90deg, rgba(0, 231, 255, 0.1) 1px * $base-size, transparent 1px * $base-size);
	background-size: 20px * $base-size 20px * $base-size;
	user-select: none;
	transition: opacity 0.5s;
	cursor: pointer;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 2px * $base-size;
		background: linear-gradient(90deg, transparent, #00e7ff, transparent);
		box-shadow: 0 0 10px * $base-size #00e7ff;
		transition:
			transform 0.4s,
			opacity 0.4s;
		animation: scan 2s infinite;
	}

	.corner-tl {
		position: absolute;
		top: 5px * $base-size;
		left: 5px * $base-size;
		width: 10px * $base-size;
		height: 10px * $base-size;
		border-width: 1px * $base-size;
		border-style: solid;
		border-color: #00e7ff;
		box-shadow: 0 0 5px * $base-size #00e7ff;
		border-right: none;
		border-bottom: none;
	}

	.corner-tr {
		position: absolute;
		top: 5px * $base-size;
		right: 5px * $base-size;
		width: 10px * $base-size;
		height: 10px * $base-size;
		border-width: 1px * $base-size;
		border-style: solid;
		border-color: #00e7ff;
		box-shadow: 0 0 5px * $base-size #00e7ff;
		border-left: none;
		border-bottom: none;
	}

	.corner-bl {
		position: absolute;
		bottom: 5px * $base-size;
		left: 5px * $base-size;
		width: 10px * $base-size;
		height: 10px * $base-size;
		border-width: 1px * $base-size;
		border-style: solid;
		border-color: #00e7ff;
		box-shadow: 0 0 5px * $base-size #00e7ff;
		border-right: none;
		border-top: none;
	}

	.corner-br {
		position: absolute;
		bottom: 5px * $base-size;
		right: 5px * $base-size;
		width: 10px * $base-size;
		height: 10px * $base-size;
		border-width: 1px * $base-size;
		border-style: solid;
		border-color: #00e7ff;
		box-shadow: 0 0 5px * $base-size #00e7ff;
		border-left: none;
		border-top: none;
	}
}

@keyframes scan {
	0% {
		transform: translateY(-100%);
		opacity: 0;
	}
	20%,
	80% {
		opacity: 0.7;
	}
	100% {
		transform: translateY(100%);
		opacity: 0;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.6;

	.cyber-tooltip {
		padding: 10px * $base-size;
		border-width: 1px * $base-size;
		font-size: 1rem * $base-size;
		box-shadow: 0 0 30px * $base-size rgba(0, 231, 255, 0.2);
		text-shadow: 0 0 8px * $base-size rgba(0, 231, 255, 0.5);
		background-image:
			linear-gradient(rgba(0, 231, 255, 0.1) 1px * $base-size, transparent 1px * $base-size),
			linear-gradient(90deg, rgba(0, 231, 255, 0.1) 1px * $base-size, transparent 1px * $base-size);
		background-size: 20px * $base-size 20px * $base-size;

		&::before {
			height: 2px * $base-size;
			box-shadow: 0 0 10px * $base-size #00e7ff;
		}

		.corner-tl {
			top: 5px * $base-size;
			left: 5px * $base-size;
			width: 10px * $base-size;
			height: 10px * $base-size;
			border-width: 1px * $base-size;
			box-shadow: 0 0 5px * $base-size #00e7ff;
		}

		.corner-tr {
			top: 5px * $base-size;
			right: 5px * $base-size;
			width: 10px * $base-size;
			height: 10px * $base-size;
			border-width: 1px * $base-size;
			box-shadow: 0 0 5px * $base-size #00e7ff;
		}

		.corner-bl {
			bottom: 5px * $base-size;
			left: 5px * $base-size;
			width: 10px * $base-size;
			height: 10px * $base-size;
			border-width: 1px * $base-size;
			box-shadow: 0 0 5px * $base-size #00e7ff;
		}

		.corner-br {
			bottom: 5px * $base-size;
			right: 5px * $base-size;
			width: 10px * $base-size;
			height: 10px * $base-size;
			border-width: 1px * $base-size;
			box-shadow: 0 0 5px * $base-size #00e7ff;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.7;

	.cyber-tooltip {
		padding: 10px * $base-size;
		border-width: 1px * $base-size;
		font-size: 1rem * $base-size;
		box-shadow: 0 0 30px * $base-size rgba(0, 231, 255, 0.2);
		text-shadow: 0 0 8px * $base-size rgba(0, 231, 255, 0.5);
		background-image:
			linear-gradient(rgba(0, 231, 255, 0.1) 1px * $base-size, transparent 1px * $base-size),
			linear-gradient(90deg, rgba(0, 231, 255, 0.1) 1px * $base-size, transparent 1px * $base-size);
		background-size: 20px * $base-size 20px * $base-size;

		&::before {
			height: 2px * $base-size;
			box-shadow: 0 0 10px * $base-size #00e7ff;
		}

		.corner-tl {
			top: 5px * $base-size;
			left: 5px * $base-size;
			width: 10px * $base-size;
			height: 10px * $base-size;
			border-width: 1px * $base-size;
			box-shadow: 0 0 5px * $base-size #00e7ff;
		}

		.corner-tr {
			top: 5px * $base-size;
			right: 5px * $base-size;
			width: 10px * $base-size;
			height: 10px * $base-size;
			border-width: 1px * $base-size;
			box-shadow: 0 0 5px * $base-size #00e7ff;
		}

		.corner-bl {
			bottom: 5px * $base-size;
			left: 5px * $base-size;
			width: 10px * $base-size;
			height: 10px * $base-size;
			border-width: 1px * $base-size;
			box-shadow: 0 0 5px * $base-size #00e7ff;
		}

		.corner-br {
			bottom: 5px * $base-size;
			right: 5px * $base-size;
			width: 10px * $base-size;
			height: 10px * $base-size;
			border-width: 1px * $base-size;
			box-shadow: 0 0 5px * $base-size #00e7ff;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.85;

	.cyber-tooltip {
		padding: 10px * $base-size;
		border-width: 1px * $base-size;
		font-size: 1rem * $base-size;
		box-shadow: 0 0 30px * $base-size rgba(0, 231, 255, 0.2);
		text-shadow: 0 0 8px * $base-size rgba(0, 231, 255, 0.5);
		background-image:
			linear-gradient(rgba(0, 231, 255, 0.1) 1px * $base-size, transparent 1px * $base-size),
			linear-gradient(90deg, rgba(0, 231, 255, 0.1) 1px * $base-size, transparent 1px * $base-size);
		background-size: 20px * $base-size 20px * $base-size;

		&::before {
			height: 2px * $base-size;
			box-shadow: 0 0 10px * $base-size #00e7ff;
		}

		.corner-tl {
			top: 5px * $base-size;
			left: 5px * $base-size;
			width: 10px * $base-size;
			height: 10px * $base-size;
			border-width: 1px * $base-size;
			box-shadow: 0 0 5px * $base-size #00e7ff;
		}

		.corner-tr {
			top: 5px * $base-size;
			right: 5px * $base-size;
			width: 10px * $base-size;
			height: 10px * $base-size;
			border-width: 1px * $base-size;
			box-shadow: 0 0 5px * $base-size #00e7ff;
		}

		.corner-bl {
			bottom: 5px * $base-size;
			left: 5px * $base-size;
			width: 10px * $base-size;
			height: 10px * $base-size;
			border-width: 1px * $base-size;
			box-shadow: 0 0 5px * $base-size #00e7ff;
		}

		.corner-br {
			bottom: 5px * $base-size;
			right: 5px * $base-size;
			width: 10px * $base-size;
			height: 10px * $base-size;
			border-width: 1px * $base-size;
			box-shadow: 0 0 5px * $base-size #00e7ff;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.cyber-tooltip {
		padding: 10px * $base-size;
		border-width: 1px * $base-size;
		font-size: 1rem * $base-size;
		box-shadow: 0 0 30px * $base-size rgba(0, 231, 255, 0.2);
		text-shadow: 0 0 8px * $base-size rgba(0, 231, 255, 0.5);
		background-image:
			linear-gradient(rgba(0, 231, 255, 0.1) 1px * $base-size, transparent 1px * $base-size),
			linear-gradient(90deg, rgba(0, 231, 255, 0.1) 1px * $base-size, transparent 1px * $base-size);
		background-size: 20px * $base-size 20px * $base-size;

		&::before {
			height: 2px * $base-size;
			box-shadow: 0 0 10px * $base-size #00e7ff;
		}

		.corner-tl {
			top: 5px * $base-size;
			left: 5px * $base-size;
			width: 10px * $base-size;
			height: 10px * $base-size;
			border-width: 1px * $base-size;
			box-shadow: 0 0 5px * $base-size #00e7ff;
		}

		.corner-tr {
			top: 5px * $base-size;
			right: 5px * $base-size;
			width: 10px * $base-size;
			height: 10px * $base-size;
			border-width: 1px * $base-size;
			box-shadow: 0 0 5px * $base-size #00e7ff;
		}

		.corner-bl {
			bottom: 5px * $base-size;
			left: 5px * $base-size;
			width: 10px * $base-size;
			height: 10px * $base-size;
			border-width: 1px * $base-size;
			box-shadow: 0 0 5px * $base-size #00e7ff;
		}

		.corner-br {
			bottom: 5px * $base-size;
			right: 5px * $base-size;
			width: 10px * $base-size;
			height: 10px * $base-size;
			border-width: 1px * $base-size;
			box-shadow: 0 0 5px * $base-size #00e7ff;
		}
	}
}
</style>
