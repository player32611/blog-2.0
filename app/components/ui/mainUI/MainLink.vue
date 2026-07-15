<script setup lang="ts">
import gsap from "gsap";

const mainStore = useMainStore();
const linkRefs = ref<HTMLDivElement[]>([]);
const hintAnim = ref<GSAPTween | null>(null);
const moveAnim = ref<GSAPTween | null>(null);

const moveTime = 1;
const hintAppearDuration = 0.7;

const handleMouseEnter = (e: MouseEvent) => {
	if (!(e.target instanceof HTMLDivElement)) return;
	console.log("enter");
};

const handleMouseLeave = (e: MouseEvent) => {
	if (!(e.target instanceof HTMLDivElement)) return;
	console.log("leave");
};

const handleClickPaper = (e: MouseEvent) => {
	if (!(e.target instanceof HTMLDivElement)) return;
	const hint = e.target.querySelector(".link_hint");
	console.log(hint);
	hintAnim.value = gsap.to(hint, {
		opacity: 1,
		visibility: "visible",
		ease: "power1.out",
		duration: hintAppearDuration,
	});
};

watch([() => mainStore.backgroundTransform.x, () => mainStore.backgroundTransform.y], newState => {
	if (moveAnim.value) moveAnim.value.kill();
	moveAnim.value = gsap.to(linkRefs.value, {
		transform: `translate(${newState[0]}px , ${newState[1]}px)`,
		duration: mainStore.isResized ? 0 : moveTime,
		ease: "power4.out",
	});
	mainStore.setIsResized(false);
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
			<!-- From Uiverse.io by vnuny -->
			<div class="link_hint">
				<p>Use Navbar to navigate the website quickly and easily.</p>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.main_link {
	position: absolute;
	left: 50%;
	top: 50%;
	height: 100%;
	width: 100%;
	transform: translate(-50%, -50%);
	pointer-events: none;
	overflow: hidden;

	.link_paper {
		position: absolute;
		background-color: rgba($color: #ffff8e, $alpha: 0.3);
		box-shadow: 0px 0px 20px 5px rgba($color: #ffff00, $alpha: 0.3);
		user-select: none;
		pointer-events: all;
		cursor: pointer;

		/* From Uiverse.io by gharsh11032000 */
		&:hover {
			&::before {
				transform: translateX(-50%) scaleX(1);
				height: 100%;
				transition:
					transform 0.48s 0.1s cubic-bezier(0.23, 1, 0.32, 1),
					height 0.48s 0.4s cubic-bezier(0.23, 1, 0.32, 1);
			}
		}

		&::before {
			content: "";
			position: absolute;
			z-index: -1;
			left: 50%;
			top: 0%;
			transform: translateX(-50%) scaleX(0);
			width: 100%;
			height: 3px;
			background: var(--theme-color);
			transition:
				transform 0.48s 0.4s cubic-bezier(0.23, 1, 0.32, 1),
				height 0.48s 0.1s cubic-bezier(0.23, 1, 0.32, 1);
		}

		/* From Uiverse.io by vnuny */
		.link_hint {
			position: absolute;
			bottom: 85px;
			left: 50%;
			margin-left: 56px;
			padding: 35px 0;
			width: 300px;
			color: var(--theme-color);
			z-index: 5;
			opacity: 0;
			transition:
				opacity 0.7s ease,
				visibility 0.7s ease;
			visibility: hidden;
			pointer-events: none;

			&::before {
				width: 0px;
				bottom: 29px;
				left: 0;
				content: "";
				background-color: var(--theme-color);
				height: 1px;
				position: absolute;
				transition: width 0.4s;
			}

			&::after {
				-webkit-transform-origin: 0 50%;
				transform-origin: 0 50%;
				-webkit-transform: rotate(-225deg);
				transform: rotate(-225deg);
				bottom: 29px;
				left: 0;
				width: 80px;
				content: "";
				background-color: var(--theme-color);
				height: 1px;
				position: absolute;
				opacity: 1;
				-webkit-transition: opacity 0.5s ease;
				transition: opacity 0.5s ease;
				-webkit-transition-delay: 0s;
				transition-delay: 0s;
			}
		}

		/*
		&:hover {
			.hint-content {
				opacity: 1;
				-webkit-transition:
					opacity 0.7s ease,
					visibility 0.7s ease;
				transition:
					opacity 0.7s ease,
					visibility 0.7s ease;
				visibility: visible;

				&::before {
					width: 180px;
					transition: width 0.4s;
				}

				::after {
					opacity: 1;
					visibility: visible;
				}
			}
		}
    */
	}
}
</style>
