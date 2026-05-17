<script setup lang="ts">
import gsap from "gsap";
import { DrawSVGPlugin, Physics2DPlugin, SplitText } from "gsap/all";

gsap.registerPlugin(DrawSVGPlugin, Physics2DPlugin, SplitText);

const titleSplit = ref<SplitText | null>(null);
const toSplit = ref<SplitText | null>(null);
const leftCannonRef = ref<HTMLDivElement | null>(null);
const leftBulletContainerRef = ref<HTMLDivElement | null>(null);
const leftBulletRefs = ref<HTMLDivElement[]>([]);
const leftCannonFireAnim = ref<gsap.core.Tween | null>(null);
const rightCannonRef = ref<HTMLDivElement | null>(null);
const rightBulletContainerRef = ref<HTMLDivElement | null>(null);
const rightBulletRefs = ref<HTMLDivElement[]>([]);
const rightCannonFireAnim = ref<gsap.core.Tween | null>(null);

const initDelay: number = 1; // 初始延迟（s）
const singleDuration: number = 1.2; // 单字符动画时长（s）
const singleInterval: Ref<number> = computed(() => singleDuration / 3); // 单字符动画间隔（s）
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

const firstCharAnim = () => {
	if (!titleSplit.value || !titleSplit.value.chars[0]) return;
	gsap.fromTo(
		titleSplit.value.chars[0],
		{ x: -300 },
		{ x: 0, duration: singleDuration, ease: "power1.out", delay: initDelay },
	);
	gsap.fromTo(
		titleSplit.value.chars[0],
		{ y: -600 },
		{ y: 0, duration: singleDuration, ease: "bounce.out", delay: initDelay },
	);
	gsap.fromTo(
		titleSplit.value.chars[0],
		{ rotate: 240 },
		{ rotate: 720, duration: singleDuration, ease: "back.out", delay: initDelay },
	);
};

const secondCharAnim = () => {
	if (!titleSplit.value || !titleSplit.value.chars[1]) return;
	gsap
		.timeline()
		.set(titleSplit.value.chars[1], { rotateX: -90 })
		.to(titleSplit.value.chars[1], {
			rotateX: -180,
			transformOrigin: "50% 80%",
			duration: singleDuration / 2,
			delay: initDelay + singleInterval.value,
		})
		.to(titleSplit.value.chars[1], { rotateX: 0, duration: singleDuration / 2 });
};

const thirdCharAnim = () => {
	if (!titleSplit.value || !titleSplit.value.chars[2]) return;
	gsap.from(titleSplit.value.chars[2], {
		rotateX: -90,
		transformOrigin: "50% 50% -160px",
		opacity: 0,
		duration: singleDuration,
		ease: "power3",
		delay: initDelay + singleInterval.value * 2,
	});
};

const fourthCharAnim = () => {
	if (!titleSplit.value || !titleSplit.value.chars[3]) return;
	gsap.fromTo(
		titleSplit.value.chars[3],
		{
			scale: 0,
			rotate: 90,
		},
		{
			scale: 1,
			rotate: 0,
			ease: "elastic.out",
			duration: singleDuration,
			delay: initDelay + singleInterval.value * 3,
		},
	);
};

const fifthCharAnim = () => {
	if (!titleSplit.value || !titleSplit.value.chars[4]) return;
	gsap
		.timeline()
		.set(titleSplit.value.chars[4], { y: -100, clipPath: "inset(100% 0% 0% 0%)" })
		.to(titleSplit.value.chars[4], {
			y: 0,
			clipPath: "inset(0% 0% 0% 0%)",
			ease: "none",
			duration: singleDuration / 4,
			delay: initDelay + singleInterval.value * 4,
		})
		.to(titleSplit.value.chars[4], {
			y: 100,
			clipPath: "inset(0% 0% 100% 0%)",
			ease: "none",
			duration: singleDuration / 4,
		})
		.fromTo(
			titleSplit.value.chars[4],
			{ y: -100, clipPath: "inset(100% 0% 0% 0%)" },
			{
				y: 0,
				clipPath: "inset(0% 0% 0% 0%)",
				duration: singleDuration / 2,
				ease: "power2.out",
			},
		);
};

