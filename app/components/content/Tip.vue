<script setup lang="ts"></script>

<template>
	<!-- From Uiverse.io by CodeM7710 -->
	<div class="custom-block tip">
		<div class="tip_content">
			<span>
				<span class="icon">&#xeaf2;</span>
				<div class="content">
					<slot />
				</div>
			</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
/* From Uiverse.io by CodeM7710 */
.custom-block.tip {
	position: relative;
	width: auto;
	height: fit-content;
	border-left-style: solid;
	border-left-color: #add8e6;
	border-left-width: 5px;
	border-radius: 15px;
	border-top-left-radius: 0px;
	border-bottom-left-radius: 0px;
	background: linear-gradient(to right, #add8e66e, #add8e64e 50%, #add8e63e);
	overflow: hidden;

	.tip_content {
		padding-right: 10px;
		overflow: auto;

		&::-webkit-scrollbar {
			height: 7px;
		}

		&::-webkit-scrollbar-track {
			background: linear-gradient(to right, #add8e66e, #add8e64e 50%, #add8e63e);
		}

		&::-webkit-scrollbar-thumb {
			background: rgba($color: #add8e6, $alpha: 1);
		}

		span {
			display: flex;
			align-items: start;
			width: fit-content;
			color: #add8e6;
			word-break: break-all;
			font-size: 1em;
			--theme-color: #add8e6;

			.icon {
				margin: 10px;
				font-size: 2em;
			}
		}
	}
}
</style>
