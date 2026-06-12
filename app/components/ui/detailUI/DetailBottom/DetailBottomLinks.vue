<script setup lang="ts">
import gsap from "gsap";

const containerRef = ref<HTMLDivElement | null>(null);
const rotateAnim = ref<gsap.core.Tween | null>(null);

const rotateDuration: number = 4;

const handleClick = (a: string) => {
	window.open(a, "_blank", "noopener,noreferrer");
};

onMounted(() => {
	rotateAnim.value = gsap.to(containerRef.value, {
		rotate: 360,
		ease: "none",
		repeat: -1,
		duration: rotateDuration,
	});
});

onUnmounted(() => {
	rotateAnim.value?.kill();
});
</script>

<template>
	<div class="bottom_links">
		<!-- From Uiverse.io by deamelo -->
		<div class="links_container" ref="containerRef">
			<div class="up">
				<button
					class="card1"
					@click="handleClick('https://space.bilibili.com/495270127?spm_id_from=333.1007.0.0')"
				>
					<span class="icon bilibili">&#xe6d3;</span>
				</button>
				<button class="card2" @click="handleClick('https://gamejolt.com/@player32611')">
					<span class="icon gamejolt">&#xe600;</span>
				</button>
			</div>
			<div class="down">
				<button class="card3" @click="handleClick('https://github.com/player32611')">
					<span class="icon github">&#xe885;</span>
				</button>
				<button class="card4">
					<span class="icon discord">&#xe885;</span>
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.bottom_links {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100px;
	width: 100%;

	/* From Uiverse.io by deamelo */
	.links_container {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		position: relative;
		bottom: -50%;
		border-radius: 50%;

		.up {
			display: flex;
			flex-direction: row;
			gap: 0.5em;

			.card1 {
				display: flex;
				justify-content: end;
				align-items: center;
				width: 90px;
				height: 90px;
				outline: none;
				border: none;
				background: #ffffff;
				border-radius: 90px 5px 5px 5px;
				box-shadow:
					rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
					rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
				transition:
					0.2s scale ease-in-out,
					0.2s background-color ease-in-out;

				&:hover {
					background-color: pink;
					scale: 1.1;
					cursor: pointer;

					.bilibili {
						color: #ffffff;
					}
				}

				.bilibili {
					color: pink;
					rotate: -45deg;
				}
			}

			.card2 {
				display: flex;
				justify-content: end;
				align-items: center;
				width: 90px;
				height: 90px;
				outline: none;
				border: none;
				background: #ffffff;
				border-radius: 5px 90px 5px 5px;
				box-shadow:
					rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
					rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
				transition:
					0.2s scale ease-in-out,
					0.2s background-color ease-in-out;

				&:hover {
					background-color: yellow;
					scale: 1.1;
					cursor: pointer;

					.gamejolt {
						color: #000000;
					}
				}

				.gamejolt {
					color: #000000;
					rotate: 45deg;
				}
			}
		}

		.down {
			display: flex;
			flex-direction: row;
			gap: 0.5em;

			.card3 {
				display: flex;
				justify-content: end;
				align-items: center;
				width: 90px;
				height: 90px;
				outline: none;
				border: none;
				background: #ffffff;
				border-radius: 5px 5px 5px 90px;
				box-shadow:
					rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
					rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
				transition:
					0.2s scale ease-in-out,
					0.2s background-color ease-in-out;

				&:hover {
					cursor: pointer;
					scale: 1.1;
					background-color: #000000;

					.github {
						color: #ffffff;
					}
				}

				.github {
					rotate: -135deg;
				}
			}

			.card4 {
				width: 90px;
				height: 90px;
				outline: none;
				border: none;
				background: #ffffff;
				border-radius: 5px 5px 90px 5px;
				box-shadow:
					rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
					rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
				transition: 0.2s ease-in-out;

				&:hover {
					cursor: pointer;
					scale: 1.1;
					background-color: #8c9eff;

					.discord {
						fill: white;
					}
				}

				.discord {
					margin-top: -0.9em;
					margin-left: -1.2em;
					fill: #8c9eff;
				}
			}
		}

		.icon {
			height: auto;
			width: 5rem;
			font-size: 1.3rem;
			transition: 0.2s color ease-in-out;
		}
	}
}
</style>
