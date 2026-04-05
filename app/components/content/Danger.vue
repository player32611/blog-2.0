<script setup lang="ts"></script>

<template>
	<div class="danger custom-block">
		<!-- <p class="custom-block-title" v-if="$slots.title">
      <slot name="title" />
    </p> -->
		<span>
			<svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
				<path
					d="m569.517 440.013c18.458 31.994-4.711 71.987-41.577 71.987h-479.886c-36.937 0-59.999-40.055-41.577-71.987l239.946-416.028c18.467-32.009 64.72-31.951 83.154 0zm-281.517-86.013c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346 7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
				></path>
			</svg>
			<slot />
		</span>
	</div>
</template>

<style scoped lang="scss">
.custom-block.danger {
	margin: 20px 0;
	height: fit-content;
	width: auto;
	padding-right: 10px;
	// padding-bottom: 12px;
	background: lightgrey;
	border-left-style: solid;
	border-left-color: red;
	border-left-width: 5px;
	border-radius: 15px;
	border-top-left-radius: 0px;
	border-bottom-left-radius: 0px;
	background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);

	svg {
		height: 20px;
		padding-left: 10px;
		padding-top: 12px;
		fill: red;
		float: left;
	}

	p {
		float: left;
		padding-top: 13px;
		padding-left: 10px;
		font-size: 15px;
	}

	span {
		display: flex;
		align-items: left;
		color: red;
		text-indent: 1em;
	}
}
</style>
