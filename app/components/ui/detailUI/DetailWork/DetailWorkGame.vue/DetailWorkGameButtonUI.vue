<script setup lang="ts">
import Button from "~/components/ui/common/Button.vue";

const style: Record<string, string | number> = { cursor: "none" };

const handleClick = () => {
	window.open("https://gamejolt.com/@player32611", "_blank", "noopener,noreferrer");
};
</script>

<template>
	<div class="game_buttonUI">
		<Button class-list="hoverable" text="fight" icon="" size="large" @click="handleClick" :style />
		<Button class-list="hoverable" text="act" icon="" size="large" @click="handleClick" :style />
		<Button class-list="hoverable" text="item" icon="" size="large" @click="handleClick" :style />
		<Button class-list="hoverable" text="mercy" icon="" size="large" @click="handleClick" :style />
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.game_buttonUI {
	position: absolute;
	bottom: 20px;
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	z-index: variables.$float_zIndex;
}
</style>
