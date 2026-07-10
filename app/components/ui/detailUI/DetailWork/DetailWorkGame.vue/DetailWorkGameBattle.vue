<script setup lang="ts">
import gsap from "gsap";
import type { Point } from "~/types/common";

const detailStore = useDetailStore();
const borderRef = ref<HTMLDivElement | null>(null);
const soulRef = ref<HTMLImageElement | null>(null);
const soulPos = ref<Point>({ x: 0, y: 0 });
const bulletRefs = ref<HTMLDivElement[]>([]);
const bulletAnims = ref<GSAPTimeline[]>([]);
const pressKeys = ref<Set<string>>(new Set());
const animationId = ref<number | null>(null);

const easeDuration: number = 0.3;
const easeDistance: number = 1.5;
const bulletNum: number = 10;
const bulletDamage: number = 15;

const handleKeyPress = (e: KeyboardEvent) => {
	e.preventDefault();
	if (!pressKeys.value.has(e.key)) pressKeys.value.add(e.key);
};

const handleKeyUp = (e: KeyboardEvent) => {
	e.preventDefault();
	if (pressKeys.value.has(e.key)) pressKeys.value.delete(e.key);
};

const hurt = () => {};

const frame = () => {
	const soul = soulRef.value?.getBoundingClientRect();
	const border = borderRef.value?.getBoundingClientRect();
	if (border && soul) {
		if (pressKeys.value.has("ArrowLeft"))
			soulPos.value.x = Math.max(0, soulPos.value.x - easeDistance);
		if (pressKeys.value.has("ArrowRight"))
			soulPos.value.x = Math.min(border.width - soul.width, soulPos.value.x + easeDistance);
		if (pressKeys.value.has("ArrowUp"))
			soulPos.value.y = Math.max(0, soulPos.value.y - easeDistance);
		if (pressKeys.value.has("ArrowDown"))
			soulPos.value.y = Math.min(border.height - soul.height, soulPos.value.y + easeDistance);
		gsap.to(soulRef.value, { ...soulPos.value, duration: easeDuration });
		animationId.value = requestAnimationFrame(frame);
	}
};

onMounted(() => {
	console.log(bulletRefs.value);
	window.addEventListener("keydown", handleKeyPress);
	window.addEventListener("keyup", handleKeyUp);
	animationId.value = requestAnimationFrame(frame);
});

onUnmounted(() => {
	window.removeEventListener("keydown", handleKeyPress);
	window.removeEventListener("keyup", handleKeyUp);
	if (animationId.value) cancelAnimationFrame(animationId.value);
});
</script>

