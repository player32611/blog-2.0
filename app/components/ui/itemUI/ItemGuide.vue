<script setup lang="ts">
import gsap from "gsap";

const itemStore = useItemStore();
const guideRef = ref<HTMLDivElement | null>(null);

watch(
	() => itemStore.showingGuide,
	newValue => {
		if (newValue) {
			gsap.to(guideRef.value, { top: "0", duration: 0.5, ease: "back.out" });
		} else {
			gsap.to(guideRef.value, { top: "-100%", duration: 0.5, ease: "power1.out" });
		}
	},
);
</script>

<template>
	<div class="item_guide" ref="guideRef">
		<svg class="doodle star" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path d="M12 2L15 9L22 10L17 15L18.5 22L12 18.5L5.5 22L7 15L2 10L9 9L12 2Z"></path>
		</svg>
		<svg class="doodle sparkle" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M12 0C12 6.6 17.4 12 24 12C17.4 12 12 17.4 12 24C12 17.4 6.6 12 0 12C6.6 12 12 6.6 12 0Z"
			></path>
		</svg>
		<svg class="doodle swirl" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M50 10C27.9 10 10 27.9 10 50C10 72.1 27.9 90 50 90C72.1 90 90 72.1 90 50C90 32.3 75.7 18 58 18C44.3 18 33 29.3 33 43C33 53.5 41.5 62 52 62C59.7 62 66 55.7 66 48"
			></path>
		</svg>

		<div class="guide_photo"></div>

		<div class="guide_title">
			参考小册<br />
			<span>命令行指南</span>
		</div>

		<div class="guide_content"><span>add xxx</span>添加物品</div>
		<div class="guide_content"><span>delete xxx</span>删除物品</div>

		<div class="guide_links">
			<button class="guide_links_btn previous" aria-label="previous">
				<span class="icon">&#xeb79;</span>
			</button>
			<button
				class="guide_links_btn close"
				aria-label="close"
				@click="itemStore.toggleShowingGuide"
			>
				<span class="icon">&#xe781;</span>
			</button>
			<button class="guide_links_btn next" aria-label="next">
				<span class="icon">&#xeb77;</span>
			</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
