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
	border: 1px solid #ffffff;
	border-radius: 4px;
	transition:
		color 0.25s,
		background-color 0.5s;
}
</style>
