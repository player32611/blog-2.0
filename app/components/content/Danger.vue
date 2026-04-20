<script setup lang="ts"></script>

<template>
	<div class="custom-block danger">
		<span>
			<span class="icon">&#xeaf7;</span>
			<div class="content">
				<slot />
			</div>
		</span>
	</div>
</template>

<style scoped lang="scss">
.custom-block.danger {
	margin: 20px 0;
	height: fit-content;
	width: auto;
	padding-right: 10px;
	background: lightgrey;
	border-left-style: solid;
	border-left-color: red;
	border-left-width: 5px;
	border-radius: 15px;
	border-top-left-radius: 0px;
	border-bottom-left-radius: 0px;
	background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);
	overflow: auto;

	span {
		display: flex;
		align-items: start;
		color: red;
		font-size: 1em;
		word-break: break-all;

		.icon {
			margin: 10px;
			font-size: 2em;
		}

		p {
			float: left;
			margin-left: 5px;
			padding-top: 13px;
			padding-left: 10px;
			font-size: 15px;
		}
	}
}
</style>
