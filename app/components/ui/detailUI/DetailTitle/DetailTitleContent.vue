<script setup lang="ts">
import gsap from "gsap";
import { SplitText } from "gsap/all";

import DetailTitleCode from "./DetailTitleCode.vue";

gsap.registerPlugin(SplitText);

const word1Split = ref<SplitText | null>(null);
const word1Interval = ref<number | null>(null);
const word2Split = ref<SplitText | null>(null);
const word3Split = ref<SplitText | null>(null);
const word3Interval = ref<number | null>(null);

const initDelay: number = 1; // 初始延迟（s）
const singleDuration: number = 1.2; // 单字符动画时长（s）
const singleInterval: Ref<number> = computed(() => singleDuration / 3); // 单字符动画间隔（s）

const word1FirstCharAnim = () => {
	if (!word1Split.value || !word1Split.value.chars[0]) return;
	gsap.fromTo(
		word1Split.value.chars[0],
		{ x: -300 },
		{ x: 0, duration: singleDuration, ease: "power1.out", delay: initDelay },
	);
	gsap.fromTo(
		word1Split.value.chars[0],
		{ y: -600 },
		{ y: 0, duration: singleDuration, ease: "bounce.out", delay: initDelay },
	);
	gsap.fromTo(
		word1Split.value.chars[0],
		{ rotate: 240 },
		{ rotate: 720, duration: singleDuration, ease: "back.out", delay: initDelay },
	);
};

const word1SecondCharAnim = () => {
	if (!word1Split.value || !word1Split.value.chars[1]) return;
	gsap
		.timeline()
		.set(word1Split.value.chars[1], { rotateX: -90 })
		.to(word1Split.value.chars[1], {
			rotateX: -180,
			transformOrigin: "50% 80%",
			duration: singleDuration / 2,
			delay: initDelay + singleInterval.value,
		})
		.to(word1Split.value.chars[1], { rotateX: 0, duration: singleDuration / 2 });
};

const word1ThirdCharAnim = () => {
	if (!word1Split.value || !word1Split.value.chars[2]) return;
	gsap.from(word1Split.value.chars[2], {
		rotateX: -90,
		transformOrigin: "50% 50% -160px",
		opacity: 0,
		duration: singleDuration,
		ease: "power3",
		delay: initDelay + singleInterval.value * 2,
	});
};

const word1FourthCharAnim = () => {
	if (!word1Split.value || !word1Split.value.chars[3]) return;
	gsap.fromTo(
		word1Split.value.chars[3],
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
			onComplete: () => {
				word1Interval.value = setInterval(() => {
					if (!word1Split.value || !word1Split.value.chars[3]) return;
					gsap.to(word1Split.value.chars[3], {
						rotateY: "+=180",
						ease: "power2.out",
						duration: singleDuration,
					});
				}, 2000);
			},
		},
	);
};

const word1FifthCharAnim = () => {
	if (!word1Split.value || !word1Split.value.chars[4]) return;
	gsap
		.timeline()
		.set(word1Split.value.chars[4], { y: -100, clipPath: "inset(100% 0% 0% 0%)" })
		.to(word1Split.value.chars[4], {
			y: 0,
			clipPath: "inset(0% 0% 0% 0%)",
			ease: "none",
			duration: singleDuration / 4,
			delay: initDelay + singleInterval.value * 4,
		})
		.to(word1Split.value.chars[4], {
			y: 100,
			clipPath: "inset(0% 0% 100% 0%)",
			ease: "none",
			duration: singleDuration / 4,
		})
		.fromTo(
			word1Split.value.chars[4],
			{ y: -100, clipPath: "inset(100% 0% 0% 0%)" },
			{
				y: 0,
				clipPath: "inset(0% 0% 0% 0%)",
				duration: singleDuration / 2,
				ease: "power2.out",
			},
		);
};

const word1SixthCharAnim = () => {
	if (!word1Split.value || !word1Split.value.chars[5]) return;
	gsap.timeline().fromTo(
		word1Split.value.chars[5],
		{ x: 1000, rotate: 720 },
		{
			x: 0,
			rotate: 0,
			ease: "power1.out",
			duration: singleDuration,
			delay: initDelay + singleInterval.value * 5,
		},
	);
};

const word3FirstCharAnim = () => {
	if (!word3Split.value || !word3Split.value.chars[0]) return;
	gsap
		.timeline()
		.set(word3Split.value.chars[0], { y: -100, clipPath: "inset(0% 43% 100%)" })
		.to(word3Split.value.chars[0], {
			y: 0,
			clipPath: "inset(0% 43% 0%)",
			ease: "power2.out",
			duration: singleDuration / 2,
			delay: initDelay + singleInterval.value * 6,
		})
		.to(word3Split.value.chars[0], {
			clipPath: "inset(0% 0%)",
			ease: "power2.in",
			duration: singleDuration / 2,
		});
};

const word3SecondCharAnim = () => {
	if (!word3Split.value || !word3Split.value.chars[1]) return;
	gsap.fromTo(
		word3Split.value.chars[1],
		{
			rotateY: -450,
		},
		{
			rotateY: 0,
			ease: "power1.out",
			duration: singleDuration,
			delay: initDelay + singleInterval.value * 7,
		},
	);
};

