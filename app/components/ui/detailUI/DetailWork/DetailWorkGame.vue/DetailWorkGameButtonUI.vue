<script setup lang="ts">
import Button from "~/components/ui/common/Button.vue";

const style: Record<string, string | number> = { cursor: "none" };
const iconStyle: Record<string, string | number> = { fontSize: "1.5rem" };

const handleClick = () => {
	window.open("https://gamejolt.com/@player32611", "_blank", "noopener,noreferrer");
};
</script>

<template>
	<div class="game_buttonUI">
		<Button
			class-list="hoverable"
			text="fight"
			icon="&#xe601;"
			size="large"
			@click="handleClick"
			:style
			:iconStyle
		/>
		<Button
			class-list="hoverable"
			text="act"
			icon="&#xe63d;"
			size="large"
			@click="handleClick"
			:style
			:iconStyle
		/>
		<Button
			class-list="hoverable"
			text="item"
			icon="&#xe602;"
			size="large"
			@click="handleClick"
			:style
			:iconStyle
		/>
		<Button
			class-list="hoverable"
			text="mercy"
			icon="&#xe62f;"
			size="large"
			@click="handleClick"
			:style
			:iconStyle
		/>
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
