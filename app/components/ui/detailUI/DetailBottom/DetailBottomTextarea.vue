<script setup lang="ts"></script>

<template>
	<div class="bottom_textarea">
		<div class="sign" ref="signRef">
			<div class="sign_head" ref="signHeadRef">
				<textarea class="sign_content" rows="10" placeholder="留下宝贵的意见吧"></textarea>
			</div>
			<div class="sign_body"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
$base-size: 0.7;

.bottom_textarea {
	.sign {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		transform-origin: center bottom;

		.sign_head {
			padding: 10px * $base-size;
			height: 150px * $base-size;
			width: 300px * $base-size;
			background-color: #a46952;
			border-width: 5px * $base-size;
			border-style: solid;
			border-color: #000000;

			.sign_content {
				padding: 10px * $base-size;
				height: calc(100% - 10px * 2 * $base-size);
				width: calc(100% - 10px * 2 * $base-size);
				background-color: #b596ac;
				color: #71456e;
				font-size: 1.5rem * $base-size;
				font-weight: 600;
				font-family: "方正基础像素体";
				outline: none;
				resize: none;
				overflow: hidden;
			}
		}

		.sign_body {
			height: 100px * $base-size;
			width: 20px * $base-size;
			background: linear-gradient(to bottom, #71456e 0%, #71456e 80%, #a46952 80%, #a46952 100%);
			border-width: 0 5px * $base-size 5px * $base-size 5px * $base-size;
			border-style: solid;
			border-color: #000000;
		}
	}
}
</style>
