<script setup lang="ts"></script>

<template>
	<code>
		<slot></slot>
	</code>
</template>

<style scoped lang="scss">
code {
	padding: 0px 0.5rem;
	color: var(--theme-color, #ffffff);
	border: 1px solid var(--theme-color, #ffffff);
	border-radius: 4px;
	font-family: "方正基础像素体";
	transition:
		color 0.25s,
		background-color 0.5s;
}
</style>
