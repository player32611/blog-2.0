<script setup lang="ts"></script>

<template>
	<div class="guide_photo"></div>
</template>

<style scoped lang="scss">
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
		/* Hair Base */ radial-gradient(ellipse at 50% 20%, var(--accent-lavender) 45%, transparent 46%),
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
</style>
