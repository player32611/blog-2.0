<script setup lang="ts">
import gsap from "gsap";

const mainStore = useMainStore();
const linkRefs = ref<HTMLDivElement[]>([]);
const moveAnim = ref<GSAPTween | null>(null);

const easeTime = 1;

const handleClick = () => {};

watch([() => mainStore.backgroundTransform.x, () => mainStore.backgroundTransform.y], newState => {
	if (moveAnim.value) moveAnim.value.kill();
	moveAnim.value = gsap.to(linkRefs.value, {
		transform: `translate(${newState[0]}px , ${newState[1]}px)`,
		duration: easeTime,
		ease: "power4.out",
	});
});
</script>

<template>
	<div class="main_link">
		<div
			class="paper"
			v-for="link in MAIN_LINKS"
			ref="linkRefs"
			:style="{
				left: `${link.pos.x}px`,
				top: `${link.pos.y}px`,
				height: `${link.size.height}px`,
				width: `${link.size.width}px`,
				...link.style,
			}"
			@click="handleClick"
		></div>
	</div>
</template>

<style scoped lang="scss">
.main_link {
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	pointer-events: none;
	overflow: hidden;

	.paper {
		position: absolute;
		background-color: rgba($color: #ffff8e, $alpha: 0.3);
		box-shadow: 0px 0px 20px 5px rgba($color: #ffff00, $alpha: 0.3);
		user-select: none;
		pointer-events: all;
	}
}
</style>
