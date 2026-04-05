<script setup lang="ts"></script>

<template>
	<code>
		<slot></slot>
	</code>
</template>

<style scoped lang="scss">
code {
	padding: 3px 6px;
	color: #ffffff;
	border-radius: 4px;
	background-color: rgba(142, 150, 170, 0.14);
	transition:
		color 0.25s,
		background-color 0.5s;
}
</style>
