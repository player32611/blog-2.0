<script setup lang="ts">
import gsap from "gsap";
import { CustomEase } from "gsap/all";

import ArrowButton from "../common/ArrowButton.vue";

gsap.registerPlugin(CustomEase);

const loadingStore = useLoadingStore();
const mainStore = useMainStore();
const currentPaperRef = ref<HTMLDivElement | null>(null);
const linkRefs = ref<HTMLDivElement[]>([]);
const maskAnim = ref<GSAPTimeline | null>(null);
const hintAnim = ref<GSAPTimeline | null>(null);
const moveAnim = ref<GSAPTween | null>(null);

let setX: gsap.QuickToFunc;
let setY: gsap.QuickToFunc;
const moveTime = 1;

CustomEase.create("custom", "M0,0 C0.23,1 0.32,1 1,1");

const handleMouseEnter = (e: MouseEvent) => {
	if (!(e.target instanceof HTMLDivElement)) return;
	if (currentPaperRef.value === e.target) return;
	else if (currentPaperRef.value !== e.target) {
		maskAnim.value?.reverse();
		maskAnim.value = null;
		hintAnim.value?.reverse();
		hintAnim.value = null;
	}
	const hint = e.target.querySelector(".link_mask");
	const tl = gsap
		.timeline({
			onReverseComplete: () => {
				tl.kill();
			},
		})
		.fromTo(hint, { scaleX: 0 }, { scaleX: 1, ease: "custom", duration: 0.48 }, 0.1)
		.fromTo(hint, { height: 3 }, { height: "100%", ease: "custom", duration: 0.48 }, 0.4);
	maskAnim.value = tl;
};

const handleMouseLeave = () => {
	if (hintAnim.value) return;
	maskAnim.value?.reverse();
	maskAnim.value = null;
};

const handleClickPaper = (e: MouseEvent) => {
	if (!(e.target instanceof HTMLDivElement)) return;
	currentPaperRef.value = e.target;
	const hint = currentPaperRef.value?.querySelector(".link_hint");
	if (!hint) return;
	const underline = hint?.querySelector(".hint_underline") || null;
	const slash = hint?.querySelector(".hint_slash") || null;
	const tl = gsap
		.timeline({
			onReverseComplete: () => {
				tl.kill();
			},
		})
		.fromTo(
			hint,
			{ opacity: 0, visibility: "hidden" },
			{ opacity: 1, visibility: "visible", duration: 0.7 },
		)
		.fromTo(underline, { width: 0 }, { width: "100%", duration: 0.4 }, "<")
		.fromTo(
			slash,
			{ opacity: 0, visibility: "visible" },
			{ opacity: 1, visibility: "visible", duration: 0.5 },
			"<",
		);
	hintAnim.value = tl;
};

watch(
	[
		() => mainStore.backgroundTransform.x,
		() => mainStore.backgroundTransform.y,
		() => mainStore.isResized,
	],
	newState => {
		if (moveAnim.value) moveAnim.value.kill();
		if (newState[2]) {
			gsap.set(linkRefs.value, { x: newState[0], y: newState[1] });
			mainStore.setIsResized(false);
		} else {
			setX(newState[0]);
			setY(newState[1]);
		}
	},
);

onMounted(() => {
	setX = gsap.quickTo(linkRefs.value, "x", { duration: moveTime, ease: "power4.out" });
	setY = gsap.quickTo(linkRefs.value, "y", { duration: moveTime, ease: "power4.out" });
});

onUnmounted(() => {
	maskAnim.value?.kill();
	hintAnim.value?.kill();
	moveAnim.value?.kill();
});
</script>

<template>
	<div
		class="main_link"
		:style="{
			width: `${mainStore.backgroundSize.width}px`,
			height: `${mainStore.backgroundSize.height}px`,
		}"
	>
		<!-- From Uiverse.io by gharsh11032000 -->
		<div
			class="link_paper"
			v-for="link in MAIN_LINKS"
			ref="linkRefs"
			:style="{
				left: `${link.pos.x}px`,
				top: `${link.pos.y}px`,
				height: `${link.size.height}px`,
				width: `${link.size.width}px`,
				'--theme-color': link.themeColor,
				...link.style,
			}"
			@click="handleClickPaper"
			@mouseenter="handleMouseEnter"
			@mouseleave="handleMouseLeave"
		>
			<div class="link_mask"></div>
			<!-- From Uiverse.io by vnuny -->
			<div class="link_hint">
				<div class="hint_underline"></div>
				<div class="hint_content">
					{{ link.content || MAIN_EMPTY }}
					<div class="button_container" @click="loadingStore.loadingNavigate(link.target)">
						<ArrowButton :color="link.themeColor" />
					</div>
				</div>
				<div class="hint_slash"></div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.main_link {
	position: absolute;
	left: 50%;
	top: 50%;
	height: 100%;
	width: 100%;
	transform: translate(-50%, -50%);
	pointer-events: none;
	overflow: hidden;
	z-index: variables.$background_zIndex;

	.link_paper {
		position: absolute;
		background-color: rgba($color: #ffff8e, $alpha: 0.3);
		box-shadow: 0px 0px 20px 5px rgba($color: #ffff00, $alpha: 0.3);
		user-select: none;
		pointer-events: all;
		cursor: pointer;

		/* From Uiverse.io by gharsh11032000 */
		.link_mask {
			position: absolute;
			z-index: -1;
			left: 50%;
			top: 0%;
			width: 100%;
			height: 3px;
			background: var(--theme-color);
			opacity: 0.5;
			transform: translateX(-50%) scaleX(0);
			pointer-events: none;
		}

		/* From Uiverse.io by vnuny */
		.link_hint {
			position: absolute;
			bottom: 85px;
			left: 50%;
			margin-left: 56px;
			padding: 35px 0;
			color: var(--theme-color);
			opacity: 0;
			visibility: hidden;
			pointer-events: none;

			.hint_underline {
				position: absolute;
				bottom: 29px;
				left: 0;
				height: 1px;
				width: 0px;
				background-color: var(--theme-color);
				transition: width 0.4s;
			}

			.hint_content {
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				width: fit-content;
				white-space: nowrap;
				font-size: 1rem;
				font-family: "方正基础像素体";
				z-index: variables.$background_zIndex;
				user-select: text;
				pointer-events: all;
				cursor: default;

				.button_container {
					margin-left: 5px;
					rotate: 180deg;
				}
			}

			.hint_slash {
				position: absolute;
				bottom: 29px;
				left: 0;
				height: 1px;
				width: 80px;
				background-color: var(--theme-color);
				opacity: 1;
				-webkit-transform-origin: 0 50%;
				transform-origin: 0 50%;
				-webkit-transform: rotate(-225deg);
				transform: rotate(-225deg);
			}
		}
	}
}
</style>