.item_guide {
	/* Cute Doodle Palette */
	--bg-color: #fdfbf7;
	--ink-color: #2c2c2c;
	--paper-line: #e6e0d4;
	--tape-color: rgba(255, 221, 161, 0.85);
	--accent-coral: #ff8ba7;
	--accent-mint: #c6e377;
	--accent-lavender: #c0bbfe;
	--accent-yellow: #ffdf6c;
	position: absolute;
	top: -50%;
	left: calc(50% - 80% / 2 - 1.5em);
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 3em 1.5em 2em;
	font-size: 16px;
	width: 80%;
	background:
		linear-gradient(var(--bg-color) 1.5em, transparent 1.5em) 0 0 / 100% 1.6em,
		linear-gradient(var(--paper-line) 0.08em, transparent 0.08em) 0 1.5em / 100% 1.6em
			var(--bg-color);
	border: 0.25em solid var(--ink-color);
	border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
	box-shadow:
		0.5em 0.5em 0 var(--ink-color),
		inset 0 0 1.2em rgba(0, 0, 0, 0.03);
	transition:
		transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
		box-shadow 0.4s ease,
		border-radius 0.4s ease;
	animation: floatCard 6s ease-in-out infinite;
	z-index: 1;

	&::before {
		content: "";
		position: absolute;
		top: -0.7em;
		left: 50%;
		transform: translateX(-50%) rotate(-4deg);
		width: 5em;
		height: 1.4em;
		background: var(--tape-color);
		border: 0.1em solid rgba(0, 0, 0, 0.1);
		box-shadow: 0.1em 0.1em 0.2em rgba(0, 0, 0, 0.1);
		border-radius: 2px 4px 2px 5px;
		z-index: 10;
		animation: tapeFlutter 4s infinite alternate ease-in-out;
	}

	&:hover {
		transform: translateY(-0.8em) rotate(1deg);
		box-shadow:
			0.7em 0.9em 0 var(--ink-color),
			inset 0 0 1.2em rgba(0, 0, 0, 0.03);
		border-radius: 15px 255px 15px 225px / 255px 15px 225px 15px; /* Border sketch shift */

		.guide_title {
			animation: titleWobble 0.6s ease-in-out infinite alternate;
		}

		.guide_links {
			height: 3em;
			opacity: 1;
			margin-top: 1.5em;
			overflow: visible;
		}
	}

	.doodle {
		position: absolute;
		fill: none;
		stroke: var(--ink-color);
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		z-index: 0;

		&.star {
			width: 1.8em;
			height: 1.8em;
			top: 1.5em;
			right: 1.5em;
			fill: var(--accent-yellow);
			animation: pulseSparkle 3s infinite alternate ease-in-out;
		}

		&.sparkle {
			width: 1.5em;
			height: 1.5em;
			top: 4em;
			left: 1.5em;
			fill: var(--accent-mint);
			animation: pulseSparkle 2.5s infinite alternate-reverse ease-in-out;
		}

		&.swirl {
			width: 2.5em;
			height: 2.5em;
			bottom: 2em;
			right: 1em;
			stroke: var(--accent-lavender);
			stroke-width: 6;
			opacity: 0.6;
			animation: rotateDoodle 15s linear infinite;
		}
	}

	.guide_photo {
		width: 6.5em;
		height: 6.5em;
		position: relative;
		margin-bottom: 1.2em;
		background:
    /* Spiky Hair */
			radial-gradient(circle at 25% 10%, var(--accent-lavender) 15%, transparent 16%),
			radial-gradient(circle at 50% 5%, var(--accent-lavender) 18%, transparent 19%),
			radial-gradient(circle at 75% 10%, var(--accent-lavender) 15%, transparent 16%),
			/* Hair Base */
			radial-gradient(ellipse at 50% 20%, var(--accent-lavender) 45%, transparent 46%),
			/* Skin Tone */ #ffdeb3;
		border: 0.2em solid var(--ink-color);
		border-radius: 40% 60% 55% 45% / 50% 45% 55% 50%;
		box-shadow: 0.3em 0.3em 0 var(--accent-coral);
		animation: avatarBounce 4s ease-in-out infinite;
		overflow: hidden;
		z-index: 2;

		&::before {
			content: "";
			position: absolute;
			width: 0.55em;
			height: 0.55em;
			background: var(--ink-color);
			border-radius: 50%;
			top: 3.2em;
			left: 1.8em;
			/* Right eye + two pink blushes */
			box-shadow:
				2.3em 0 0 var(--ink-color),
				-0.4em 0.9em 0.3em rgba(255, 139, 167, 0.8),
				2.7em 0.9em 0.3em rgba(255, 139, 167, 0.8);
			animation: avatarBlink 5s infinite;
			transform-origin: center;
		}

		&::after {
			content: "";
			position: absolute;
			width: 1.4em;
			height: 1.2em;
			border: 0.2em solid transparent;
			border-bottom-color: var(--ink-color);
			border-radius: 50%;
			top: 2.2em;
			left: 2.35em;
			animation: smileMove 3s ease-in-out infinite alternate;
		}
	}

	.guide_title,
	.guide_content {
		text-align: center;
		color: var(--ink-color);
		font-size: 1.3em;
		font-weight: 900;
		font-family: "Comic Sans MS", "Chalkboard SE", "Marker Felt", sans-serif;
		letter-spacing: 0.05em;
		margin-bottom: 0.5em;
		text-shadow: 0.08em 0.08em 0 var(--accent-lavender);
		z-index: 2;

		span {
			display: inline-block;
			font-size: 0.55em;
			color: var(--ink-color);
			background: var(--accent-mint);
			padding: 0.4em 1em;
			border: 0.15em solid var(--ink-color);
			border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
			margin-top: 0.8em;
			font-weight: bold;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			box-shadow: 0.2em 0.2em 0 var(--ink-color);
			animation: badgeFloat 3s ease-in-out infinite alternate;
			text-shadow: none;
		}
	}

	.guide_content {
		font-size: 1em;

		span {
			margin: 0 1em;
			font-size: 0.8em;
		}
	}

	.guide_links {
		display: flex;
		justify-content: space-between;
		gap: 1em;
		height: 0;
		width: 90%;
		opacity: 0;
		margin-top: 0;
		overflow: hidden;
		transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		z-index: 2;

		.guide_links_btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 2.8em;
			height: 2.8em;
			font-weight: 600;
			border: 0.15em solid var(--ink-color);
			background: #fff;
			border-radius: 50% 40% 60% 40% / 40% 60% 40% 50%; /* Skewed circle */
			cursor: pointer;
			box-shadow: 0.2em 0.2em 0 var(--ink-color);
			transition: all 0.2s ease;

			&:hover {
				transform: translateY(-0.3em);
				animation: btnWiggle 0.6s ease-in-out infinite;

				&.previous {
					background: var(--accent-lavender);
				}

				&.close {
					background: var(--accent-coral);
				}
				&.next {
					background: var(--accent-mint);
				}
			}

			&:focus-visible {
				outline: 0.2em dashed var(--accent-coral);
				outline-offset: 0.3em;
				transform: translateY(-0.3em);
			}

			&:active {
				transform: translate(0.1em, 0.1em);
				box-shadow: 0.05em 0.05em 0 var(--ink-color);
				animation: none;
			}

			svg {
				width: 1.4em;
				height: 1.4em;
				fill: var(--ink-color);
				transition: transform 0.2s ease;
			}
		}
	}
}

