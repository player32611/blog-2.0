<script setup lang="ts">
import gsap from "gsap";
import type { DetailBottomMoreInstance } from "~/types/components.js";

import Button from "../../common/Button.vue";

const loadingStore = useLoadingStore();
const buttonRef = ref<HTMLDivElement | null>(null);
const anim = ref<gsap.core.Timeline | null>(null);

const animDuration: number = 1;

const triggerAnim = () => {
	anim.value = gsap.timeline().fromTo(
		buttonRef.value,
		{ rotate: -45 },
		{
			y: 0,
			rotate: 0,
			ease: "bounce.out",
			duration: animDuration,
		},
	);
};

onMounted(() => {
	gsap.set(buttonRef.value, { y: -350 });
});

onUnmounted(() => {
	anim.value?.kill();
});

defineExpose<DetailBottomMoreInstance>({
	triggerAnim,
});
</script>

<template>
	<div class="bottom_more" ref="containerRef">
		<div class="button_container">
			<div class="button_wrapper" ref="buttonRef">
				<Button
					text="more"
					size="large"
					icon="&#xeaf1;"
					@click="loadingStore.loadingNavigate('/')"
				></Button>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.bottom_more {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: end;
	height: 6rem;
	pointer-events: none;

	.button_container {
		display: flex;
		justify-content: center;
		align-items: end;
		height: 20rem;
		width: 20rem;
		overflow: hidden;

		.button_wrapper {
			pointer-events: all;
		}
	}
}
</style>
