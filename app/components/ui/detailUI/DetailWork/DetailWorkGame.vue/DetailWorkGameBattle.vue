<script setup lang="ts">
import gsap from "gsap";
import { EasePack } from "gsap/all";
import type { Point } from "~/types/common";

gsap.registerPlugin(EasePack);

const detailStore = useDetailStore();
const hurtSound = useSoundEffect("/sounds/effects/hurt.wav");
const borderRef = ref<HTMLDivElement | null>(null);
const soulRef = ref<HTMLImageElement | null>(null);
const soulPos = ref<Point>({ x: 0, y: 0 });
const bulletRefs = ref<(HTMLDivElement | null)[]>([]);
const bulletAnims = ref<(GSAPTimeline | null)[]>([]);
const invinAnim = ref<GSAPTimeline | null>(null);
const pressKeys = ref<Set<string>>(new Set());
const frameAnimId = ref<number | null>(null);

const soulScreenPos = computed<Point>(() => {
	const rect = borderRef.value?.getBoundingClientRect();
	if (!rect) return { x: 0, y: 0 };

	return {
		x: soulPos.value.x + rect.left,
		y: soulPos.value.y + rect.top,
	};
});

const easeDuration = 0.3;
const easeDistance = 1.5;
const bulletNum = 20;
const bulletDamage = 15;
const bulletSpeed = 1000;
const bulletRotateDuration = 0.3;
const bulletMinYPercent = 0.25;
const bulletMaxYPercent = 0.75;
const bulletPerDelay = 0.5;
const bulletMinDuration = 2;
const bulletMaxDuration = 5;
const damageDistanceRange = 10;
const shakeDuration = 1;
const shakeRepeat = 4;

const handleKeyPress = (e: KeyboardEvent) => {
	e.preventDefault();
	if (!pressKeys.value.has(e.key)) pressKeys.value.add(e.key);
};

const handleKeyUp = (e: KeyboardEvent) => {
	e.preventDefault();
	if (pressKeys.value.has(e.key)) pressKeys.value.delete(e.key);
};

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
		frameAnimId.value = requestAnimationFrame(frame);
	}
	bulletRefs.value.forEach((bullet, index) => {
		if (!bullet) return;

		const pos = getGSAPPoint(bullet);
		if (!invinAnim.value && calculateDistance(pos, soulScreenPos.value) < damageDistanceRange) {
			bulletRefs.value[index]?.remove();
			bulletRefs.value[index] = null;
			hurtSound.play();
			detailStore.damageWorkGameHp(bulletDamage);
			invinAnim.value = gsap
				.timeline({
					onComplete: () => {
						invinAnim.value?.kill();
						invinAnim.value = null;
					},
				})
				.to(soulRef.value, {
					opacity: 0.5,
					ease: "slow(0.1,0.1,true)",
					repeat: shakeRepeat,
					duration: shakeDuration / shakeRepeat,
				});
		}
	});
};

onMounted(() => {
	bulletAnims.value = bulletRefs.value.map((bullet, index) => {
		if (!bullet) return null;
		let soul: Point;
		const timeline = gsap
			.timeline()
			.set(bullet, {
				x: randomInt(0, window.innerWidth),
				y: window.innerHeight + bullet.offsetHeight,
			})
			.to(bullet, {
				y: randomFloat(
					bulletMinYPercent * window.innerHeight,
					bulletMaxYPercent * window.innerHeight,
				),
				delay: index * bulletPerDelay,
				duration: randomFloat(bulletMinDuration, bulletMaxDuration),
			})
			.to(bullet, {
				rotate: () => {
					soul = soulScreenPos.value;
					return calculateAngleDifference(getGSAPPoint(bullet), soulScreenPos.value, -90);
				},
				duration: bulletRotateDuration,
				onComplete: () => {
					const target = calculatePointBeyondWindow(getGSAPPoint(bullet), soul, 200);
					if (!target) return;
					timeline.add(
						gsap.to(bullet, {
							x: target.x,
							y: target.y,
							ease: "none",
							duration: calculateDistance(target, getGSAPPoint(bullet)) / bulletSpeed,
							onComplete: () => {
								bulletRefs.value[index]?.remove();
								bulletRefs.value[index] = null;
								bulletAnims.value[index]?.kill();
								bulletAnims.value[index] = null;
							},
						}),
					);
				},
			});

		return timeline;
	});
	frameAnimId.value = requestAnimationFrame(frame);
	window.addEventListener("keydown", handleKeyPress);
	window.addEventListener("keyup", handleKeyUp);
});

onUnmounted(() => {
	if (frameAnimId.value) cancelAnimationFrame(frameAnimId.value);
	window.removeEventListener("keydown", handleKeyPress);
	window.removeEventListener("keyup", handleKeyUp);
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
		top: 50vh;
		left: calc(50% - 5px - 15vh);
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
		z-index: variables.$float_zIndex;

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
		.battle_border_container {
			left: calc(50% - 5px * $base-size - 15vh);
			border-width: 5px * $base-size;

			.battle_border {
				#soul {
					width: 25px * $base-size;
				}
			}
		}

		.battle_bullet {
			top: -15px * $base-size;
			left: -15px * $base-size;
			height: 30px * $base-size;
			width: 30px * $base-size;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.95;

	.game_battle {
		.battle_border_container {
			left: calc(50% - 5px * $base-size - 15vh);
			border-width: 5px * $base-size;

			.battle_border {
				#soul {
					width: 25px * $base-size;
				}
			}
		}

		.battle_bullet {
			top: -15px * $base-size;
			left: -15px * $base-size;
			height: 30px * $base-size;
			width: 30px * $base-size;
		}
	}
}
</style>
