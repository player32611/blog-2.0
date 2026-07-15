<script setup lang="ts">
import gsap from "gsap";

const mainStore = useMainStore();
const linkRefs = ref<HTMLDivElement[]>([]);
const moveAnim = ref<GSAPTween | null>(null);

const easeTime = 1;

const handleClick = () => {
	console.log("click");
};

watch(
	[
		() => mainStore.backgroundTransform.x,
		() => mainStore.backgroundTransform.y,
		() => mainStore.isResized,
	],
	newState => {
		if (moveAnim.value) moveAnim.value.kill();
		moveAnim.value = gsap.to(linkRefs.value, {
			transform: `translate(${newState[0]}px , ${newState[1]}px)`,
			duration: newState[2] ? 0 : easeTime,
			ease: "power4.out",
		});
		mainStore.setIsResized(false);
	},
);
</script>

<template>
	<div
		class="main_link"
		:style="{
			width: `${mainStore.backgroundSize.width}px`,
			height: `${mainStore.backgroundSize.height}px`,
		}"
	>
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
	left: 50%;
	top: 50%;
	height: 100%;
	width: 100%;
	transform: translate(-50%, -50%);
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