const word3ThirdCharAnim = () => {
	if (
		!word3Split.value ||
		!word3Split.value.chars[2] ||
		!word1Split.value ||
		!word1Split.value.chars[3]
	)
		return;
	const rect = word1Split.value.chars[3].getBoundingClientRect();
	const dx = rect.x - word3Split.value.chars[2].getBoundingClientRect().x;
	const dy = rect.y - word3Split.value.chars[2].getBoundingClientRect().y;
	gsap
		.timeline()
		.set(word3Split.value.chars[2], { x: dx, y: dy, opacity: 0 })
		.set(word3Split.value.chars[2], { opacity: 0, delay: initDelay + singleInterval.value * 8 })
		.to(word3Split.value.chars[2], {
			x: 0,
			y: 0,
			opacity: 1,
			duration: singleDuration,
			ease: "power2.out",
		});
};

const word3FourthCharAnim = () => {
	if (!word3Split.value || !word3Split.value.chars[3]) return;
	gsap
		.timeline({
			onComplete: () => {
				word3Interval.value = setInterval(() => {
					if (!word3Split.value || !word3Split.value.chars[3]) return;
					gsap.to(word3Split.value.chars[3], {
						rotate: "+=360",
						ease: "power2.out",
						duration: singleDuration / 2,
					});
				}, 3000);
			},
		})
		.set(word3Split.value.chars[3], { y: "-60dvh", rotate: 90 })
		.to(word3Split.value.chars[3], {
			y: 0,
			ease: "bounce.out",
			duration: singleDuration,
			delay: initDelay + singleInterval.value * 9,
		})
		.to(word3Split.value.chars[3], {
			rotate: 0,
			duration: singleDuration / 3,
		});
};

const word3FifthCharAnim = () => {
	if (!word3Split.value || !word3Split.value.chars[4]) return;
	gsap
		.timeline()
		.set(word3Split.value.chars[4], {
			y: 50,
			scale: 0,
		})
		.to(word3Split.value.chars[4], {
			y: -50,
			scale: 1,
			ease: "power2.out",
			duration: singleDuration / 2,
			delay: initDelay + singleInterval.value * 10,
		})
		.to(word3Split.value.chars[4], {
			y: 0,
			ease: "power2.in",
			duration: singleDuration / 2,
		});
};

const word3SixthCharAnim = () => {
	if (!word3Split.value || !word3Split.value.chars[5]) return;
	gsap
		.timeline()
		.set(word3Split.value.chars[5], {
			scaleY: 0,
		})
		.to(word3Split.value.chars[5], {
			scaleY: 1,
			ease: "bounce.out",
			duration: singleDuration,
			delay: initDelay + singleInterval.value * 11,
		});
};

const word2Anim = () => {
	if (!word2Split.value) return;
	gsap.fromTo(
		word2Split.value.words,
		{
			scale: 5,
			rotate: -30,
			opacity: 0,
		},
		{
			scale: 1.5,
			opacity: 1,
			duration: singleDuration,
			ease: "expo.out",
			delay: initDelay + singleInterval.value * 13,
		},
	);
};

onMounted(() => {
	word1Split.value = SplitText.create(".title_word1", { type: "chars" });
	word2Split.value = SplitText.create(".title_word2", { type: "words" });
	word3Split.value = SplitText.create(".title_word3", { type: "chars, words" });
	word1FirstCharAnim();
	word1SecondCharAnim();
	word1ThirdCharAnim();
	word1FourthCharAnim();
	word1FifthCharAnim();
	word1SixthCharAnim();
	word3FirstCharAnim();
	word3SecondCharAnim();
	word3ThirdCharAnim();
	word3FourthCharAnim();
	word3FifthCharAnim();
	word3SixthCharAnim();
	word2Anim();
});

onUnmounted(() => {
	word1Split.value?.revert();
	word2Split.value?.revert();
	word3Split.value?.revert();
	if (word3Interval.value) clearInterval(word3Interval.value);
	if (word1Interval.value) clearInterval(word1Interval.value);
});
</script>

<template>
	<div class="title_content">
		<div class="content_word">
			<div class="title_word1">CODING</div>
			<div class="title_word2">ANY</div>
			<div class="title_word3">THINGS</div>
		</div>
		<div class="content_code">
			<DetailTitleCode />
		</div>
	</div>
</template>

<style scoped lang="scss">
$base_size: 1;

.title_content {
	position: relative;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	overflow: hidden;
	user-select: none;

	.content_word {
		grid-area: 1 / 1 / 2 / 4;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-left: 200px;

		font-size: 9rem;
		font-family: "Coustard Black";

		.title_word1 {
			color: #fffce1;
		}

		.title_word2 {
			color: #ff7f27;
		}

		.title_word3 {
			color: #00000000;
			-webkit-text-stroke: calc(0.2rem) #ff7f27;
		}
	}

	.content_code {
		position: relative;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base_size: 0.5;

	.title_content {
		display: grid;
		grid-template-rows: repeat(2, 1fr);

		.content_word {
			grid-area: 2/1/3/2;
			font-size: 8rem * $base_size;
		}

		.content_code {
			grid-area: 1/1/2/2;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base_size: 0.6;

	.title_content {
		display: grid;
		grid-template-rows: repeat(2, 1fr);

		.content_word {
			grid-area: 2/1/3/2;
			font-size: 8rem * $base_size;
		}

		.content_code {
			grid-area: 1/1/2/2;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base_size: 0.6;

	.title_content {
		.content_word {
			font-size: 8rem * $base_size;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base_size: 0.9;

	.title_content {
		.content_word {
			font-size: 8rem * $base_size;
		}
	}
}
</style>
