<script setup lang="ts">
import DetailWorkGameBattle from "./DetailWorkGameBattle.vue";
import DetailWorkGameUI from "./DetailWorkGameUI.vue";
import DetailWorkGameRole from "./DetailWorkGameRole.vue";
import DetailWorkGameShader from "./DetailWorkGameShader.vue";
</script>

<template>
	<div class="work_game">
		<DetailWorkGameShader />
		<DetailWorkGameRole />
		<DetailWorkGameBattle />
		<DetailWorkGameUI />
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.work_game {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
	z-index: variables.$float_zIndex;
}
</style>
