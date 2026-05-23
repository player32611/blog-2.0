<script setup lang="ts">
import gsap from "gsap";
</script>

<template>
	<div class="introduce_circle">
		<svg :width="100" :height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
			<circle cx="50" cy="50" r="50" fill="white" stroke="black" stroke-width="1" />
			<path d="M 50,0 A 50,50 0 0 1 50,100 A 25,25 0 0 0 50,50 A 25,25 0 0 1 50,0 Z" fill="black" />
			<circle cx="50" cy="25" r="8" fill="white" />
			<circle cx="50" cy="75" r="8" fill="black" />
		</svg>
	</div>
</template>

<style scoped lang="scss">
.introduce_circle {
	position: absolute;
	left: 10%;
	bottom: 50%;
}
</style>
