<script setup lang="ts">
import DetailWorkGameShader from "./DetailWorkGameShader.vue";
import Button from "~/components/ui/common/Button.vue";
</script>

<template>
	<div class="work_game">
		<DetailWorkGameShader />
		<div class="game_buttons">
			<Button text="fight" icon="" size="medium" @click="" />
		</div>
		<!-- <div class="text">item1</div> -->
	</div>
</template>

<style scoped lang="scss">
.work_game {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
	background-color: blue;

	.text {
		font-size: 5rem;
	}
}
</style>
