<script setup lang="ts"></script>

<template>
	<blockquote>
		<slot />
	</blockquote>
</template>

<style scoped lang="scss">
blockquote {
	position: relative;
	display: flex;

	&::before {
		content: "";
		position: absolute;
		display: block;
		left: -30px;
		top: 20%;
		bottom: 20%;
		width: 3px;
		background-color: #fff;
		opacity: 0.6;
	}
}
</style>