/* --- ANIMATIONS KEYFRAMES --- */
@keyframes floatCard {
	0%,
	100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-0.4em);
	}
}

@keyframes tapeFlutter {
	0% {
		transform: translateX(-50%) rotate(-4deg) scale(1);
	}
	100% {
		transform: translateX(-50%) rotate(-2deg) scale(1.02);
	}
}

@keyframes pulseSparkle {
	0% {
		transform: scale(0.8);
		opacity: 0.6;
	}
	100% {
		transform: scale(1.1);
		opacity: 1;
	}
}

@keyframes rotateDoodle {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

@keyframes avatarBounce {
	0%,
	100% {
		transform: translateY(0) scale(1);
		border-radius: 40% 60% 55% 45% / 50% 45% 55% 50%;
	}
	50% {
		transform: translateY(-0.3em) scale(1.02);
		border-radius: 45% 55% 50% 50% / 45% 50% 50% 55%;
	}
}

@keyframes avatarBlink {
	0%,
	4%,
	10%,
	100% {
		transform: scaleY(1);
	}
	5%,
	8% {
		transform: scaleY(0.1);
	}
}

@keyframes smileMove {
	0% {
		transform: translateY(0) scaleX(1);
	}
	100% {
		transform: translateY(-0.1em) scaleX(1.1);
	}
}

@keyframes titleWobble {
	0% {
		transform: rotate(-2deg) scale(1.02);
	}
	100% {
		transform: rotate(2deg) scale(1.02);
	}
}

@keyframes badgeFloat {
	0% {
		transform: translateY(0) rotate(-1deg);
	}
	100% {
		transform: translateY(-0.2em) rotate(1deg);
	}
}

@keyframes btnWiggle {
	0%,
	100% {
		transform: translateY(-0.3em) rotate(0deg);
	}
	25% {
		transform: translateY(-0.3em) rotate(-8deg);
	}
	75% {
		transform: translateY(-0.3em) rotate(8deg);
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	.item_guide {
		font-size: 10px;

		.guide_links {
			.guide_links_btn {
				width: 2.2em;
				height: 2.2em;
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	.item_guide {
		font-size: 13px;

		.guide_links {
			.guide_links_btn {
				width: 2.4em;
				height: 2.4em;
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	.item_guide {
		font-size: 14px;

		.guide_links {
			.guide_links_btn {
				width: 2.5em;
				height: 2.5em;
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	.item_guide {
		font-size: 15px;

		.guide_links {
			.guide_links_btn {
				width: 2.6em;
				height: 2.6em;
			}
		}
	}
}
</style>
