<script setup lang="ts">
import gsap from "gsap";
import { Physics2DPlugin } from "gsap/all";

import DetailTitleSavePoint from "./DetailTitleSavePoint.vue";

gsap.registerPlugin(Physics2DPlugin);

const leftBulletContainerRef = ref<HTMLDivElement | null>(null);
const leftBulletRefs = ref<HTMLDivElement[]>([]);
const rightBulletContainerRef = ref<HTMLDivElement | null>(null);
const rightBulletRefs = ref<HTMLDivElement[]>([]);
const observer = ref<IntersectionObserver | null>(null);

const allBulletRefs = computed(() => {
	return [...leftBulletRefs.value, ...rightBulletRefs.value];
});

const bulletNum: number = 40;
const cannonRunDuration: number = 5;
const cannonFireDuration: number = 1;

const createBullets = (delayTime: number, direction: "left" | "right") => {
	if (!leftBulletContainerRef.value || !rightBulletContainerRef.value) return;
	const currentBullets: HTMLDivElement[] = [];
	if (direction === "left") {
		for (let i = 0; i < bulletNum; i++) {
			const leftFlairBullet = document.createElement("div");
			leftFlairBullet.setAttribute(
				"class",
				`cannon_bullet color${Math.floor(Math.random() * 9) + 1}`,
			);
			leftBulletContainerRef.value.appendChild(leftFlairBullet);
			currentBullets.push(leftFlairBullet);
		}
		gsap.to(currentBullets, {
			duration: 40,
			delay: delayTime,
			physics2D: {
				velocity: "random(600, 850)",
				angle: () => 315 - 15 + Math.random() * 30,
				gravity: 600,
				friction: 0.01,
			},
		});
		leftBulletRefs.value.push(...currentBullets);
	} else if (direction === "right") {
		for (let i = 0; i < bulletNum; i++) {
			const rightFlairBullet = document.createElement("div");
			rightFlairBullet.setAttribute(
				"class",
				`cannon_bullet color${Math.floor(Math.random() * 9) + 1}`,
			);
			rightBulletContainerRef.value.appendChild(rightFlairBullet);
			currentBullets.push(rightFlairBullet);
		}
		gsap.to(currentBullets, {
			duration: 40,
			delay: delayTime,
			physics2D: {
				velocity: "random(600, 850)",
				angle: () => 225 - 15 + Math.random() * 30,
				gravity: 600,
				friction: 0.01,
			},
		});
		rightBulletRefs.value.push(...currentBullets);
	}

	cleanupObserver();
	setupBulletObserver();
};

const cannonMoveAnim = () => {
	gsap.fromTo(
		".left_cannon",
		{ x: -200 },
		{
			x: 0,
			ease: "power1.out",
			duration: cannonRunDuration,
		},
	);
	gsap.to(".left_wheel", {
		rotation: 360,
		duration: cannonRunDuration,
		ease: "power1.out",
	});
	gsap.fromTo(
		".left_carrel",
		{ rotate: -45 },
		{
			rotate: 0,
			transformOrigin: "25% 75%",
			ease: "power1.out",
			duration: cannonRunDuration,
			onComplete: () => {
				createBullets(cannonFireDuration - 0.05, "left");
				createBullets(cannonFireDuration - 0.05, "right");
			},
		},
	);

	gsap.fromTo(
		".right_cannon",
		{ x: 200 },
		{
			x: 0,
			ease: "power1.out",
			duration: cannonRunDuration,
		},
	);
	gsap.to(".right_wheel", {
		rotation: -360,
		duration: cannonRunDuration,
		ease: "power1.out",
	});
	gsap.fromTo(
		".right_carrel",
		{ rotate: -45 },
		{
			rotate: -90,
			transformOrigin: "25% 75%",
			ease: "power1.out",
			duration: cannonRunDuration,
		},
	);
};

const cannonFireAnim = (delayTime: number, direction: "left" | "right") => {
	if (direction === "left")
		gsap
			.timeline()
			.set(".left_carrel", { delay: delayTime })
			.to(".left_carrel", {
				transform: "matrix(0.9, 0.1, 0.1, 0.9, 0, 0)",
				ease: "power1.out",
				duration: cannonFireDuration,
			})
			.to(".left_carrel", {
				transform: "matrix(1, 0, 0, 1, 0, 0)",
				ease: "elastic.out",
				duration: cannonFireDuration,
			});
	else if (direction === "right")
		gsap
			.timeline()
			.set(".right_carrel", { delay: delayTime })
			.to(".right_carrel", {
				transform: "matrix(0.1, -0.9, 0.9, -0.1, 0, 0)",
				ease: "power1.out",
				duration: cannonFireDuration,
			})
			.to(".right_carrel", {
				transform: "matrix(0, -1, 1, 0, 0, 0)",
				ease: "elastic.out",
				duration: cannonFireDuration,
			});
};

