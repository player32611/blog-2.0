<script setup lang="ts">
import Lottie from "lottie-web";
import type { AnimationItem } from "lottie-web";

import SleepZ from "~/components/exhibit/SleepZ.vue";
import rolePath from "@/assets/anims/role.json";

const roleContainerRef = ref<HTMLDivElement | null>(null);
const roleAnim = ref<AnimationItem | null>(null);

onMounted(() => {
	if (roleContainerRef.value) {
		roleAnim.value = Lottie.loadAnimation({
			container: roleContainerRef.value,
			renderer: "svg",
			loop: true,
			autoplay: true,
			animationData: rolePath,
		});
	}
});

onUnmounted(() => {
	roleAnim.value?.destroy();
});
</script>

<template>
	<div class="introduce_role">
		<div class="role_container" ref="roleContainerRef"></div>
		<div class="content_container"><SleepZ /></div>
	</div>
</template>

<style scoped lang="scss">
.introduce_role {
	position: absolute;
	right: 15%;
	top: 5%;
	width: 25%;

	.role_container {
		width: 100%;
		image-rendering: crisp-edges;
	}

	.content_container {
		position: absolute;
		top: 15%;
		left: 55%;
		font-size: 30px;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	.introduce_role {
		right: calc(50% - 50% / 2);
		top: 5%;
		width: 50%;

		.content_container {
			top: 15%;
			left: 55%;
			font-size: 25px;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	.introduce_role {
		right: calc(50% - 50% / 2);
		top: 3%;
		width: 50%;

		.content_container {
			top: 15%;
			left: 55%;
			font-size: 27px;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	.introduce_role {
		right: 5%;
		top: 5%;
		width: 40%;

		.content_container {
			top: 15%;
			left: 55%;
			font-size: 25px;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	.introduce_role {
		right: 10%;
		top: 5%;
		width: 35%;

		.content_container {
			top: 15%;
			left: 55%;
			font-size: 27px;
		}
	}
}
</style>
