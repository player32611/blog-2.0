<script setup lang="ts"></script>

<template>
	<div class="game_role"></div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.game_role {
	position: absolute;
	top: 20px;
	width: 200px;
	height: 400px;
	background-color: purple;
	z-index: variables.$float_zIndex;
}
</style>
