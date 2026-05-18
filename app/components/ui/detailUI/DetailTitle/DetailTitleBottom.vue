<script setup lang="ts">
import gsap from "gsap";
import { Physics2DPlugin } from "gsap/all";

gsap.registerPlugin(Physics2DPlugin);

const leftCannonRef = ref<HTMLDivElement | null>(null);
const leftBulletContainerRef = ref<HTMLDivElement | null>(null);
const leftBulletRefs = ref<HTMLDivElement[]>([]);
const leftCannonFireAnim = ref<gsap.core.Tween | null>(null);
const rightCannonRef = ref<HTMLDivElement | null>(null);
const rightBulletContainerRef = ref<HTMLDivElement | null>(null);
const rightBulletRefs = ref<HTMLDivElement[]>([]);
const rightCannonFireAnim = ref<gsap.core.Tween | null>(null);

const bulletNum: number = 40;

const createBullets = () => {
	if (leftBulletContainerRef.value && rightBulletContainerRef.value) {
		for (let i = 0; i < bulletNum; i++) {
			const leftFlairBullet = document.createElement("div");
			leftFlairBullet.setAttribute("class", "cannon_bullet");
			leftBulletContainerRef.value.appendChild(leftFlairBullet);
			leftBulletRefs.value.push(leftFlairBullet);
			const rightFlairBullet = document.createElement("div");
			rightFlairBullet.setAttribute("class", "cannon_bullet");
			rightBulletContainerRef.value.appendChild(rightFlairBullet);
			rightBulletRefs.value.push(rightFlairBullet);
		}
		leftCannonFireAnim.value = gsap.to(leftBulletRefs.value, {
			duration: 40,
			physics2D: {
				velocity: "random(600, 850)",
				angle: () => 270 + Math.random() * 30,
				gravity: 600,
			},
			stagger: { amount: 40 },
		});
		rightCannonFireAnim.value = gsap.to(rightBulletRefs.value, {
			duration: 40,
			physics2D: {
				velocity: "random(600, 850)",
				angle: () => 270 - Math.random() * 30,
				gravity: 600,
			},
			stagger: { amount: 40 },
		});
	}
};

onMounted(() => {
	createBullets();
});
</script>

<template>
	<div class="title_bottom">
		<div class="left_cannon">
			<div class="cannon" ref="leftCannonRef"></div>
			<div class="bullet_container" ref="leftBulletContainerRef"></div>
		</div>
		<div class="right_cannon">
			<div class="cannon" ref="rightCannonRef"></div>
			<div class="bullet_container" ref="rightBulletContainerRef"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "../../../../assets/styles/variables.scss";

.title_bottom {
	position: relative;
	display: flex;
	justify-content: space-between;
	width: 100%;

	.left_cannon,
	.right_cannon {
		position: relative;

		.cannon {
			position: relative;
			height: 100px;
			width: 100px;
			background-color: blue;
		}

		.bullet_container {
			position: absolute;
			top: 0;
			left: 0;
			width: 100px;
			height: 100px;

			:deep(.cannon_bullet) {
				position: absolute;
				top: 0;
				left: 0;
				height: 50px;
				width: 50px;
				background-color: yellow;
				z-index: variables.$float_zIndex;
			}
		}
	}
}
</style>
