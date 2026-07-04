<script setup lang="ts"></script>

<template>
	<!-- From Uiverse.io by wojtek_4284 -->
	<div id="textflip_loading">
		<div id="l1">L</div>
		<div id="l2">O</div>
		<div id="l3">A</div>
		<div id="l4">D</div>
		<div id="l5">I</div>
		<div id="l6">N</div>
		<div id="l7">G</div>
	</div>
</template>

<style scoped lang="scss">
/* From Uiverse.io by wojtek_4284 */

#textflip_loading {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	div {
		display: inline-block;
		margin: 5px;
		color: #000000;
		font-size: 1em;
		animation: 2s obrot linear infinite;

		&:nth-child(1) {
			animation-delay: 0s;
		}
		&:nth-child(2) {
			animation-delay: 0.1s;
		}
		&:nth-child(3) {
			animation-delay: 0.2s;
		}
		&:nth-child(4) {
			animation-delay: 0.3s;
		}
		&:nth-child(5) {
			animation-delay: 0.4s;
		}
		&:nth-child(6) {
			animation-delay: 0.5s;
		}
		&:nth-child(7) {
			animation-delay: 0.6s;
		}
	}
}

@keyframes obrot {
	0% {
		transform: rotateX(0);
	}
	12.5% {
		transform: rotateX(90deg);
	}
	25% {
		transform: rotateX(180deg);
	}
	37.5% {
		transform: rotateX(270deg);
	}
	50% {
		transform: rotateX(360deg);
	}
	100% {
		transform: rotateX(360deg);
	}
}
</style>
