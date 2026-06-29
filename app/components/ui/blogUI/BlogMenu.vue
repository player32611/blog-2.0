<script setup lang="ts">
import gsap from "gsap";
import type { BlogCollections } from "~/types/config";

import BlogMenuBackGround from "./BlogMenuBackGround.vue";
import MenuSelecter from "./MenuSelecter.vue";
import Astronaut from "~/components/exhibit/Astronaut.vue";

const menuRef = ref<HTMLDivElement | null>(null);
const menuState = ref<"in" | "out">("in");
const time = ref<number>(0.75);

const menuIn = () => {
	gsap.timeline().to(menuRef.value, {
		top: "0",
		duration: time.value,
		ease: "power1.inOut",
	});
};

const menuOut = () => {
	gsap.to(menuRef.value, {
		top: "-100%",
		duration: time.value,
		ease: "power1.inOut",
	});
};

const changeMenu = () => {
	switch (menuState.value) {
		case "in":
			menuIn();
			break;
		case "out":
			menuOut();
			break;
	}
	menuState.value = menuState.value === "in" ? "out" : "in";
};

defineExpose({
	changeMenu,
});
</script>

<template>
	<div class="blog_menu" ref="menuRef">
		<BlogMenuBackGround />
		<div class="menu_container">
			<div class="menu_card">
				<Astronaut />
			</div>
			<div class="menu_selecter_box">
				<MenuSelecter
					v-for="collection in BLOG_COLLECTIONS"
					:key="collection"
					:collections="collection"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
$base-size: 1;

.blog_menu {
	position: fixed;
	top: -100%;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100dvh;
	width: 100%;
	background-color: #ffffff;

	.menu_container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem * $base-size;
		height: 70%;
		width: 70%;
		border-width: 0.3rem * $base-size;
		border-style: solid;
		border-color: rgba($color: #ffffff, $alpha: 0.7);
		overflow: hidden;

		.menu_card {
			position: relative;
			height: 100%;
			width: 50%;
			overflow-y: hidden;
		}

		.menu_selecter_box {
			max-height: 100%;
			width: 40%;
			overflow-y: auto;

			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.5;

	.blog_menu {
		.menu_container {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			padding: 2rem * $base-size;

			.menu_card {
				position: relative;
				max-height: 50%;
				width: 100%;
			}

			.menu_selecter_box {
				max-height: 50%;
				width: 100%;
				overflow-y: auto;
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.8;

	.blog_menu {
		.menu_container {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			padding: 2rem * $base-size;

			.menu_card {
				position: relative;
				max-height: 50%;
				width: 100%;
			}

			.menu_selecter_box {
				max-height: 50%;
				width: 100%;
				overflow-y: auto;
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 1;

	.blog_menu {
		.menu_container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 2rem * $base-size;

			.menu_card {
				position: relative;
				max-height: 100%;
				width: 50%;
			}

			.menu_selecter_box {
				max-height: 100%;
				width: 50%;
				overflow-y: auto;
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 1;

	.blog_menu {
		.menu_container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 2rem * $base-size;

			.menu_card {
				position: relative;
				max-height: 100%;
				width: 50%;
			}

			.menu_selecter_box {
				max-height: 100%;
				width: 50%;
				overflow-y: auto;
			}
		}
	}
}
</style>