const handleClick = (direction: "left" | "right") => {
	if (direction === "left" && gsap.isTweening(".left_carrel")) return;
	if (direction === "right" && gsap.isTweening(".right_carrel")) return;
	cannonFireAnim(0, direction);
	createBullets(cannonFireDuration - 0.05, direction);
};

// 设置 IntersectionObserver 来监听子弹元素
const setupBulletObserver = () => {
	// 创建 IntersectionObserver
	observer.value = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				// 当元素完全不在视口内时（intersectionRatio 为 0）
				if (entry.intersectionRatio === 0) {
					// 从 DOM 中移除元素
					entry.target.remove();

					// 从引用数组中移除
					const leftIndex = leftBulletRefs.value.indexOf(entry.target as HTMLDivElement);
					const rightIndex = rightBulletRefs.value.indexOf(entry.target as HTMLDivElement);
					if (leftIndex > -1) {
						leftBulletRefs.value.splice(leftIndex, 1);
					} else if (rightIndex > -1) {
						rightBulletRefs.value.splice(rightIndex, 1);
					}

					// 停止观察这个元素
					observer.value?.unobserve(entry.target);
				}
			});
		},
		{
			// 设置阈值为 0，表示只要元素完全离开视口就触发回调
			threshold: 0,
		},
	);

	// 开始观察所有子弹元素
	allBulletRefs.value.forEach(bullet => {
		observer.value?.observe(bullet);
	});
};

// 清理观察器
const cleanupObserver = () => {
	if (observer.value) {
		observer.value.disconnect();
		observer.value = null;
	}
};

onMounted(() => {
	cannonMoveAnim();
	cannonFireAnim(cannonRunDuration, "left");
	cannonFireAnim(cannonRunDuration, "right");
});

onUnmounted(() => {
	cleanupObserver();
});
</script>

