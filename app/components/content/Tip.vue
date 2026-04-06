<script setup lang="ts"></script>

<template>
	<div class="custom-block tip">
		<span>
			<span class="icon">&#xeaf2;</span>
			<div class="content">
				<slot />
			</div>
		</span>
	</div>
</template>

<style scoped lang="scss">
.custom-block.tip {
	padding-right: 10px;
	width: auto;
	height: fit-content;
	border-left-style: solid;
	border-left-color: lightblue;
	border-left-width: 5px;
	border-radius: 15px;
	border-top-left-radius: 0px;
	border-bottom-left-radius: 0px;
	background: linear-gradient(to right, #add8e66e, #add8e64e 50%, #add8e63e);

	span {
		display: flex;
		align-items: start;
		color: lightblue;
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
