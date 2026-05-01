<script setup lang="ts"></script>

<template>
	<div class="image" draggable="false"></div>
</template>

<style scoped lang="scss">
.image {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;
	margin: 50px;
	height: 300px;
	width: 200px;
	font-size: 1px;
	background-color: green;
	border-radius: 5em;
	pointer-events: none;
	user-select: none;
}

@media screen and (max-aspect-ratio: 1.5/1) {
	.image {
		font-size: 2px;
	}
}

@media screen and (min-aspect-ratio: 0.8/1) {
	.image {
		font-size: 2.8px;
	}
}
</style>
