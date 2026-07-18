<script setup lang="ts">
import gsap from "gsap";
import { EasePack, ScrollSmoother } from "gsap/all";
import type { Point } from "~/types/common";

import DetailWorkGameTip from "./DetailWorkGameTip.vue";

gsap.registerPlugin(EasePack);

const detailStore = useDetailStore();
const hurtSound = useSoundEffect("/sounds/effects/hurt.wav");
const borderRef = ref<HTMLDivElement | null>(null);
const soulRef = ref<SVGElement | null>(null);
const soulPos = ref<Point>({ x: 0, y: 0 });
const isMoved = ref<boolean>(false);
const currentTouchPoint = ref<Point | null>(null);
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

let toX: gsap.QuickToFunc;
let toY: gsap.QuickToFunc;
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

const handleTouchStart = (e: TouchEvent) => {
	if (currentTouchPoint.value || !e.touches[0]) return;
	e.preventDefault();
	const smoother = ScrollSmoother.get();
	smoother?.paused(true);
	currentTouchPoint.value = { x: e.touches[0].clientX, y: e.touches[0].clientY };
};

const handleTouchMove = (e: TouchEvent) => {
	if (!currentTouchPoint.value || !e.touches[0]) return;
	e.preventDefault();
	isMoved.value = true;
	const dx = e.touches[0].clientX - currentTouchPoint.value.x;
	const dy = e.touches[0].clientY - currentTouchPoint.value.y;
	soulPos.value = standard({ x: soulPos.value.x + dx, y: soulPos.value.y + dy });
	toX(soulPos.value.x);
	toY(soulPos.value.y);
	currentTouchPoint.value = { x: e.touches[0].clientX, y: e.touches[0].clientY };
};

const handleTouchEnd = (e: TouchEvent) => {
	if (!currentTouchPoint.value) return;
	e.preventDefault();
	const smoother = ScrollSmoother.get();
	smoother?.paused(false);
	currentTouchPoint.value = null;
};

const standard = (point: Point) => {
	if (!soulRef.value || !borderRef.value) return point;
	const soul = soulRef.value.getBoundingClientRect();
	const border = borderRef.value.getBoundingClientRect();
	return {
		x: Math.min(Math.max(0, point.x), border.width - soul.width),
		y: Math.min(Math.max(0, point.y), border.height - soul.height),
	};
};

const frame = () => {
	const soul = soulRef.value?.getBoundingClientRect();
	const border = borderRef.value?.getBoundingClientRect();
	if (border && soul && !currentTouchPoint.value) {
		if (pressKeys.value.has("ArrowLeft")) {
			soulPos.value.x -= easeDistance;
			isMoved.value = true;
		}
		if (pressKeys.value.has("ArrowRight")) {
			soulPos.value.x += easeDistance;
			isMoved.value = true;
		}
		if (pressKeys.value.has("ArrowUp")) {
			soulPos.value.y -= easeDistance;
			isMoved.value = true;
		}
		if (pressKeys.value.has("ArrowDown")) {
			soulPos.value.y += easeDistance;
			isMoved.value = true;
		}
		soulPos.value = standard(soulPos.value);
		toX(soulPos.value.x);
		toY(soulPos.value.y);
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
	frameAnimId.value = requestAnimationFrame(frame);
};

onMounted(() => {
	toX = gsap.quickTo(soulRef.value, "x", { duration: easeDuration });
	toY = gsap.quickTo(soulRef.value, "y", { duration: easeDuration });
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
					const soulRect = soulRef.value?.getBoundingClientRect();
					soul = {
						x: soulScreenPos.value.x + (soulRect?.width || 0) / 2,
						y: soulScreenPos.value.y + (soulRect?.height || 0) / 2,
					};
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
					@touchstart="handleTouchStart"
					@touchmove="handleTouchMove"
					@touchend="handleTouchEnd"
					@touchcancel="handleTouchEnd"
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
				<DetailWorkGameTip :is-moved="isMoved" />
			</div>
		</div>
		<div class="battle_bullet" v-for="_ in bulletNum" ref="bulletRefs"></div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.game_battle {
	position: absolute;
	height: 100%;
	width: 100%;
	pointer-events: none;

	.battle_border_container {
		position: absolute;
		top: 50dvh;
		left: calc(50% - 5px - 15dvh);
		background-color: rgba($color: #000000, $alpha: 0.5);
		border-color: #ffffff;
		border-style: solid;
		border-width: 5px;
		z-index: variables.$float_zIndex;

		.battle_border {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 30dvh;
			height: 30dvh;

			#soul {
				position: absolute;
				left: 0;
				top: 0;
				width: 25px;
				user-select: none;
				pointer-events: all;
			}
		}
	}

	.battle_bullet {
		position: absolute;
		height: 30px;
		width: 30px;
		background: url("/blog-2.0/images/sprites/bullet.svg") center/contain no-repeat;
		z-index: variables.$float_zIndex;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.9;

	.game_battle {
		.battle_border_container {
			left: calc(50% - 5px * $base-size - 15dvh);
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
			left: calc(50% - 5px * $base-size - 15dvh);
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