<template>
	<div class="game_battle">
		<div class="battle_border_container">
			<div class="battle_border" ref="borderRef">
				<svg
					id="soul"
					ref="soulRef"
					data-name="soul"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
				>
					<g id="_soul" data-name="soul">
						<g>
							<rect x="10.5" y="1.5" width="4" height="8" style="fill: red" />
							<path d="M14,2v7h-3V2h3M15,1h-5v9h5V1h0Z" style="fill: red" />
						</g>
						<g>
							<rect x="1.5" y="1.5" width="4" height="8" style="fill: red" />
							<path d="M5,2v7h-3V2h3M6,1H1v9h5V1h0Z" style="fill: red" />
						</g>
						<g>
							<rect x=".5" y="2.5" width="6" height="7" style="fill: red" />
							<path d="M6,3v6H1V3h5M7,2H0v8h7V2h0Z" style="fill: red" />
						</g>
						<g>
							<rect x="9.5" y="2.5" width="6" height="7" style="fill: red" />
							<path d="M15,3v6h-5V3h5M16,2h-7v8h7V2h0Z" style="fill: red" />
						</g>
						<g>
							<rect x="6.5" y="4.5" width="3" height="11" style="fill: red" />
							<path d="M9,5v10h-2V5h2M10,4h-4v12h4V4h0Z" style="fill: red" />
						</g>
						<g>
							<rect x="4.5" y="4.5" width="7" height="9" style="fill: red" />
							<path d="M11,5v8h-6V5h6M12,4H4v10h8V4h0Z" style="fill: red" />
						</g>
						<g>
							<rect x="2.5" y="4.5" width="11" height="7" style="fill: red" />
							<path d="M13,5v6H3v-6h10M14,4H2v8h12V4h0Z" style="fill: red" />
						</g>
						<g>
							<rect x=".5" y="4.5" width="15" height="5" style="fill: red" />
							<path d="M15,5v4H1v-4h14M16,4H0v6h16v-6h0Z" style="fill: red" />
						</g>
						<g>
							<rect x=".5" y="2.5" width="6" height="1" style="fill: red" />
							<polygon points="7 2 0 2 0 4 7 4 7 2 7 2" style="fill: red" />
						</g>
						<g>
							<rect x="1" y="1" width="5" height="1" style="fill: red" />
							<polygon points="6 1 1 1 1 2 6 2 6 1 6 1" style="fill: red" />
						</g>
						<g>
							<rect x="2" width="2" height="1" style="fill: red" />
							<polygon points="4 0 2 0 2 1 4 1 4 0 4 0" style="fill: red" />
						</g>
						<g>
							<rect x="9.5" y="2.5" width="6" height="1" style="fill: red" />
							<polygon points="16 2 9 2 9 4 16 4 16 2 16 2" style="fill: red" />
						</g>
						<g>
							<rect x="10" y="1" width="5" height="1" style="fill: red" />
							<polygon points="15 1 10 1 10 2 15 2 15 1 15 1" style="fill: red" />
						</g>
						<g>
							<rect x="12" width="2" height="1" style="fill: red" />
							<polygon points="14 0 12 0 12 1 14 1 14 0 14 0" style="fill: red" />
						</g>
					</g>
				</svg>
			</div>
		</div>
		<div class="battle_bullet" v-for="_ in bulletNum" ref="bulletRefs">
			<svg id="bullet" data-name="bullet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 17">
				<g id="_bullet" data-name="_bullet">
					<g>
						<rect x="2.5" y=".5" width="3" height="16" />
						<path d="M5,1v15h-2V1h2M6,0H2v17h4V0h0Z" />
					</g>
					<g>
						<rect x="1.5" y="1.5" width="5" height="15" />
						<path d="M6,2v14H2V2h4M7,1H1v16h6V1h0Z" />
					</g>
					<g>
						<rect x=".5" y="3.5" width="7" height="12" />
						<path d="M7,4v11H1V4h6M8,3H0v13h8V3h0Z" />
					</g>
					<g>
						<rect x="2.5" y="1.5" width="3" height="14" style="fill: #4c4c4c" />
						<path d="M5,2v13h-2V2h2M6,1H2v15h4V1h0Z" style="fill: #4c4c4c" />
					</g>
					<g>
						<rect x="1.5" y="3.5" width="5" height="12" style="fill: #4c4c4c" />
						<path d="M6,4v11H2V4h4M7,3H1v13h6V3h0Z" style="fill: #4c4c4c" />
					</g>
					<g>
						<rect x="3.5" y="2.5" width="1" height="12" style="fill: #fff" />
						<path d="M4,3v11V3M5,2h-2v13h2V2h0Z" style="fill: #fff" />
					</g>
					<g>
						<rect x="2.5" y="3.5" width="3" height="11" style="fill: #fff" />
						<path d="M5,4v10h-2V4h2M6,3H2v12h4V3h0Z" style="fill: #fff" />
					</g>
				</g>
			</svg>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.game_battle {
	position: absolute;
	height: 100%;
	width: 100%;

	.battle_border_container {
		position: absolute;
		left: calc(50% - 5px - 15vh);
		margin-top: 30vh;
		background-color: rgba($color: #000000, $alpha: 0.5);
		border-color: #ffffff;
		border-style: solid;
		border-width: 5px;
		z-index: variables.$float_zIndex;

		.battle_border {
			position: relative;
			width: 30vh;
			height: 30vh;

			#soul {
				position: absolute;
				width: 25px;
				user-select: none;
				pointer-events: none;
			}
		}
	}

	.battle_bullet {
		position: absolute;
		height: 30px;
		width: 30px;

		#bullet {
			height: 100%;
			width: 100%;
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.9;

	.game_battle {
		margin-top: 30vh;
		border-width: 5px * $base-size;

		.battle_border {
			width: 30vh * $base-size;
			height: 30vh * $base-size;

			#soul {
				width: 25px * $base-size;
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.95;

	.game_battle {
		margin-top: 30vh;
		border-width: 5px * $base-size;

		.battle_border {
			width: 30vh * $base-size;
			height: 30vh * $base-size;

			#soul {
				width: 25px * $base-size;
			}
		}
	}
}
</style>
