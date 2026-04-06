<script setup lang="ts"></script>

<template>
	<div class="custom-block warning">
		<span>
			<span class="icon">&#xeafe;</span>
			<div class="content">
				<slot />
			</div>
		</span>
	</div>
</template>

<style scoped lang="scss">
.custom-block.warning {
	padding-right: 10px;
	width: auto;
	height: fit-content;
	border-left-style: solid;
	border-left-color: yellow;
	border-left-width: 5px;
	border-radius: 15px;
	border-top-left-radius: 0px;
	border-bottom-left-radius: 0px;
	background: linear-gradient(to right, #e6e4ad6e, #e6e4ad4e 50%, #e6e4ad3e);

	span {
		display: flex;
		align-items: start;
		color: yellow;
		word-break: break-all;
		font-size: 1em;

		.icon {
			margin: 10px;
			font-size: 2em;
		}

		p {
			float: left;
			padding-top: 13px;
			padding-left: 10px;
			color: white;
			font-size: 15px;
		}
	}
}
</style>