<template>
	<div class="title_bottom">
		<div class="left_cannon">
			<div class="cannon" ref="leftCannonRef">
				<svg
					id="carrel"
					class="left_carrel"
					data-name="carrel"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 67.81573 66.41753"
				>
					<g>
						<rect
							x="20.47421"
							y="11.34326"
							width="42.4842"
							height="29.0001"
							transform="translate(-6.33979 35.78003) rotate(-43.46087)"
							style="fill: #7f7970"
						/>
						<path
							d="M47.14197,1.4137l19.26007,20.32362-30.11133,28.53564-19.2601-20.32361L47.14197,1.4137M47.17993,0L15.61691,29.91139l20.63583,21.77527,31.56299-29.91138L47.17993,0h0Z"
						/>
					</g>
					<line
						x1="27.26862"
						y1="20.25263"
						x2="46.82447"
						y2="40.31114"
						style="fill: #7f7970; stroke: #523235; stroke-miterlimit: 10"
					/>
					<line
						x1="29.08777"
						y1="18.47072"
						x2="48.64362"
						y2="38.52923"
						style="fill: #7f7970; stroke: #523235; stroke-miterlimit: 10"
					/>
				</svg>
				<svg
					id="wheel"
					class="left_wheel"
					data-name="wheel"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 40 40"
					ref="leftWheelRef"
					@click="() => handleClick('left')"
				>
					<g>
						<path
							d="M20,39.5C9.24756,39.5.5,30.75244.5,20S9.24756.5,20,.5s19.5,8.74756,19.5,19.5-8.74756,19.5-19.5,19.5Z"
							style="fill: #523235"
						/>
						<path
							d="M20,1c10.47665,0,19,8.52335,19,19s-8.52335,19-19,19S1,30.47665,1,20,9.52335,1,20,1M20,0C8.95432,0,0,8.95432,0,20s8.95432,20,20,20,20-8.95432,20-20S31.04568,0,20,0h0Z"
						/>
					</g>
					<path
						d="M20,6c7.71964,0,14,6.28036,14,14s-6.28036,14-14,14-14-6.28036-14-14,6.28036-14,14-14M20,5c-8.28427,0-15,6.71573-15,15s6.71573,15,15,15,15-6.71573,15-15-6.71573-15-15-15h0Z"
					/>
					<g>
						<circle cx="20" cy="20" r="4.5" style="fill: #7f7970" />
						<path
							d="M20,16c2.2056,0,4,1.7944,4,4s-1.7944,4-4,4-4-1.7944-4-4,1.7944-4,4-4M20,15c-2.76141,0-5,2.23859-5,5s2.23859,5,5,5,5-2.23859,5-5-2.23859-5-5-5h0Z"
						/>
					</g>
					<line
						x1="18.5"
						y1="34"
						x2="18.5"
						y2="24"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="21.5"
						y1="34"
						x2="21.5"
						y2="24"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="34"
						y1="18.5"
						x2="24"
						y2="18.5"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="34"
						y1="21.5"
						x2="24"
						y2="21.5"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="16"
						y1="18.5"
						x2="6"
						y2="18.5"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="16"
						y1="21.5"
						x2="6"
						y2="21.5"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="29.39362"
						y1="8.39362"
						x2="21.89362"
						y2="15.89362"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="15.75894"
						y1="21.96447"
						x2="8.68787"
						y2="29.03553"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="17.75894"
						y1="23.96447"
						x2="10.68787"
						y2="31.03553"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="30.75894"
						y1="10.96447"
						x2="23.68787"
						y2="18.03553"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="23.68787"
						y1="21.96447"
						x2="30.75894"
						y2="29.03553"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="21.68787"
						y1="23.96447"
						x2="28.75894"
						y2="31.03553"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="10.68787"
						y1="8.96447"
						x2="17.75894"
						y2="16.03553"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="8.68787"
						y1="10.96447"
						x2="15.75894"
						y2="18.03553"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<g>
						<circle cx="20" cy="20" r="2.5" style="fill: #2f201a" />
						<path
							d="M20,18c1.10281,0,2,.89719,2,2s-.89719,2-2,2-2-.89719-2-2,.89719-2,2-2M20,17c-1.65686,0-3,1.34314-3,3s1.34314,3,3,3,3-1.34314,3-3-1.34314-3-3-3h0Z"
						/>
					</g>
					<g>
						<circle cx="20" cy="20" r=".5" style="fill: #fff" />
						<path d="M20,19c-.55228,0-1,.44772-1,1s.44772,1,1,1,1-.44772,1-1-.44772-1-1-1h0Z" />
					</g>
					<line
						x1="18.5"
						y1="16"
						x2="18.5"
						y2="6"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="21.5"
						y1="16"
						x2="21.5"
						y2="6"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
				</svg>
			</div>
			<div class="bullet_container" ref="leftBulletContainerRef"></div>
		</div>
		<DetailTitleSavePoint />
		<div class="right_cannon">
			<div class="cannon" ref="rightCannonRef">
				<svg
					id="carrel"
					class="right_carrel"
					data-name="carrel"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 67.81573 66.41753"
				>
					<g>
						<rect
							x="20.47421"
							y="11.34326"
							width="42.4842"
							height="29.0001"
							transform="translate(-6.33979 35.78003) rotate(-43.46087)"
							style="fill: #7f7970"
						/>
						<path
							d="M47.14197,1.4137l19.26007,20.32362-30.11133,28.53564-19.2601-20.32361L47.14197,1.4137M47.17993,0L15.61691,29.91139l20.63583,21.77527,31.56299-29.91138L47.17993,0h0Z"
						/>
					</g>
					<line
						x1="27.26862"
						y1="20.25263"
						x2="46.82447"
						y2="40.31114"
						style="fill: #7f7970; stroke: #523235; stroke-miterlimit: 10"
					/>
					<line
						x1="29.08777"
						y1="18.47072"
						x2="48.64362"
						y2="38.52923"
						style="fill: #7f7970; stroke: #523235; stroke-miterlimit: 10"
					/>
				</svg>
				<svg
					id="wheel"
					class="right_wheel"
					data-name="wheel"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 40 40"
					ref="rightWheelRef"
					@click="() => handleClick('right')"
				>
					<g>
						<path
							d="M20,39.5C9.24756,39.5.5,30.75244.5,20S9.24756.5,20,.5s19.5,8.74756,19.5,19.5-8.74756,19.5-19.5,19.5Z"
							style="fill: #523235"
						/>
						<path
							d="M20,1c10.47665,0,19,8.52335,19,19s-8.52335,19-19,19S1,30.47665,1,20,9.52335,1,20,1M20,0C8.95432,0,0,8.95432,0,20s8.95432,20,20,20,20-8.95432,20-20S31.04568,0,20,0h0Z"
						/>
					</g>
					<path
						d="M20,6c7.71964,0,14,6.28036,14,14s-6.28036,14-14,14-14-6.28036-14-14,6.28036-14,14-14M20,5c-8.28427,0-15,6.71573-15,15s6.71573,15,15,15,15-6.71573,15-15-6.71573-15-15-15h0Z"
					/>
					<g>
						<circle cx="20" cy="20" r="4.5" style="fill: #7f7970" />
						<path
							d="M20,16c2.2056,0,4,1.7944,4,4s-1.7944,4-4,4-4-1.7944-4-4,1.7944-4,4-4M20,15c-2.76141,0-5,2.23859-5,5s2.23859,5,5,5,5-2.23859,5-5-2.23859-5-5-5h0Z"
						/>
					</g>
					<line
						x1="18.5"
						y1="34"
						x2="18.5"
						y2="24"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="21.5"
						y1="34"
						x2="21.5"
						y2="24"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="34"
						y1="18.5"
						x2="24"
						y2="18.5"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="34"
						y1="21.5"
						x2="24"
						y2="21.5"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="16"
						y1="18.5"
						x2="6"
						y2="18.5"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="16"
						y1="21.5"
						x2="6"
						y2="21.5"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="29.39362"
						y1="8.39362"
						x2="21.89362"
						y2="15.89362"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="15.75894"
						y1="21.96447"
						x2="8.68787"
						y2="29.03553"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="17.75894"
						y1="23.96447"
						x2="10.68787"
						y2="31.03553"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="30.75894"
						y1="10.96447"
						x2="23.68787"
						y2="18.03553"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="23.68787"
						y1="21.96447"
						x2="30.75894"
						y2="29.03553"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="21.68787"
						y1="23.96447"
						x2="28.75894"
						y2="31.03553"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="10.68787"
						y1="8.96447"
						x2="17.75894"
						y2="16.03553"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="8.68787"
						y1="10.96447"
						x2="15.75894"
						y2="18.03553"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<g>
						<circle cx="20" cy="20" r="2.5" style="fill: #2f201a" />
						<path
							d="M20,18c1.10281,0,2,.89719,2,2s-.89719,2-2,2-2-.89719-2-2,.89719-2,2-2M20,17c-1.65686,0-3,1.34314-3,3s1.34314,3,3,3,3-1.34314,3-3-1.34314-3-3-3h0Z"
						/>
					</g>
					<g>
						<circle cx="20" cy="20" r=".5" style="fill: #fff" />
						<path d="M20,19c-.55228,0-1,.44772-1,1s.44772,1,1,1,1-.44772,1-1-.44772-1-1-1h0Z" />
					</g>
					<line
						x1="18.5"
						y1="16"
						x2="18.5"
						y2="6"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
					<line
						x1="21.5"
						y1="16"
						x2="21.5"
						y2="6"
						style="fill: #fff; stroke: #000; stroke-miterlimit: 10"
					/>
				</svg>
			</div>
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
	align-items: end;
	width: 100%;

	.left_cannon,
	.right_cannon {
		position: relative;

		.cannon {
			position: relative;
			display: flex;
			height: 200px;

			#carrel {
				position: absolute;
				left: 15%;
				bottom: 15%;
				height: 300px;
				width: 300px;
				z-index: variables.$float_zIndex + 1;
			}

			#wheel {
				height: 200px;
				width: 200px;
				z-index: variables.$float_zIndex + 1;
				-webkit-tap-highlight-color: transparent;
				cursor: pointer;
			}
		}

		.bullet_container {
			position: absolute;
			width: 100px;
			height: 100px;

			:deep(.cannon_bullet) {
				position: absolute;
				height: 10px;
				width: 10px;
				z-index: variables.$float_zIndex;

				&.color1 {
					background-color: red;
				}

				&.color2 {
					background-color: orange;
				}

				&.color3 {
					background-color: yellow;
				}

				&.color4 {
					background-color: green;
				}

				&.color5 {
					background-color: blue;
				}

				&.color6 {
					background-color: indigo;
				}

				&.color7 {
					background-color: violet;
				}

				&.color8 {
					background-color: pink;
				}

				&.color9 {
					background-color: purple;
				}
			}
		}
	}

	.left_cannon {
		.bullet_container {
			top: -40px;
			right: -40px;

			:deep(.cannon_bullet) {
				top: 0;
				right: 0;
			}
		}
	}

	.right_cannon {
		.bullet_container {
			top: -40px;
			left: -40px;

			:deep(.cannon_bullet) {
				top: 0;
				left: 0;
			}
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.5;

	.title_bottom {
		.left_cannon,
		.right_cannon {
			.cannon {
				height: 200px * $base-size;

				#carrel {
					left: 15%;
					bottom: 15%;
					height: 300px * $base-size;
					width: 300px * $base-size;
				}

				#wheel {
					height: 200px * $base-size;
					width: 200px * $base-size;
				}
			}

			.bullet_container {
				width: 100px * $base-size;
				height: 100px * $base-size;

				:deep(.cannon_bullet) {
					height: 10px;
					width: 10px;
				}
			}
		}

		.left_cannon {
			.bullet_container {
				top: -40px * $base-size;
				right: -40px * $base-size;

				:deep(.cannon_bullet) {
					top: 0;
					right: 0;
				}
			}
		}

		.right_cannon {
			.bullet_container {
				top: -40px * $base-size;
				left: -40px * $base-size;

				:deep(.cannon_bullet) {
					top: 0;
					left: 0;
				}
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.5;

	.title_bottom {
		.left_cannon,
		.right_cannon {
			.cannon {
				height: 200px * $base-size;

				#carrel {
					left: 15%;
					bottom: 15%;
					height: 300px * $base-size;
					width: 300px * $base-size;
				}

				#wheel {
					height: 200px * $base-size;
					width: 200px * $base-size;
				}
			}

			.bullet_container {
				width: 100px * $base-size;
				height: 100px * $base-size;

				:deep(.cannon_bullet) {
					height: 10px;
					width: 10px;
				}
			}
		}

		.left_cannon {
			.bullet_container {
				top: -40px * $base-size;
				right: -40px * $base-size;

				:deep(.cannon_bullet) {
					top: 0;
					right: 0;
				}
			}
		}

		.right_cannon {
			.bullet_container {
				top: -40px * $base-size;
				left: -40px * $base-size;

				:deep(.cannon_bullet) {
					top: 0;
					left: 0;
				}
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.6;

	.title_bottom {
		.left_cannon,
		.right_cannon {
			.cannon {
				height: 200px * $base-size;

				#carrel {
					left: 15%;
					bottom: 15%;
					height: 300px * $base-size;
					width: 300px * $base-size;
				}

				#wheel {
					height: 200px * $base-size;
					width: 200px * $base-size;
				}
			}

			.bullet_container {
				width: 100px * $base-size;
				height: 100px * $base-size;

				:deep(.cannon_bullet) {
					height: 10px;
					width: 10px;
				}
			}
		}

		.left_cannon {
			.bullet_container {
				top: -40px * $base-size;
				right: -40px * $base-size;

				:deep(.cannon_bullet) {
					top: 0;
					right: 0;
				}
			}
		}

		.right_cannon {
			.bullet_container {
				top: -40px * $base-size;
				left: -40px * $base-size;

				:deep(.cannon_bullet) {
					top: 0;
					left: 0;
				}
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.7;

	.title_bottom {
		.left_cannon,
		.right_cannon {
			.cannon {
				height: 200px * $base-size;

				#carrel {
					left: 15%;
					bottom: 15%;
					height: 300px * $base-size;
					width: 300px * $base-size;
				}

				#wheel {
					height: 200px * $base-size;
					width: 200px * $base-size;
				}
			}

			.bullet_container {
				width: 100px * $base-size;
				height: 100px * $base-size;

				:deep(.cannon_bullet) {
					height: 10px;
					width: 10px;
				}
			}
		}

		.left_cannon {
			.bullet_container {
				top: -40px * $base-size;
				right: -40px * $base-size;

				:deep(.cannon_bullet) {
					top: 0;
					right: 0;
				}
			}
		}

		.right_cannon {
			.bullet_container {
				top: -40px * $base-size;
				left: -40px * $base-size;

				:deep(.cannon_bullet) {
					top: 0;
					left: 0;
				}
			}
		}
	}
}
</style>
