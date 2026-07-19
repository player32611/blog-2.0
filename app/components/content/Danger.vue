<script setup lang="ts"></script>

<template>
	<!-- From Uiverse.io by CodeM7710 -->
	<div class="custom-block danger">
		<div class="danger_content">
			<span>
				<span class="icon">&#xeaf7;</span>
				<div class="content">
					<slot />
				</div>
			</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
/* From Uiverse.io by CodeM7710 */
.custom-block.danger {
	position: relative;
	width: auto;
	height: fit-content;
	border-left-style: solid;
	border-left-color: #ff0000;
	border-left-width: 5px;
	border-radius: 15px;
	border-top-left-radius: 0px;
	border-bottom-left-radius: 0px;
	background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);
	overflow: auto;

	.danger_content {
		padding-right: 10px;
		overflow: auto;

		&::-webkit-scrollbar {
			height: 7px;
		}

		&::-webkit-scrollbar-track {
			background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);
		}

		&::-webkit-scrollbar-thumb {
			background: rgba($color: #ff0000, $alpha: 1);
		}

		span {
			display: flex;
			align-items: start;
			width: fit-content;
			color: #ff0000;
			font-size: 1em;
			word-break: break-all;
			--code-group-color: #ff0000;

			.icon {
				margin: 10px;
				font-size: 2em;
			}
		}
	}
}
</style>
