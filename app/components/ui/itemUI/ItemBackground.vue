<script setup lang="ts">
import gsap from "gsap";

const itemStore = useItemStore();
const stars = ref<{ left: string; j: number }[]>([]);
const starRefs = ref<HTMLDivElement[]>([]);
const starAnims = ref<GSAPAnimation[]>([]);

const moonStarNum = 40;
const moonStarMaxDely = 10;
const moonStarMaxDur = 20;
const moonStarMinDur = 5;

const createStars = async () => {
	stars.value = Array.from({ length: moonStarNum }, () => ({
		left: `${Math.random() * (window.innerWidth * 1.25)}px`,
		j: Math.random() * 2 + 1,
	}));

	await nextTick();

	starAnims.value = Array.from(starRefs.value, ref =>
		gsap.fromTo(
			ref,
			{
				x: 0,
				y: -10,
				scale: 0.3,
			},
			{
				x: -window.innerWidth / 4,
				y: window.innerHeight,
				scale: 1.2,
				ease: "none",
				delay: Math.random() * moonStarMaxDely,
				duration: Math.random() * (moonStarMaxDur - moonStarMinDur) + moonStarMinDur,
				repeat: -1,
			},
		),
	);
};

const resize = () => {
	if (itemStore.backgroundTheme === "dark") {
		starAnims.value.forEach(anim => anim.kill());
		createStars();
	}
};

watch(
	() => itemStore.backgroundTheme,
	newState => {
		if (newState === "light") {
			starAnims.value.forEach(anim => anim.kill());
		} else {
			createStars();
		}
	},
);

onMounted(() => {
	if (itemStore.backgroundTheme === "dark") createStars();
	window.addEventListener("resize", resize);
});

onUnmounted(() => {
	starAnims.value.forEach(anim => anim.kill());
	window.removeEventListener("resize", resize);
});
</script>

<template>
	<div class="item_background">
		<div class="background_sun" v-if="itemStore.backgroundTheme === 'light'">
			<!-- From Uiverse.io by Ratinax -->
			<div class="sun">
				<div class="center"></div>
				<div class="ray r-1"></div>
				<div class="ray r-2"></div>
				<div class="ray r-3"></div>
				<div class="ray r-4"></div>
				<div class="ray r-5"></div>
				<div class="ray r-6"></div>
				<div class="ray r-7"></div>
				<div class="ray r-8"></div>
			</div>
		</div>
		<!-- From Uiverse.io by R5Program -->
		<div class="background_moon" v-if="itemStore.backgroundTheme === 'dark'">
			<div
				v-for="(star, i) in stars"
				class="star"
				:key="i"
				:style="{
					left: star.left,
					'--j': star.j,
				}"
				ref="starRefs"
			></div>

			<div class="moon">
				<div class="crater cr1"></div>
				<div class="crater cr2"></div>
				<div class="crater cr3"></div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.item_background {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	pointer-events: none;

	.background_sun {
		position: relative;
		height: 100%;
		width: 100%;
		background: linear-gradient(180deg, #cd6e8a 0%, #f5eab0 69%, #d6c8a2 70%, #a2758d 100%);

		/* From Uiverse.io by Ratinax */
		.sun {
			position: absolute;
			top: 9px;
			right: 55px;
			width: max-content;
			animation: rotate 4s linear infinite;
			--color: #ffff00;
			--scale: 0.5;

			.center {
				height: calc(var(--scale) * 10em);
				width: calc(var(--scale) * 10em);
				background-color: var(--color);
				border-radius: 50%;
				box-shadow: 0 0 calc(var(--scale) * 3em) var(--color);
			}

			.ray {
				position: absolute;
				height: calc(var(--scale) * 3em);
				width: calc(var(--scale) * 0.5em);
				box-shadow: 0 0 calc(var(--scale) * 1em) var(--color);
				background-color: var(--color);

				&.r-1 {
					margin-left: calc(var(--scale) * 4.75em);
					margin-top: calc(var(--scale) * 1em);
				}

				&.r-2 {
					margin-left: calc(var(--scale) * 12.25em);
					margin-top: calc(var(--scale) * -6.25em);
					transform: rotate(90deg);
				}

				&.r-3 {
					margin-left: calc(var(--scale) * 4.75em);
					margin-top: calc(var(--scale) * -14em);
				}

				&.r-4 {
					margin-left: calc(var(--scale) * -2.75em);
					margin-top: calc(var(--scale) * -6.25em);
					transform: rotate(90deg);
				}

				&.r-5 {
					margin-left: calc(var(--scale) * -0.5em);
					margin-top: calc(var(--scale) * -1em);
					transform: rotate(45deg);
				}

				&.r-6 {
					margin-left: calc(var(--scale) * 9.75em);
					margin-top: calc(var(--scale) * -1em);
					transform: rotate(-45deg);
				}

				&.r-7 {
					margin-left: calc(var(--scale) * 10.25em);
					margin-top: calc(var(--scale) * -11.75em);
					transform: rotate(45deg);
				}

				&.r-8 {
					margin-left: calc(var(--scale) * -0.5em);
					margin-top: calc(var(--scale) * -11.75em);
					transform: rotate(-45deg);
				}
			}
		}
	}

	/* From Uiverse.io by R5Program */
	.background_moon {
		position: relative;
		height: 100%;
		width: 100%;
		background: linear-gradient(45deg, #000000, #0a0a2e);

		/* Enhanced stars (Falling Stars) */
		.star {
			position: absolute;
			height: calc(3px * var(--j));
			width: calc(1px * var(--j));
			background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(173, 216, 230, 1) 100%);
			box-shadow:
				0 0 20px rgba(255, 255, 255, 0.8),
				0 0 30px rgba(173, 216, 230, 0.6);
			animation: animated linear infinite reverse;
			rotate: 25deg;
			opacity: 0.8;
			filter: blur(calc(0.5px * var(--j)));
		}

		/* Enhanced Moon with Craters */
		.moon {
			height: 80px;
			width: 80px;
			background: linear-gradient(145deg, #f0f0f0, #ffffff);
			border-radius: 50%;
			position: absolute;
			right: 55px;
			top: 9px;
			box-shadow:
				0 0 40px rgba(235, 235, 235, 0.5),
				inset -5px -5px 15px rgba(0, 0, 0, 0.2);
			transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

			/* Moon Craters */
			.crater {
				position: absolute;
				background: rgba(200, 200, 200, 0.3);
				border-radius: 50%;
				box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1);

				&.cr1 {
					width: 15px;
					height: 15px;
					top: 20px;
					left: 15px;
				}

				&.cr2 {
					width: 20px;
					height: 20px;
					top: 45px;
					left: 40px;
				}

				&.cr3 {
					width: 12px;
					height: 12px;
					top: 55px;
					left: 20px;
				}
			}
		}
	}
}

@keyframes rotate {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	.item_background {
		.background_sun {
			background: linear-gradient(180deg, #cd6e8a 0%, #f5eab0 89%, #d6c8a2 90%, #a2758d 100%);
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	.item_background {
		.background_sun {
			background: linear-gradient(180deg, #cd6e8a 0%, #f5eab0 84%, #d6c8a2 85%, #a2758d 100%);
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	.item_background {
		.background_sun {
			background: linear-gradient(180deg, #cd6e8a 0%, #f5eab0 79%, #d6c8a2 80%, #a2758d 100%);
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	.item_background {
		.background_sun {
			background: linear-gradient(180deg, #cd6e8a 0%, #f5eab0 74%, #d6c8a2 75%, #a2758d 100%);
		}
	}
}
</style>
