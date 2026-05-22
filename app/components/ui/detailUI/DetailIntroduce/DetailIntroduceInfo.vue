<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const infoRef = ref<HTMLDivElement | null>(null);
const line1Ref = ref<HTMLDivElement | null>(null);
const line1Split = ref<SplitText | null>(null);
const line1WaitAnim = ref<gsap.core.Tween | null>(null); // line1 待机动画
const line1ReserveAnim = ref<gsap.core.Tween | null>(null); // line1 翻转动画
const line1CurrentName = ref<string>(getDetailName(0));
const line2Ref = ref<HTMLDivElement | null>(null);
const line2Split = ref<SplitText | null>(null);
const line3Ref = ref<HTMLDivElement | null>(null);
const line3Split = ref<SplitText | null>(null);
const mountAnim = ref<gsap.core.Tween | null>(null);
const wordAnim = ref<gsap.core.Timeline | null>(null);

const createLine1WaitAnim = () => {
	if (line1WaitAnim.value) line1WaitAnim.value.kill();
	line1WaitAnim.value = gsap.fromTo(
		line1Ref.value,
		{ rotateX: 0 },
		{
			rotateX: 360,
			ease: "power2.out",
			duration: 1,
			delay: 2,
			repeat: -1,
			repeatDelay: 2,
		},
	);
};

const handleChangeName = () => {
	let nextName = getDetailName(Math.floor(Math.random() * 3));
	while (nextName === line1CurrentName.value)
		nextName = getDetailName(Math.floor(Math.random() * 3));
	line1WaitAnim.value?.kill();
	line1ReserveAnim.value?.kill();
	line1ReserveAnim.value = gsap.fromTo(
		line1Ref.value,
		{ rotateX: 0 },
		{
			rotateX: 360,
			duration: 1,
			ease: "power2.out",
			onUpdate: () => {
				const rotate = parseFloat(String(gsap.getProperty(line1Ref.value, "rotateX")));
				if (rotate >= 88 && rotate <= 92) {
					line1CurrentName.value = nextName;
				}
			},
			onComplete: createLine1WaitAnim,
		},
	);
};

const createWordAnim = () => {
	line1Split.value?.revert();
	line2Split.value?.revert();
	line3Split.value?.revert();
	line1Split.value = SplitText.create(line1Ref.value, { type: "chars" });
	line2Split.value = SplitText.create(line2Ref.value, { type: "chars" });
	line3Split.value = SplitText.create(line3Ref.value, { type: "chars" });
	wordAnim.value = gsap
		.timeline()
		.fromTo(
			line1Split.value?.chars,
			{ y: -100, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				ease: "bounce.out",
				duration: 1,
				stagger: 0.1,
				onComplete: createLine1WaitAnim,
			},
		)
		.fromTo(
			line2Split.value?.chars,
			{ y: -100, opacity: 0 },
			{ y: 0, opacity: 1, ease: "bounce.out", duration: 1, stagger: 0.1 },
			"-=0.9",
		)
		.fromTo(
			line3Split.value?.chars,
			{ y: -100, opacity: 0 },
			{ y: 0, opacity: 1, ease: "bounce.out", duration: 1, stagger: 0.1 },
			"-=0.9",
		);
};

onMounted(() => {
	mountAnim.value = gsap.fromTo(
		infoRef.value,
		{ height: 0, y: "15dvh", opacity: 0 },
		{
			height: "30dvh",
			y: 0,
			opacity: 1,
			ease: "power4.out",
			duration: 1,
			scrollTrigger: {
				trigger: infoRef.value,
				start: "top 80%", // 当元素顶部到达视口 80% 位置时触发
				toggleActions: "play none none reverse", // 进入时播放，离开时反向播放
			},
			onStart: createWordAnim,
			onReverseComplete: () => {
				wordAnim.value?.kill();
				line1WaitAnim.value?.kill();
				line1ReserveAnim.value?.kill();
			},
		},
	);
});

onUnmounted(() => {
	line1Split.value?.revert();
	line1WaitAnim.value?.kill();
	line2Split.value?.revert();
	line3Split.value?.revert();
	mountAnim.value?.scrollTrigger?.kill();
	mountAnim.value?.kill();
	wordAnim.value?.kill();
});
</script>

<template>
	<div class="introduce_info" ref="infoRef">
		<div class="introduce_line1" ref="line1Ref" @mouseout="handleChangeName">
			昵称：{{ line1CurrentName }}
		</div>
		<div class="introduce_line2" ref="line2Ref">昵称</div>
		<div class="introduce_line3" ref="line3Ref">爱好</div>
	</div>
</template>

<style scoped lang="scss">
.introduce_info {
	position: absolute;
	left: 20%;
	top: 25%;
	padding: 3rem;
	height: 30dvh;
	width: 20%;
	color: rgba($color: #ffffff, $alpha: 0.5);
	font-size: 1.5rem;
	font-family: "方正基础像素体";
	border-color: rgba($color: #ffffff, $alpha: 0.5);
	border-width: 5px;
	border-style: solid;
	overflow: hidden;

	.introduce_line1,
	.introduce_line2,
	.introduce_line3 {
		margin-bottom: 3rem;
	}
}
</style>
