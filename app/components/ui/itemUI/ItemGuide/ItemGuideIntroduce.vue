<script setup lang="ts">
import ItemGuidePhoto from "./ItemGuidePhoto.vue";
import ItemGuidePreview from "./ItemGuidePreview.vue";
</script>

<template>
	<div class="guide_introduce">
		<ItemGuidePhoto />

		<ItemGuidePreview />
	</div>
</template>

<style scoped lang="scss">
.guide_introduce {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 50vh;

	// .guide_title,
	// .guide_content {
	// 	text-align: center;
	// 	color: var(--ink-color);
	// 	font-size: 1.3em;
	// 	font-weight: 900;
	// 	font-family: "Comic Sans MS", "Chalkboard SE", "Marker Felt", sans-serif;
	// 	letter-spacing: 0.05em;
	// 	margin-bottom: 0.5em;
	// 	text-shadow: 0.08em 0.08em 0 var(--accent-lavender);
	// 	z-index: 2;

	// 	span {
	// 		display: inline-block;
	// 		font-size: 0.55em;
	// 		color: var(--ink-color);
	// 		background: var(--accent-mint);
	// 		padding: 0.4em 1em;
	// 		border: 0.15em solid var(--ink-color);
	// 		border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
	// 		margin-top: 0.8em;
	// 		font-weight: bold;
	// 		text-transform: uppercase;
	// 		letter-spacing: 0.1em;
	// 		box-shadow: 0.2em 0.2em 0 var(--ink-color);
	// 		animation: badgeFloat 3s ease-in-out infinite alternate;
	// 		text-shadow: none;
	// 	}
	// }

	// .guide_content {
	// 	font-size: 1em;

	// 	span {
	// 		margin: 0 1em;
	// 		font-size: 0.8em;
	// 	}
	// }
}

@keyframes badgeFloat {
	0% {
		transform: translateY(0) rotate(-1deg);
	}
	100% {
		transform: translateY(-0.2em) rotate(1deg);
	}
}
</style>
