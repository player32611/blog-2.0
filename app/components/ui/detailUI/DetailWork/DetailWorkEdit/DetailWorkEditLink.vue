<script setup lang="ts"></script>

<template>
	<button class="work_edit_link">
		<div class="txt">
			<span class="letter" style="--i: 0">s</span>
			<span class="letter" style="--i: 1">t</span>
			<span class="letter" style="--i: 2">a</span>
			<span class="letter" style="--i: 3">r</span>
			<span class="letter" style="--i: 4">t</span>
			<span class="letter" style="--i: 0">&nbsp;</span>
			<span class="letter lighter" style="--i: 5">\</span>
			<span class="letter" style="--i: 0">&nbsp;</span>
			<span class="letter bold" style="--i: 6">t</span>
			<span class="letter bold" style="--i: 7">o</span>
			<span class="letter bold" style="--i: 8">d</span>
			<span class="letter bold" style="--i: 9">a</span>
			<span class="letter bold" style="--i: 10">y</span>
		</div>
		<svg
			class="corner top left rot-270"
			viewBox="0 0 29 29"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				d="M11.4381 1L0 1V0L11.4381 1.78814e-07C12.6316 -2.98023e-07 13.7762 0.474106 14.6201 1.31802L27.1577 13.8555C28.0016 14.6995 28.4757 15.8441 28.4757 17.0375V28.4757H27.4757V17.0375C27.4757 16.1093 27.1069 15.219 26.4505 14.5627L13.913 2.02513C13.2566 1.36875 12.3664 1 11.4381 1Z"
			></path>
		</svg>
		<svg
			class="corner top right"
			viewBox="0 0 29 29"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				d="M11.4381 1L0 1V0L11.4381 1.78814e-07C12.6316 -2.98023e-07 13.7762 0.474106 14.6201 1.31802L27.1577 13.8555C28.0016 14.6995 28.4757 15.8441 28.4757 17.0375V28.4757H27.4757V17.0375C27.4757 16.1093 27.1069 15.219 26.4505 14.5627L13.913 2.02513C13.2566 1.36875 12.3664 1 11.4381 1Z"
			></path>
		</svg>
		<svg
			class="corner bottom left rot-180"
			viewBox="0 0 29 29"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				d="M11.4381 1L0 1V0L11.4381 1.78814e-07C12.6316 -2.98023e-07 13.7762 0.474106 14.6201 1.31802L27.1577 13.8555C28.0016 14.6995 28.4757 15.8441 28.4757 17.0375V28.4757H27.4757V17.0375C27.4757 16.1093 27.1069 15.219 26.4505 14.5627L13.913 2.02513C13.2566 1.36875 12.3664 1 11.4381 1Z"
			></path>
		</svg>
		<svg
			class="corner bottom right rot-90"
			viewBox="0 0 29 29"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				d="M11.4381 1L0 1V0L11.4381 1.78814e-07C12.6316 -2.98023e-07 13.7762 0.474106 14.6201 1.31802L27.1577 13.8555C28.0016 14.6995 28.4757 15.8441 28.4757 17.0375V28.4757H27.4757V17.0375C27.4757 16.1093 27.1069 15.219 26.4505 14.5627L13.913 2.02513C13.2566 1.36875 12.3664 1 11.4381 1Z"
			></path>
		</svg>
	</button>
</template>

<style scoped lang="scss">
/* From Uiverse.io by dexter-st */
.work_edit_link {
	--button-col: #1677ff;
	--border-size: 5px;
	--rad: 5px;
	--corner-size: 24px;
	--corner-dist: 24px;
	--corner-col: #000000;

	position: relative;
	cursor: pointer;
	padding: 0.75rem 1rem;

	background-color: var(--button-col);
	border-radius: var(--rad);
	border: 1px solid color-mix(in oklab, var(--corner-col) 20%, #0000 80%);

	transition: 0.15s ease;

	&:hover {
		--corner-dist: 20px;
		.txt .letter {
			opacity: 1;
			animation: anim ease 0.1s forwards;
			animation-delay: calc(0.03s * var(--i));
		}
	}

	&:active {
		--corner-dist: 16px;
	}

	&::before {
		pointer-events: none;
		content: "";
		position: absolute;
		inset: calc(-1 * var(--border-size));
		z-index: -1;
		border-radius: calc(var(--border-size) + var(--rad));

		background-color: color-mix(in oklab, var(--corner-col) 10%, #0000 90%);
		box-shadow:
			0 0 0 1px color-mix(in oklab, var(--corner-col) 30%, #0000 70%),
			inset 0 1px 2px -1px var(--corner-col);
	}

	.txt {
		display: inline-flex;
		font-size: 1.1rem;
		font-family: "Inter", "Segoe UI", sans-serif;
		color: #ffffff;

		.letter {
			opacity: 0.4;
			transition: opacity 0.1s ease;
			transition-delay: calc(0.02s * var(--i));
			transform: rotateX(0);

			&.bold {
				font-weight: bold;
			}

			&.lighter {
				font-weight: 300;
			}
		}
	}

	.corner {
		pointer-events: none;
		position: absolute;
		height: var(--corner-size);
		width: var(--corner-size);
		fill: var(--corner-col);
		transition: 0.15s ease;

		&.top {
			top: calc(-1 * var(--corner-dist));
		}

		&.bottom {
			bottom: calc(-1 * var(--corner-dist));
		}

		&.left {
			left: calc(-1 * var(--corner-dist));
		}

		&.right {
			right: calc(-1 * var(--corner-dist));
		}

		&.rot-90 {
			rotate: 90deg;
		}

		&.rot-180 {
			rotate: 180deg;
		}

		&.rot-270 {
			rotate: 270deg;
		}
	}
}

@keyframes anim {
	50% {
		transform: rotateX(60deg);
	}
}
</style>
