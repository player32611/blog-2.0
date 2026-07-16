<script setup lang="ts"></script>

<template>
	<!-- From Uiverse.io by xopc333 -->
	<button class="button">
		<div class="button-box">
			<span class="button-elem">
				<svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
					></path>
				</svg>
			</span>
			<span class="button-elem">
				<svg viewBox="0 0 46 40">
					<path
						d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
					></path>
				</svg>
			</span>
		</div>
	</button>
</template>

<style scoped lang="scss">
/* From Uiverse.io by xopc333 */
.button {
	display: block;
	position: relative;
	width: 56px;
	height: 56px;
	margin: 0;
	overflow: hidden;
	outline: none;
	background-color: transparent;
	cursor: pointer;
	border: 0;

	&:hover,
	&:focus {
		&::before {
			opacity: 0;
			transform: scale(0.7);
			transition:
				opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
				transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		}

		&::after {
			opacity: 1;
			transform: scale(1);
			transition:
				opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
				transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
		}

		.button-box {
			transition: 0.4s;
			transform: translateX(-56px);
		}
	}

	&::before,
	&::after {
		content: "";
		position: absolute;
		border-radius: 50%;
		inset: 7px;
	}

	&::before {
		border: 4px solid #f0eeef;
		transition:
			opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
			transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
	}

	&::after {
		border: 4px solid #96daf0;
		transform: scale(1.3);
		transition:
			opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
			transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		opacity: 0;
	}

	.button-box {
		display: flex;
		position: absolute;
		top: 0;
		left: 0;

		.button-elem {
			display: block;
			width: 20px;
			height: 20px;
			margin: 17px 18px 0 18px;
			transform: rotate(180deg);
			fill: #f0eeef;
		}
	}
}
</style>
