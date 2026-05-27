<script setup lang="ts"></script>

<template>
	<!-- From Uiverse.io by escannord -->
	<div class="work_background" ref="backgroundRef"></div>
</template>

<style scoped lang="scss">
/* From Uiverse.io by escannord */
.work_background {
	width: 100%;
	height: 100%;
	--bg:
		linear-gradient(
			45deg,
			rgb(0, 0, 0) 25%,
			transparent 25%,
			transparent 75%,
			rgb(0, 0, 0) 75%,
			rgb(0, 0, 0)
		),
		linear-gradient(45deg, rgb(0, 0, 0) 25%, white 25%, white 75%, rgb(0, 0, 0) 75%, rgb(0, 0, 0));
	--bgsize: 60px 60px;
	--bgposition: 0 0, 30px 30px;
	background-color: white;
	background-image: var(--bg);
	background-size: var(--bgsize);
	background-position: var(--bgposition);
	perspective: 1000px;
	transform-style: preserve-3d;
	overflow: hidden;
	box-shadow: inset 0px 0px 500px rgb(15, 15, 15);

	&::before {
		content: "";
		width: 100%;
		height: 150%;
		box-shadow:
			0px -100px 500px black,
			inset 0px 100px 500px rgb(15, 15, 15);
		position: absolute;
		top: 55%;
		background-image: var(--bg);
		background-size: var(--bgsize);
		background-position: var(--bgposition);
		transform-origin: top;
		transform: rotateX(80deg);
	}
}
</style>
