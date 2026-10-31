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
	flex-direction: column;
	justify-content: end;
	align-items: center;
	height: 100%;
	width: 100%;
	z-index: variables.$float_zIndex;
	overflow: hidden;
}
</style>