const sixthCharAnim = () => {
	if (!titleSplit.value || !titleSplit.value.chars[5]) return;
	gsap
		.timeline()
		.set(titleSplit.value.chars[5], { clipPath: "inset(0% 100% 0% 0%)" })
		.to(titleSplit.value.chars[5], {
			clipPath: "inset(0% 0% 0% 0%)",
			ease: "power2.in",
			duration: singleDuration / 2,
			delay: initDelay + singleInterval.value * 5 + (singleDuration / 3) * 2,
		});
};

const seventhCharAnim = () => {
	if (!titleSplit.value || !titleSplit.value.chars[6]) return;
	gsap
		.timeline()
		.fromTo(
			titleSplit.value.chars[6],
			{ x: 700, skewX: 20 },
			{
				x: "-4rem",
				ease: "power2.out",
				duration: (singleDuration / 3) * 2,
				delay: initDelay + singleInterval.value * 5,
			},
		)
		.to(titleSplit.value.chars[6], {
			x: 0,
			skewX: 0,
			ease: "power2.in",
			duration: singleDuration / 2,
		});
};

const eighthCharAnim = () => {
	if (!toSplit.value || !toSplit.value.chars[0]) return;
	gsap
		.timeline()
		.set(toSplit.value.chars[0], { y: -100, clipPath: "inset(0% 43% 100%)" })
		.to(toSplit.value.chars[0], {
			y: 0,
			clipPath: "inset(0% 43% 0%)",
			ease: "power2.out",
			duration: singleDuration / 2,
			delay: initDelay + singleInterval.value * 6,
		})
		.to(toSplit.value.chars[0], {
			clipPath: "inset(0% 0%)",
			ease: "power2.in",
			duration: singleDuration / 2,
		});
};

const ninthCharAnim = () => {
	if (!toSplit.value || !toSplit.value.chars[1] || !titleSplit.value || !titleSplit.value.chars[4])
		return;
	const rect = titleSplit.value.chars[4].getBoundingClientRect();
	const dx = rect.x - toSplit.value.chars[1].getBoundingClientRect().x;
	const dy = rect.y - toSplit.value.chars[1].getBoundingClientRect().y;
	gsap
		.timeline()
		.set(toSplit.value.chars[1], { x: dx, y: dy + 100, opacity: 0 })
		.set(toSplit.value.chars[1], { opacity: 1, delay: initDelay + singleInterval.value * 8 })
		.to(toSplit.value.chars[1], {
			x: 0,
			y: 0,
			opacity: 1,
			duration: singleDuration,
			ease: "power2.out",
		});
};

onMounted(() => {
	createBullets();
	titleSplit.value = SplitText.create(".title_welcome", { type: "chars" });
	toSplit.value = SplitText.create(".title_to", { type: "chars" });
	firstCharAnim();
	secondCharAnim();
	thirdCharAnim();
	fourthCharAnim();
	fifthCharAnim();
	sixthCharAnim();
	seventhCharAnim();
	eighthCharAnim();
	ninthCharAnim();
});

onUnmounted(() => {
	titleSplit.value?.revert();
});
</script>

<template>
	<div class="details_title">
		<div class="title_welcome">WELCOME</div>
		<div class="title_to">TO</div>
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
	</div>
</template>

<style scoped lang="scss">
.details_title {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100dvh;
	width: 100%;
	font-size: 5rem;
	font-family: "Coustard Black";

	.title_welcome {
		width: auto;
		background-color: transparent;
	}
	.title_to {
		margin-left: 8rem;
		width: auto;
	}

	.title_bottom {
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
				}
			}
		}
	}
}
</style>
