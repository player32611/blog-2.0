<script setup lang="ts"></script>

<template>
	<div class="custom-block warning">
		<div class="warning_content">
			<span>
				<span class="icon">&#xeafe;</span>
				<div class="content">
					<slot />
				</div>
			</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
.custom-block.warning {
	position: relative;
	width: auto;
	height: fit-content;
	border-left-style: solid;
	border-left-color: #ffff00;
	border-left-width: 5px;
	border-radius: 15px;
	border-top-left-radius: 0px;
	border-bottom-left-radius: 0px;
	background: linear-gradient(to right, #ffff006e, #ffff004e 50%, #ffff003e);
	overflow: hidden;

	.warning_content {
		padding-right: 10px;
		overflow: auto;

		&::-webkit-scrollbar {
			height: 7px;
		}

		&::-webkit-scrollbar-track {
			background: linear-gradient(to right, #ffff006e, #ffff004e 50%, #ffff003e);
		}

		&::-webkit-scrollbar-thumb {
			background: rgba($color: #ffff00, $alpha: 1);
		}

		span {
			display: flex;
			align-items: start;
			width: fit-content;
			color: #ffff00;
			word-break: break-all;
			font-size: 1em;

			.icon {
				margin: 10px;
				font-size: 2em;
			}
		}
	}
}
</style>
